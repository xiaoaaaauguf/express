import axios from 'axios'

//创建axios实例
const http=axios.create({
  baseURL:'https://www.ahsj.link/nebula-api/',
  timeout:5000
})

//请求拦截
http.interceptors.request.use(config=>{
  //1.当发送网络请求时,可以做个loading动画

  //2.当有些操作需要登录时,判断token是否存在,不存在则跳转到登录页
  let token=localStorage.getItem('token')
  if(token){
    config.headers['x-auth-token']=token
  }
  return config
},err=>{
  console.log(err)
  return err
})

//响应拦截
http.interceptors.response.use(response=>{
  //对响应的数据进行处理
  return response.data
},err=>{
  console.log('响应出错了'+err)
  //判断错误类型
  if(err&&err.response){
    switch (err.response.status) {
      case 400:
        err.message='请求错误'
        break
      case 401:
        err.message='未授权的访问'
        break
      case 404:
        err.message='资源为找到'
        break
    }
  }
  return err
})

export default http