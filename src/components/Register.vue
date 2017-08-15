<template>
  <div>
    <el-row >
      <el-col :xs="24" :sm="24" :md="24" :lg="24">
        <el-menu theme="dark">
          <el-menu-item index="1">注册</el-menu-item>
        </el-menu>
      </el-col>
    </el-row>
    <el-row >
      <el-col :xs="24" :sm="24" :md="24" :lg="24">
        <el-steps  :active="this.step" class="step" finish-status="success">
          <el-step title="输入手机号" ></el-step>
          <el-step title="输入验证码" ></el-step>
          <el-step title="设置密码" ></el-step>
        </el-steps>
      </el-col>
    </el-row>
    <el-row >
      <el-col :xs="24" :sm="24" :md="24" :lg="24">
        <el-input v-if="showPhone" v-model="phone" placeholder="请输入您的手机号" class="input" @input="handleInput"></el-input>
      </el-col>
    </el-row>
    <el-row v-if="showInputCode" :gutter="2">
      <el-col :xs="22" :sm="22" :md="22" :lg="22">
        <el-input  v-model="code" placeholder="请输入短信中的验证码" class="input"></el-input>
      </el-col>
      <el-col :xs="2" :sm="2" :md="2" :lg="2">
        <el-button type="info" class="button" size="small"  @click="checkCode">校验</el-button>
      </el-col>
    </el-row>
    <div v-if="showPassword">
      <el-row >
        <el-col :xs="24" :sm="24" :md="24" :lg="24">
          <el-input v-model="password" placeholder="请输入密码" class="input" ></el-input>
        </el-col>
      </el-row>
      <el-row >
        <el-col :xs="24" :sm="24" :md="24" :lg="24">
          <el-input v-model="checkPassword" placeholder="请确认密码" class="input"></el-input>
        </el-col>
      </el-row>
    </div>
    <div v-if="showSend">
      <el-row >
        <el-col :xs="24" :sm="24" :md="24" :lg="24">
          <el-button type="info" class="button" size="large" :disabled="disabled" @click="getCode">获取验证码</el-button><span v-if="showTime">{{time}}秒后重新发送</span>
        </el-col>
      </el-row>
      <el-row>
        <el-col :xs="24" :sm="24" :md="24" :lg="24">
          <el-checkbox label="我已阅读并同意《轻校园用户协议》" v-model="accept" class="accept" @change="handleCheck"></el-checkbox>
        </el-col>
      </el-row>
    </div>
    <div v-if="showRegister">
      <el-row>
        <el-col :xs="24" :sm="24" :md="24" :lg="24">
          <el-button type="info" class="button" size="large" @click="register">注册</el-button>
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<style scoped>
 .step, .input, .button, .accept {
    margin-top: 16px;
  }
  .el-message-box {
    width: 300px;
  }
</style>
<script>
  export default {
    data () {
      return {
        phone: '',
        accept: true,
        disabled: true,
        showTime: false,
        showInputCode: false,
        showPassword: false,
        showSend: true,
        showRegister: false,
        showPhone: true,
        time: 120,
        step: 0,
        code: '',
        password: '',
        checkPassword: ''
      }
    },
    methods: {
      cutDown () {
        this.time = 120
        this.showTime = true
        this.disabled = true
        let that = this
        let cutDown = setInterval(function () {
          that.time--
          if (that.time === 0) {
            that.showTime = false
            that.handleInput()
            clearInterval(cutDown)
          }
        }, 1000)
      },
      handleInput () {
        // alert(this.phone.length)
        if (this.phone.length !== 11) {
          this.disabled = true
          return
        } else {
          if (!this.accept) {
            this.disabled = true
            return
          } else {
            if (this.showTime === true) {
              this.disabled = true
              return
            } else {
              this.disabled = false
            }
          }
        }
      },
      handleCheck () {
        if (!this.accept) {
          this.disabled = true
          return
        } else {
          if (this.phone.length !== 11) {
            this.disabled = true
            return
          } else {
            if (this.showTime === true) {
              this.disabled = true
              return
            } else {
              this.disabled = false
            }
          }
        }
      },
      getCode () {
        let that = this
        let isMobile = /^1(3|4|5|7|8)\d{9}$/
        if (!isMobile.test(this.phone)) {
          this.$message({
            message: '请输入11位的合法手机号',
            type: 'warning'
          })
        } else {
          this.$axios({
            method: 'post',
            url: that.url.base + that.url.findLoginByPhone + '/' + that.phone
          })
          .then(function (response) {
            // 请求成功
            if (response.data.status === 'success') {
              // 手机号未注册
              if (response.data.data === null) {
                that.$axios({
                  method: 'post',
                  url: that.url.base + that.url.sendSms + '/' + that.phone
                })
                .then(function (response) {
                  if (response.data.status === 'success' && response.data.data !== null) {
                    that.$message({
                      message: '发送成功',
                      type: 'info'
                    })
                    that.step = 1
                    that.showInputCode = true
                    that.cutDown()
                  }
                })
              } else {
                that.$message({
                  message: '该手机号已注册请直接登录',
                  type: 'info'
                })
              }
            } else {
              that.$message({
                message: '服务器出了点故障～放个假吧',
                type: 'info'
              })
            }
          })
        }
      },
      checkCode () {
        let that = this
        if (this.code.length === 0) {
          this.$message({
            message: '验证码不能为空',
            type: 'info'
          })
          return
        }
        this.$axios({
          method: 'post',
          url: that.url.base + that.url.checkCode + '/' + that.phone
        })
        .then(function (response) {
          if (response.data.status === 'success' && response.data.data !== null) {
            if (that.code === response.data.data.code) {
              that.$message({
                message: '校验成功',
                type: 'info'
              })
              that.step = 2
              that.showPhone = false
              that.showSend = false
              that.showInputCode = false
              that.showPassword = true
              that.showRegister = true
            } else {
              that.$message({
                message: '验证码错误',
                type: 'info'
              })
            }
          }
        })
      },
      register () {
        let that = this
        if (this.password.length === 0) {
          this.$message({
            message: '请输入密码',
            type: 'info'
          })
          return
        }
        if (this.password.length < 6) {
          this.$message({
            message: '密码由6到16位的数字和字母组成',
            type: 'info'
          })
          return
        }
        if (this.password.length > 16) {
          this.$message({
            message: '密码由6到16位的数字和字母组成',
            type: 'info'
          })
          return
        }
        let reg = new RegExp(/^(?![^a-zA-Z]+$)(?!\D+$)/)
        if (!reg.test(this.password)) {
          this.$message({
            message: '密码由6到16位的数字和字母组成',
            type: 'info'
          })
          return
        }
        if (this.checkPassword.length === 0) {
          this.$message({
            message: '请确认密码',
            type: 'info'
          })
          return
        }
        if (this.password !== this.checkPassword) {
          this.$message({
            message: '2次密码不一致',
            type: 'info'
          })
          return
        }
        this.$axios({
          method: 'post',
          url: that.url.base + that.url.register + '/' + that.phone + '/' + that.password
        })
        .then(function (response) {
          if (response.data.status === 'success' && response.data.data !== null) {
            that.$router.push({name: 'login', params: { phone: that.phone }})
          } else {
            that.$message({
              message: '网络故障',
              type: 'error'
            })
            return
          }
        })
      }
    }
  }
</script>
