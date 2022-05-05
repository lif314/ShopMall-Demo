<template>
  <!-- 商品分类导航 -->
  <div class="type-nav">
    <div class="container">
      <!-- 事件委派 -->
      <div @mouseleave="leaveIndex" @mouseenter="enterShow">
        <h2 class="all">全部商品分类</h2>
        <!-- Search模块中提供过度动画 -->
        <transition name="sort" appear>
          <div class="sort" v-show="isShow">
            <!-- 事件委派 -->
            <div class="all-sort-list2" @click="goSearch">
              <div
                class="item"
                v-for="(c1, index) in categoryList"
                :key="c1.categoryId"
                :class="{ cur: currentIndex == index }"
              >
                <h3 @mouseenter="changeIndex(index)">
                  <!-- 会创建多个事件回调 -->
                  <a
                    :data-categoryName="c1.categoryName"
                    :data-category1Id="c1.categoryId"
                    >{{ c1.categoryName }}</a
                  >
                  <!-- router-link 会出现卡顿现象：创建组件然后解析，很耗内存 -->
                  <!-- <router-link to="/search">{{ c1.categoryName }}</router-link> -->
                </h3>
                <!-- 二、三级分类 -->
                <div
                  class="item-list clearfix"
                  :style="{ display: currentIndex == index ? 'block' : 'none' }"
                >
                  <div
                    class="subitem"
                    v-for="c2 in c1.categoryChild"
                    :key="c2.categoryId"
                  >
                    <dl class="fore">
                      <dt>
                        <a
                          :data-categoryName="c2.categoryName"
                          :data-category2Id="c2.categoryId"
                          >{{ c2.categoryName }}</a
                        >
                        <!-- <router-link to="/search">{{ c2.categoryName }}</router-link> -->
                      </dt>
                      <dd>
                        <em v-for="c3 in c2.categoryChild" :key="c3.categoryId">
                          <a
                            :data-categoryName="c3.categoryName"
                            :data-category3Id="c3.categoryId"
                            >{{ c3.categoryName }}</a
                          >
                          <!-- <router-link to="/search">{{ c3.categoryName }}</router-link> -->
                        </em>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </transition>
      </div>
      <nav class="nav">
        <a href="###">服装城</a>
        <a href="###">美妆馆</a>
        <a href="###">尚品汇超市</a>
        <a href="###">全球购</a>
        <a href="###">闪购</a>
        <a href="###">团购</a>
        <a href="###">有趣</a>
        <a href="###">秒杀</a>
      </nav>
    </div>
  </div>
</template>

<script>
// 从state中获取数据
import { mapState } from "vuex";
import throttle from "lodash/throttle"; // 防抖与节流

