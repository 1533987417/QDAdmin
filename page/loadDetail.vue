<template>
	<div>
		<v-tab></v-tab>
		<v-search searchName="贷款数据查询">
			<template>
				<el-form label-width="100px" label-position="right" :inline="true" :model="serachForm">
					<el-form-item label="用户ID：">
						<el-input v-model="serachForm.UserId" placeholder="请输入用户ID" 
						class="input-small"></el-input>
					</el-form-item>

          <el-form-item label="贷款数据ID：">
            <el-input v-model="serachForm.LoanId" placeholder="请输入贷款数据ID" 
            class="input-small"></el-input>
          </el-form-item>
          <el-form-item label="">
            <el-button type="primary" @click="onSubmit">查询</el-button>
          </el-form-item>
        </el-form>
      </template>
    </v-search>

    <v-search searchName="贷款数据详细信息">
      <template>
        <el-form label-width="100px" label-position="right" 
        :inline="true"
        :model="form"
        ref="form">
        <el-form-item label="手机号码：">
         <el-input v-model="form.Mobile"
         class="input-small">
       </el-input>
     </el-form-item>

     <el-form-item label="身份证号码："> 
       <el-input v-model="form.IdCard" 
       class="input-small">
     </el-input>
   </el-form-item>
   <el-form-item label="真实姓名："> 
     <el-input v-model="form.Name" class="input-small">
     </el-input>
   </el-form-item>
   <br/>
   <el-form-item label="年龄：" > 
     <el-input v-model="form.Age" 
     class="input-small">
   </el-input>
 </el-form-item>
 <el-form-item label="性别：" prop="Telephone"> 
   <el-input v-model="form.Telephone" placeholder="请输入Telephone" 
   class="input-small">
 </el-input>
</el-form-item>
<el-form-item label="角色名称：" prop="RoleName">
  <el-select v-model="form.RoleName" placeholder="请选择" class="input-small">
    <el-option
    v-for="item in roles"
    :key="item.value"
    :label="item.label"
    :value="item.value">
  </el-option>
</el-select>
</el-form-item>
</el-form></template></v-search>
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
        options:[{value:0,label:"有效"},{value:1,label:"无效"}],
        roles:[{
          value: '管理员',
          label: '管理员'
        },{
          value: '一般用户',
          label: '一般用户'
        }],
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
        }
       // 规则
       
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
      upDateDialog(row){           // 修改新的课程
      	this.isAdd = false
      	this.isDialogVisible = true
      	console.log("带过来的参数",row)
      	this.form=Object.assign({},row) ;
      },
      removeItem(e){
      	console.log(e);
      	let para=Object.assign({},e) ;
      	if(e.Status=="1"){
      		para.Status=0;
      	}else{
      		para.Status=1
      	}

      	http.httpPost("/api/v1/manager/admin/UpdateAdmin",para).then(data=>{
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
              http.httpPost("/api/v1/manager/admin/AddAdmin",this.form).then(data=>{
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

      				http.httpPost("/api/v1/manager/admin/UpdateAdmin",this.form).then(data=>{
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
      	http.httpGet("/manager/loan/getLoanInfoDetail/"+this.serachForm.LoanId,{}).then(data=>{
      		console.log(data)
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