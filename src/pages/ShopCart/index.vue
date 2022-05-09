<template>
  <div class="cart">
    <h4>全部商品</h4>
    <div class="cart-main">
      <div class="cart-th">
        <div class="cart-th1">全部</div>
        <div class="cart-th2">商品</div>
        <div class="cart-th3">单价（元）</div>
        <div class="cart-th4">数量</div>
        <div class="cart-th5">小计（元）</div>
        <div class="cart-th6">操作</div>
      </div>
      <div class="cart-body">
        <ul class="cart-list" v-for="item in cartInfoList" :key="item.id">
          <li class="cart-list-con1">
            <input
              type="checkbox"
              name="chk_list"
              :checked="item.isChecked == 1"
              @change="updateCartStatus(item.skuId, $event)"
            />
          </li>
          <li class="cart-list-con2">
            <img :src="item.imgUrl" />
            <div class="item-msg">{{ item.skuName }}</div>
          </li>
          <!-- <li class="cart-list-con3">
            <div class="item-txt">语音升级款</div>
          </li> -->
          <li class="cart-list-con4">
            <span class="price">{{ item.skuPrice }}</span>
          </li>
          <!-- 商品数量 -->
          <li class="cart-list-con5">
            <a class="mins" @click="handler('minus', -1, item)">-</a>
            <input
              autocomplete="off"
              type="text"
              :value="item.skuNum"
              minnum="1"
              class="itxt"
              @change="handler('change', $event.target.value * 1, item)"
            />
            <a class="plus" @click="handler('add', 1, item)">+</a>
          </li>

          <li class="cart-list-con6">
            <span class="sum">{{ item.skuPrice * item.skuNum }}</span>
          </li>
          <li class="cart-list-con7">
            <button @click="deleteCart(item.skuId)" class="sindelet">
              删除
            </button>
            <br />
            <a href="#none">移到收藏</a>
          </li>
        </ul>
      </div>
    </div>
    <div class="cart-tool">
      <div class="select-all">
        <input
          class="chooseAll"
          type="checkbox"
          @click="updateAllChecked"
          :checked="total.allChecked && cartInfoList.length != 0"
        />
        <span>全选</span>
      </div>
      <div class="option">
        <button @click="deleteAllCheckedCart">删除选中的商品</button>
        <button>移到我的关注</button>
        <button>清除下柜商品</button>
      </div>
      <div class="money-box">
        <div class="chosed">
          已选择 <span>{{ total.checkedNum }}</span
          >件商品
        </div>
        <div class="sumprice">
          <em>总价（不含运费） ： </em>
          <i class="summoney">￥ {{ total.checkedPrice }}</i>
        </div>
        <div class="sumbtn">
          <router-link  class="sum-btn" to="/trade">结算</router-link>
          <!-- <a class="sum-btn" href="###" target="_blank">结算</a> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import throttle from "lodash/throttle";

export default {
  name: "ShopCart",
  mounted() {
    this.getData();
  },
  computed: {
    ...mapGetters(["cartList"]),
    cartInfoList() {
      return this.cartList.cartInfoList || [];
    },
    // 计算勾选的产品总价和产品总数
    total() {
      let checkedPrice = 0;
      let checkedNum = 0;
      let allChecked = 1;
      this.cartInfoList.forEach((element) => {
        if (element.isChecked === 1) {
          checkedNum += element.skuNum;
          checkedPrice += element.skuPrice * element.skuNum;
        } else {
          allChecked = 0;
        }
      });
      return { allChecked, checkedPrice, checkedNum };
    },
  },
  methods: {
    getData() {
      this.$store.dispatch("getCartList");
    },
    // 全选操作
    async updateAllChecked(event) {
      try {
        let checked = event.target.checked? '1' : '0'
        await this.$store.dispatch("updateAllChecked", {isChecked: checked});
        // 重新获取商品列表
        this.getData();
      } catch (error) {
        console.log(error.message);
      }
    },
    // 删除选中的商品
    async deleteAllCheckedCart() {
      try {
        await this.$store.dispatch("deleteAllCheckedCart");
        // 重新获取商品列表
        this.getData();
      } catch (error) {
        console.log(error.message);
      }
    },
    // 更新商品选择状态
    async updateCartStatus(skuId, event) {
      let isChecked = event.target.checked ? 1 : 0;
      try {
        await this.$store.dispatch("updateCartStatus", { skuId, isChecked });
        this.getData();
      } catch (error) {
        console.log(error.message);
      }
    },
    // 删除商品  节流
    deleteCart: throttle(async function (skuId) {
      try {
        await this.$store.dispatch("deleteCartListBySkuId", { skuId });
        this.getData();
      } catch (error) {
        console.log(error.message);
      }
    }, 20),
    // 更新购物车中商品数量
    //修改某一个产品的个数[节流]
    handler: throttle(async function (type, disNum, cart) {
      //type:为了区分这三个元素
      //disNum形参:+ 变化量（1）  -变化量（-1）   input最终的个数（并不是变化量）
      //cart:哪一个产品【身上有id】
      //向服务器发请求，修改数量
      switch (type) {
        //加号
        case "add":
          disNum = 1;
          break;
        case "minus":
          //判断产品的个数大于1，才可以传递给服务器-1
          //如果出现产品的个数小于等于1，传递给服务器个数0（原封不动）
          disNum = cart.skuNum > 1 ? -1 : 0;
          break;
        case "change":
          // //用户输入进来的最终量，如果非法的（带有汉字|出现负数），带给服务器数字零
          if (isNaN(disNum) || disNum < 1) {
            // 此时不应该发送请求
            disNum = 0;
          } else {
            //属于正常情况（小数：取证），带给服务器变化的量 用户输入进来的 - 产品的起始个数
            disNum = parseInt(disNum) - cart.skuNum;
          }
          // disNum = (isNaN(disNum)||disNum<1)?0:parseInt(disNum) - cart.skuNum;
          break;
      }
      //派发action
      try {
        //代表的是修改成功
        await this.$store.dispatch("addOrUpdateShopCart", {
          skuId: cart.skuId,
          skuNum: disNum,
        });
        //再一次获取服务器最新的数据进行展示
        this.getData();
      } catch (error) {}
    }, 50),
  },
};
</script>

