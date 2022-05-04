<template>
  <div class="swiper-container" ref="mySwiper">
    <div class="swiper-wrapper">
      <div class="swiper-slide" v-for="b in list" :key="b.id">
        <img :src="b.imgUrl" />
      </div>
    </div>
    <!-- 如果需要分页器 -->
    <div class="swiper-pagination"></div>

    <!-- 如果需要导航按钮 -->
    <div class="swiper-button-prev"></div>
    <div class="swiper-button-next"></div>
  </div>
</template>

<script>
// 引入轮播图插件
import Swiper from "swiper";
export default {
  name: "Carousel",
  props:['list'],
   watch: {
    // 监听bannerList数据变化
    list: {
      // 为了抽离组件加了属性
      immediate:true,
      // 执行handler说明banner中数据以及那个发生了变化 ，即已经存在数据
      handler(newValue, oldValue) {
        // bannerList已经存在数据的请款下，再初始化Swiper实例
        // 但此时依然无法保证v-for数据解析完整，DOM结构完善
        // 所以使用nextTick保证v-for已经解析完成
        // nextTick: 修改数据之后，循环结束之后。下次DOM更新，即v-for已经结束了，然后回调该函数
        this.$nextTick(() => {
          // document.querySelector(".swiper-container")
          // Vue中使用ref获取DOM节点
          var mySwiper = new Swiper(
            this.$refs.mySwiper,
            {
              loop: true,
              // 如果需要分页器
              pagination: {
                el: ".swiper-pagination",
                clickable: true,
              },
              // 如果需要前进后退按钮
              navigation: {
                nextEl: ".swiper-button-next",
                prevEl: ".swiper-button-prev",
              },
            }
          );
        });
      },
    },
  },

  
};
</script>

<style>
</style>