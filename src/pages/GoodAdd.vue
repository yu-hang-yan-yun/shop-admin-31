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

  <el-form-item label="即时配送">
    <el-switch v-model="form.delivery"></el-switch>
  </el-form-item>

<el-form-item label="活动性质">
  <el-checkbox-group v-model="form.type">
    <el-checkbox label="置顶" name="type"></el-checkbox>
    <el-checkbox label="热门" name="type"></el-checkbox>
  </el-checkbox-group>
</el-form-item>

<el-form-item label="内容标题">
   <el-input v-model="form.name"></el-input>
</el-form-item>

<el-form-item label="副标题">
    <el-input v-model="form.name"></el-input>
</el-form-item>


<el-form-item class="封面图片">
<el-upload
  class="avatar-uploader"
  action="http://localhost:8899/admin/article/uploadimg"
  :show-file-list="false"
  :on-success="handleAvatarSuccess"
  :before-upload="beforeAvatarUpload">
  <img v-if="imageUrl" :src="imageUrl" class="avatar">
  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
</el-upload>
</el-form-item>

<el-form-item label="商品货号" class="el-goods">
    <el-input v-model="form.name"></el-input>
</el-form-item>

<el-form-item label="库存数量" class="el-goods">
    <el-input v-model="form.name"></el-input>
</el-form-item>

<el-form-item label="市场价格" class="el-goods">
    <el-input v-model="form.name"></el-input>
</el-form-item>

<el-form-item label="销售价格" class="el-goods">
    <el-input v-model="form.name"></el-input>
</el-form-item>

<el-form-item>
<el-upload
  action="https://jsonplaceholder.typicode.com/posts/"
  list-type="picture-card"
  :on-preview="handlePictureCardPreview"
  :on-remove="handleRemove">
<i class="el-icon-plus"></i>
</el-upload>
<el-dialog :visible.sync="dialogVisible">
  <img width="100%" :src="dialogImageUrl" alt="">
</el-dialog>
</el-form-item>


<el-form-item label="内容摘要">
    <el-input type="textarea" v-model="form.desc"></el-input>
</el-form-item>

<el-form-item label="内容描述" class="editor">
    <quillEditor v-model="form.content">
    </quillEditor>
</el-form-item>

<el-form-item>
    <el-button type="primary" @click="onSubmit">立即创建</el-button>
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

        
          name: '',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: ''
        }
      }
    },
    components:{
      quillEditor
    },

    methods: {
      onSubmit() {
        console.log('submit!');
      }
    },
    mounted(){
       this.$axios({
           url:"http://localhost:8899/admin/category/getlist/goods",
           method:"GET"
       }).then(res=>{
           var {status,message} = res.data;
           this.categorys=message;
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

