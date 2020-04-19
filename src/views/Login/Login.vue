<template>
  <section class="loginContainer">
    <div class="loginInner">
      <div class="login_header">
        <h2 class="login_logo">外卖APP</h2>
        <div class="login_header_title">
          <a
            href="javascript:;"
            :class="{'on':switchClass}"
            @click="switchClass = !switchClass"
          >短信登录</a>
          <a
            href="javascript:;"
            :class="{'on':!switchClass}"
            @click="switchClass = !switchClass"
          >密码登录</a>
        </div>
      </div>
      <div class="login_content">
        <form @submit.prevent="login">
          <div :class="{'on':switchClass}">
            <section class="login_message">
              <input v-model="phoneNumber" type="tel" maxlength="11" placeholder="手机号" />
              <button
                ref="getPoneCodeButton"
                :disabled="!checkPhoneNumber"
                class="get_verification"
                :class="{'abled':checkPhoneNumber}"
                @click.prevent="getPhoneCode"
              >{{!this.countDown? '获取验证码': `已发送${this.countDown}s`}}</button>
            </section>
            <section class="login_verification">
              <input v-model="verification" type="number" maxlength="8" placeholder="验证码" />
            </section>
            <section class="login_hint">
              温馨提示：未注册外卖APP帐号的手机号，登录时将自动注册，且代表已同意
              <a href="javascript:;">《用户服务协议》</a>
            </section>
          </div>
          <div :class="{'on':!switchClass}">
            <section>
              <section class="login_message">
                <input v-model="accountNum" type="tel" maxlength="11" placeholder="手机/邮箱/用户名" />
              </section>
              <section class="login_verification">
                <input v-if="!showPwd" v-model="pwd" type="password" maxlength="8" placeholder="密码" />
                <input v-else v-model="pwd" type="text" maxlength="8" placeholder="密码" />
                <div
                  @click="showPwd = !showPwd"
                  class="switch_button off"
                  :class="!showPwd? 'off': 'on'"
                >
                  <div class="switch_circle" :class="{'right': showPwd}"></div>
                  <span v-if="showPwd" class="switch_text">abc</span>
                </div>
              </section>
              <section class="login_message">
                <input v-model="captcha" type="text" maxlength="11" placeholder="验证码" />
                <div @click="updataCaptcha" class="get_verification" v-html="captchaSvg"></div>
              </section>
            </section>
          </div>
          <button class="login_submit">登录</button>
        </form>
        <a href="javascript:;" class="about_us">关于我们</a>
      </div>
      <a href="javascript:" @click="$router.go(-1)" class="go_back">
        <i class="iconfont icon-jiantou2"></i>
      </a>
    </div>
  </section>
</template>

<script>
import { Toast } from "vant";
import {
  reqCaptcha,
  reqSendCode,
  reqCodeLoing,
  reqPwdLogin
} from "@/api/index.js";
import { mapActions } from 'vuex'
export default {
  data() {
    return {
      switchClass: true,
      phoneNumber: "", //手机号
      verification: "", //短信验证码
      accountNum: "", //账号
      pwd: "", //密码
      captcha: "",
      captchaSvg: null,
      countDown: 0, //短信验证码倒计时
      showPwd: false
    };
  },
  created() {
    reqCaptcha().then(res => {
      this.captchaSvg = res;
    });
  },
  methods: {
    ...mapActions([
      'saveUserInfo', // 将 `this.saveUserInfo()` 映射为 `this.$store.dispatch('saveUserInfo')`
    ]),
    updataCaptcha() {
      reqCaptcha().then(res => {
        this.captchaSvg = res;
      });
    },
    getPhoneCode() {
      const { phoneNumber } = this;
      reqSendCode({ phone: phoneNumber }).then(res => {
        if (res.code == 0) {
          Toast.success("验证码发送成功");
          /**倒计时 */
          if (!this.countDown) {
            this.countDown = 30;
            const setIntervalId = setInterval(() => {
              this.countDown--;
              if (this.countDown == 0) {
                clearInterval(setIntervalId);
              }
            }, 1000);
          }
        } else {
          Toast.fail(`${res.msg}`);
        }
      });
    },
    async login() {
      let result;
      if (this.switchClass) {
        //验证码登录
        const { phoneNumber, verification } = this;
        if (phoneNumber == "") {
          Toast.fail("请输入手机号");
          return;
        } else if (
          !/^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/.test(
            phoneNumber
          )
        ) {
          Toast.fail("手机号格式不正确");
          return;
        } else if (!verification) {
          Toast.fail("请输入验证码");
          return;
        }
        result = await reqCodeLoing({ phoneNumber, verification });
      } else {
        //账号密码登录
        const { accountNum, pwd, captcha } = this;
        if (accountNum == "") {
          Toast.fail("请输入手机/邮箱/用户名");
          return;
        } else if (pwd == "") {
          Toast.fail("请输入密码");
          return;
        } else if (captcha == "") {
          Toast.fail("请输入图形验证码");
          return;
        }
        result = await reqPwdLogin({ accountNum, pwd, captcha });
      }
      if (result.code == 0) {
        Toast.success("登录成功");
        const userInfo = result.data;
        //将个人信息存储到vux中，跳转个人中心页面
        this.$store.dispatch('saveUserInfo',userInfo)
        this.$router.replace("/my");
      } else if(result.msg = '验证码不正确'){
        Toast.fail(`${result.msg}`);
        this.updataCaptcha()
      } else {
        Toast.fail(`${result.msg}`);
      }
    }
  },
  computed: {
    checkPhoneNumber() {
      if (/^1\d{10}$/.test(this.phoneNumber)) {
        this.$refs.getPoneCodeButton.removeAttribute("disabled");
        return true;
      } else {
        return false;
      }
    }
  }
};
</script>

