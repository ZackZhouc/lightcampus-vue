<template>
  <div>
    <el-row >
      <el-col :xs="24" :sm="24" :md="24" :lg="24">
        <el-menu theme="dark">
          <el-menu-item index="1">登录</el-menu-item>
        </el-menu>
      </el-col>
    </el-row>
    <el-form ref="form" :model="form" label-width="80px">
      <el-row class="row">
        <el-input
          placeholder="请输入手机"
          icon="check"
          v-model="form.phone">
        </el-input>
      </el-row>
      <el-row class="row">
        <el-input
          placeholder="请输入密码"
          icon="edit"
          v-model="form.password">
        </el-input>
      </el-row>
      <el-row class="row">
        <el-button type="info" class="button" size="large" @click="this.login">登录</el-button>
      </el-row>
      <el-row class="row">
        <router-link to="register">
          <el-button type="info" class="button" size="large">注册</el-button>
        </router-link>
      </el-row>
    </el-form>
  </div>
</template>

<style scoped>
  .row {
    margin-top: 8px;
  }
</style>

<script>
  export default {
    data () {
      return {
        form: {
          phone: '',
          password: ''
        }
      }
    },
    mounted () {
      if (typeof this.$route.params.phone !== 'undefined') {
        this.form.phone = this.$route.params.phone
      }
    },
    methods: {
      login () {
        let that = this
        if (this.form.phone.length === 0) {
          this.$message({
            message: '手机号不能为空',
            type: 'info'
          })
          return
        }
        if (this.form.password.length === 0) {
          this.$message({
            message: '密码不能为空',
            type: 'info'
          })
          return
        }
        this.$axios({
          method: 'post',
          url: that.url.base + that.url.login + '/' + that.form.phone + '/' + that.form.password
        })
        .then(function (response) {
          if (response.data.data === null) {
            that.$message({
              message: '账号未注册',
              type: 'info'
            })
          } else {
            if (response.data.data.password !== that.form.password) {
              that.$message({
                message: '密码错误',
                type: 'info'
              })
            } else {
              // 登录成功
              sessionStorage.phone = that.form.phone
              that.$axios({
                method: 'post',
                url: that.url.base + that.url.getUserInfoByPhone + '/' + that.form.phone
              })
              .then(function (res) {
                if (res.data.status === 'success' && res.data.data !== null) {
                  sessionStorage.name = res.data.data.name
                }
              })
              // 跳转
              that.$router.push({name: 'main'})
            }
          }
        })
      }
    }
  }
</script>
