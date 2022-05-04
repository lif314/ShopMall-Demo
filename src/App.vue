<template>
  <div>
    <Header />
    <!-- 书写路由组件出口的地方 -->
    <router-view></router-view>
    <!-- 在Home Search时是显示的，在登录、注册时时隐藏的 -->
    <!-- <Footer v-show="$route.path=='/home' || $route.path=='/search'"/> -->
    <!-- 使用路由元信息 -->
    <Footer v-show="$route.meta.isFooterShow"/>
  </div>
</template>

<script>
import Header from "./components/Header/";
import Footer from "./components/Footer/";

export default {
  name: "App",
  components: {
    Header,
    Footer,
  },
  mounted() {
    // this就是vm  数据请求放在App中，根组件指挥执行一次，之后所有数据从仓库中拿
    this.$store.dispatch("categoryList");
  },
};
</script>

<style>
</style>
