<template>
  <div
    id="app"
    :style="{
      '--themeColor': form.themeColor.hex,
      '--shadowColor': `rgba(${form.themeColor.rgba.r},${form.themeColor.rgba.g},${form.themeColor.rgba.b},0.1)`,
    }"
  >
    <img class="logo" alt="Vue logo" src="./assets/logo.svg" />
    <CityData />
  </div>
</template>

<script>
import CityData from './components/CityData';

export default {
  name: 'App',
  components: { CityData },
  data() {
    return {
      form: {
        themeColor: {
          hsl: { h: 200, s: 0, l: 0, a: 1 },
          hex: '#000000',
          hex8: '#000000FF',
          rgba: { r: 0, g: 0, b: 0, a: 1 },
          hsv: { h: 200, s: 0, v: 0, a: 1 },
          oldHue: 200,
          source: 'hex',
          a: 1,
        },
        fontSize: 28,
      },
    };
  },
  methods: {
    closeMenuAndFloating() {
      this.$refs.floatBtn.closeMenuAndFloating();
    },
  },
};
</script>

<style lang="scss">
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  li {
    list-style: none;
  }
}
a {
  text-decoration: none;
}
html,
body {
  height: 100%;
  .select-option {
    display: none !important;
  }
}

.logo {
  width: 150px;
  height: 140px;
  object-fit: contain;
}

#app {
  font-family: 'SourceHanSansCN-Medium', 'SourceHanSansCN', 'Avenir', Helvetica,
    Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #333;
  font-size: 14px;
  overflow: hidden;
  text-align: center;
}
</style>
