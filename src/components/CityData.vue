<template>
  <div ref="page" class="data">
    <div class="table-content">
      <el-table :data="provinces" border>
        <el-table-column prop="name" label="provinces" width="180">
        </el-table-column>
        <el-table-column prop="confirmedNum" label="cases" width="180">
        </el-table-column>
        <el-table-column prop="deathsNum" label="deaths" width="180">
        </el-table-column>
      </el-table>
    </div>
    <LineChart :barYData="yData" :barData="handleData"></LineChart>
  </div>
</template>
<script>
import LineChart from './LineChart';
import axios from 'axios';
export default {
  name: 'city-data',
  props: {
    form: Object,
  },
  components: { LineChart },
  data() {
    return {
      provinces: [],
      handleData: {
        cases: {
          name: 'cases',
          type: 'bar',
          // stack: 'total',
          // label: {
          //   show: true,
          // },
          // emphasis: {
          //   focus: 'series',
          // },
          data: [],
        },
        deaths: {
          name: 'deaths',
          type: 'bar',
          // stack: 'total',
          // label: {
          //   show: true,
          // },
          // emphasis: {
          //   focus: 'series',
          // },
          data: [],
        },
      },
      yData: [],
    };
  },
  created() {},
  mounted() {
    this.getData();
  },
  methods: {
    async getCityName(name) {
      const { data } = await axios({
        method: 'get',
        url: '/translate',
        crossdomain: true,
        params: {
          text: name,
        },
      });
      return data.data.translations[0].translatedText;
    },
    getData() {
      return new Promise((resolve, reject) => {
        axios({
          method: 'get',
          url: '/info',
          crossdomain: true,
          params: {
            forum_id: 1656784762444839,
          },
        })
          .then(async (res) => {
            res.data.provinces.forEach(async (item) => {
              const cityName = await this.getCityName(item.name);
              item.name = cityName;
              this.yData.push(cityName);
            });
            await this.$nextTick();
            this.provinces = res.data.provinces;
            var deaths = [];
            var cases = [];
            this.provinces.forEach((item) => {
              // this.yData.push(item.name);
              cases.push(item.confirmedNum);
              deaths.push(item.deathsNum);
            });
            this.yData = this.yData.reverse();
            cases = cases.reverse();
            deaths = deaths.reverse();
            this.$set(this.handleData['cases'], 'data', cases);
            this.$set(this.handleData['deaths'], 'data', deaths);
            // console.log(provinces);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.data {
  padding: 20px;
}
</style>
