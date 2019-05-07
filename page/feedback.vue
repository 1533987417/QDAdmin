<template>
	<div>
		<v-tab></v-tab>
		<v-search searchName="意见反馈查询">
			<template>
				<el-form label-width="100px" label-position="right" :inline="true" :model="serachForm">
					<el-form-item label="手机号：">
						<el-input v-model="serachForm.mobile" placeholder="请输入活动名称" 
						class="input-small"></el-input>
					</el-form-item>
          <el-form-item label="状态：">
            <el-select v-model="serachForm.Status" placeholder="请选择" class="input-small">
              <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="">
          <el-button type="primary" @click="onSubmit">查询</el-button>
        </el-form-item>
      </el-form>
    </template>
  </v-search>

  <!-- table组件 -->
  <v-table title="意见反馈列表" :totalRecords="totalCount" ref="table" @pageChange="pageChange">

    <el-table :data="tableData" border  style="width: 100%">
      <el-table-column align="center" type="index" label="序号" width="60"> </el-table-column>
      <el-table-column align="center" prop="UserId" label="UserId" width="80"></el-table-column>
      <el-table-column align="center" prop="FeedbackContent" label="反馈内容" min-width="360"></el-table-column>
      <el-table-column align="center" prop="Mobile" label="手机号" width="120">

      </el-table-column>
      <el-table-column align="center" prop="Status" label="状态" width="50">
       <template slot-scope="props">{{props.row.Status==1?"启用":props.row.Status==2?"已回复":"无效"}}</template>
     </el-table-column>
     <el-table-column align="center" prop="CreateTime" label="创建时间" width="180">
       <template slot-scope="props">
        {{new Date(props.row.CreateTime).ljyFormat("yyyy-MM-dd HH:mm")}}
      </template>
    </el-table-column>
    <el-table-column align="center" label="操作">
     <template slot-scope="props">
      <el-button v-show="props.row.Status!=0" type="text" size="small" @click="removeItem(props.row)">无效</el-button>
      <el-button v-show="props.row.Status!=2" type="text" size="small" @click="feedBackItem(props.row)">已回复</el-button>
    </template>
  </el-table-column>
</el-table>
</v-table>

<el-dialog :title="isAdd ? '新增活动说明':'修改活动说明'" :visible.sync="isDialogVisible" 
:close-on-click-modal="false"
@close="dialogCloseCall">
<el-form label-width="100px" label-position="right" 
:inline="true"
:model="form"
ref="form"
:rules="rules">
<el-form-item label="活动标题：" prop="ActiveName">
 <el-input v-model="form.ActiveName" placeholder="请输入活动标题" 
 class="input-small">
</el-input>
</el-form-item>

<el-form-item label="活动类型：" prop="ActiveType">
 <el-input v-model="form.ActiveType" placeholder="请输入活动类型" 
 class="input-small">
</el-input>
</el-form-item>
<br/>
<el-form-item label="活动详情：" prop="ActiveDetail">
 <el-input v-model="form.ActiveDetail" placeholder="请输入活动详情" 
 class="input-small">
</el-input>
</el-form-item>
<el-form-item label="开始时间：" prop="ActiveStartDate"> 
  <el-date-picker
  v-model="form.ActiveStartDate"
  type="datetime"
  placeholder="选择日期时间">
</el-date-picker>
</el-form-item>

<el-form-item label="结束时间：" prop="ActiveEndDate"> 
  <el-date-picker
  v-model="form.ActiveEndDate"
  type="datetime"
  placeholder="选择日期时间">
</el-date-picker>
</el-form-item>
<br/>
<br>


</el-form>
<div slot="footer" class="dialog-footer dialog-footer-1">
  <el-button @click="isDialogVisible = false" class="e-btn">取消</el-button>
  <el-button type="primary" class="e-btn" @click="save">确定</el-button>
</div>
</el-dialog>
</div>
</template>

