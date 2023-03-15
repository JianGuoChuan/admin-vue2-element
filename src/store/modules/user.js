import * as mUtils from '@/utils/mUtils'
import {
	logout,
	getUserInfo
} from '@/api/user' // 导入用户信息相关接口
import {
	getToken,
	setToken,
	removeToken,
	getLocalUserInfo,
	removeDataUserInfo
} from '@/utils/auth'
import {
	decode
} from 'jsonwebtoken'

const user = {
	state: {
		name: '',
		avatar: '',
		token: getToken('Token'),
		roles: [],
		browserHeaderTitle: mUtils.getStore('browserHeaderTitle') || '南宁联通Admin',
		phone: '',
		userinfo: {}
	},
	getters: {
		token: state => state.token,
		roles: state => state.roles,
		avatar: state => state.avatar,
		name: state => state.name,
		userinfo: state => state.userinfo,
		browserHeaderTitle: state => state.browserHeaderTitle,
	},
	mutations: {
		SET_ROLES: (state, roles) => {
			state.roles = roles
		},
		SET_BROWSERHEADERTITLE: (state, action) => {
			state.browserHeaderTitle = action.browserHeaderTitle
		},
		SET_NAME: (state, name) => {
			state.name = name
		},
		SET_AVATAR: (state, avatar) => {
			state.avatar = avatar
		},
		SET_PHONE: (state, phone) => {
			state.phone = phone
		},
		SET_USERINFO: (state, userinfo) => {
			state.userinfo = userinfo
		},
		SET_TOKEN: (state, token) => {
			state.token = token
		},
	},
	actions: {
		//登出
		LogOut({commit,reqData}) {
			return new Promise((resolve, reject) => {
				// logout(reqData).then(response => {
					commit('SET_ROLES', [])
					removeToken('Token')
					removeDataUserInfo('userInfo')
					resolve()
				// })
			})
		},
		Login() {},
		getInfo({commit, state}) {
			return new Promise((resolve, reject) => {
				if (state.token) {
					// 这是利用jsonwebtoken解析token的获取角色权限信息的方式
					// const info = decode(state.token.replace('Bearer ', ''))
					// info.roles = [info.role]
					// 这是利用本地存储获取角色权限信息的方式
					const info = getLocalUserInfo('userInfo');
					info.roles = [info.rids]
					
					commit('SET_USERINFO', info)
					commit('SET_ROLES', info.roles)
					commit('SET_NAME', info.sub)
					resolve(info)
				} else {
					reject()
				}

			})
		},
		// 动态修改权限;本实例中,role和token是相同的;
		ChangeRoles({commit}, role) {return new Promise(resolve => {
				const token = role;
				setToken("Token", token)
				getUserInfo({
					"token": token
				}).then(res => {
					let data = res.data.userList;
					commit('SET_ROLES', data.roles)
					commit('SET_NAME', data.name)
					commit('SET_AVATAR', data.avatar)
					resolve()
				})
			})
		},
	}
}

export default user;

