<template>
<el-form ref="form" :model="form" label-width="80px">

<el-form-item label="所属类型">
  <el-select v-model="form.category_id" placeholder="请选择活动区域">
    <el-option 
    v-for="(item, index) in categorys" 
    :key="index"
    :label="item.title"
    :value="item.category_id">
    </el-option>
  </el-select>
</el-form-item>

  <el-form-item label="是否发布">
    <el-switch v-model="form.status"></el-switch>
  </el-form-item>

<el-form-item label="推荐类型">
    <el-checkbox label="置顶" name="type" v-model="is_top"></el-checkbox>
    <el-checkbox label="热门" name="type" v-model="is_hot"></el-checkbox>
</el-form-item>

<el-form-item label="内容标题">
   <el-input v-model="form.subtitle"></el-input>
</el-form-item>

<el-form-item label="副标题">
    <el-input v-model="form.title"></el-input>
</el-form-item>


<el-form-item class="封面图片">
<el-upload
  class="avatar-uploader"
  action="http://localhost:8899/admin/article/uploadimg"
  :show-file-list="false"
  :on-success="handleAvatarSuccess"
  :before-upload="beforeAvatarUpload">
  <!-- 图片预览 -->
  <img v-if="imageUrl" :src="imageUrl" class="avatar">
  <!-- 图标 -->
  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
</el-upload>
</el-form-item>

<el-form-item label="商品货号">
    <el-input v-model="form.goods_no"></el-input>
</el-form-item>

<el-form-item label="库存数量">
    <el-input v-model="form.stock_quantity"></el-input>
</el-form-item>

<el-form-item label="市场价格">
    <el-input v-model="form.market_price"></el-input>
</el-form-item>

<el-form-item label="销售价格">
    <el-input v-model="form.sell_price"></el-input>
</el-form-item>

<el-form-item label="图片相册">
<el-upload
  action="http://localhost:8899/admin/article/uploadimg"
  list-type="picture-card"
  :on-success="handleCartSuccess"
  :on-preview="handlePictureCardPreview"
  :on-remove="handleRemove">
<i class="el-icon-plus"></i>
</el-upload>
<el-dialog :visible.sync="dialogVisible">
  <img width="100%" :src="dialogImageUrl" alt="">
</el-dialog>
</el-form-item>


<el-form-item label="内容摘要">
    <el-input type="textarea" v-model="form.zhaiyao"></el-input>
</el-form-item>

<el-form-item label="内容描述" class="editor">
    <quillEditor v-model="form.content">
    </quillEditor>
</el-form-item>

<el-form-item>
    <el-button type="primary" @click="onSubmit">完成</el-button>
    <el-button>取消</el-button>
</el-form-item>

</el-form>
</template>
<script>
//导入富文本编辑器的样式
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

import {quillEditor} from 'vue-quill-editor'


export default {
    data(){
      return {
        form: {
        
        category_id:"",
        status:false,
        is_top:false,
        is_hot:false,
        content:"",
        subtitle:"",
        title:"",
        imgList:[],//封面图片
        goods_no:"",
        stock_quantity:"",
        market_price:"",
        sell_price:"",
        fileList:[],//多张图
        zhaiyao:"",
        content:"",

        is_slide:false
        },
        
        //所属类别数组
        categorys:[],
        //预览的图片地址
        imageUrl:'',
        //预览的多张图片地址
        dialogImageUrl:'',
        //弹窗是否显示
        dialogVisible:false
      }
    },
    components:{
      quillEditor
    },

    methods: {
      handleAvatarSuccess(res,file){
          this.imgList=URL.createObjectURL(file.raw);

          //把上传的结果赋值
          this.form.imgList=[res];
      },
      beforeAvatarUpload(file) {
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isLt2M;
      },

      //多张图片删除事件
      handleRemove(file, fileList) {
        var files=fileLits.map(v=>{
          return v.response;
        });
        this.from.fileList=files;
      },

      //图片预览
      handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
      },

      //上传多张图片的成功回调
      handleCartSuccess(res,file,fileList){
        var file=fileList.map(v=>{
           return v.response;
        });

        this.from.fileList=files;
      },

      onSubmit(){
        //提交到添加商品的接口
        this.$axios({
          url:"http://localhost:8899/admin/goods/edit/" + this.$route.params.id,
          method:"POST",
          data:this.form,
          //处理session跨域
          withCredentials:true
        }).then(res=>{
           var {status,message}=res.data;

           if(status===0){
             //成功提示
             this.$message.success(message);
             //返回上一页
             this.$router.back();
           }else{
            //  this.$router.push("/login");
           }
        })
      }
   
    },
    mounted(){
       this.$axios({
           url:"http://localhost:8899/admin/category/getlist/goods",
           method:"GET"
       }).then(res => {
           var {status,message} = res.data;
           this.categorys=message;
       });

       //获取动态参数的id
       var {id}=this.$route.params;

       this.$axios({
          url:"http://localhost:8899/admin/goods/getgoodsmodel/"+id,
          method:"GET"
       }).then(res=>{
         var {status,message}=res.data;
         //对象合并
         this.form={
           ...message,
           category_id:+message.category_id,
         }

         this.imageUrl=message.imgList[0].url;
       })
    }
  
}
</script>

<style>
.el-goods{
    width: 500px;
}
.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }

  .editor .ql-toolbar{
      line-height: 1;
  }
</style>