export default {
  name: "TypeNav",
  data() {
    return {
      // 给一级分类添加点击效果
      currentIndex: -1,
      isShow: true,
    };
  },
  methods: {
    // 路由跳转：事件委派+编程式路由
    // 事件委派：子节点dt em等委托给父节点
    goSearch(event) {
      // 给a标签添加自定义属性
      // 获取当前触发事件的节点 event
      let element = event.target;
      // 节点有一个dataset属性，可以获取节点的自定义属性
      let { categoryname, category1id, category2id, category3id } =
        element.dataset;
      if (categoryname) {
        let location = { name: "search" };
        let query = { categoryName: categoryname };
        if (category1id) {
          query.category1Id = category1id;
        } else if (category2id) {
          query.category2Id = category2id;
        } else {
          query.category3Id = category3id;
        }
        // 发送，路由跳转 -- 只有query参数
        location.query = query;
        // 如果存在params参数，则需要加上
        if(this.$route.params){
          location.params = this.$route.params
        }
        this.$router.push(location);
      }
    },
    // changeIndex(index) {
    // 获取当前的元素
    // 正常情况下(用户慢慢的操作):鼠标进入，每一个一级分类都会触发鼠标事件
    // 非正常情况下(用户操作很快)：本身全部的一级分类都应该触发鼠标事件，但是经过测试，只有部分触发了
    // 有可能出现卡顿现象
    // 函数的节流与防抖
    /**
     * 节流：在规定的间隔时间范围内不会重复触发回调，只有大于这个时间间隔才会触发回调，把频繁触发变为少量触发
     *  防抖：前面的所有的触发都被取消，最后一次执行在规定的时间之后才会触发，也就是说如果连续快速的触发·只会执行一次
     *
     * lodash.js插件 防抖与节流
     */
    // this.currentIndex = index;
    // },
    // ES5的写法 throttle不要使用箭头函数
    changeIndex: throttle(function (index) {
      this.currentIndex = index;
    }, 50),
    // 鼠标移除
    leaveIndex() {
      this.currentIndex = -1;
      // 如果search模块中，鼠标移除需要隐藏三级分类
      if (this.$route.path != "/home") {
        this.isShow = false;
      }
    },
    // search模块中，当鼠标移入时显示三级分类
    enterShow() {
      if (this.$route.path != "/home") {
        this.isShow = true;
      }
    },
  },
  // 组件挂在完毕获取数据，存储在仓库中
  mounted() {
    // this.$store.dispatch("categoryList");
    // 当组件挂在完毕
    if (this.$route.path != "/home") {
      this.isShow = false;
    }
  },
  // 获取仓库中的数据
  computed: {
    ...mapState({
      // 对象写法：右侧需要一个函数。当使用这个计算属性的时候，右侧函数会立即执行一次
      // 注入一个参数state,其实就是大仓库中的数据，包括home和search
      categoryList: (state) => {
        return state.home.categoryList;
      },
    }),
  },
};
</script>

<style scoped lang="less">
.type-nav {
  border-bottom: 2px solid #e1251b;

  .container {
    width: 1200px;
    margin: 0 auto;
    display: flex;
    position: relative;

    .all {
      width: 210px;
      height: 45px;
      background-color: #e1251b;
      line-height: 45px;
      text-align: center;
      color: #fff;
      font-size: 14px;
      font-weight: bold;
    }

    .nav {
      a {
        height: 45px;
        margin: 0 22px;
        line-height: 45px;
        font-size: 16px;
        color: #333;
      }
    }

    .sort {
      position: absolute;
      left: 0;
      top: 45px;
      width: 210px;
      height: 461px;
      position: absolute;
      background: #fafafa;
      z-index: 999;

      .all-sort-list2 {
        .item {
          h3 {
            line-height: 30px;
            font-size: 14px;
            font-weight: 400;
            overflow: hidden;
            padding: 0 20px;
            margin: 0;

            a {
              color: #333;
            }
          }

          .item-list {
            display: none;
            position: absolute;
            width: 734px;
            min-height: 460px;
            background: #f7f7f7;
            left: 210px;
            border: 1px solid #ddd;
            top: 0;
            z-index: 9999 !important;

            .subitem {
              float: left;
              width: 650px;
              padding: 0 4px 0 8px;

              dl {
                border-top: 1px solid #eee;
                padding: 6px 0;
                overflow: hidden;
                zoom: 1;

                &.fore {
                  border-top: 0;
                }

                dt {
                  float: left;
                  width: 54px;
                  line-height: 22px;
                  text-align: right;
                  padding: 3px 6px 0 0;
                  font-weight: 700;
                }

                dd {
                  float: left;
                  width: 415px;
                  padding: 3px 0 0;
                  overflow: hidden;

                  em {
                    float: left;
                    height: 14px;
                    line-height: 14px;
                    padding: 0 8px;
                    margin-top: 5px;
                    border-left: 1px solid #ccc;
                  }
                }
              }
            }
          }

          // &:hover {
          //   .item-list {
          //     display: block;
          //   }
          // }
        }

        .cur {
          background-color: skyblue;
        }
      }
    }

    // 添加过渡动画
    .sort-enter{
      // 进入开始状态
      height: 0px;
    }
    .sort-leave{
      // 离开状态
      height: 461px;
    }
    .sort-enter-active{
      transition: all .5s linear;
    }

  }
}
</style>