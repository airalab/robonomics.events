import Web3 from "web3";

function getWeb3Provider() {
  if (window.ethereum) {
    return { type: 1, provider: window.ethereum };
  } else if (window.web3) {
    console.warn("warrning old metamask");
    return { type: 2, provider: window.web3.currentProvider };
  } else {
    console.log("web3 fallback");
    return {
      type: 3,
      provider: new Web3.providers.WebsocketProvider(
        "wss://mainnet.infura.io/ws/v3/c1ea69ab1e0a4c6aa6a9dcd0641aecc7"
      ),
    };
  }
}

export async function getAccount(web3) {
  const accounts = await web3.eth.getAccounts();
  if (accounts.length > 0) {
    return web3.utils.toChecksumAddress(accounts[0]);
  }
  throw new Error("not account");
}

export async function accountAccess() {
  try {
    await window.ethereum.enable();
    return true;
  } catch (_) {
    return false;
  }
}

export async function isAuthorized() {
  if (!window.ethereum) {
    return false;
  }
  return new Promise((resolve) => {
    window.ethereum.send({ method: "eth_accounts" }, (e, r) => {
      if (e) {
        return resolve(false);
      }
      resolve(!!r.result.length);
    });
  });
}

const initAccount = false;
const initAccessRequired = true;

export const state = {
  isReady: false,
  error: null,
  networkId: null,
  account: null,
  getWeb3: null,
  typeProvider: null,
};

export async function init(networks) {
  try {
    const provider = getWeb3Provider();
    state.typeProvider = provider.type;
    const instance = new Web3(provider.provider);
    state.getWeb3 = () => instance;
    const networkId = await instance.eth.net.getId();
    state.networkId = networkId;
    if (!networks.includes(String(networkId))) {
      state.error = 1;
      state.isReady = false;
    } else {
      let error = 0;
      if (instance && provider.type === 1) {
        window.ethereum.on("networkChanged", function (networkId) {
          state.networkId = networkId;
        });
        window.ethereum.on("accountsChanged", function (accounts) {
          if (accounts.length > 0) {
            state.account = instance.utils.toChecksumAddress(accounts[0]);
          } else {
            state.account = null;
          }
        });
        if (initAccount || (await isAuthorized())) {
          if (await accountAccess()) {
            try {
              state.account = await getAccount(instance);
            } catch (_) {
              error = 2;
            }
          } else if (initAccessRequired) {
            error = 3;
            console.log("not access");
          }
        }
      } else if (instance && provider.type === 2) {
        try {
          state.account = await getAccount(instance);
        } catch (_) {
          error = 2;
        }
      }
      if (error > 0) {
        state.error = error;
        state.isReady = false;
        return false;
      } else {
        state.isReady = true;
        state.error = null;
        return instance;
      }
    }
  } catch (e) {
    console.log(e);
  }
}

export async function accessAccount() {
  const instance = state.getWeb3();
  const typeProvider = state.typeProvider;
  let error = 0;
  if (instance && typeProvider === 1) {
    if (await accountAccess()) {
      try {
        state.account = await getAccount(instance);
      } catch (_) {
        error = 2;
      }
    } else {
      error = 3;
      console.log("not access");
    }
  } else if (instance && typeProvider === 2) {
    try {
      state.account = await getAccount(instance);
    } catch (_) {
      error = 2;
    }
  }
  if (error > 0) {
    state.error = error;
    state.isReady = false;
    return false;
  } else {
    state.isReady = true;
    state.error = null;
    return instance;
  }
}
