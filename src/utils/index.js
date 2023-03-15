/**防抖
 * @param {Function} func
 * @param {number} wait
 * @param {boolean} immediate
 * @return {*}
 */
export function debounce(func, wait, immediate) {
	let timeout, args, context, timestamp, result

	const later = function() {
		// 据上一次触发时间间隔
		const last = +new Date() - timestamp

		// 上次被包装函数被调用时间间隔 last 小于设定时间间隔 wait
		if (last < wait && last > 0) {
			timeout = setTimeout(later, wait - last)
		} else {
			timeout = null
			// 如果设定为immediate===true，因为开始边界已经调用过了此处无需调用
			if (!immediate) {
				result = func.apply(context, args)
				if (!timeout) context = args = null
			}
		}
	}

	return function(...args) {
		context = this
		timestamp = +new Date()
		const callNow = immediate && !timeout
		// 如果延时不存在，重新设定延时
		if (!timeout) timeout = setTimeout(later, wait)
		if (callNow) {
			result = func.apply(context, args)
			context = args = null
		}

		return result
	}
}
/**
 * @param {string} phone
 */
export function isvalidPhone(phone) {
	const reg = /^1[3|4|5|6|7|8|9][0-9]\d{8}$/
	return reg.test(phone)
}

export function isObj(jsonStr) {
	if (typeof jsonStr !== 'string') {
		jsonStr = String(jsonStr)
	}
	if (jsonStr.indexOf('{') === 0 || jsonStr.indexOf('[') === 0) {
		try {
			JSON.parse(jsonStr)
			return true
		} catch (e) {
			return false
		}
	} else {
		return false
	}
}
