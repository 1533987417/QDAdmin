<template>
  <div>
    <v-tab></v-tab>
    <v-search searchName="查询列表">
      <template>
       <el-form label-width="100px" label-position="right" :inline="true" :model="serachForm">
        <el-form-item label="城市名：">
          <el-input v-model="serachForm.CityName" placeholder="请输入城市" 
          class="input-small">
        </el-input>
      </el-form-item>
      <el-form-item label="渠道号：">
        <el-input v-model="serachForm.Channel" placeholder="请输入渠道号"
        class="input-small"></el-input>
      </el-form-item>
      <el-form-item label="手机号：">
        <el-input v-model="serachForm.Mobile" placeholder="请输入手机号"
        class="input-small"></el-input>
      </el-form-item>
      <el-form-item label="贷款人姓名：">
        <el-input v-model="serachForm.Name" placeholder="请输入贷款人姓名"
        class="input-small"></el-input>
      </el-form-item>
      <el-form-item label="订单范围：">
       <el-select v-model="serachForm.LoanIsGet" placeholder="请选择" class="input-small">
        <el-option 
        v-for="item in LoanIsGets"
        :key="item.value"
        :label="item.label"
        :value="item.value">
      </el-option>
    </el-select>
  </el-form-item>
  <el-form-item label="订单登记：">
   <el-select v-model="serachForm.LoanLevel" placeholder="请选择" class="input-small">
    <el-option 
    v-for="item in LoanLevels"
    :key="item.value"
    :label="item.label"
    :value="item.value">
  </el-option>
</el-select>
</el-form-item>
<el-form-item label="职业：">
 <el-select v-model="serachForm.WorkType" placeholder="请选择" class="input-small">
  <el-option 
  v-for="item in WorkTypes"
  :key="item.value"
  :label="item.label"
  :value="item.value">
</el-option>
</el-select>
</el-form-item>
<el-form-item label="收入形式：">
 <el-select v-model="serachForm.WagesType" placeholder="请选择" class="input-small">
  <el-option 
  v-for="item in WagesTypes"
  :key="item.value"
  :label="item.label"
  :value="item.value">
</el-option>
</el-select>
</el-form-item>

<el-form-item label="房产情况:">
 <el-select v-model="serachForm.HourseType" placeholder="请选择" class="input-small">
  <el-option 
  v-for="item in options"
  :key="item.value"
  :label="item.label"
  :value="item.value">
</el-option>
</el-select>
</el-form-item>

<el-form-item label="车产情况:">
 <el-select v-model="serachForm.CarType" placeholder="请选择" class="input-small">
  <el-option 
  v-for="item in options"
  :key="item.value"
  :label="item.label"
  :value="item.value">
</el-option>
</el-select>
</el-form-item>

<el-form-item label="公积金情况:">
 <el-select v-model="serachForm.FundType" placeholder="请选择" class="input-small">
  <el-option 
  v-for="item in SocialTypes"
  :key="item.value"
  :label="item.label"
  :value="item.value">
</el-option>
</el-select>
</el-form-item>

<el-form-item label="微粒贷:">
 <el-select v-model="serachForm.HaveWeiLi" placeholder="请选择" class="input-small">
  <el-option 
  v-for="item in options"
  :key="item.value"
  :label="item.label"
  :value="item.value">
</el-option>
</el-select>
</el-form-item>

<el-form-item label="优惠活动:">
 <el-select v-model="serachForm.DisCountType" placeholder="请选择" class="input-small">
  <el-option 
  v-for="item in DisCountTypes"
  :key="item.value"
  :label="item.label"
  :value="item.value">
</el-option>
</el-select>
</el-form-item>
<el-form-item label="">
  <el-button type="primary" @click="search">查询</el-button>
</el-form-item>
</el-form>
</template>
</v-search>

