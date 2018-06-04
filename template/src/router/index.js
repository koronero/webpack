import Vue from 'vue'
import Router from 'vue-router'

const Home = () =>
  import ('../pages/home.vue')

const Notfound = () =>
  import ('../components/common/404.vue')  

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: '/new-project',
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    }
  ]
})
router.beforeEach((to, from, next) => {
  if ((to.matched.length && window.navigator.userAgent.match(/mmbang/)) || to.name == '404') {
    next()
  } else {
    next('/404')
  }
})
export default router;