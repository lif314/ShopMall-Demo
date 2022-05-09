<template>
  <div>
    <TypeNav />
    <div class="main">
      <div class="py-container">
        <!--bread： 面包屑-->
        <div class="bread">
          <ul class="fl sui-breadcrumb">
            <li>
              <a href="#">全部结果</a>
            </li>
          </ul>
          <ul class="fl sui-tag">
            <!-- 分类面包屑 -->
            <li class="with-x" v-if="searchParams.categoryName">
              {{ searchParams.categoryName
              }}<i @click="removeCategoryName">x</i>
            </li>
            <!-- 关键字面包屑 -->
            <li class="with-x" v-if="searchParams.keyword">
              {{ searchParams.keyword }}<i @click="removeKeyword">x</i>
            </li>
            <!-- 品牌面包屑 -->
            <li class="with-x" v-if="searchParams.trademark">
              {{ searchParams.trademark.split(":")[1]
              }}<i @click="removeTrademark">x</i>
            </li>
            <!-- 平台售卖属性面包屑 -->
            <li
              class="with-x"
              v-for="(attr, index) in searchParams.props"
              :key="index"
            >
              {{ attr.split(":")[1] }}<i @click="removeAttrValue(index)">x</i>
            </li>
          </ul>
        </div>
        <!--selector-->
        <SearchSelector @trademarkInfo="trademarkInfo" @attrInfo="attrInfo"/>

        <!--details-->
        <div class="details clearfix">
          <div class="sui-navbar">
            <div class="navbar-inner filter">
              <ul class="sui-nav">
                <!-- 排序 -->
                <li :class="{active: !isOrder}">
                  <a  @click="changeSortItem('1')">综合 <span v-show="!isOrder"  :class="asc_desc"></span></a>
                </li>
                <li :class="{active: isOrder}" >
                  <a @click="changeSortItem('2')">价格<span v-show="isOrder" :class="asc_desc"></span></a>
                </li>
              </ul>
            </div>
          </div>
          <!-- 商品列表 -->
          <div class="goods-list">
            <ul class="yui3-g">
              <li class="yui3-u-1-5" v-for="goods in goodsList" :key="goods.id">
                <div class="list-wrap">
                  <div class="p-img">
                    <!-- 跳转到商品详情页 -->
                    <!-- 图片懒加载 -->
                    <router-link :to="`/detail/${goods.id}`">
                      <img v-lazy="goods.defaultImg"
                    /></router-link>
                  </div>
                  <div class="price">
                    <strong>
                      <em>¥ </em>
                      <i>{{ goods.price }}</i>
                    </strong>
                  </div>
                  <div class="attr">
                    <a
                      target="_blank"
                      href="item.html"
                      title="促销信息，下单即赠送三个月CIBN视频会员卡！【小米电视新品4A 58 火爆预约中】"
                      >{{ goods.title }}</a
                    >
                  </div>
                  <div class="commit">
                    <i class="command">已有<span>2000</span>人评价</i>
                  </div>
                  <div class="operate">
                    <a
                      href="success-cart.html"
                      target="_blank"
                      class="sui-btn btn-bordered btn-danger"
                      >加入购物车</a
                    >
                    <a href="javascript:void(0);" class="sui-btn btn-bordered"
                      >收藏</a
                    >
                  </div>
                </div>
              </li>
            </ul>
          </div>
          <!-- 分页器 -->
          <Pagination :pageNo="searchParams.pageNo" :pageSize="searchParams.pageSize" :total="total" :continues="5" @getPageNo='getPageNo'/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapState } from "vuex";
import SearchSelector from "./SearchSelector/SearchSelector";

