<template>
  <div>
    <div class="top">
      <el-row>
        <el-col :span="24">
          <div class="top-1">
            <el-row>
              <el-col :span="12">
                <el-input
                  size="mini"
                  icon="search" style="margin-left:8px;margin-top:4px;">
                </el-input>
              </el-col>
              <el-col :span="6">
                <i class="el-icon-time" style="margin-left:8px;margin-top:8px;"></i>
              </el-col>
              <el-col :span="6">
                <i class="el-icon-plus " style="margin-left:8px;margin-top:8px;"></i>
              </el-col>
            </el-row>
          </div>
          <div class="top-1">
            <el-row>
              <el-col :span="6">
                <div>
                  <el-row><img :src="iconErweima" class="icon"/></el-row>
                  <el-row><span style="color:#FFFFFF;">扫一扫</span></el-row>
                </div>
              </el-col>
              <el-col :span="6">
                <div>
                  <el-row><img :src="iconPay" class="icon"/></el-row>
                  <el-row><span style="color:#FFFFFF;">付款</span></el-row>
                </div>
              </el-col>
              <el-col :span="6">
                <div @click="jumper('home')">
                  <el-row><img :src="iconHome" class="icon"/></el-row>
                  <el-row><span style="color:#FFFFFF;">寝室</span></el-row>
                </div>
              </el-col>
              <el-col :span="6">
                <div>
                  <el-row><img :src="iconSetting" class="icon"/></el-row>
                  <el-row><span style="color:#FFFFFF;">设置</span></el-row>
                </div>
              </el-col>
            </el-row>
          </div>
        </el-col>
      </el-row>
    </div>
    <div class="body">

    </div>
    <div class="footer">
      <el-row class="footer-1">
        <el-col :span="6">
          <div >
            <el-row><img :src="iconErweima" class="rooter-icon"/></el-row>
          </div>
        </el-col>
        <el-col :span="6">
          <div>
            <el-row><img :src="iconPay" class="rooter-icon"/></el-row>
          </div>
        </el-col>
        <el-col :span="6">
          <div>
            <el-row><img :src="iconHome" class="rooter-icon"/></el-row>
          </div>
        </el-col>
        <el-col :span="6">
          <div>
            <el-row><img :src="iconSetting" class="rooter-icon"/></el-row>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>

</template>

<style scoped>
  body {
    height: 100%;
  }
  .top {
    background-color: #0099CC;
    height: 150px;
  }
  .top-1 {
    margin-top: 16px;
  }
  .icon {
    width: 50px;
    margin-bottom: 0px;
  }
  .footer {
    width: 100%;
    height: 50px;
    position: fixed;
    bottom: 0px;
  }
  .rooter-icon {
    width: 20px;
  }
  .body {

  }
  .footer-1 {
    width: 100%;
    position: absolute;
    bottom: 0px;
  }
</style>
<script>
  import iconErweima from '../../static/icon/erweima.png'
  import iconPay from '../../static/icon/pay.png'
  import iconHome from '../../static/icon/home.png'
  import iconSetting from '../../static/icon/setting.png'
  import HomeComp from './body/home.vue'
  export default {
    data () {
      return {
        iconErweima: iconErweima,
        iconPay: iconPay,
        iconHome: iconHome,
        iconSetting: iconSetting
      }
    },
    component: {
      HomeComp
    },
    methods: {
      jumper (address) {
        // 跳转时 未提交个人信息的自动跳转值信息录入页面
        if (typeof sessionStorage.name === 'undefined' || sessionStorage.name.length === 0) {
          this.$router.push({name: 'userInfo'})
        } else {
          this.$router.push({name: address})
        }
      }
    }
  }
</script>