<!-- table组件 -->
<v-table title="贷款信息列表" :totalRecords="totalCount" ref="table" @pageChange="pageChange">
  <template slot="btn">

  </template>
  <el-table :data="tableData" border  style="width: 100%">
    <el-table-column align="center" type="index" label="序号" width="60"> </el-table-column>
    <el-table-column align="center" prop="Name" label="贷款人" width="80"></el-table-column>
    <el-table-column align="center" prop="Age" label="年龄" width="50">
    </el-table-column>
    <el-table-column align="center" prop="Sex" label="性别" width="50"><template slot-scope="props">
      {{props.row.Sex==0?"女":props.row.Sex==1?"男":"未知"}}
    </template>
  </el-table-column>
  <el-table-column align="center" prop="MaritalStatus" label="婚姻" width="50">
    <template slot-scope="props">
      {{props.row.MaritalStatus==0?"未婚":props.row.MaritalStatus==1?"已婚":"离异"}}
    </template>
  </el-table-column>

  <el-table-column align="center" prop="CityName" label="现居地" width="90"></el-table-column>
  <el-table-column align="center" prop="BornCity" label="户籍" width="90"></el-table-column>
 <!--  <el-table-column align="center" prop="Education" label="教育(文化)程度" width="120">
   <template slot-scope="props">
     {{getEducation(props.row.Education)}}
   </template>
 </el-table-column> -->
 <el-table-column align="center" prop="LoanAmount" label="贷款金额/万" width="110">
 </el-table-column>
 <el-table-column align="center" prop="LoanPeriod" label="贷款期限/月" width="100">
 </el-table-column>

 <el-table-column align="center" prop="LoanUse" label="贷款目的" width="100">
 </el-table-column>
 <el-table-column align="center" prop="WorkType" label="职业" width="100">
   <template slot-scope="props">
     {{getWorkType(props.row.WorkType)}}
   </template>
 </el-table-column>
 <el-table-column align="center" prop="Income" label="月收入" width="80">
 </el-table-column>
 <!-- <el-table-column align="center" prop="SocialType" label="本地社保已缴纳" width="80">
  <template slot-scope="props">
   {{getSocialType(props.row.SocialType)}}
 </template>
</el-table-column>
<el-table-column align="center" prop="FundType" label="本地公积金已缴纳" width="80">
  <template slot-scope="props">
   {{getSocialType(props.row.FundType)}}
 </template>
</el-table-column> -->
<!-- <el-table-column align="center" prop="CreditRecord" label="信用记录" width="80">
  <template slot-scope="props">
   {{getCreditRecord(props.row.CreditRecord)}}
 </template>
</el-table-column> -->
<!-- <el-table-column align="center" prop="HaveWeiLi" label="微粒贷额度" width="80">
</el-table-column> -->
<!-- <el-table-column align="center" prop="Comment" label="芝麻分" width="80">
</el-table-column> -->
<!-- <el-table-column align="center" prop="Estate" label="名下房产" width="80">
  <template slot-scope="props">
   {{getEstate(props.row.Estate)}}
 </template>
</el-table-column>
<el-table-column align="center" prop="CarType" label="车产情况" width="80">
  <template slot-scope="props">
   {{getCarType(props.row.CarType)}}
 </template>
</el-table-column> -->
<el-table-column align="center" prop="PersonalInsurance" label="个人保险" width="80">
  <template slot-scope="props">
   {{getPersonalInsurance(props.row.PersonalInsurance)}}
 </template>
</el-table-column>
<el-table-column align="center" prop="Level" label="等级" width="80">
  <template slot-scope="props">
   {{props.row.Level==1?"A级":props.row.Level==2?"B级":"C级"}}
 </template>
</el-table-column>
<el-table-column align="center" prop="IsGet" label="订单状态" width="80">
  <template slot-scope="props">
   {{props.row.Level==0?"未抢单":"已被抢单"}}
 </template>
</el-table-column>

<el-table-column align="center" prop="OriginalAmount" label="原价" width="80">
</el-table-column>

<el-table-column align="center" prop="GetAmount" label="卖价 金额 抢币/分" width="80">
</el-table-column>
<el-table-column align="center" prop="DisCountType" label="折扣类型" width="80">
 <template slot-scope="props">
   {{props.row.DisCountType==1?"最新发布":props.row.DisCountType==2?"6折促销":"5元抢单"}}
 </template>
</el-table-column>
<el-table-column align="center" prop="Status" label="状态" width="80">
 <template slot-scope="props">
   {{props.row.Status==1?"有效":"无效"}}
 </template>
</el-table-column>
<el-table-column align="center" prop="Createtime" label="创建时间" width="180">
  <template slot-scope="props">
   {{new Date(props.row.Createtime).ljyFormat("yyyy-MM-dd HH:mm")}}
 </template>
