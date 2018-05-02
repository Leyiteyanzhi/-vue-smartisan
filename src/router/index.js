import Vue from 'vue'
import Router from 'vue-router'
import Shop from '@/views/shop'
import Item from '@/views/item'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [{
    path: '/',
    name: 'Shop',
    component: Shop
  }, {
    path: '/item',
    name: 'Item',
    componen0t: Item
  }]
})
