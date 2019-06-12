import Vue from 'vue';
import App from './App.vue';
import VueRouter from 'vue-router';
import axios from "axios";


//导入组件
import ElementUI from "element-ui"
//导入样式
import 'element-ui/lib/theme-chalk/index.css';
//注册elementui插件
Vue.use(ElementUI);

//导入组件
import Login from "./pages/Login.vue";
import Admin from "./pages/Admin.vue";
import GoodsList from "./pages/GoodsList.vue";
import GoodAdd from "./pages/GoodAdd.vue";
import CategoryList from "./pages/CategoryList.vue"
import GoodsEdit from "./pages/GoodsEdit.vue";

// 注册路由
Vue.use(VueRouter)

//配置路由
var routes=[
  {path:"/",redirect:"/admin/goods-list",meta:"首页"},
  {path:"/login",component:Login,meta:"登录页"},
  {path:"/admin",component:Admin,meta:"后台管理",children:[
    {path:"goods-list",component:GoodsList,meta:"商品列表"},
    {path:"category-list",component:CategoryList,mate:"栏目列表"},
    {path:"goodAdd",component:GoodAdd,meta:"添加商品"},
    {path:"goods-edit/:id",component:GoodsEdit,meta:"编辑商品"},
  ]},
  
]
//路由实例
var router=new VueRouter({routes});

Vue.config.productionTip = false;

//axios绑定到原型
Vue.prototype.$axios=axios;


new Vue({
  render: h => h(App),
  router
}).$mount('#app')
