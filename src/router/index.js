import Vue from 'vue'
import Router from 'vue-router'
import { Layout,Content }  from "../layout"; // 页面整体布局
import { topRouterMap } from "./topRouter";

process.env.NODE_ENV === "development" ? Vue.use(Router) : null;


const originalPush = Router.prototype.push
Router.prototype.push = function push(location, onResolve, onReject) {
  if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject)
  return originalPush.call(this, location).catch(err => err)
}


function filterTopRouterMap(name){
	let router = topRouterMap.find((item) => {
		return item.parentName === name;
	});
	return router.data; // arr
}

/**
 * 1、roles:后台返回的权限结构;
 *
 */
//手动跳转的页面白名单
const whiteList = [
	'/'
];
/**
 * path:''与path:'*'的区别：
 * 1、path:'*', 会匹配所有路径
 * 2、path:''，也是会匹配到路由
 *
 */
//默认不需要权限的页面
export const constantRouterMap = [
	{
		path: '',
		component: Layout,
		redirect: '/index/index',
		hidden:true
	},
	{ path: '/login',name: 'login',component:() => import('@/page/login'),hidden: true},
	{ path: '/404', component: () => import('@/page/errorPage/404'), hidden: true },
	{ path: '/401', component: () => import('@/page/errorPage/401'), hidden: true },
	{
		path: '/index',
		name: 'index',
		component:Layout,
		meta:{
			title:'控制台',
			icon: 'el-icon-coordinate',
		},
		noDropdown:true,
		children:[
			{
				path:'index',
				meta:{
					title:'控制台',
					icon:'el-icon-coordinate',
				  routerType:'leftmenu'
				},
				component: () => import('@/page/index/index'),
			}
		]
	}
]
//注册路由
export default new Router({
	mode:'history', // 默认为'hash'模式
	base: '/', // 添加跟目录,对应服务器部署子目录
	routes: constantRouterMap
})

  //异步路由（需要权限的页面）
export const asyncRouterMap = [
	{
		path:'/talentPool',
		name: 'talentPool',
		meta: {
			title:'人才库',
			icon: 'el-icon-user-solid',
			roles: ['1' ,'2', '3', '9' ]
		},
		component:Layout,
		noDropdown: true,
		children:[
			{
				path:'talentPool',
				meta:{
					title:'人才库',
					icon:'el-icon-user-solid',
					routerType:'leftmenu'
				},
				component: () => import('@/page/talentPool/index'),
			}
		]
	},
	{
		path:'/jobManage',
		name: 'jobManage',
		meta: {
			title:'职位管理',
			icon: 'el-icon-s-custom',
			roles: ['1' ,'2', '3', '9' ]
		},
		component:Layout,
		noDropdown: true,
		children:[
			{
				path:'jobManage',
				meta:{
					title:'职位管理',
					icon:'el-icon-s-custom',
					routerType:'leftmenu'
				},
				component: () => import('@/page/jobManage/index'),
			}
		]
	},
	{
		path:'/communication',
		name: 'communication',
		meta: {
			title:'沟通中心',
			icon: 'el-icon-s-comment',
			roles: ['1' ,'2', '3', '9' ]
		},
		component:Layout,
		noDropdown: true,
		children:[
			{
				path:'communication',
				meta:{
					title:'沟通中心',
					icon:'el-icon-s-comment',
					routerType:'leftmenu'
				},
				component: () => import('@/page/communication/index'),
			}
		]
	},
	{
		path:'/worker',
		name: 'worker',
		meta: {
			title:'人才管理',
			icon: 'el-icon-s-claim',
			roles: ['1' ,'2', '3', '9' ]
		},
		component:Layout,
		noDropdown: true,
		children:[
			{
				path:'worker',
				meta:{
					title:'人才管理',
					icon:'el-icon-s-claim',
					routerType:'leftmenu'
				},
				component: () => import('@/page/worker/index'),
			}
		]
	},
	{
		path:'/operations',
		name: 'operations',
		meta: {
			title:'运营中心',
			icon: 'el-icon-data-line',
			roles: ['1' ,'2', '3', '9' ]
		},
		component:Layout,
		noDropdown: false,
		children:[
			{
				path:'contentManage',
				meta:{
					title:'内容管理',
					icon:'el-icon-data-line',
					routerType:'leftmenu'
				},
				component: () => import('@/page/operations/contentManage/index'),
			}
		]
	},
	{ path: '*', redirect: '/404', hidden: true }
];

	/**
	 *  路由设置要求：
	 * 1、该路由有子菜单,可以设置多层嵌套路由children;如果没有子菜单,不需要设置children;通过item.children.length来判断路由的级数;
	 * 2、登录成功后,定位到系统首页时,需要加载页面整体布局组件Layout并进行子路由定向加载;
	 *
	 * 按需加载路由组件的2种方法：
	 * 1、component: () => import('@/page/login')
	 * 2、component:resolve => require(['@/page/fundPosition'], resolve)
	 *
	 *
	 *
	 * 什么情况下，路由会定位到404页面?
	 * 路由中redirect:'',不起作用？
	 * 三级子菜单要在顶部展示？
	 *
	 *
	 *
	 */

