import axios from 'axios'
import { Message, MessageBox } from 'element-ui'
import store from '../store'
import { getToken } from '@/utils/auth'
import qs from 'qs'

let baseUrl = process.env.VUE_APP_BASE_API || 'https://msz-api.ynoudun.com';

// 创建axios实例
let service =  axios.create({
	baseURL: baseUrl, // api的base_url
	timeout: 5000 // 请求超时时间
});
// request拦截器
service.interceptors.request.use(config => {
	if (store.getters.token) {
    config.headers['Authorization'] = getToken('Token')
	}
	return config
}, error => {
	Promise.reject(error)
});

// respone拦截器
service.interceptors.response.use(
	response => {
		// code:200,接口正常返回;
		const res = response.data
		if (res.code !== 200) {
			Message({message: res.message, type: 'error', duration: 5 * 1000});
			// 根据服务端约定的状态码：5001:非法的token; 5002:其他客户端登录了; 5004:Token 过期了;
			if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
				MessageBox.confirm('你已被登出，可以取消继续留在该页面，或者重新登录', '确定登出', {
					confirmButtonText: '重新登录',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					store.dispatch('LogOut').then(() => {
						location.reload()// 为了重新实例化vue-router对象 避免bug
					});
				});
			}
			return Promise.reject('error')
		} else {
			return response.data
		}
	},
	error => {
		Message({message: error.message, type: 'error', duration: 5 * 1000})
		return Promise.reject(error)
	}
)

const defaultErrorCallback = (error) => {}

export const serverData = { baseUrl }

export const getJson = (url, params, callback = () => { }, errcallback = defaultErrorCallback) => {
	service.request({
		url,
		method: 'get',
		params
	}).then(res => {
		callback(res)
	}).catch(res => {
		console.log('catch', res)
		errcallback(res)
	});
}

export const postJson = (url, data = {}, callback = () => { }) => {
	service.request({
		url,
		method: 'post',
		data
	}).then(res => {
		callback
	});
}

export const postForm = (url, data = {}, callback = () => { }, errcallback = defaultErrorCallback) => {
	service.request({
		headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
		url,
		method: 'post',
		data: qs.stringify(data)
	}).then(res => {
		// console.log('then', res)
		callback(res)
	}).catch(res => {
		// console.log('catch', res)
		errcallback(res)
	})
}

export const putForm = (url, data = {}, callback = () => { }, errcallback = defaultErrorCallback) => {
	service.request({
		headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
		url,
		method: 'put',
		data: qs.stringify(data)
	}).then(res => {
		// console.log('then', res)
		callback(res)
	}).catch(res => {
		// console.log('catch', res)
		errcallback(res)
	})
}

export const patchForm = (url, data = {}, callback = () => { }, errcallback = defaultErrorCallback) => {
	service.request({
		headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
		url,
		method: 'patch',
		data: qs.stringify(data)
	}).then(res => {
		// console.log('then', res)
		callback(res)
	}).catch(res => {
		// console.log('catch', res)
		errcallback(res)
	})
}

export const deleteJson = (url, params, callback = () => { }, errcallback = defaultErrorCallback) => {
	service.request({
		url,
		method: 'delete',
		params
	}).then(res => {
		callback(res)
	}).catch(res => {
		// console.log('catch', res)
		errcallback(res)
	})
}

export const deleteJsonSYNC = (url, params) => {
	return service.request({
		url,
		method: 'delete',
		params
	})
}

export default service
