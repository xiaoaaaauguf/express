import Vue from "vue";
import VueRouter from "vue-router";
Vue.use(VueRouter);
const Home = () => import("../views/home/Home");
const User = () => import("../views/user/User");
const Login = () => import("../components/Login");
const Fragment = () => import("../components/common/Fragment");
const News = () => import("../views/news/News");
const Client = () => import("../views/home/clients/Client");
const Express = () => import("../views/home/express/Express");
const Evaluate = () => import("../views/home/express/Evaluate");
const ExComment = () => import("../views/home/express/ExComment");

const Care = () => import("../views/home/care/Care");
const routes = [
  {
    path: "/",
    redirect: "/login",
  },
  {
    path: "/login",
    component: Login,
    meta: { title: "登录" },
  },
  {
    path: "/home",
    component: Home,
    meta: { title: "首页",index:0},
  },
  {
    path: "/user",
    component: User,
    meta: { title: "个人中心",index:2 },
  },
  {
    path: "/info",
    component: Fragment,
    meta: { title: "各种信息" },
  },
  {
    path: "/news",
    component: News,
    meta: { title: "消息中心",index:1 },
  },
  {
    path: "/client",
    component: Client,
    meta: { title: "客户" },
  },
  {
    path: "/clientDetail",
    component:()=>import("../views/home/clients/ClientDetail"),
    meta: { title: "客户详情" },
  },
  {
    path: "/care",
    component: Care,
    meta: { title: "客户关怀" },
  },
  {
    path: "/express",
    component: Express,
    meta: { title: "快递单" }
  },
  {
    path:'/sendgoods/:id',
    component:()=>import('../views/home/express/SendGoods.vue'),
    meta:{title:'发货',iskeep:false}
  },
  {
    path: "/eva",
    component: Evaluate,
    meta: { title: "评论" },
  },
  {
    path: "/exc",
    component: ExComment,
    meta: { title: "快递单评价"},
  },
];
//解决路由重复点击报错
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}
const router = new VueRouter({
  routes
});
export default router;
