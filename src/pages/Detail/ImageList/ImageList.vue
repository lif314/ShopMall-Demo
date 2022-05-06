<template>
  <div class="swiper-container" ref="mySwiper">
    <div class="swiper-wrapper">
      <div class="swiper-slide" v-for="(image,index) in skuImageList" :key="image.id">
        <img 
        :src="image.imgUrl"
        :class="{active: currentIndex == index}"
        @click="changeCurIndex(index)"
        />
      </div>
    </div>
    <div class="swiper-button-next"></div>
    <div class="swiper-button-prev"></div>
  </div>
</template>

<script>
import Swiper from "swiper";
export default {
  name: "ImageList",
  props: ["skuImageList"],
  data() {
    return {
      currentIndex: 0
    }
  },
  methods: {
    changeCurIndex(index){
      this.currentIndex = index;
      // 点击后，给兄弟组件 Zoom发送信息
      this.$bus.$emit('getIndex', this.skuImageList[index].imgUrl)
    }
  },
  watch: {
    skuImageList(newValue, oldValue) {
      this.$nextTick(() => {
        // Vue中使用ref获取DOM节点
        new Swiper(this.$refs.mySwiper, {
          // loop: true,
          // 设置容器中同时显示几张图片
          slidesPerView: 3,
          // 每一次切换图片的个数
          slidesPerGroup: 3,
          // 如果需要前进后退按钮
          navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
          },
        });
      });
    },
  },
};
</script>

<style lang="less" scoped>
.swiper-container {
  height: 56px;
  width: 412px;
  box-sizing: border-box;
  padding: 0 12px;

  .swiper-slide {
    width: 56px;
    height: 56px;

    img {
      width: 100%;
      height: 100%;
      border: 1px solid #ccc;
      padding: 2px;
      width: 50px;
      height: 50px;
      display: block;

      &.active {
        border: 2px solid #f60;
        padding: 1px;
      }

      // &:hover {
      //   border: 2px solid #f60;
      //   padding: 1px;
      // }
    }
  }

  .swiper-button-next {
    left: auto;
    right: 0;
  }

  .swiper-button-prev {
    left: 0;
    right: auto;
  }

  .swiper-button-next,
  .swiper-button-prev {
    box-sizing: border-box;
    width: 12px;
    height: 56px;
    background: rgb(235, 235, 235);
    border: 1px solid rgb(204, 204, 204);
    top: 0;
    margin-top: 0;
    &::after {
      font-size: 12px;
    }
  }
}
</style>