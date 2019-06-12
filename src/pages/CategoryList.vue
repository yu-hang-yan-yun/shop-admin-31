<template>
  <div class="block">
    <el-tree
      :data="data"
      show-checkbox
      node-key="id"
      default-expand-all
      :expand-on-click-node="false">
      <span class="custom-tree-node" slot-scope="{ node, data }">
        <span>{{ data.title }}</span>
        <span>
          <input 
          :value="data.sort_id"
          @blur="handleBlur($event,data)"/>
          <el-button
            type="text"
            size="mini">
            编辑
          </el-button>
        </span>
      </span>
    </el-tree>
  </div>


</template>

<script>

  export default {
    data() {
        return {
            data:[],
        }
    },

    methods: {
     
      handleBlur(event,data){
          if(data.sort_id==event.target.value){
             return;
          }

          let res=window.confirm("是否确认编辑？");
           
           if(res){
             this.$axios({
                 url:"http://localhost:8899/admin/category/edit/"+data.category_id,
                 method:"POST",
                 data:{
                   ...data,
                   sort_id:event.target.value
                 },
                 //session跨域
                 withCredentials:true
             }).then(res=>{
                 this.getList();
                 this.$message.success("修改成功");
             })
           }

      },


      getList(){
        this.$axios({
            url:"http://localhost:8899/admin/category/getlist/goods",
            method:"GET",
        }).then(res=>{
            var {status,message}=res.data;
            if(status===0){
                this.data=message;
            }
        })
    },
},

    

    mounted(){
        this.getList();
    }

  };
</script>

<style>
.custom-tree-node {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 14px;
    padding-right: 8px;
  }

  .custom-tree-node input{
      width: 80px;
      height: 20px !important;
  }
</style>
