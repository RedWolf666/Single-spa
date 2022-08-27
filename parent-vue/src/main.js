import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { registerApplication, start } from 'single-spa'
Vue.config.productionTip = false

//四个参数的含义：第一个是需要注册的子应用别名
//第二个是我要调用的加载方法，要求必须是一个promise函数
//第三个是什么时候会加载
//第四个参数可传可不传，表示父子应用间通信的参数，可以是属性，也可以是方法
registerApplication('myVueApp',
  async () => {
    console.log('加载子应用')
    //systemJs  动态的创建一个script标签，再把对应的文件引进来
    await loadScript('http://localhost:1000/js/chunk-vendors.js')
    await loadScript('http://localhost:1000/js/app.js')
    console.log(window.singleVue)
    return window.singleVue
  },
  location => location.pathname.startsWith('/vue')//用户切换到了/vue的路径下，我需要加载刚才定义的子应用
)
start()
//singleSpa的缺点
//缺点1：不够灵活，不能动态加载js文件，这个js文件可能有n多个
//缺点2：样式不隔离
//缺点3：全局对象没有js沙箱的机制

async function loadScript(url) {
  return new Promise((res, rej) => {
    let script = document.createElement('script')
    script.src = url
    script.onload = res
    script.onerror = rej
    document.head.appendChild(script)
  })
}

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
