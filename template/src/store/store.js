import Vue from 'vue'
import Vuex from 'vuex'
import NativeApi from 'mmb-nativejs'
import Report from 'mmb-sensors'
Vue.use(Vuex)
const store = new Vuex.Store({
	state: {
		isIos: window.navigator.userAgent.match(/(iPhone\sOS)\s([\d_]+)/) ? true : false,
		iosVersion: 0,
		pageHistory: [],
		windowHistoryLength: window.history.length,
		isLogin: false,
		isMMbang: window.navigator.userAgent.match(/mmbang/) ? true : false,
		userInfoSetReady: false,
		cookieDomain: GetCookieDomain(),
	},
	mutations: {
		changeHistory(state, router) {
			var h = state.pageHistory;
			var l = h.length;
			var to = router.to.fullPath.split('/')[1];
			var from = router.from.fullPath.split('/')[1];
			if(!l && !from) {
				h.push(router.to.fullPath)
				state.windowHistoryLength = window.history.length
				return
			}
			if(h[l - 2] == router.to.fullPath && state.windowHistoryLength == window.history.length) {
				h.pop()
			} else {
				h.push(router.to.fullPath)
			}
			state.windowHistoryLength = window.history.length
		},
		getIosVersion(state) {
			if(state.isIos) {
				var ua = window.navigator.userAgent.toLowerCase();
				state.iosVersion = ua.match(/iphone os ([0-9]+)_/)[1];
			}
		},
		isLogin: (state, status) => {
			state.isLogin = status
		},
		changeUserInfoStatus(state, value) {
			state.userInfoSetReady = true;
      		state.userParams = value;
      		if (location.host.match(".com")) {
        		var base_url = 'https://www.mmbang.com/api/v2'
        		var server_url = 'https://sdlog-admin.mmbang.com:8106/sa?project=production'
      		} else {
        		var base_url = 'http://www.test1.mmbang.net/api/v2'
        		var server_url = 'https://sdlog-admin.mmbang.com:8106/sa?project=default'
      		}
      		Report.init(Object.assign(value,{
        		mmbapi_url: base_url + '/analytics/get-mmb-properties',
        		server_url: server_url
      		}))	
		},
		changeLoginStatus(state, id) {
			if(id) {
				state.isLogin = true;
			} else {
				if(state.isMMbang) {
					try {
						NativeApi.get_user_info(function(res) {
							if(NativeApi.is_login()) {
								state.isLogin = true;
							} else {
								state.isLogin = false;
							}
						})
					} catch(e) {
						//TODO handle the exception
					}
				}
			}
		},
		resetUserInfo(state, needback) {
			NativeApi.build_url_params_encode({}, function(res) {
				let domain = state.cookieDomain;
				let infoArr = ["app_?_sid", "app_?_skey", "?_app_client_id", "?_api_version", "?_device_id"];
				for(let i = 0; i < infoArr.length; i++) {
					let key = infoArr[i].split("?_")[1];
					setCookie(infoArr[i].replace('?_', ''), res[key]);
				}
				state.userParams = {
          		sid: res['sid'],
          		skey: res['skey'],
          		uid: res['uid'],
          		os_version: res['os_version'],
          		api_version: res['api_version'],
          		device_id: res['device_id']
        		}
				try {
					NativeApi.get_user_info(function(res) {
						if(NativeApi.is_login()) {
							state.isLogin = true;
							state.userInfoSetReady = true;
						} else {
							state.isLogin = false;
						}
					})
					if(needback) {
						router.back();
					}
				} catch(e) {}
			});

			function setCookie(c_name, value) {
				var domain = state.cookieDomain;
				document.cookie = c_name + "=" + escape(value) + ";path=/;domain=" + domain;
			}
		}
	}
});

function GetCookieDomain() {
	var host = location.hostname;
	var ip = /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/;
	if(ip.test(host) === true || host === 'localhost') return host;
	var regex = /([^]*).*/;
	var match = host.match(regex);
	if(typeof match !== "undefined" && null !== match) host = match[1];
	if(typeof host !== "undefined" && null !== host) {
		var strAry = host.split(".");
		if(strAry.length > 1) {
			host = strAry[strAry.length - 2] + "." + strAry[strAry.length - 1];
		}
	}
	return host;
}

export default store