</el-table-column>
              <!-- <el-table-column align="center" prop="address" label="地址">
              </el-table-column> -->
              <el-table-column align="center" label="操作">
                <template slot-scope="props">
                  <el-button type="text" size="small" @click="detail(props.row.Id)">查看</el-button>
                </template>
              </el-table-column>
            </el-table>
          </v-table>
          <el-dialog title="贷款详情" :visible.sync="isDialogVisible" 
          :close-on-click-modal="false"
          @close="dialogCloseCall">
          <el-form label-width="100px" label-position="right" 
          :inline="true"
          :model="form"
          ref="form">
          <el-form-item label="姓名：">
           <el-input v-model="form.Name" class="input-small">
           </el-input>
         </el-form-item>

         <el-form-item label="身份证号码：" > 
           <el-input v-model="form.IdCard" class="input-small">
           </el-input>
         </el-form-item>
         <el-form-item label="年龄："> 
           <el-input v-model="form.Age" class="input-small">
           </el-input>
         </el-form-item>
         <br/>
         <el-form-item label="性别：">
          <el-select v-model="form.Sex"  class="input-small">
            <el-option
            v-for="item in Sexs"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="婚姻状况：">
        <el-select v-model="form.MaritalStatus"  class="input-small">
          <el-option
          v-for="item in MaritalStatus"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="现居地："> 
     <el-input v-model="form.CityName" class="input-small">
     </el-input>
   </el-form-item>
   <el-form-item label="户籍：" > 
     <el-input v-model="form.BornCity" class="input-small">
     </el-input>
   </el-form-item>
   <el-form-item label="教育程度：" >
    <el-select v-model="form.Education"  class="input-small">
      <el-option
      v-for="item in Educations"
      :key="item.value"
      :label="item.label"
      :value="item.value">
    </el-option>
  </el-select>
</el-form-item>
<el-form-item label="贷款额/万：" > 
 <el-input v-model="form.LoanAmount" class="input-small">
 </el-input>
</el-form-item>
<el-form-item label="期限/月：" > 
 <el-input v-model="form.LoanPeriod" class="input-small">
 </el-input>
</el-form-item>
<el-form-item label="贷款目的：" > 
 <el-input v-model="form.LoanUse" class="input-small">
 </el-input>
</el-form-item>
<el-form-item label="职业：" >
  <el-select v-model="form.WorkType"  class="input-small">
    <el-option
    v-for="item in WorkTypes"
    :key="item.value"
    :label="item.label"
    :value="item.value">
  </el-option>
</el-select>
</el-form-item>
<el-form-item label="单位名称：" > 
 <el-input v-model="form.CompanyName" class="input-small">
 </el-input>
</el-form-item>

<el-form-item label="工作年限：" >
  <el-select v-model="form.WorkingYears"  class="input-small">
    <el-option
    v-for="item in WorkingYears"
    :key="item.value"
    :label="item.label"
    :value="item.value">
  </el-option>
</el-select>
</el-form-item>

<el-form-item label="收入情况：" > 
 <el-input v-model="form.Income" class="input-small">
 </el-input>
</el-form-item>

<el-form-item label="收入形式：" >
  <el-select v-model="form.WagesType"  class="input-small">
    <el-option
    v-for="item in WagesTypes"
    :key="item.value"
    :label="item.label"
    :value="item.value">
  </el-option>
</el-select>
</el-form-item>

<el-form-item label="本地社保缴纳：" >
  <el-select v-model="form.SocialType"  class="input-small">
    <el-option
    v-for="item in SocialTypes"
    :key="item.value"
    :label="item.label"
    :value="item.value">
  </el-option>
</el-select>
</el-form-item>

<el-form-item label="本地公积金缴纳" >
  <el-select v-model="form.FundType"  class="input-small">
    <el-option
    v-for="item in SocialTypes"
    :key="item.value"
    :label="item.label"
    :value="item.value">
  </el-option>
</el-select>
</el-form-item>

<el-form-item label="信用记录：" >
  <el-select v-model="form.CreditRecord"  class="input-small">
    <el-option
    v-for="item in CreditRecords"
    :key="item.value"
    :label="item.label"
    :value="item.value">
  </el-option>
</el-select>
</el-form-item>

<el-form-item label="微粒贷额度：" > 
 <el-input v-model="form.HaveWeiLi" class="input-small">
 </el-input>
</el-form-item>

<el-form-item label="芝麻分:" > 
 <el-input v-model="form.Comment" class="input-small">
 </el-input>
</el-form-item>
<el-form-item label="负债情况/元:" > 
 <el-input v-model="form.DebtAmount" class="input-small">
 </el-input>
</el-form-item>

<el-form-item label="信用卡额度:" > 
 <el-input v-model="form.CreditCardLimit" class="input-small">
 </el-input>
</el-form-item>


