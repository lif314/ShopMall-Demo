<template>
  <div class="order-content">
    <div class="title">
      <h3>我的订单</h3>
    </div>
    <div class="chosetype">
      <table>
        <thead>
          <tr>
            <th width="29%">商品</th>
            <th width="31%">订单详情</th>
            <th width="13%">收货人</th>
            <th>金额</th>
            <th>状态</th>
            <th>操作</th>
          </tr>
        </thead>
      </table>
    </div>
    <div class="orders">
      <table class="order-item" v-for="(item, index) in orderList" :key="index">
        <thead>
          <tr>
            <th colspan="5">
              <span class="ordertitle"
                >{{ item.createTime }}　订单编号：{{ item.outTradeNo }}
                <span class="pull-right delete"
                  ><img src="./images/delete.png" /></span
              ></span>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(order, index) in item.orderDetailList" :key="index">
            <td width="60%">
              <div class="typographic">
                <img :src="order.imgUrl" style="width: 82px; height: 82px" />
                <a href="#" class="block-text">{{ order.skuName }}</a>
                <span>x{{ order.skuNum }}</span>
                <a href="#" class="service">售后申请</a>
              </div>
            </td>
            <td
              v-if="index == 0"
              :rowspan="item.orderDetailList.length"
              width="8%"
              class="center"
            >
              {{ item.consignee }}
            </td>
            <td
              v-if="index == 0"
              :rowspan="item.orderDetailList.length"
              width="13%"
              class="center"
            >
              <ul class="unstyled">
                <li>总金额¥ {{ item.totalAmount }}</li>
                <li>在线支付</li>
              </ul>
            </td>
            <td
              v-if="index == 0"
              :rowspan="item.orderDetailList.length"
              width="8%"
              class="center"
            >
              <a href="#" class="btn">{{ item.orderStatusName }} </a>
            </td>
            <td
              v-if="index == 0"
              :rowspan="item.orderDetailList.length"
              width="13%"
              class="center"
            >
              <ul class="unstyled">
                <li>
                  <a href="mycomment.html" target="_blank">评价|晒单</a>
                </li>
              </ul>
            </td>
          </tr>
        </tbody>
      </table>

      <!-- 固定订单数据 -->
      <table class="order-item">
        <thead>
          <tr>
            <th colspan="5">
              <span class="ordertitle"
                >2017-02-11 11:59　订单编号：7867473872181848
                <span class="pull-right delete"
                  ><img src="./images/delete.png" /></span
              ></span>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td width="60%">
              <div class="typographic">
                <img src="./images/goods.png" />
                <a href="#" class="block-text"
                  >包邮 正品玛姬儿压缩面膜无纺布纸膜100粒 送泡瓶面膜刷喷瓶
                  新款</a
                >
                <span>x1</span>
                <a href="#" class="service">售后申请</a>
              </div>
            </td>
            <td rowspan="2" width="8%" class="center">小丽</td>
            <td rowspan="2" width="13%" class="center">
              <ul class="unstyled">
                <li>总金额¥138.00</li>
                <li>在线支付</li>
              </ul>
            </td>
            <td rowspan="2" width="8%" class="center">
              <a href="#" class="btn">已完成 </a>
            </td>
            <td rowspan="2" width="13%" class="center">
              <ul class="unstyled">
                <li>
                  <a href="mycomment.html" target="_blank">评价|晒单</a>
                </li>
              </ul>
            </td>
          </tr>
          <tr>
            <td width="50%">
              <div class="typographic">
                <img src="./images/goods.png" />
                <a href="#" class="block-text"
                  >包邮 正品玛姬儿压缩面膜无纺布纸膜100粒 送泡瓶面膜刷喷瓶
                  新款</a
                >
                <span>x1</span>
                <a href="#" class="service">售后申请</a>
              </div>
            </td>
          </tr>
        </tbody>
      </table>

      <div class="choose-order">
        <!-- 分页器 -->
        <Pagination
          :pageNo="page"
          :pageSize="limit"
          :total="myAllOrders.total"
          :continues="5"
          @getPageNo="getPageNo"
        />
        <!-- <div class="pagination">
              <ul>
                <li class="prev disabled">
                  <a href="javascript:">«上一页</a>
                </li>
                <li class="page actived">
                  <a href="javascript:">1</a>
                </li>
                <li class="page">
                  <a href="javascript:">2</a>
                </li>
                <li class="page">
                  <a href="javascript:">3</a>
                </li>
                <li class="page">
                  <a href="javascript:">4</a>
                </li>

                <li class="next disabled">
                  <a href="javascript:">下一页»</a>
                </li>
              </ul>
              <div>
                <span>&nbsp;&nbsp;&nbsp;&nbsp;共2页&nbsp;</span>
              </div>
            </div> -->
      </div>
    </div>
  </div>
</template>

<script>
import { reqOrderList } from "@/api";

export default {
  name: "MyOrder",
  data() {
    return {
      page: 1,
      limit: 3,
      myAllOrders: [],
    };
  },
  mounted() {
    this.getOrderList();
  },
  computed: {
    orderList() {
      return this.myAllOrders.records;
    },
  },
  methods: {
    async getOrderList() {
      let res = await reqOrderList({ page: this.page, limit: this.limit });
      // console.log(res);
      if (res.code == 200) {
        this.myAllOrders = res.data;
      }
    },
    getPageNo(page){
      // 获取当前页码
      this.page = page;
      this.getOrderList();
    }
  },
};
</script>

<style scoped lang="less">
//订单部分
.order-content {
  margin: 0 20px;
  color: #666;

  //标题
  .title {
    margin-bottom: 22px;
    border: 1px solid #ddd;

    h3 {
      padding: 12px 10px;
      font-size: 15px;
      background-color: #f1f1f1;
    }
  }

  //表头
  .chosetype {
    margin-bottom: 15px;
    color: #666;

    table {
      border: 1px solid #e6e6e6;
      border-collapse: separate;
      border-radius: 2px;
      width: 100%;
      max-width: 100%;
      border-spacing: 0;

      th {
        padding: 6px 8px;
        color: #666;
        font-weight: 700;
        vertical-align: bottom;
        background-color: #f4f4f4;
        line-height: 18px;
        border-bottom: 1px solid #e6e6e6;
        font-size: 12px;
        text-align: left;
      }
    }
  }

  // 表单内容
  .orders {
    font-size: 12px;

    a {
      &:hover {
        color: #4cb9fc;
      }
    }

    table {
      border: 1px solid #e6e6e6;
      border-collapse: collapse;
      border-radius: 2px;
      width: 100%;
      margin-bottom: 18px;
      max-width: 100%;

      th {
        padding: 6px 8px;
        line-height: 18px;
        text-align: left;
        vertical-align: bottom;
        background-color: #f4f4f4;
        font-size: 12px;
        color: #666;

        .pull-right {
          float: right;
          cursor: pointer;

          img {
            margin-right: 10px;
            vertical-align: middle;
          }
        }
      }

      td {
        font-size: 12px;
        color: #666;
        padding: 6px 8px;
        line-height: 18px;
        text-align: left;
        vertical-align: middle;
        border: 1px solid #e6e6e6;

        &.center {
          text-align: center;
        }

        .typographic {
          img {
            float: left;
            margin-right: 10px;
          }

          a {
            float: left;
            min-width: 80px;
            max-width: 250px;
            color: #e1251b;

            &.service {
              color: #666;
            }
          }

          span {
            float: left;
            min-width: 80px;
            max-width: 250px;
            text-align: center;
          }
        }
      }
    }
  }
}
</style>