<template>
  <div class="pay-main">
    <div class="pay-container">
      <div class="checkout-tit">
        <h4 class="tit-txt">
          <span class="success-icon"></span>
          <span class="success-info"
            >订单提交成功，请您及时付款，以便尽快为您发货~~</span
          >
        </h4>
        <div class="paymark">
          <span class="fl"
            >请您在提交订单<em class="orange time">4小时</em
            >之内完成支付，超时订单会自动取消。订单号：<em>{{
              orderId
            }}</em></span
          >
          <span class="fr"
            ><em class="lead">应付金额：</em
            ><em class="orange money">￥17,654</em></span
          >
        </div>
      </div>
      <div class="checkout-info">
        <h4>重要说明：</h4>
        <ol>
          <li>
            尚品汇商城支付平台目前支持<span class="zfb">支付宝</span>支付方式。
          </li>
          <li>其它支付渠道正在调试中，敬请期待。</li>
          <li>为了保证您的购物支付流程顺利完成，请保存以下支付宝信息。</li>
        </ol>
        <h4>
          支付宝账户信息：（很重要，<span class="save">请保存！！！</span>）
        </h4>
        <ul>
          <li>支付帐号：11111111</li>
          <li>密码：111111</li>
          <li>支付密码：111111</li>
        </ul>
      </div>
      <div class="checkout-steps">
        <div class="step-tit">
          <h5>支付平台</h5>
        </div>
        <div class="step-cont">
          <ul class="payType">
            <li><img src="./images/pay2.jpg" /></li>
            <li><img src="./images/pay3.jpg" /></li>
          </ul>
        </div>
        <div class="hr"></div>

        <div class="payshipInfo">
          <div class="step-tit">
            <h5>支付网银</h5>
          </div>
          <div class="step-cont">
            <ul class="payType">
              <li><img src="./images/pay10.jpg" /></li>
              <li><img src="./images/pay11.jpg" /></li>
              <li><img src="./images/pay12.jpg" /></li>
              <li><img src="./images/pay13.jpg" /></li>
              <li><img src="./images/pay14.jpg" /></li>
              <li><img src="./images/pay15.jpg" /></li>
              <li><img src="./images/pay16.jpg" /></li>
              <li><img src="./images/pay17.jpg" /></li>
              <li><img src="./images/pay18.jpg" /></li>
              <li><img src="./images/pay19.jpg" /></li>
              <li><img src="./images/pay20.jpg" /></li>
              <li><img src="./images/pay21.jpg" /></li>
              <li><img src="./images/pay22.jpg" /></li>
            </ul>
          </div>
        </div>
        <div class="hr"></div>

        <div class="submit">
          <a class="btn" @click="open">立即支付</a>
        </div>
        <div class="otherpay">
          <div class="step-tit">
            <h5>其他支付方式</h5>
          </div>
          <div class="step-cont">
            <span><a href="weixinpay.html" target="_blank">微信支付</a></span>
            <span>中国银联</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { reqOrderPayInfo, reqPayStatus } from "@/api";
// 生成二维码
import QRCode from "qrcode";

