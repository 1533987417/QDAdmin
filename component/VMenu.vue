<template>
  <div class="menu-contain">
    <!-- <img style="z-index:-1" src="/image/logo.png" @click="click"></img> -->
    <el-menu :collapse="!isCollapse"
    :default-active="currentUrl"
    class="el-menu-vertical-demo"
    background-color="#545c64"
    text-color="#fff"
    active-text-color="#ffd04b"
    @select="toUrl"
    >
    
    


    <el-menu-item index="LoanInfo">
      <i class="el-icon-tickets"></i>
      <span slot="title">贷款信息</span>
    </el-menu-item>
    <el-menu-item index="Channel">
      <i class="el-icon-menu"></i>
      <span slot="title">渠道管理</span>
    </el-menu-item>

    <el-menu-item index="activeInfo">
      <i class="el-icon-news"></i>
      <span slot="title">头条活动管理</span>
    </el-menu-item>

    <el-menu-item index="admin">
      <i class="el-icon-menu"></i>
      <span slot="title">管理员权限</span>
    </el-menu-item>
    <el-menu-item index="member">
      <i class="el-icon-search"></i>
      <span slot="title">会员查询</span>
    </el-menu-item>
    <el-menu-item index="rebackOrder">
      <i class="el-icon-tickets"></i>
      <span slot="title">退单管理</span>
    </el-menu-item>
    <el-menu-item index="persionAuth">
      <i class="el-icon-menu"></i>
      <span slot="title">个人认证</span>
    </el-menu-item>
    <el-menu-item index="companyAuth">
      <i class="el-icon-menu"></i>
      <span slot="title">公司认证</span>
    </el-menu-item>
    <el-menu-item index="chargeRecord">
      <i class="el-icon-goods"></i>
      <span slot="title">消费记录</span>
    </el-menu-item>
    <el-menu-item index="feedback">
      <i class="el-icon-phone-outline"></i>
      <span slot="title">意见反馈</span>
    </el-menu-item>
    <el-menu-item index="Question">
      <i class="el-icon-question"></i>
      <span slot="title">常见问题管理</span>
    </el-menu-item>
  </el-menu>
</div>
</template>

<script>
import helper from "@helper"
export default {
  data () {
    return {
      currentUrl:"index",
      isCollapse:true
    }
  },
  methods:{
    toUrl(index){
      console.log("1111",index)
      helper.routerJump(index)
    },
    click(){
      if(this.isCollapse){
        this.isCollapse=false;
        this.$parent.main="main2";
        this.$parent.menu="menu1"
      }else{
        this.isCollapse=true;

        this.$parent.main="main"
        this.$parent.menu="menu"
        
      }
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
.el-menu-vertical-demo:not(.el-menu--collapse) {

}
</style>