export default {
  name: "Search",
  components: {
    SearchSelector
  },
  data() {
    return {
      // 查询参数
      searchParams: {
        // 分类id
        category1Id: "",
        category2Id: "",
        category3Id: "",
        // 分类名字
        categoryName: "",
        // 搜索关键词
        keyword: "",
        // 排序方式
        order: "1:desc",  // 1表示综合  降序  2 表示价格
        // 分页参数
        pageNo: 1,
        pageSize: 10,
        // 属性查询
        props: [], // 商品属性的数组: ["属性ID:属性值:属性名"]示例: ["2:6.0～6.24英寸:屏幕尺寸"]
        // 品牌信息
        trademark: "",
      },
    };
  },
  beforeMount() {
    // 发请求之前获取参数数据
    // ES6合并对象
    Object.assign(this.searchParams, this.$route.query, this.$route.params);
    // console.log(this.searchParams)
  },
  mounted() {
    // 组件挂载完毕，mounted中只会查询一次
    this.getSearchData(); // 挂载时查询一次
  },
  computed: {
    // getters不区分模块：传递的是数组，没有划分模块
    ...mapGetters(["goodsList"]),
    // 是否是价格排序
    isOrder(){
      return this.searchParams.order.indexOf('2')!=-1
    },
    // 是否是降序排列
    isDesc(){
        return this.searchParams.order.indexOf('desc')!=-1
    },
    // 排序方式，排序方式
    asc_desc(){
      return this.isDesc ? 'iconfont icon-jiantou_xiangxia':'iconfont icon-jiantou_xiangshang'
    },
    ...mapState({
      total: state=>state.search.searchList.total
    })

  },
  methods: {
    // 获取当前点击的页
    getPageNo(no){
      // 自定义事件的回调函数
        this.searchParams.pageNo = no
        this.getSearchData()
    },
    // 排序点击事件
    changeSortItem(flag){
      // flag 1 点击综合， 2 点击价格
      if(flag === '1'){
          // 综合排序
          let sort = this.searchParams.order.indexOf('desc') != -1?'asc':'desc';
          this.searchParams.order = '1:' + sort;
          // 重新发送请求
          this.getSearchData();
      }else{
        // 价格排序
        let sort = this.searchParams.order.indexOf('desc') != -1?'asc':'desc';
         this.searchParams.order = '2:' + sort;
          // 重新发送请求
          this.getSearchData();
      }
    },
    // 获取搜索数据
    getSearchData() {
      this.$store.dispatch("getSearchList", this.searchParams);
    },
    // 分类面包屑清除
    removeCategoryName() {
      this.searchParams.categoryName = undefined;
      // 还需要发送请求
      this.getSearchData();
      this.searchParams.category1Id = undefined; // undefined的数据不会传送给服务器
      this.searchParams.category2Id = undefined;
      this.searchParams.category3Id = undefined;
      // 修改地址栏：进行路由跳转
      // 面包屑是query参数，关键词是prams参数，所以可以把params参数加上
      if (this.$route.params) {
        this.$router.push({ name: "search", params: this.$route.params });
      }
    },
    // 关键字面包屑清除
    removeKeyword() {
      this.searchParams.keyword = undefined;
      // 文本框中关键字置空  Header和Search组件：兄弟组件通信
      // 再次发送请求
      this.getSearchData();
      // 触发事件
      this.$bus.$emit("removeKeyword");
      // 清除params参数
      if (this.$route.query) {
        // 一直true，可以直接跳，注意逻辑
        this.$router.push({ name: "search", query: this.$route.query });
      }
    },
    // 移除品牌面包屑
    removeTrademark() {
      // 品牌置空
      this.searchParams.trademark = undefined;
      // 再次发送发请求
      this.getSearchData();
    },
    // 移除平台属性面包屑
    removeAttrValue(index) {
      this.searchParams.props.splice(index, 1);
      // 再次发送发请求
      this.getSearchData();
    },
    // 查询属性参数 子组件向父组件传递参数
    trademarkInfo(trademark) {
      // 自定义之间回调
      // console.log("属性", trademark)
      // 整理品牌字段参数 "ID:字段名"
      this.searchParams.trademark = `${trademark.tmId}:${trademark.tmName}`;
      // 再次发送请求获取数据
      this.getSearchData();
    },
    // 平台属性
    attrInfo(attrInfo) {
      // console.log(attrInfo)
      // 需要进行数据去重
      if (this.searchParams.props.indexOf(attrInfo) === -1) {
        this.searchParams.props.push(attrInfo);
        //发送请求
        this.getSearchData();
      }
    },
  },
  watch: {
    // 监听路由的变化：一旦路由变化，则需要发送请求
    $route(newValue, oldValue) {
      // 不需要深度监听，只要可以监听到就可以了
      // console.log(newValue, oldValue);
      // 重新合并参
      Object.assign(this.searchParams, this.$route.query, this.$route.params);
      // console.log(this.searchParams);
      this.getSearchData();
      // 每一次请求完毕，初始化参数信息
      // 分类名字和keyword不用置空，因为每次路由变化都会发生变化
      // 如果当前字段可有可无，则可以将字段置为undefined，则不会传给服务器
      this.searchParams.category1Id = undefined;
      this.searchParams.category2Id = undefined;
      this.searchParams.category3Id = undefined;
    },
  },
};
</script>

