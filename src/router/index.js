import Vue from 'vue'
import Router from 'vue-router'
import Shop from '@/views/shop'

Vue.use(Router)

export default new Router({
  routes: [{
    path: '/',
    name: Shop,
    component: Shop
  }]
})
