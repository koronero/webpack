{{#if_eq build "standalone"}}
// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
{{/if_eq}}
import Vue from 'vue'
import App from './App'
{{#router}}
import router from './router'
{{/router}}
import store from './store/store.js';
import "babel-polyfill";
import axios from 'axios'
import NativeApi from 'mmb-nativejs'
import './assets/css/reset.css'
import FastClick from "./assets/js/fastclick.js";
import { Alert, Confirm, Toast } from 'mmb-wc-messagebox'
import loading from './components/loading/loading.js'
import 'mmb-wc-messagebox/style.css'
import qs from 'qs'
import Report from 'mmb-sensors'
import VueLazyload from 'vue-lazyload'




Vue.config.productionTip = false
const ConfirmOptions = {
	title: '提 示',
	style: {
		color: "#0090FF"
	}, // 同时应用在 yes, no 两个按钮上面的样式
	yes: {
		text: '确定',
		style: {}
	},
	no: {
		text: '取消',
		style: {}
	}
}
const AlertOptions = {
	title: '',
	btn: {
		text: '我知道了',
		style: {
			color: "#0090FF"
		}
	}
}

const ToastOptions = {
	position: 'center',
	duration: '1500'
}

axios.defaults.timeOut = 2000

Vue.config.productionTip = false;
Vue.prototype.axios = axios;
Vue.prototype.axiosQs = qs;
Vue.prototype.NativeApi = NativeApi
Vue.prototype.Report = Report
Vue.use(Alert, AlertOptions);
Vue.use(Confirm, ConfirmOptions);
Vue.use(Toast, ToastOptions);
Vue.use(loading)
/* eslint-disable no-new */
Vue.prototype.$isUserInfoReady = function() {
	var p = new Promise((resolve, reject) => {
		if(store.state.isMMbang) {
			if(store.state.userInfoSetReady) {
				resolve()
			} else {
				reject()
			}
		} else {
			resolve();
		}
	});
	return p;
}




/* eslint-disable no-new */
new Vue({
  el: '#app',
  {{#router}}
  router,
  {{/router}}
  store,
  {{#if_eq build "runtime"}}
  render: h => h(App)
  {{/if_eq}}
  {{#if_eq build "standalone"}}
  components: { App },
  template: '<App/>'
  {{/if_eq}}
})
