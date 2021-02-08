import http from './request'

//验证登录
export const loginCheck = ({username, password}) => http.post('/login',{username, password})

//注册账号
export const userRegister=(params)=>http.post('/open/register',params)

//获取个人信息
export const getUserInfo = () => http.get('/users/list')

//获取更详细的个人信息
export const getDetailInfo = () => http.get('/users/info')

//获取版本信息
export const getVersion = () => http.get('/users/version')

//获取消息详情
export const getNews = ({current, size, type}) => http.get('/api/message', {
  params: {
    current, size, type
  }
})

//获取消息列表
export const getNewsDetail = (id) => http.get(`/api/message/${id}`)

//标记信息已读
export const readReceipt = ( id) => http.put(`/api/message/updates?id=${id}`)

//获取客户列表信息
export const getClientList = ({keyword, current, size}) => http.get(`/api/cust`, {
  params: {
    keyword, current, size
  }
})

//获取客户详细信息
export const getClientDetail = (id) => http.get(`/api/cust/${id}`)

//新增拜访
export const addUserInfo = ({custName, cityName, company, position, telephone, education, sex, age}) => http.post(
  '/api/cust', {custName, cityName, company, position, telephone, education, sex, age}
)


//快递单列表
export const getExpress = ({keyword, current, size}) => http.get('/api/star', {
  params: {keyword, current, size},
})

//送货单-全部订单
export const getExpressList = ({keyword, current, size, type}) => http.get(`/order/v1/list/${type}`, {
  params: {keyword, current, size}
})

//送货单-发货
export const sendGoods = (params) => http.post(`/order/v1/send`,params)

//送货单-收货
export const  takeGoods= (serialNo) => http.post(`/order/v1/confirmReceipt/${serialNo}`)


//送货单-订单详情
export const lineItem = (serialNo) => http.get(`/order/v1/orderInfo/`+serialNo)

//送货单-查看评价
export const getEvaluate = (serialNo) => http.get(`/order/v1/evaluateInfo/${serialNo}`)

//送货单-添加评价
export const addEvaluate = ({serialNo, prodConformityPoint, logisticsSpeedPoint, serviceQualityPoint, comment}) =>
  http.post(`/order/v1/evaluate`,
    {
      serialNo,
      prodConformityPoint,
      logisticsSpeedPoint,
      serviceQualityPoint,
      comment
    })