export default {
  name: "Pay",
  computed: {
    orderId() {
      return this.$route.query.orderId;
    },
  },
  data() {
    return {
      payInfo: {
        codeUrl: "weixin://wxpay/bizpayurl?pr=P0aPBJK",
        orderId: 10556,
        totalFee: 23996,
      },
      timer: null,
      code: null, // 支付状态码
    };
  },
  // 不要在生命周期函数上添加 async
  mounted() {
    // 获取支付信息
    this.getOrderInfo();
  },
  methods: {
    // 获取支付信息
    async getOrderInfo() {
      let res = await reqOrderPayInfo(this.orderId);
      console.log(res);
      if (res.code == 200) {
        // this.payInfo = res.data;
        /*
        {
      "code": 200,
      "message": "成功",
      "data": {
        "codeUrl": "weixin://wxpay/bizpayurl?pr=P0aPBJK",
        "orderId": 71,
        "totalFee": 23996,
        "resultCode": "SUCCESS"
      },
      "ok": true    
      }
        */
      }
    },
    // 打开微信支付码
    async open() {
      // 生成二维码  With async/await
      let url = await QRCode.toDataURL(this.payInfo.codeUrl);
      this.$alert(`<strong><img src='${url}' /></strong>`, "微信扫码支付", {
        dangerouslyUseHTMLString: true,
        // 中间布局
        center: true,
        // 是否显示取消按钮
        showCancelButton: true,
        // 取消按钮文本内容
        cancelButtonText: "支付遇到问题",
        // 确定按钮文本内容
        confirmButtonText: "已完成支付",
        // 可以取消支付
        // showClose: true,
        // 关闭时回调函数
        beforeClose: (type, instance, done) => {
          // type区分cancel | confirm
          // instance 当前组件实例
          // done关闭弹出框
          if (type == "cancel") {
            alert("请联系管理员");
            // 清除定时器
            clearInterval(this.timer);
            this.timer = null;
            // 关闭弹出框
            done();
          } else {
            // 确认按钮
            if (this.code === 200) {
              // 支付成功
              // 清除定时器
              clearInterval(this.timer);
              this.timer = null;
              // 保存支付成功返回的code
              done();
              // 跳转到支付成功页面
              this.$router.push("/paysuccess");
            }
          }
        },
      });
      // 支付成功与失败, 循环回调直到确定支付成功
      if (!this.timer) {
        this.timer = setInterval(async () => {
          // 获取用户
          let res = await reqPayStatus({ orderId: this.payInfo.orderId });
          // console.log(res);
          if (res.code == 200) {
            // 清除定时器
            clearInterval(this.timer);
            this.timer = null;
            // 保存支付成功返回的code
            this.code = res.code;
            // 关闭弹出框
            this.$msgbox.close();
            // 跳转到支付成功页面
            this.$router.push("/paysuccess");
          }
        }, 1000);
      }
    },
  },
};
</script>

<style lang="less" scoped>
.pay-main {
  margin-bottom: 20px;

  .pay-container {
    margin: 0 auto;
    width: 1200px;

    a:hover {
      color: #4cb9fc;
    }

    .orange {
      color: #e1251b;
    }

    .money {
      font-size: 18px;
    }

    .zfb {
      color: #e1251b;
      font-weight: 700;
    }

    .checkout-tit {
      padding: 10px;

      .tit-txt {
        font-size: 14px;
        line-height: 21px;

        .success-icon {
          width: 30px;
          height: 30px;
          display: inline-block;
          background: url(./images/icon.png) no-repeat 0 0;
        }

        .success-info {
          padding: 0 8px;
          line-height: 30px;
          vertical-align: top;
        }
      }

      .paymark {
        overflow: hidden;
        line-height: 26px;
        text-indent: 38px;

        .fl {
          float: left;
        }

        .fr {
          float: right;

          .lead {
            margin-bottom: 18px;
            font-size: 15px;
            font-weight: 400;
            line-height: 22.5px;
          }
        }
      }
    }

    .checkout-info {
      padding-left: 25px;
      padding-bottom: 15px;
      margin-bottom: 10px;
      border: 2px solid #e1251b;

      h4 {
        margin: 9px 0;
        font-size: 14px;
        line-height: 21px;
        color: #e1251b;
      }

      ol {
        padding-left: 25px;
        list-style-type: decimal;
        line-height: 24px;
        font-size: 14px;
      }

      ul {
        padding-left: 25px;
        list-style-type: disc;
        line-height: 24px;
        font-size: 14px;
      }
    }

    .checkout-steps {
      border: 1px solid #ddd;
      padding: 25px;

      .hr {
        height: 1px;
        background-color: #ddd;
      }

      .step-tit {
        line-height: 36px;
        margin: 15px 0;
      }

      .step-cont {
        margin: 0 10px 12px 20px;

        ul {
          font-size: 0;

          li {
            margin: 2px;
            display: inline-block;
            padding: 5px 20px;
            border: 1px solid #ddd;
            cursor: pointer;
            line-height: 18px;
          }
        }
      }
    }

    .submit {
      text-align: center;

      .btn {
        display: inline-block;
        padding: 15px 45px;
        margin: 15px 0 10px;
        font: 18px "微软雅黑";
        font-weight: 700;
        border-radius: 0;
        background-color: #e1251b;
        border: 1px solid #e1251b;
        color: #fff;
        text-align: center;
        vertical-align: middle;
        cursor: pointer;
        user-select: none;
        text-decoration: none;
      }
    }
  }
}
</style>