<el-form-item label="营业执照:" > 
  <el-select v-model="form.BusinessLicense"  class="input-small">
    <el-option
    v-for="item in BusinessLicenses"
    :key="item.value"
    :label="item.label"
    :value="item.value">
  </el-option>
</el-select>
</el-form-item>

<el-form-item label="年流水(万元):" > 
  <el-select v-model="form.Annualflow"  class="input-small">
    <el-option
    v-for="item in Annualflows"
    :key="item.value"
    :label="item.label"
    :value="item.value">
  </el-option>
</el-select>
</el-form-item>


<el-form-item label="名下房产:" > 
  <el-select v-model="form.Estate"  class="input-small">
    <el-option
    v-for="item in Estates"
    :key="item.value"
    :label="item.label"
    :value="item.value">
  </el-option>
</el-select>
</el-form-item>

<el-form-item label="经营年限:" > 
  <el-select v-model="form.PlantingDuration"  class="input-small">
    <el-option
    v-for="item in PlantingDurations"
    :key="item.value"
    :label="item.label"
    :value="item.value">
  </el-option>
</el-select>
</el-form-item>


<el-form-item label="房产类型:" > 
  <el-select v-model="form.EstateType"  class="input-small">
    <el-option
    v-for="item in EstateTypes"
    :key="item.value"
    :label="item.label"
    :value="item.value">
  </el-option>
</el-select>
</el-form-item>

<el-form-item label="房产估值:" > 
 <el-input v-model="form.EstateValuation" class="input-small">
 </el-input>
</el-form-item>

<el-form-item label="车产情况:" > 
  <el-select v-model="form.CarType"  class="input-small">
    <el-option
    v-for="item in CarTypes"
    :key="item.value"
    :label="item.label"
    :value="item.value">
  </el-option>
</el-select>
</el-form-item>

<el-form-item label="车辆估值:" > 
 <el-input v-model="form.CarAssetsValuation" class="input-small">
 </el-input>
</el-form-item>

<el-form-item label="个人保险:" > 
  <el-select v-model="form.PersonalInsurance"  class="input-small">
    <el-option
    v-for="item in PersonalInsurances"
    :key="item.value"
    :label="item.label"
    :value="item.value">
  </el-option>
</el-select>
</el-form-item>

<el-form-item label="保险种类:" > 
 <el-input v-model="form.InsuredCompany" class="input-small">
 </el-input>
</el-form-item>

<el-form-item label="保险价值:" > 
 <el-input v-model="form.InsuranceValuation" class="input-small">
 </el-input>
</el-form-item>
<el-form-item label="是否同意推送给赠险合作方:" > 
  <el-select v-model="form.AgreeInsurance"  class="input-small">
    <el-option
    v-for="item in AgreeInsurances"
    :key="item.value"
    :label="item.label"
    :value="item.value">
  </el-option>
</el-select>
</el-form-item>

<el-form-item label="渠道号:" > 
 <el-input v-model="form.Channel" class="input-small">
 </el-input>
</el-form-item>

<el-form-item label="Ip:" > 
 <el-input v-model="form.Ip" class="input-small">
 </el-input>
</el-form-item>

<el-form-item label="等级:" > 
  <el-select v-model="form.Level"  class="input-small">
    <el-option
    v-for="item in LoanLevels"
    :key="item.value"
    :label="item.label"
    :value="item.value">
  </el-option>
</el-select>
</el-form-item>

<el-form-item label="是否已经抢:" > 
  <el-select v-model="form.IsGet"  class="input-small">
    <el-option
    v-for="item in LoanIsGets"
    :key="item.value"
    :label="item.label"
    :value="item.value">
  </el-option>
</el-select>
</el-form-item>

<el-form-item label="原价:" > 
 <el-input v-model="form.OriginalAmount" class="input-small">
 </el-input>
</el-form-item>

<el-form-item label="卖价/分:" > 
 <el-input v-model="form.GetAmount" class="input-small">
 </el-input>
</el-form-item>

<el-form-item label="折扣类型:" > 
  <el-select v-model="form.DisCountType"  class="input-small">
    <el-option
    v-for="item in DisCountTypes"
    :key="item.value"
    :label="item.label"
    :value="item.value">
  </el-option>
</el-select>
</el-form-item>

<br>


</el-form>
<div slot="footer" class="dialog-footer dialog-footer-1">
  <el-button @click="isDialogVisible = false" class="e-btn">取消</el-button>
</div>
</el-dialog>  
</div>
</template>

<script>
import helper from "@helper"
import http from "@http"
import api from "@api"
import config from "@config"

