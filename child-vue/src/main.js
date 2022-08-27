import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import singleSpaVue from 'single-spa-vue'

Vue.config.productionTip = false

const appOptions = {
  router,
  store,
  render: h => h(App),
  el: '#vue'//不是当前应用的#app了，而是你要挂载到父应用的哪个标签上去
}
const vueLifeCycle = singleSpaVue({ Vue, appOptions }) //他就会返回一个对象，对象里面就会自动包含bootstrap、mount、unmount
//如果是父应用引用我
console.log(window.singleSpaNavigate, 'window.singleSpaNavigate')
if (window.singleSpaNavigate) {
  __webpack_public_path__ = 'http://localhost:1000/'
}
//如果还是正常的子应用访问的方法，还需要正常的new Vue
if (!window.singleSpaNavigate) {
  delete appOptions.el
  new Vue(appOptions).$mount('#app')
}
//相当于协议接入，我定义好了协议，父应用会调用这些方法
export const bootstrap = vueLifeCycle.bootstrap
export const mount = vueLifeCycle.mount
export const unmount = vueLifeCycle.unmount