<style lang="less" scoped>
.main {
  margin: 10px 0;

  .py-container {
    width: 1200px;
    margin: 0 auto;

    .bread {
      margin-bottom: 5px;
      overflow: hidden;

      .sui-breadcrumb {
        padding: 3px 15px;
        margin: 0;
        font-weight: 400;
        border-radius: 3px;
        float: left;

        li {
          display: inline-block;
          line-height: 18px;

          a {
            color: #666;
            text-decoration: none;

            &:hover {
              color: #4cb9fc;
            }
          }
        }
      }

      .sui-tag {
        margin-top: -5px;
        list-style: none;
        font-size: 0;
        line-height: 0;
        padding: 5px 0 0;
        margin-bottom: 18px;
        float: left;

        .with-x {
          font-size: 12px;
          margin: 0 5px 5px 0;
          display: inline-block;
          overflow: hidden;
          color: #000;
          background: #f7f7f7;
          padding: 0 7px;
          height: 20px;
          line-height: 20px;
          border: 1px solid #dedede;
          white-space: nowrap;
          transition: color 400ms;
          cursor: pointer;

          i {
            margin-left: 10px;
            cursor: pointer;
            font: 400 14px tahoma;
            display: inline-block;
            height: 100%;
            vertical-align: middle;
          }

          &:hover {
            color: #28a3ef;
          }
        }
      }
    }

    .details {
      margin-bottom: 5px;

      .sui-navbar {
        overflow: visible;
        margin-bottom: 0;

        .filter {
          min-height: 40px;
          padding-right: 20px;
          background: #fbfbfb;
          border: 1px solid #e2e2e2;
          padding-left: 0;
          border-radius: 0;
          box-shadow: 0 1px 4px rgba(0, 0, 0, 0.065);

          .sui-nav {
            position: relative;
            left: 0;
            display: block;
            float: left;
            margin: 0 10px 0 0;

            li {
              float: left;
              line-height: 18px;

              a {
                display: block;
                cursor: pointer;
                padding: 11px 15px;
                color: #777;
                text-decoration: none;
              }

              &.active {
                a {
                  background: #e1251b;
                  color: #fff;
                }
              }
            }
          }
        }
      }

      .goods-list {
        margin: 20px 0;

        ul {
          display: flex;
          flex-wrap: wrap;

          li {
            height: 100%;
            width: 20%;
            margin-top: 10px;
            line-height: 28px;

            .list-wrap {
              .p-img {
                padding-left: 15px;
                width: 215px;
                height: 255px;

                a {
                  color: #666;

                  img {
                    max-width: 100%;
                    height: auto;
                    vertical-align: middle;
                  }
                }
              }

              .price {
                padding-left: 15px;
                font-size: 18px;
                color: #c81623;

                strong {
                  font-weight: 700;

                  i {
                    margin-left: -5px;
                  }
                }
              }

              .attr {
                padding-left: 15px;
                width: 85%;
                overflow: hidden;
                margin-bottom: 8px;
                min-height: 38px;
                cursor: pointer;
                line-height: 1.8;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 2;

                a {
                  color: #333;
                  text-decoration: none;
                }
              }

              .commit {
                padding-left: 15px;
                height: 22px;
                font-size: 13px;
                color: #a7a7a7;

                span {
                  font-weight: 700;
                  color: #646fb0;
                }
              }

              .operate {
                padding: 12px 15px;

                .sui-btn {
                  display: inline-block;
                  padding: 2px 14px;
                  box-sizing: border-box;
                  margin-bottom: 0;
                  font-size: 12px;
                  line-height: 18px;
                  text-align: center;
                  vertical-align: middle;
                  cursor: pointer;
                  border-radius: 0;
                  background-color: transparent;
                  margin-right: 15px;
                }

                .btn-bordered {
                  min-width: 85px;
                  background-color: transparent;
                  border: 1px solid #8c8c8c;
                  color: #8c8c8c;

                  &:hover {
                    border: 1px solid #666;
                    color: #fff !important;
                    background-color: #666;
                    text-decoration: none;
                  }
                }

                .btn-danger {
                  border: 1px solid #e1251b;
                  color: #e1251b;

                  &:hover {
                    border: 1px solid #e1251b;
                    background-color: #e1251b;
                    color: white !important;
                    text-decoration: none;
                  }
                }
              }
            }
          }
        }
      }

      .page {
        width: 733px;
        height: 66px;
        overflow: hidden;
        float: right;

        .sui-pagination {
          margin: 18px 0;

          ul {
            margin-left: 0;
            margin-bottom: 0;
            vertical-align: middle;
            width: 490px;
            float: left;

            li {
              line-height: 18px;
              display: inline-block;

              a {
                position: relative;
                float: left;
                line-height: 18px;
                text-decoration: none;
                background-color: #fff;
                border: 1px solid #e0e9ee;
                margin-left: -1px;
                font-size: 14px;
                padding: 9px 18px;
                color: #333;
              }

              &.active {
                a {
                  background-color: #fff;
                  color: #e1251b;
                  border-color: #fff;
                  cursor: default;
                }
              }

              &.prev {
                a {
                  background-color: #fafafa;
                }
              }

              &.disabled {
                a {
                  color: #999;
                  cursor: default;
                }
              }

              &.dotted {
                span {
                  margin-left: -1px;
                  position: relative;
                  float: left;
                  line-height: 18px;
                  text-decoration: none;
                  background-color: #fff;
                  font-size: 14px;
                  border: 0;
                  padding: 9px 18px;
                  color: #333;
                }
              }

              &.next {
                a {
                  background-color: #fafafa;
                }
              }
            }
          }

          div {
            color: #333;
            font-size: 14px;
            float: right;
            width: 241px;
          }
        }
      }
    }
  }
}
</style>