var E = require('wangeditor')
import { VueEditor } from 'vue2-editor'

let generateEditor = ()=>{
  var editor = new E('#toolbar',"#mainarea")
  editor.create()
    // 配置服务器端地址
    editor.customConfig.uploadImgServer = config.apiurl+config.api.upload
    editor.customConfig.uploadImgShowBase64 = true
    editor.customConfig.customUploadImg = function (files, insert) {
      helper.fileToBase64(files,(data)=>{

      })

        // if(data.Code == 200){
        //     helper.message("上传成功","success")
        //   }else{
        //     helper.message("请重新上传图片","warning")
        //   }
      }
    }

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
        isAdd:true,                    // 是否新增
        isDialogVisible:false,         // 是否显示模态框
        serachForm: {                  // 查询的表单  
          PageSiz:"",
          PageIndex:""
        },
        
        LoanIsGets:[{value:-1,label:"全部"},{value:0,label:"未抢订单"},{value:1,label:"已抢订单"}],
        WagesTypes:[{value:-1,label:"全部"},{value:0,label:"银行代发"},{value:1,label:"打卡"},{value:2,label:"现金发放"},{value:3,label:"其他"}],
        DisCountTypes:[{value:-1,label:"全部"},{value:1,label:"最新发布"},{value:2,label:"6折促销"},{value:3,label:"5元抢单"}],
        LoanLevels:[{value:-1,label:"全部"},{value:1,label:"A等级"},{value:2,label:"B等级"},{value:3,label:"C等级"}],
        WorkTypes:[{value:-1,label:"全部"},{value:1,label:"上班族"},{value:2,label:"公务员/事业编制"},{value:3,label:"自由职业"},{value:4,label:"个体户"},{value:5,label:"企业主"}],
        options:[{value:-1,label:"全部"},{value:1,label:"有"},{value:0,label:"无"}],
        Educations:[{value:1,label:"本科及以上"},{value:2,label:"大专"},{value:3,label:"中专"},{value:4,label:"高中及以下"}],
        SocialTypes:[{value:0,label:"无"},{value:1,label:"3个月以下"},{value:2,label:"3-6个月"},{value:3,label:"6个月-1年"},{value:4,label:"1-3年"},{value:5,label:"3年以上"}],
        CreditRecords:[{value:0,label:"无信用卡和贷款"},{value:1,label:"信用良好无逾期"},{value:2,label:" 1年内逾期少于3次且少于90天"},{value:3,label:"1年内逾期超过3次或超过90天"}],
        Estates:[{value:0,label:"无房产"},{value:1,label:"有房产，全款"},{value:2,label:"有房产，按揭"}],
        CarTypes:[{value:0,label:"无车产"},{value:1,label:"无车准备购买"},{value:2,label:"有车不接受抵押"},{value:3,label:"有车可接受抵押"}],
        PersonalInsurances:[{value:0,label:"无"},{value:1,label:"投保人寿险且投保两年以下"},{value:2,label:"投保人寿险且投保两年以上"}],
        Sexs:[{value:0,label:"女"},{value:1,label:"男"},{value:2,label:"未知"}],
        MaritalStatus:[{value:0,label:"未婚"},{value:1,label:"已婚"},{value:2,label:"离异"}],
        WorkingYears:[{value:0,label:"3个月以下"},{value:1,label:"3-6个月"},{value:2,label:"6个月-1年"},{value:3,label:"1-3年"},{value:4,label:"3-5年"},{value:5,label:"5年以上"}],
        BusinessLicenses:[{value:0,label:"有"},{value:1,label:"无"}],
        Annualflows:[{value:0,label:"30万以下"},{value:1,label:"30万"},{value:2,label:"30-50万"},{value:3,label:"50-70万"},{value:4,label:"70-100万"},{value:5,label:"100万以上"}],
        PlantingDurations:[{value:0,label:"1年以下"},{value:1,label:"1年"},{value:2,label:"1-2年"},{value:3,label:" 2-3年"},{value:4,label:"3年以上"}],
        EstateTypes:[{value:1,label:"商品住宅"},{value:2,label:"商铺"},{value:3,label:"办公楼"},{value:4,label:"厂房"},{value:5,label:"经济适用房"},{value:6,label:"其他"}],
        AgreeInsurances:[{value:0,label:"否"},{value:1,label:"是"}],
        tableData: [],
        totalCount: 29,
        form:{
          "Id": "",
          "Mobile": "",
          "Name": "",
          "IdCard": "",
          "Age": "",
          "Sex": "",
          "MaritalStatus": 7,
          "CityName": "sample string 8",
          "BornCity": "sample string 9",
          "Education": 10,
          "LoanAmount": 11,
          "LoanPeriod": 12,
          "LoanUse": "sample string 13",
          "WorkType": 14,
          "CompanyName": "sample string 15",
          "WorkingYears": 16,
          "Income": 17,
          "WagesType": 18,
          "SocialType": 19,
          "FundType": 20,
          "CreditRecord": 21,
          "HaveWeiLi": 22,
          "Comment": 23,
          "DebtAmount": 24,
          "CreditCardLimit": "sample string 25",
          "BusinessLicense": 26,
          "Annualflow": 27,
          "PlantingDuration": 28,
          "Estate": 29,
          "EstateType": 30,
          "EstateValuation": "sample string 31",
          "CarType": 32,
          "CarAssetsValuation": "sample string 33",
          "PersonalInsurance": 34,
          "InsuredCompany": "sample string 35",
          "InsuranceValuation": "sample string 36",
          "AgreeInsurance": 37,
          "Channel": "sample string 38",
          "Ip": "sample string 39",
          "Level": 40,
          "IsGet": 41,
          "OriginalAmount": 42,
          "GetAmount": 43,
          "DisCountType": 44,
          "Status": 45,
          "Createtime": "2019-05-06T12:22:04.8874807+08:00",
          "UpdateTime": "2019-05-06T12:22:04.8874807+08:00"
        }


         // 规则
         
         
       }
     },
     methods: {
      onSubmit() {
        console.log('submit!');
      },
      pageChange(param){        // 分页变化触发的函数
          // param 示例 {PageSize: 10, PageIndex: 2}
          // 请求操作可以放在这里 分页请求操作放在这里
          this.search()
        },
      // addDialog(){              // 增加新的课程
      //   this.isAdd = true
      //   this.isDialogVisible = true
      // },

      add(){

      },
      search(){  // 查询函数
       let page = this.$refs["table"].getPagingInfo()
       this.serachForm = Object.assign({},this.serachForm,{
        "PageSiz": page.PageSize,
        "PageIndex": page.PageIndex,
      })
       http.httpPost("/manager/loan/getLoanInfoList",this.serachForm)
       .then(data=>{
        let result = data.Data,
        totalCount = data.TotalCount   
        this.tableData = result
        this.totalCount = totalCount
      })
     },
     detail(e){
      console.log(e)
      
      http.httpGet("/manager/loan/getLoanInfoDetail/"+e,{}).then(data=>{
        
        this.isDialogVisible = true
        this.form=Object.assign({},data) 
      })
    },
      upLoadImg(){ // 获取图片
        helper.upLoadImage((data)=>{
          if(data.Code == 200){
            helper.message("上传成功","success")
            this.form.SmallImageUrl = data.fileUrl
          }else{
            helper.message("请重新上传图片","warning")
          }
        })
      },
      // 关闭前的回调
      dialogCloseCall(){
        this.$refs['form'].resetFields();
      },
      // 打开前的回调
      dialogOpenCall(){
       this.$nextTick(generateEditor)
     },
     getEducation(e){
      console.log(e)
      for (var i of this.Educations) {
        if(i.value==e){
          return i.label
        }
      }
      return "未知"
    },
    getWorkType(e){
      for (var i of this.WorkTypes) {
        if(i.value==e){
          return i.label
        }
      }
      return "未知"
    },
    getSocialType(e){
      for (var i of this.SocialTypes) {
        if(i.value==e){
          return i.label
        }
      }
      return "未知"
    },
    getCreditRecord(e){
      for (var i of this.CreditRecords) {
        if(i.value==e){
          return i.label
        }
      }
      return "未知"
    },
    getEstate(e){
      for (var i of this.Estates) {
        if(i.value==e){
          return i.label
        }
      }
      return "未知"
    },
    getCarType(e){
      for (var i of this.CarTypes) {
        if(i.value==e){
          return i.label
        }
      }
      return "未知"
    },
    getPersonalInsurance(e){
      for (var i of this.PersonalInsurances) {
        if(i.value==e){
          return i.label
        }
      }
      return "未知"
    }
  },
  created(){
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
  height: 60px;
  vertical-align:middle
}
#toolbar{
  border: 1px solid #ccc
}
#mainarea{
  width: 100%;
  height: 120px;
  border: 1px solid #ccc
}
</style>


