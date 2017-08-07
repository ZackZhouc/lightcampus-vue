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
                <div >
                  <el-row><img :src="urlEwm" class="icon"/></el-row>
                  <el-row><span style="color:#FFFFFF;">扫一扫</span></el-row>
                </div>
              </el-col>
              <el-col :span="6">
                <div>
                  <el-row><img :src="pay" class="icon"/></el-row>
                  <el-row><span style="color:#FFFFFF;">付款</span></el-row>
                </div>
              </el-col>
              <el-col :span="6">
                <div>
                  <el-row><img :src="home" class="icon"/></el-row>
                  <el-row><span style="color:#FFFFFF;">寝室</span></el-row>
                </div>
              </el-col>
              <el-col :span="6">
                <div>
                  <el-row><img :src="setting" class="icon"/></el-row>
                  <el-row><span style="color:#FFFFFF;">设置</span></el-row>
                </div>
              </el-col>
            </el-row>
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
</style>
<script>
  import erweima from '../../static/icon/erweima.png'
  import pay from '../../static/icon/pay.png'
  import home from '../../static/icon/home.png'
  import setting from '../../static/icon/setting.png'
  export default {
    data () {
      return {
        urlEwm: erweima,
        pay: pay,
        home: home,
        setting: setting
      }
    }
  }
</script>
