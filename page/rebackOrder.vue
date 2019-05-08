<template>
	<div>
		<v-tab></v-tab>
		<v-search searchName="查询退单">
			<template>
				<el-form label-width="100px" label-position="right" :inline="true" :model="serachForm">
					<el-form-item label="用户手机号：">
						<el-input v-model="serachForm.UserMobile" placeholder="请输入用户手机号" 
						class="input-small"></el-input>
					</el-form-item>

          <el-form-item label="退单类型：">
            <el-select v-model="serachForm.ReturnType" placeholder="请选择" class="input-small">
              <el-option
              v-for="item in ReturnTypes"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="退单状态：">
          <el-select v-model="serachForm.ReturnStatus" placeholder="请选择" class="input-small">
            <el-option
            v-for="item in ReturnStatus"
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
<v-table title="退单列表" :totalRecords="totalCount" ref="table" @pageChange="pageChange">

  <el-table :data="tableData" border  style="width: 100%">
    <el-table-column align="center" type="index" label="序号" width="60"> </el-table-column>

    <el-table-column align="center" prop="UserLoanMappingId" label="用户与贷款数据关联表ID" width="120"></el-table-column>
    <el-table-column align="center" prop="ReturnReason" label="退款原因描述" width="120"></el-table-column>
    <el-table-column align="center" prop="Remark" label="特别备注" width="100">
    </el-table-column>
    <el-table-column align="center" prop="ImageUrl" label="截图图片地址" width="150">
      <template slot-scope="props"><a target="_blank" :href="props.row.ImageUrl">{{props.row.ImageUrl}}</a></template>
    </el-table-column>
    <el-table-column align="center" prop="ReturnType" label="退单类型" width="150">
      <template slot-scope="props">{{getReturnType(props.row.ReturnType)}}</template>
    </el-table-column>
    <el-table-column align="center" prop="VadioUrl" label="录音地址" width="150">
      <template slot-scope="props"><a target="_blank" :href="props.row.VadioUrl">{{props.row.VadioUrl}}</a></template>
    </el-table-column>
    <el-table-column align="center" prop="ReturnStatus" label="认证状态" width="80">
     <template slot-scope="props">{{props.row.ReturnStatus==1?"退单成功":props.row.ApproveStatus==2?"退单失败":"退单中"}}</template>
   </el-table-column>
   <el-table-column align="center" prop="RejectReason" label="拒绝退单理由描述" width="100">
   </el-table-column>
   <el-table-column align="center" prop="CreateTime" label="创建时间" width="180">
     <template slot-scope="props">
      {{new Date(props.row.CreateTime).ljyFormat("yyyy-MM-dd HH:mm")}}
    </template>
  </el-table-column>
  <el-table-column align="center" label="操作">
   <template slot-scope="props">
    <el-button type="text" size="small" @click="pass(props.row.Id)">通过</el-button>
    <el-button type="text" size="small" @click="reback(props.row.Id)">驳回</el-button>
  </template>
</el-table-column>
</el-table>
</v-table>
<el-dialog title="订单驳回" :visible.sync="isDialogVisible" 
:close-on-click-modal="false"
@close="dialogCloseCall">
<el-form label-width="100px" label-position="right" 
:inline="true"
:model="form"
ref="form"
:rules="rules">
<el-form-item label="驳回原因：" prop="RejectReason">
 <el-input v-model="form.RejectReason" placeholder="请输入驳回原因" 
 class="input-small">
</el-input>
</el-form-item>

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

        ReturnStatus:[{value:0,label:"退单中"},{value:1,label:"退单成功"},{value:2,label:"退单失败"}],
        ReturnTypes:[{value:1,label:"联系不上客户"},{value:2,label:"同行"},{value:3,label:"异地客户"},{value:4,label:"无贷款意向"},{value:5,label:"无法联系"},{value:6,label:"年龄不符"},{value:7,label:"重复申请"}],
        tableData:[],
        totalCount:0,
            isAdd:true,                    // 是否新增
             isDialogVisible:true,         // 是否显示模态框
             serachForm: {                  // 查询的表单  

             	
             },
        form:                      // 课程的表单
        {
          ReturnRecordId:""
        },
       // 规则
       rules:{
       	RejectReason: [
       	{ required: true, message: '请输入驳回原因', trigger: 'blur' },
       	],
        
       }
     }
   },
   methods: {
    getReturnType(e){
     for (var i of this.ReturnTypes) {
      if(i.value==e){
        return i.label
      }
    }
    return "未知"
  },
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
      },

      pass(e){
      	console.log(e);
      	let para=Object.assign({});
      	para.ReturnRecordId=e;
        http.httpPost("/manager/returnRecords/appoveReturnRecords",para).then(data=>{
          console.log(data)
          if(data) helper.message("操作成功","success")
           this.search()

       })
      },
      reback(e){
        console.log(e);
        this.form.ReturnRecordId=e;
        this.isDialogVisible=true


      },
      add(){

      },

      save(){
        let para=Object.assign({},this.form)
        http.httpPost("/manager/returnRecords/rejectReturnRecords",para).then(data=>{
          console.log(data)
          if(data) helper.message("操作成功","success")
            this.search()

        })

      },
      search(){  // 查询函数
      	let page = this.$refs["table"].getPagingInfo();
      	let para=Object.assign(this.serachForm,page);
      	console.log(para);
      	http.httpPost("/manager/returnRecords/getReturnRecordsList",para).then(data=>{
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