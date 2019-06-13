<template>
<!-- el-from是表单组件 -->
<!-- ref可以操作dom -->
<!-- model当前表单数据 -->
<!-- rules表单校检规则 -->
<div class="form-wrapper">
<el-form ref="form" :model="form" label-width="80px" :rules="rules" class="form">
  <el-form-item label="账号" prop="username">
    <el-input v-model="form.username"></el-input>
  </el-form-item>

  <el-form-item label="密码" prop="password">
    <el-input type="password" v-model="form.password"></el-input>
  </el-form-item>
 

  <el-form-item>
    <el-button type="primary" @click="onSubmit">登录</el-button>
    <el-button>取消</el-button>
  </el-form-item>

</el-form>
</div>
</template>
<script>
  export default {
    data() {
      return {
        form: {
          username:"",
          password:""
        },
        //表单验证规则
         rules: {
           usernam:[
             { required: true, message: '请输入用户名', trigger: 'blur' },
           ],
           password:[
             { required: true, message: '请输入密码', trigger: 'blur' },
           ]
      }
    }
  },
    methods:{
      onSubmit() {
        var data={
          uname:this.form.username,
          upwd:this.form.password,
        }
        //如果表单的验证不通过，不提交表单
        this.$refs.form.validate((valid)=>{
          if(valid){
        this.$axios({
          url:"http://localhost:8899/admin/account/login",
          method:"POST",
          //数据
          data,
          //跨域
           withCredentials: true
        }).then(res=>{
           var {message,status}=res.data;

           this.$store.commit("setUser",message);

           //登陆成功
           if(status===0){
             this.$router.push("/");
           }

           if(status===1){
             this.$message.error(message);
           }


        })
          }
        });
      }
    }
  }
</script>

<style scoped>
.form-wrapper{
  width: 100%;
  position: absolute;
  top:0;
  bottom: 0;
}
.form{
  width: 500px;
  position: absolute;
  left: 50%;
  margin-left: -250px;
  top:50%;
  margin-top: -95px;
}
</style>


