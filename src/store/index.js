import Vuex from "vuex";
import Vue from "vue";


//注册插件
Vue.use(Vuex);

var store = new Vuex.Store({
    state:{
        user:JSON.parse(localStorage.getItem("user")) || {}
        
    },

    mutations:{
       setUser(state,data){
          state.user=data;

          //保存到本地
          localStorage.setItem("user",JSON.stringify(data));
       }
    }
    
});



export default store;