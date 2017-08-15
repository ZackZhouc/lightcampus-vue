<template>
  <div>
    <el-form ref="form" :model="form" label-width="80px">
      <el-row>
        <el-form-item label="名称">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
      </el-row>
      <el-row>
        <el-form-item label="生日">
          <el-date-picker type="date" placeholder="选择日期" format="yyyy-MM-dd" v-model="time" style="width: 100%;"></el-date-picker>
        </el-form-item>
      </el-row>
      <el-row>
        <el-form-item label="性别">
          <el-radio-group v-model="form.sex">
            <el-radio label="0">boy</el-radio>
            <el-radio label="1">girl</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-row>
      <el-row>
        <el-button type="info" class="button" size="large" @click="addUserInfo">提交</el-button>
      </el-row>
    </el-form>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        time: '',
        form: {
          phone: '',
          name: '',
          birthday: '',
          sex: '0'
        }
      }
    },
    mounted () {
      if (typeof sessionStorage.phone === 'undefined') {
        this.$router.push({name: 'login'})
      } else {
        this.form.phone = sessionStorage.phone
      }
    },
    methods: {
      addUserInfo () {
        let that = this
        if (this.form.name.length === 0) {
          this.$message({
            message: '请输入名称',
            type: 'info'
          })
          return
        }
        if (this.time === 0) {
          this.$message({
            message: '请输入生日',
            type: 'info'
          })
          return
        }
        this.form.birthday = this.transTimeOutput(this.time)
        if (this.form.sex.length === 0) {
          this.$message({
            message: '请选择名称',
            type: 'info'
          })
          return
        }
        this.$axios({
          method: 'post',
          url: that.url.base + that.url.addUserInfo,
          data: that.form
        })
        .then(function (response) {
          if (response.data.status === 'success' && response.data.data !== null) {
            that.$router.push({name: 'main'})
          } else {
            that.$message({
              message: '网络故障',
              type: 'error'
            })
            return
          }
        })
      },
      // 格式化时间
      transTimeOutput (date) {
        let year = date.getFullYear()
        let month = date.getMonth() + 1
        let day = date.getDate()
        let hour = date.getHours()
        let minute = date.getMinutes()
        let second = date.getSeconds()
        month = month < 10 ? ('0' + month) : month
        day = day < 10 ? ('0' + day) : day
        hour = hour < 10 ? ('0' + hour) : hour
        minute = minute < 10 ? ('0' + minute) : minute
        second = second < 10 ? ('0' + second) : second
        return `${year}-${month}-${day} ${hour}:${minute}:${second}`
      }
    }
  }
</script>
