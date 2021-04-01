<template>
  <div class="small">
    <highcharts :options="options" ref="chart"></highcharts>
  </div>
</template>

<script>
export default {
  props: ["log", "staked"],
  data() {
    return {
      datacollection: null,
      options: {
        title: false,
        chart: {
          type: "spline",
          height: 500,
        },
        xAxis: {
          title: {
            text: "Total staked",
          },
        },
        yAxis: {
          title: {
            text:
              "Weekly reward for each 1% in cumulative XRT/ETH & XRT/BUSD pools",
          },
        },
        tooltip: {
          shared: true,
          crosshairs: true,
          formatter: function () {
            return (
              "<b>staked</b> = " +
              Math.round(this.x) +
              " XRT<br /><b>reward</b> = " +
              Math.round(this.y) +
              " XRT per week<br />"
            );
          },
        },
        series: [],
      },
    };
  },
  mounted() {
    this.fillData();
  },
  watch: {
    log: function () {
      this.fillData();
    },
  },
  methods: {
    fillData() {
      const series = [
        {
          name:
            "Weekly reward for each 1% in cumulative XRT/ETH & XRT/BUSD pools",
          color: "#e8b738",
          lineWidth: 1,
          marker: { radius: 2 },
          data: this.log,
        },
        {
          name: "Total staked",
          color: "#3784d2",
          lineWidth: 1,
          marker: { radius: 8 },
          data: this.staked,
        },
      ];
      this.options.series = series;
    },
  },
};
</script>

<style>
.small {
  max-width: 1024px;
  height: 500px;
  margin: 0 auto;
}
</style>
