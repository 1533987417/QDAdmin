const config = {
	apiurl:"https://www.wangyao.online/tehaodai",
	STATUS_SUCCESS:200,

    api:{  // 一些公用方法的api
        upload:"/api/v1/manager/uploadFile",                              // 上传接口
        teachers:"/api/v1/manager/teacher/GetTearcherInfoList"             // 获得所有老师的列表
    }
}

export default config