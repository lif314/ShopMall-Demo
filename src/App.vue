<template>
  <div>
    <Header/>
<!-- 书写路由组件出口的地方 -->
      <router-view></router-view>
    <Footer/>
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
};
</script>

<style>
</style>
