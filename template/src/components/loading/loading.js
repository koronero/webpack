import Vue from 'vue'
import LoadingComponent from './loading.vue'
let LoadingPlugin = {};
// 插件必须要有一个install方法
LoadingPlugin.install = function(Vue, options = {}) {
  let LoadingController = Vue.extend(LoadingComponent)
  var instance = new LoadingController().$mount(document.createElement('div'))
  if(!document.getElementById('mmbang-toast')) {
    document.body.appendChild(instance.$el)
  }
  Vue.prototype.$Indicator ={
    open:()=>instance.tips.isShow = true,
    close:()=>instance.tips.isShow = false
  }
}
// 最后将以上内容导出，即可在其他地方进行使用
export default LoadingPlugin
