<template>
  <div class="menu-contain">
    <el-menu
    :default-active="currentUrl"
    class="el-menu-vertical-demo"
    background-color="#545c64"
    text-color="#fff"
    active-text-color="#ffd04b"
    @select="toUrl"
    >
    <el-menu-item index="index">
      <i class="el-icon-menu"></i>
      <span slot="title">课程列表</span>
    </el-menu-item>
    <el-menu-item index="LoanInfo">
      <i class="el-icon-menu"></i>
      <span slot="title">贷款信息</span>
    </el-menu-item>
    <el-menu-item index="Channel">
      <i class="el-icon-menu"></i>
      <span slot="title">渠道管理</span>
    </el-menu-item>
    <el-menu-item index="Question">
      <i class="el-icon-menu"></i>
      <span slot="title">常见问题管理</span>
    </el-menu-item>
    <el-menu-item index="activeInfo">
      <i class="el-icon-menu"></i>
      <span slot="title">头条活动管理</span>
    </el-menu-item>
    <el-menu-item index="feedback">
      <i class="el-icon-menu"></i>
      <span slot="title">意见反馈</span>
    </el-menu-item>
    <el-menu-item index="admin">
      <i class="el-icon-menu"></i>
      <span slot="title">管理员权限</span>
    </el-menu-item>
    <el-menu-item index="member">
      <i class="el-icon-menu"></i>
      <span slot="title">会员查询</span>
    </el-menu-item>
    <el-menu-item index="persionAuth">
      <i class="el-icon-menu"></i>
      <span slot="title">个人认证</span>
    </el-menu-item>
  </el-menu>
</div>
</template>

<script>
import helper from "@helper"
export default {
  data () {
    return {
      currentUrl:"index"
    }
  },
  methods:{
    toUrl(index){
      console.log("1111",index)
      helper.routerJump(index)
    }
  },
  mounted(){
   var list= this.$route.fullPath.split("/");
   this.currentUrl=list[list.length-1]
   console.log(list[list.length-1])
 }
}

</script>
<style scoped>
.menu-contain{
  width: 100%;
}
</style>