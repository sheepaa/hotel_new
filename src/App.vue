<template>
  <div id="app">
    <router-view v-wechat-title="$route.meta.title"></router-view>
  </div>
</template>

<script>
  import HelloWorld from './components/HelloWorld.vue'

  export default {
    name: 'app',
    components: {
      HelloWorld
    },
    data() {
    return {};
  },
  created() {},
  mounted() {
    //窗口尺寸改变
    window.onresize = () => {
      return (() => {
        // this.$forceUpdate();//强制更新数据
        this.$router.go(0);
      })();
    };
  },
  methods: {},
  destroyed() {
    // 销毁
    window.onresize = null;
  },
  }
</script>

<style>
  
</style>
