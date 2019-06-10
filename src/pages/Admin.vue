<template>
 <el-container>
   <!-- //菜单栏 -->
   <el-aside width="auto">
        <Menu :isShow="isShow"/>
   </el-aside>

     <el-container>
       <!-- 渲染头部 -->
      <el-header>
           <Header @click="handleChangeShow"/>
      </el-header>

      <el-main>
           <mianbao/>
           <!-- 商品列表 -->
           <router-view></router-view>
      </el-main>
   </el-container>

 </el-container>
</template>

<script>
import Header from "../components/Header.vue";
import mianbao from "../components/mianbao.vue";
import Menu from "../components/Menu.vue";

export default {
   data(){
       return{
         isShow:false,
       }
   },
   //注册组件
   components:{
       Header,
       mianbao,
       Menu,
   },
  //页面事件
  methods:{
      handleChangeShow(){
        this.isShow=!this.isShow;
      }
  },
}
</script>

<style>
.el-header, .el-footer {
    color: #333;
    text-align: center;
    line-height: 60px;
  }
  
  .el-aside {
    background-color: #D3DCE6;
  }
  
  .el-main {
    background-color: #E9EEF3;
    color: #333;
  }
  
  body > .el-container {
    margin-bottom: 40px;
    top:0;
    bottom: 0;
    width: 100%;
  }
  
  .el-container:nth-child(5) .el-aside,
  .el-container:nth-child(6) .el-aside {
    line-height: 260px;
  }
  
  .el-container:nth-child(7) .el-aside {
    line-height: 320px;
  }
</style>

