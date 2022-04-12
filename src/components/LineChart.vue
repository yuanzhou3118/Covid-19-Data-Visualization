<template>
  <div class="bar_content">
    <div ref="bar_chart" class="bar_chart" id="bar_chart"></div>
  </div>
</template>

<script>
const echarts = require('echarts');
// import echarts from 'echarts';
export default {
  name: 'operationBar',
  props: {
    barYData: {
      type: Array,
      default: function() {
        return [];
      },
    },
    barData: {
      type: Object,
      default: function() {
        return {};
      },
    },
  },
  data() {
    return {
      operationBarcharts: null,
    };
  },
  watch: {
    barYData() {
      if (this.operationBarcharts) {
        this.operationBarcharts.clear();
        this.getOperationbar();
      }
    },
    averageDurationData() {
      if (this.operationBarcharts) {
        this.operationBarcharts.clear();
        this.getOperationbar();
      }
    },
  },
  mounted() {
    this.getOperationbar();
    window.addEventListener('resize', this.resizeFunc);
  },
  methods: {
    getOperationbar() {
      if (this.barYData) {
        this.operationBarcharts = echarts.init(this.$refs.bar_chart);
        // var index = 0;
        let option = {
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              // Use axis to trigger tooltip
              type: 'shadow', // 'shadow' as default; can also be 'line' or 'shadow'
            },
          },
          legend: {},
          grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true,
          },
          xAxis: {
            type: 'value',
            boundaryGap: [0, 0.01],
          },
          yAxis: {
            type: 'category',
            data: this.barYData,
          },
          series: [this.barData.cases, this.barData.deaths],
        };

        this.operationBarcharts.setOption(option);
        console.log(option);
      }
    },
    resizeFunc() {
      if (this.operationBarcharts) {
        this.operationBarcharts.resize();
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.bar_content {
  position: relative;
  width: 100%;
  height: 100vh;
}
.bar_chart {
  position: absolute;
  padding: 16px 0;
  top: 40px;
  left: 60px;
  height: calc(100% - 40px);
  width: calc(100% - 136px);
  min-width: 168px;
}
</style>
