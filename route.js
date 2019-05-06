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
    path:"/loadDetail",
    name:"贷款详情",
    component:require("./page/loadDetail.vue").default,
    children:[]
}
]


export default new Router({
    routes
})

