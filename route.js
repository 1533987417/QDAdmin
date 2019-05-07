import Vue from "Vue"
import Router from 'vue-router'
Vue.use(Router)

let routeArr = [
"index.vue"
]

let routesItem = []

// route name以字符串为主 如果有多级菜单以,分隔
let routes = [{
    path:"/LoanInfo",
    name:"贷款信息",
    component:require("./page/LoanInfo.vue").default,
    children:[]
},{
    path:"/Channel",
    name:"渠道管理",
    component:require("./page/Channel.vue").default,
    children:[]
},{
    path:"/Question",
    name:"常见问题管理",
    component:require("./page/Question.vue").default,
    children:[]
},{
    path:"/activeInfo",
    name:"头条活动管理",
    component:require("./page/activeInfo.vue").default,
    children:[]
},{
    path:"/feedback",
    name:"意见反馈",
    component:require("./page/feedback.vue").default,
    children:[]
}
,{
    path:"/admin",
    name:"管理员权限",
    component:require("./page/amdin.vue").default,
    children:[]
},{
    path:"/member",
    name:"会员查询",
    component:require("./page/member.vue").default,
    children:[]
},{
    path:"/persionAuth",
    name:"个人认证",
    component:require("./page/persionAuth.vue").default,
    children:[]
}
]


export default new Router({
    routes
})

