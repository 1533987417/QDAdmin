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
    <el-menu-item index="loadDetail">
      <i class="el-icon-menu"></i>
      <span slot="title">贷款详情</span>
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