import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store/'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

import './components/iconSvg'

import '@/permission'

// i18n国际化
import i18n from "@/lang";

// 分享功能集合
import {
	shareConfig
} from './utils/share';
Vue.prototype.shareConfig = shareConfig;

import "./assets/icon/iconfont.css";
import "./assets/ybh_icon/iconfont.css";
Vue.config.productionTip = false;

new Vue({
	router,
	store,
	i18n, // 便于可以直接在组件中通过this.$i18n使用，也可以按需引用
	render: h => h(App),
}).$mount('#app')
