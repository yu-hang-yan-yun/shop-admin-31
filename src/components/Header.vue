<template>
<div>
 <el-row type="flex" justify="space-between">
    <div class="arrow" @click="handleClick">
        <i class="el-icon-back"></i>
    </div>
    <div>{{user.uname}} {{user.realname}} <span @click="handleLogout" class="logout">退出</span></div>
 </el-row>
</div>
</template>

<script>
export default {
     data(){
       return{
         user:{
        
         }
       }
     },


  methods:{
      handleClick(){
          this.$emit("click");
      },

      handleLogout(){
        this.$axios({
          url:"http://localhost:8899/admin/account/logout",
          method:"GET",
        //处理跨域
        withCredentials:true
        }).then(res=>{
          var {status,message}=res.data;

          if(status===0){
             this.$message.success(message);

             this.$router.push("/login");

             localStorage.removeItem("user");
          }
        })
      }
  },


  mounted(){
    this.user=this.$store.state.user
  },

}
</script>

<style scoped>
  .arrow{
      cursor: pointer;
  }
</style>
