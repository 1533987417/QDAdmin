<template>
	<div>
		<v-tab></v-tab>
		<v-search searchName="查询个人认证">
			<template>
				<el-form label-width="100px" label-position="right" :inline="true" :model="serachForm">
					<el-form-item label="会员ID：">
						<el-input v-model="serachForm.UserId" placeholder="请输入会员ID" 
						class="input-small"></el-input>
					</el-form-item>
          <el-form-item label="会员手机号：">
            <el-input v-model="serachForm.Mobile" placeholder="请输入手机号" 
            class="input-small"></el-input>
          </el-form-item>
          <el-form-item label="交易订单号：">
            <el-input v-model="serachForm.TradeNo" placeholder="请输入订单号" 
            class="input-small"></el-input>
          </el-form-item>
          <el-form-item label="交易类型：">
            <el-select v-model="serachForm.TradeType" placeholder="请选择" class="input-small">
              <el-option
              v-for="item in TradeTypes"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="交易状态：">
          <el-select v-model="serachForm.TradeStatus" placeholder="请选择" class="input-small">
            <el-option
            v-for="item in TradeStatuss"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="支付类型：">
        <el-select v-model="serachForm.PayType" placeholder="请选择" class="input-small">
          <el-option
          v-for="item in PayTypes"
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
<v-table title="交易记录列表" :totalRecords="totalCount" ref="table" @pageChange="pageChange">

  <el-table :data="tableData" border  style="width: 100%">
    <el-table-column align="center" type="index" label="序号" width="60"> </el-table-column>

    <el-table-column align="center" prop="UserId" label="会员ID" width="120"></el-table-column>
    <el-table-column align="center" prop="Mobile" label="会员手机号" width="120"></el-table-column>
    <el-table-column align="center" prop="TradeType" label="交易类型" width="100">
      <template slot-scope="props">{{getTradeType(props.row.TradeType)}}</template>
    </el-table-column>
    <el-table-column align="center" prop="TradeNo" label="交易订单号" min-width="150">
    </el-table-column>
    <el-table-column align="center" prop="Amount" label="交易金额/元" min-width="150">
      <template slot-scope="props">{{props.row.Amount/100}}</template>
    </el-table-column>
    <el-table-column align="center" prop="TradeStatus" label="交易状态" width="150">
      <template slot-scope="props">{{props.row.TradeStatus==0?"待付款":props.row.TradeStatus==1?"付款成功":"付款失败"}}</template>
    </el-table-column>
    <el-table-column align="center" prop="PayType" label="支付类型" width="150">
      <template slot-scope="props">{{props.row.PayType==1?"微信":"支付宝"}}</template>
    </el-table-column>

    <el-table-column align="center" prop="Status" label="状态" width="50">
     <template slot-scope="props">{{props.row.Status==1?"有效":"无效"}}</template>
   </el-table-column>
   <el-table-column align="center" prop="TradeTime" label="支付时间" width="180">
     <template slot-scope="props">
      {{new Date(props.row.TradeTime).ljyFormat("yyyy-MM-dd HH:mm")}}
    </template>
  </el-table-column>
</el-table>
</v-table>
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
        PayTypes:[{value:-1,label:"全部"},{value:1,label:"微信"},{value:2,label:"支付宝"}],
        TradeStatuss:[{value:-1,label:"全部"},{value:0,label:"待付款"},{value:1,label:"付款成功"},{value:2,label:"付款失败"}],
        TradeTypes:[{value:-1,label:"全部"},{value:1,label:"充值"},{value:2,label:"抢单扣款"},{value:3,label:"邀请返利"},{value:4,label:"退单返款"},{value:5,label:"购买VIP"}],
        tableData:[],
        totalCount:0,
            isAdd:true,                    // 是否新增
             isDialogVisible:false,         // 是否显示模态框
             serachForm: {                  // 查询的表单  

             	
             },
        form:                      // 课程的表单
        {
          "Id": 1,
          "LoginName": "",
          "LoginPwd": "",
          "RealName": "",
          "Email": "",
          "Telephone": "",
          "RoleName": "",
          "Status": "",
          "CreatedTime": ""
        },
       // 规则
       rules:{
       	LoginName: [
       	{ required: true, message: '请输入登录名', trigger: 'blur' },
       	],
           // selectValidator
           LoginPwd:[
           { required: true, message: '请输入登陆密码', trigger: 'blur' }
           ],
           RealName:[
           { required: true, message: '请输入真实姓名', trigger: 'blur' }
           ],
           // RoleName:[
           // { required: true, message: '', trigger: 'blur' }
           // ],
           RoleName:[
           { validator:selectValidator ,message: '请选择角色类型', trigger: 'change' }],
           Telephone:[
           { validator:notVaild ,message: '请输入正确的手机号', trigger: 'change' }
           ]
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
      },
      getTradeType(e){
       for (var i of this.TradeTypes) {
         if(i.value==e){
          return i.label
        }
      }
    }
    ,

    pass(e){
     console.log(e);
     let para=Object.assign({});
     para.UserProfileId=e;
     para.ApproveStatus=1;

     http.httpPost("/manager/users/updatePersonAuthentication",para).then(data=>{
      console.log(data)
      if(data) helper.message("操作成功","success")
       this.search()

   })
   },
   reback(e){
    console.log(e);
    let para=Object.assign({});
    para.UserProfileId=e;
    para.ApproveStatus=2;

    http.httpPost("/manager/users/updatePersonAuthentication",para).then(data=>{
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
       this.form.Status=0
     console.log(this.form)
     http.httpPost("/manager/admin/addAdmin",this.form).then(data=>{
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

      http.httpPost("/manager/admin/updateAdmin",this.form).then(data=>{
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
      	let page = this.$refs["table"].getPagingInfo();
      	let para=Object.assign(this.serachForm,page);
      	console.log(para);
      	http.httpPost("/manager/finance/getFinanceRecordsList",para).then(data=>{
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