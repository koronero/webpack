<template>
  <div id="app">
    <transition :name="transitionName">
       <keep-alive>
        <router-view :class="['view',useTransition?'tview':'']"></router-view>
      </keep-alive>
	</transition>  
  </div>
</template>

<script>
  import commonHeader from './components/common/header'
  import { mapState } from 'vuex'
   
export default {
    name: 'app',
    data() {
      return {
        transitionName: 'noslide',
        useTransition: true,
      }
    },
    computed: {
      userInfoSetReady() {
        return this.$store.state.userInfoSetReady
      }
    },
    watch: {
      '$route' (to, from) {
        this.$Indicator.close();
        const oldHistoryDepth = this.$store.state.pageHistory.length
        this.$store.commit('changeHistory', {
          to,
          from
        })
        const newHistoryDepth = this.$store.state.pageHistory.length
        if (this.useTransition) {
          if (oldHistoryDepth == 0) {
            this.transitionName = 'fade-show'
            return
          }
          this.transitionName = oldHistoryDepth < newHistoryDepth ? 'slide-left' : 'slide-right';
        } else {
          this.transitionName = 'noslide'
        }
      }
    },
    methods: {
      getApiRoot(url) {
        var root = '';
        if (window.location.host.match('.net')) {
          root = process.env.API_TEST
        } else {
          root = process.env.API_ROOT
        }
        if (url.match('.mmbang')) {
          return url
        }
        return root + url
      }
    },
    components: {
      commonHeader
    },
    created() {
      var that = this;
      // if (this.$store.state.isMMbang) {
      if (this.$store.state.isMMbang) {
        //请求拦截器
        this.axios.interceptors.request.use((config) => {
          // 在发送请求之前做些什么
          if (that.userInfoSetReady) {
            config.withCredentials = true;
            config.url =this.getApiRoot(config.url)
            return config
          } else {
            return Promise.reject({
              needretry: 1
            });
          }
        }, (error) => {
          // 对请求错误做些什么
          that.$toast('请求错误，呼叫管管~')
          return Promise.reject(error);
        });

        this.axios.interceptors.response.use((response) => {
          // 对响应数据做点什么
          return response;
        }, (error) => {
          // 对响应错误做点什么
          if (!error.needretry) {
            that.$toast('亲，您的网络不给力，请检查网络~');
          }
          that.$Indicator.close();
          return Promise.reject(error);
        });
      } else {
        this.axios.interceptors.request.use((config) => {
          config.url =this.getApiRoot(config.url)
          return config
        }, (error) => {
          // 对请求错误做些什么
          that.$toast('请求错误，呼叫管管~')
          return Promise.reject(error);
        });

      }
      this.$store.commit('getIosVersion')
      if (!this.$store.state.isIos || this.$store.state.iosVersion > 9) {
        this.useTransition = true;
      } else {
        this.useTransition = false;
      }
      if (this.$store.state.isMMbang) {
        let that = this;
        let cookieNA = that.NativeApi;
        cookieNA.get_user_info(() => {
          this.$store.state.isLogin = cookieNA.is_login();
          cookieNA.build_url_params_encode({}, function (res) {
            let infoArr = ["app_?_sid", "app_?_skey", "?_app_client_id", "?_api_version", "?_device_id"];
            for (let i = 0; i < infoArr.length; i++) {
              let key = infoArr[i].split("?_")[1];
              setCookie(infoArr[i].replace('?_', ''), res[key]);
            }
            that.$store.commit('changeUserInfoStatus', {
              sid: res['sid'],
              skey: res['skey'],
              uid: res['uid'],
              os_version: res['os_version'],
              api_version: res['api_version'],
              device_id: res['device_id'],
              channel: res['channel']
            });
            cookieNA.setNativeHeader({
              hide: 1
            }, () => {});
          });
        })
        function setCookie(c_name, value) {
          let domain = that.$store.state.cookieDomain;
          document.cookie = c_name + "=" + escape(value) + ";path=/;domain=" + domain;
        }
      }
    },
    mounted() {
      FastClick.attach(document.body);
      this.$store.commit('getIosVersion')
    }
  }
</script>

<style>
 #app {
    width: 100%;
    height: 100%;
  }

  .tview {
    -webkit-transition: -webkit-transform .4s cubic-bezier(.55, 0, .1, 1), opacity .4s cubic-bezier(.55, 0, .1, 1);
    transition: transform .4s cubic-bezier(.55, 0, .1, 1), opacity .4s cubic-bezier(.55, 0, .1, 1);
  }

  .fade-show-enter {
    position: absolute;
    opacity: 0;
  }

  .slide-left-enter,
  .slide-right-leave-active {
    position: absolute;
    opacity: 0;
    -webkit-transform: translate(30px, 0);
    transform: translate(30px, 0);
  }

  .slide-left-leave-active,
  .slide-right-enter {
    position: absolute;
    opacity: 0;
    -webkit-transform: translate(-30px, 0);
    transform: translate(-30px, 0);
  }

  .wc-popup-inner .wc-popup-text {
    color: #999;
    margin: 5px 0 0 0;
  }

  .wc-popup-inner .wc-popup-title {
    line-height: 24px;
    font-size: 17px;
    font-weight: 500;
    color: #444;
  }

  .wc-popup .wc-popup-inner {
    padding: 20px 20px 18px 20px
  }

  .wc-toast {
    bottom: 0;
    top: 50%
  }

  .fade-enter-active,
  .fade-leave-active {
    transform: translate3d(0, 0, 0);
    transition: opacity .3s;
  }

  .fade-enter,
  .fade-leave-active {
    transform: translate3d(0, 0, 0);
    opacity: 0;
  }
</style>
