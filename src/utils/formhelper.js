/**
 * @param {string} path
 * @returns {Boolean}
 */
export function isExternal(path) {
	return /^(https?:|mailto:|tel:)/.test(path)
}

export function isObj(jsonStr) {
	if (typeof jsonStr !== 'string') {
		jsonStr = String(jsonStr)
	}
	if (jsonStr.indexOf('{') === 0 || jsonStr.indexOf('[') === 0) {
		try {
			JSON.parse(jsonStr)
			// console.log(obj)
			return true
		} catch (e) {
			// console.log(e)
			return false
		}
	} else {
		return false
	}
}

/**
 * @param {string} str
 * @returns {Boolean}
 */
export function validUsername(str) {
	const valid_map = ['admin', 'editor']
	return valid_map.indexOf(str.trim()) >= 0
}

export const requirRule = [{
	required: true,
	message: '该项为必填项'
}]

export const regPhone = (value) => {
	// 电话去掉空格
	if (typeof value === 'number') {
		value = String(value)
	}
	const phone = value.replace(/\s/g, '')
	const reg = /(^1[2|3|4|5|6|7|8|9]\d{9}$)|(^09\d{8}$)/

	if (reg.test(phone)) {
		return true
	} else {
		return false
	}
}

export const beforeToday = (time) => {
	const today = new Date()
	today.setHours(0, 0, 0, 0)
	return time.getTime() < today
}

export const rangePickerOptions = {
	shortcuts: [{
		text: '最近一周',
		onClick(picker) {
			const end = new Date()
			const start = new Date()
			start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
			picker.$emit('pick', [start, end])
		}
	}, {
		text: '最近一个月',
		onClick(picker) {
			const end = new Date()
			const start = new Date()
			start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
			picker.$emit('pick', [start, end])
		}
	}, {
		text: '最近三个月',
		onClick(picker) {
			const end = new Date()
			const start = new Date()
			start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
			picker.$emit('pick', [start, end])
		}
	}]
}

export const datePickerOptions = {
	disabledDate(time) {
		return time.getTime() > Date.now()
	},
	shortcuts: [{
		text: '今天',
		onClick(picker) {
			picker.$emit('pick', new Date())
		}
	}, {
		text: '昨天',
		onClick(picker) {
			const date = new Date()
			date.setTime(date.getTime() - 3600 * 1000 * 24)
			picker.$emit('pick', date)
		}
	}, {
		text: '一周前',
		onClick(picker) {
			const date = new Date()
			date.setTime(date.getTime() - 3600 * 1000 * 24 * 7)
			picker.$emit('pick', date)
		}
	}]
}

export const dateFormat = (str, fmt = 'YYYY-MM-DD HH:mm:ss') => {
	const date = new Date(str)
	var o = {
		'M+': date.getMonth() + 1, // 月份
		'D+': date.getDate(), // 日
		'H+': date.getHours(), // 小时
		'm+': date.getMinutes(), // 分
		's+': date.getSeconds(), // 秒
		'q+': Math.floor((date.getMonth() + 3) / 3), // 季度
		'S': date.getMilliseconds() // 毫秒
	}
	if (/(Y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
	for (var k in o) {
		if (new RegExp('(' + k + ')').test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : ((
			'00' + o[k]).substr(('' + o[k]).length)))
	}
	return fmt
}

export const changeToChinese = (n) => {
	if (!n) {
		return ''
	}
	var fraction = ['角', '分']
	var digit = [
		'零', '壹', '贰', '叁', '肆',
		'伍', '陆', '柒', '捌', '玖'
	]
	var unit = [
		['元', '万', '亿'],
		['', '拾', '佰', '仟']
	]
	var head = n < 0 ? '欠' : ''
	n = Math.abs(n)
	var s = ''
	for (var i = 0; i < fraction.length; i++) {
		s += (digit[Math.floor(n * 10 * Math.pow(10, i)) % 10] + fraction[i]).replace(/零./, '')
	}
	s = s || '整'
	n = Math.floor(n)
	for (var i = 0; i < unit[0].length && n > 0; i++) {
		var p = ''
		for (var j = 0; j < unit[1].length && n > 0; j++) {
			p = digit[n % 10] + unit[1][j] + p
			n = Math.floor(n / 10)
		}
		s = p.replace(/(零.)*零$/, '').replace(/^$/, '零') + unit[0][i] + s
	}
	return head + s.replace(/(零.)*零元/, '元')
		.replace(/(零.)+/g, '零')
		.replace(/^整$/, '零元整')
}

export const bankCard = (card) => {
	if (card) {
		if (typeof card !== 'string') {
			card = String(card)
		}
		return card.replace(/(\d{4})(?=\d)/g, '$1 ')
	} else {
		return ''
	}
}

export const moneyFilter = (val) => {
	if (typeof val === 'undefined' || val === null) {
		return '0.00'
	}

	val = val.toString().replace(/\$|\,/g, '')
	if (isNaN(val)) {
		val = '0'
	}
	val = Number(val)
	const sign = (val === (val = Math.abs(val)))

	val = Math.floor(val * 100 + 0.50000000001)
	let cents = val % 100
	val = Math.floor(val / 100).toString()
	if (cents < 10) {
		cents = '0' + cents
	}
	for (var i = 0; i < Math.floor((val.length - (1 + i)) / 3); i++) {
		val = val.substring(0, val.length - (4 * i + 3)) + ',' + val.substring(val.length - (4 * i + 3))
	}

	return (((sign) ? '' : '-') + val + '.' + cents)
}

export const trim = (val) => {
	if (val) {
		return val.toString().replace(/\s/g, '')
	} else {
		return ''
	}
}
