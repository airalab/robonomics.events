<template>
  <div>
    <div v-if="isLoad">...</div>
    <div v-else>
      Total seats: {{ totalSeats }}<br />
      Used seats: {{ usedSeats }}<br />
      Price: {{ signalPrice | fromWei }} XRT<br />
      <template v-if="stakeOf > 0"
        >Your stake: {{ stakeOf | fromWei }} XRT<br
      /></template>
      Your balance: {{ balance | fromWei }} XRT<br /><br />
      <p v-if="error">{{ error }}</p>
      <div v-if="stakeOf == 0 && !error">
        <button
          v-if="Number(allowance) < Number(signalPrice)"
          @click="approve"
          :disabled="statusApprove === 1"
          class="btn-red"
        >
          approve
        </button>
        <button
          v-else
          @click="deposit"
          :disabled="statusDeposit === 1"
          class="btn-red"
        >
          deposit
        </button>
      </div>
      <div v-if="stakeOf > 0">
        <button
          @click="withdraw"
          class="btn-red"
          :disabled="statusWithdraw === 1"
        >
          withdraw
        </button>
      </div>
      <small v-if="tx">
        <a :href="`https://etherscan.io/tx/${tx}`" target="_blank">
          {{ tx | sliceAddress }}
        </a>
      </small>
    </div>
  </div>
</template>

<script>
import { utils } from "web3";
import config from "../config";
import SignalABI from "../abi/signal.json";
import TokenABI from "../abi/token.json";

export default {
  filters: {
    fromWei: function (v) {
      return v > 0 ? utils.fromWei(v, "GWei") : "0";
    },
  },
  data() {
    return {
      contractSignal: null,
      statusApprove: 0,
      statusDeposit: 0,
      statusWithdraw: 0,
      isLoad: false,
      stakeOf: 0,
      initialLock: 0,
      totalSeats: 0,
      usedSeats: 0,
      signalPrice: 0,
      balance: 0,
      allowance: 0,
      error: "",
      tx: null,
    };
  },
  watch: {
    $account() {
      this.loadData();
    },
  },
  async mounted() {
    this.contractSignal = new this.$web3.eth.Contract(SignalABI, config.SIGNAL);
    this.contractToken = new this.$web3.eth.Contract(TokenABI, config.XRT);

    this.isLoad = true;
    this.loadData();
  },
  methods: {
    async loadData() {
      this.stakeOf = await this.contractSignal.methods
        .stakeOf(this.$account)
        .call();
      this.initialLock = await this.contractSignal.methods.initialLock().call();
      this.totalSeats = await this.contractSignal.methods.totalSeats().call();
      this.usedSeats = await this.contractSignal.methods.usedSeats().call();
      this.signalPrice = await this.contractSignal.methods.signalPrice().call();
      this.balance = await this.contractToken.methods
        .balanceOf(this.$account)
        .call();
      this.allowance = await this.contractToken.methods
        .allowance(this.$account, config.SIGNAL)
        .call();

      if (Number(this.usedSeats) >= Number(this.totalSeats)) {
        this.error = "Not enough seats to participate";
      } else if (Number(this.stakeOf) > 0) {
        this.error = "This address already participate";
      } else if (Number(this.balance) < Number(this.signalPrice)) {
        this.error = "Insufficient funds";
      } else {
        this.error = null;
      }

      this.isLoad = false;
    },
    deposit() {
      this.statusDeposit = 1;
      this.contractSignal.methods
        .deposit()
        .send({ from: this.$account }, (e, tx) => {
          if (e) {
            this.statusDeposit = 0;
            return;
          }
          this.tx = tx;
        })
        .then(() => {
          setTimeout(() => {
            this.statusDeposit = 0;
            this.tx = null;
            this.loadData();
          }, 3000);
        })
        .catch(() => {
          this.statusDeposit = 0;
          this.tx = null;
        });
    },
    withdraw() {
      this.statusWithdraw = 1;
      this.contractSignal.methods
        .withdraw()
        .send({ from: this.$account }, (e, tx) => {
          if (e) {
            this.statusWithdraw = 0;
            return;
          }
          this.tx = tx;
        })
        .then(() => {
          setTimeout(() => {
            this.statusWithdraw = 0;
            this.tx = null;
            this.loadData();
          }, 3000);
        })
        .catch(() => {
          this.statusWithdraw = 0;
          this.tx = null;
        });
    },
    approve() {
      this.statusApprove = 1;
      this.contractToken.methods
        .approve(
          config.SIGNAL,
          "0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff"
        )
        .send({ from: this.$account }, (e, tx) => {
          if (e) {
            this.statusApprove = 0;
            return;
          }
          this.tx = tx;
        })
        .then(() => {
          setTimeout(() => {
            this.statusApprove = 0;
            this.tx = null;
            this.loadData();
          }, 3000);
        })
        .catch(() => {
          this.statusApprove = 0;
          this.tx = null;
        });
    },
  },
};
</script>