<style lang="stylus">
.loginContainer {
  width: 100%;
  height: 100%;
  background: #fff;

  .loginInner {
    padding-top: 60px;
    width: 80%;
    margin: 0 auto;

    .login_header {
      .login_logo {
        font-size: 40px;
        font-weight: bold;
        color: #02a774;
        text-align: center;
      }

      .login_header_title {
        padding-top: 40px;
        text-align: center;

        >a {
          color: #333;
          font-size: 14px;
          padding-bottom: 4px;

          &:first-child {
            margin-right: 40px;
          }

          &.on {
            color: #02a774;
            font-weight: 700;
            border-bottom: 2px solid #02a774;
          }
        }
      }
    }

    .login_content {
      >form {
        >div {
          display: none;

          &.on {
            display: block;
          }

          input {
            width: 100%;
            height: 100%;
            padding-left: 10px;
            box-sizing: border-box;
            border: 1px solid #ddd;
            border-radius: 4px;
            outline: 0;
            font: 400 14px Arial;

            &:focus {
              border: 1px solid #02a774;
            }
          }

          .login_message {
            position: relative;
            margin-top: 16px;
            height: 48px;
            font-size: 14px;
            background: #fff;

            .get_verification {
              position: absolute;
              top: 50%;
              right: 10px;
              transform: translateY(-50%);
              border: 0;
              color: #ccc;
              font-size: 14px;
              background: transparent;

              &.abled {
                color: #000;
              }
            }
          }

          .login_verification {
            position: relative;
            margin-top: 16px;
            height: 48px;
            font-size: 14px;
            background: #fff;

            .switch_button {
              font-size: 12px;
              border: 1px solid #ddd;
              border-radius: 8px;
              transition: background-color 0.3s, border-color 0.3s;
              padding: 0 8px;
              width: 30px;
              height: 16px;
              line-height: 16px;
              color: #fff;
              position: absolute;
              top: 50%;
              right: 10px;
              transform: translateY(-50%);

              &.off {
                background: #fff;

                .switch_text {
                  float: left;
                  color: #ddd;
                }
              }

              &.on {
                background: #02a774;
              }

              >.switch_circle {
                // transform translateX(27px)
                position: absolute;
                top: -1px;
                left: -1px;
                width: 16px;
                height: 16px;
                border: 1px solid #ddd;
                border-radius: 50%;
                background: #fff;
                box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.1);
                transition: all 0.3s ease;

                &.right {
                  left: unset;
                  right: -1px;
                }
              }
            }
          }

          .login_hint {
            margin-top: 12px;
            color: #999;
            font-size: 14px;
            line-height: 20px;

            >a {
              color: #02a774;
            }
          }
        }

        .login_submit {
          display: block;
          width: 100%;
          height: 42px;
          margin-top: 30px;
          border-radius: 4px;
          background: #4cd96f;
          color: #fff;
          text-align: center;
          font-size: 16px;
          line-height: 42px;
          border: 0;
        }
      }

      .about_us {
        display: block;
        font-size: 12px;
        margin-top: 20px;
        text-align: center;
        color: #999;
      }
    }

    .go_back {
      position: absolute;
      top: 5px;
      left: 5px;
      width: 30px;
      height: 30px;

      >.iconfont {
        font-size: 20px;
        color: #999;
      }
    }
  }
}
</style>