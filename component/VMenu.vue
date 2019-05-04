<template>
  <div class="menu-contain">
    <el-menu
    default-active="index"
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
      console.log(index)
      helper.routerJump(index)
    }
  }
}

</script>
<style scoped>
.menu-contain{
  width: 100%;
}
</style>