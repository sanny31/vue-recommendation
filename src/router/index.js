import Vue from 'vue'
import Router from 'vue-router'
import recommend from '@/components/recommend'
import intro from '@/components/intro'
import confirm from '@/components/confirm'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: __dirname,
  routes: [
    {
      path: '/',
      name: 'home',
      component: recommend
    },
    {
      path: '/intro',
      name: 'intro',
      component: intro
    },
    {
      path: '/confirm',
      name: 'confirm',
      component: confirm
    },
    {
      path: '/index.html',
      name: 'home2',
      component: recommend
    }
  ]
})
export default router