<script>
import helper from "@helper"
import http from "@http"
import api from "@api"
var initForm;
const SAVE_URL = "/api/v1/manager/collage/AddCollage"
export default {
	data() {
		function selectValidator(rule, value, callback) {
      console.log(value)
      if(!value) callback(rule.message);
      else callback();
    }
    function notVaild(rule, value, callback){
     let reg = /^[0-9]*$/ 
     let val = value.toString() 
     if(val.trim() === "") callback("选项不能为空")
      else if(!reg.test(value)) callback("请输入数字")
       else callback()
     }
   return {
    timeRange:"",
    options:[{value:-1,label:"全部"},{value:1,label:"有效"},{value:0,label:"无效"}],
    QuesetionTypes:[{value:-1,label:"全部"},{value:1,label:"认证"},{value:2,label:"抢单"}],
    QuestionType:[{value:1,label:"认证"},{value:2,label:"抢单"}],
    tableData:[],
    totalCount:0,
            isAdd:true,                    // 是否新增
             isDialogVisible:false,         // 是否显示模态框
             serachForm: {                  // 查询的表单  

             	
             },
        form:                      // 课程的表单
        {

        },
       // 规则
       rules:{
        ActiveName: [
        { required: true, message: '请输入活动标题', trigger: 'blur' },
        ],
           // selectValidator
           ActiveType:[
           { required: true, message: '请输入活动类型', trigger: 'blur' }
           ],
           ActiveDetail:[
           { required: true, message: '请输入活动详情', trigger: 'blur' }
           ],
           ActiveEndDate:[
           { validator:selectValidator ,message: '请选择活动结束时间', trigger: 'change' }],
           ActiveStartDate:[
           { validator:selectValidator ,message: '请选择活动开始时间', trigger: 'change' }],
           // RoleName:[
           // { required: true, message: '', trigger: 'blur' }
           // ],
           
         }
       }
     },
     methods: {
       onSubmit(e) {
        console.log('submit!');
        this.search()

      },
      pageChange(param){        // 分页变化触发的函数
          // param 示例 {PageSize: 10, PageIndex: 2}
          // 请求操作可以放在这里 分页请求操作放在这里
          this.search()
        },
      addDialog(){              // 增加新的课程
      	this.isAdd = true
      	this.isDialogVisible = true;
      	this.form=Object.assign({},initForm) ;
        this.$refs['form'].resetFields()
      },
      upDateDialog(row){           // 修改新的课程
      	this.isAdd = false
      	this.isDialogVisible = true

      	console.log("带过来的参数",row)
      	this.form=Object.assign({},row) ;
      },
      removeItem(e){
      	console.log(e);
      	let para=Object.assign({},e) ;
      	para.Status=0

      	http.httpPost("/manager/feedback/updateFeedbckStatus",para).then(data=>{
      		console.log(data)
      		if(data) helper.message("操作成功","success")
      			this.search()

      	})
      },
      feedBackItem(e){
        console.log(e);
        let para=Object.assign({},e) ;
        para.Status=2

        http.httpPost("/manager/feedback/updateFeedbckStatus",para).then(data=>{
          console.log(data)
          if(data) helper.message("操作成功","success")
            this.search()

        })
      },
      add(){

      },

      save(){

        if(this.isAdd){
          this.$refs['form'].validate((valid) => {
           if(valid){
            if(this.isAdd) this.form.Id = 0 
             this.form.Status=1
           console.log(this.form)
           http.httpPost("/manager/feedback/updateFeedbckStatus",this.form).then(data=>{
             console.log(data)
             if(data>0) helper.message("添加成功","success")
              this.search()
            this.isDialogVisible=false;
          })
         }
       })
        }else{
          this.$refs['form'].validate((valid) => {
           if(valid){

            http.httpPost("/manager/activeInfo/updateActiveInfo",this.form).then(data=>{
             console.log(data)
             if(data) helper.message("修改成功","success")
              this.search()
            this.isDialogVisible=false;
          })
          }
        })
        }

      },
      search(){  // 查询函数

      	let para=Object.assign(this.serachForm);
      	console.log(para);
      	http.httpPost("/manager/feedback/searchFeedbackList",para).then(data=>{
      		let result = data.Data,
          totalCount = data.TotalCount   
          this.tableData = result
          this.totalCount = totalCount
        })
      },
      upLoadImg(){ // 获取图片
      	helper.upLoadImage((data)=>{
      		console.log("xxx执行到了这里",data)
      		if(data.IsSuccess){
      			this.form.LogoUrl=data.fileUrl;
      		}else{
      			helper.alertInfo(data.Message,"错误提示","error")
      		}
      	})
      },
      // 关闭前的回调
      dialogCloseCall(){
      	this.$refs['form'].resetFields();
      } 
    },
    created(){

	//this.search()
	initForm=this.form;
},
mounted(){
	this.search()
}
}

</script>
<style scoped>
.contain-imgs{
	width: 100%;
	height: 100%;
}
.contain-imgs img{
	width: 80px;
	height: 80px;
	vertical-align:middle
}
</style>