<style lang="less" scoped>
button {
  margin-left: 10px;
}
.cart {
  width: 1200px;
  margin: 0 auto;

  h4 {
    margin: 9px 0;
    font-size: 14px;
    line-height: 21px;
  }

  .cart-main {
    .cart-th {
      background: #f5f5f5;
      border: 1px solid #ddd;
      padding: 10px;
      overflow: hidden;

      & > div {
        float: left;
      }

      .cart-th1 {
        width: 25%;

        input {
          vertical-align: middle;
        }

        span {
          vertical-align: middle;
        }
      }

      .cart-th2 {
        width: 25%;
      }

      .cart-th3,
      .cart-th4,
      .cart-th5,
      .cart-th6 {
        width: 12.5%;
      }
    }

    .cart-body {
      margin: 15px 0;
      border: 1px solid #ddd;

      .cart-list {
        padding: 10px;
        border-bottom: 1px solid #ddd;
        overflow: hidden;

        & > li {
          float: left;
        }

        .cart-list-con1 {
          width: 15%;
        }

        .cart-list-con2 {
          width: 35%;

          img {
            width: 82px;
            height: 82px;
            float: left;
          }

          .item-msg {
            float: left;
            width: 150px;
            margin: 0 10px;
            line-height: 18px;
          }
        }

        // .cart-list-con3 {
        //   width: 2%;

        //   .item-txt {
        //     text-align: center;
        //   }
        // }

        .cart-list-con4 {
          width: 10%;
        }

        .cart-list-con5 {
          width: 17%;

          .mins {
            border: 1px solid #ddd;
            border-right: 0;
            float: left;
            color: #666;
            width: 6px;
            text-align: center;
            padding: 8px;
          }

          input {
            border: 1px solid #ddd;
            width: 40px;
            height: 33px;
            float: left;
            text-align: center;
            font-size: 14px;
          }

          .plus {
            border: 1px solid #ddd;
            border-left: 0;
            float: left;
            color: #666;
            width: 6px;
            text-align: center;
            padding: 8px;
          }
        }

        .cart-list-con6 {
          width: 10%;

          .sum {
            font-size: 16px;
          }
        }

        .cart-list-con7 {
          width: 13%;

          a {
            color: #666;
          }
        }
      }
    }
  }

  .cart-tool {
    overflow: hidden;
    border: 1px solid #ddd;

    .select-all {
      padding: 10px;
      overflow: hidden;
      float: left;

      span {
        vertical-align: middle;
      }

      input {
        vertical-align: middle;
      }
    }

    .option {
      padding: 10px;
      overflow: hidden;
      float: left;

      a {
        float: left;
        padding: 0 10px;
        color: #666;
      }
    }

    .money-box {
      float: right;

      .chosed {
        line-height: 26px;
        float: left;
        padding: 0 10px;
      }

      .sumprice {
        width: 200px;
        line-height: 22px;
        float: left;
        padding: 0 10px;

        .summoney {
          color: #c81623;
          font-size: 16px;
        }
      }

      .sumbtn {
        float: right;

        a {
          display: block;
          position: relative;
          width: 96px;
          height: 52px;
          line-height: 52px;
          color: #fff;
          text-align: center;
          font-size: 18px;
          font-family: "Microsoft YaHei";
          background: #e1251b;
          overflow: hidden;
        }
      }
    }
  }
}
</style>