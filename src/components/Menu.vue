<template>
<!-- 菜单栏组件 -->
<!-- default-active: 默认选中选项 -->
<!-- active-text-color：高亮时候的颜色 -->
<!-- collapse 默认是false展开菜单，true收起菜单 -->
    <el-menu
      default-active="1"
      class="el-menu-vertical-demo"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
      :collapse="isShow">
      <!-- //子菜单 -->
      <el-submenu index="1">
        <template slot="title">
          <span>购物商城</span>
        </template>

        
          <el-menu-item index="1-1">
            <template slot="title">
             <router-link to="/admin/goods-list">
                商品管理
             </router-link> 
              </template>
          </el-menu-item>
          
          <el-menu-item index="1-2" class="el-category">
            <template slot="title">
              <router-link to="/admin/category-list">  栏目管理
              </router-link> 
             </template>
          </el-menu-item>
       
      </el-submenu>
    </el-menu>
</template>
<script>
  export default {
    //声明可以接收属性
   props:["isShow"],
  }
</script>
<style>
.el-menu-vertical-demo{
  height: 100%;
}
.el-menu-vertical-demo:not(.el-menu--collapse){
  width: 200px;
  min-height: 630px;
}
.el-menu-vertical-demo a{
  color:inherit;
  text-decoration: none;
}
.el-category{
  margin-left: 5px;
}
</style>
