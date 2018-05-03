import Vue from 'vue'
import Vuex from 'Vuex'

Vue.use(Vuex)

let store = new Vuex.Store({
  state: {
    carPanelData: [
    ],
    maxOff: false,
    carShow: false,
    carTimer: null
  },
  getters: {
    totleCount (state) {
      let count = 0
      state.carPanelData.forEach((goods) => {
        count += goods.count
      })
      return count
    },
    totlePrice (state) {
      let price = 0
      state.carPanelData.forEach((goods) => {
        price += goods.count * goods.price
      })
      return price
    },
    allChecked (state) {
      let allChecked = true
      state.carPanelData.forEach((goods) => {
        if (!goods.checked) {
          allChecked = false
          return ''
        }
      })
      return allChecked
    },
    checkedCount (state) {
      let count = 0
      state.carPanelData.forEach((goods) => {
        if (goods.checked) {
          count += goods.count
        }
      })
      return count
    },
    checkedPrice (state) {
      let price = 0
      state.carPanelData.forEach((goods) => {
        if (goods.checked) {
          price += goods.count * goods.price
        }
      })
      return price
    },
    checkedGoods (state) {
      let checkedGoods = []
      state.carPanelData.forEach((goods) => {
        if (goods.checked) {
          checkedGoods.push(goods)
        }
      })
      return checkedGoods
    }
  },
  mutations: {
    addCarPanelData (state, data) {
      let bOff = true
      state.carPanelData.forEach((goods) => {
        if (goods.sku_id === data.info.sku_id) {
          goods.count += data.count
          bOff = false
          if (goods.count > goods.limit_num) {
            goods.count -= data.count
            state.maxOff = true
            return
          }
          state.carShow = true
        }
      })
      if (bOff) {
        let goodsData = data.info
        Vue.set(goodsData, 'count', data.count)
        Vue.set(goodsData, 'checked', true)
        state.carPanelData.push(goodsData)
        state.carShow = true
      }
    },
    delCarPanelData (state, id) {
      state.carPanelData.forEach((goods, index) => {
        if (goods.sku_id === id) {
          state.carPanelData.splice(index, 1)
          return ''
        }
      })
    },
    closePrompt (state) {
      state.maxOff = false
    },
    showCar (state) {
      clearTimeout(state.carTimer)
      state.carShow = true
    },
    hideCar (state) {
      state.carTimer = setTimeout(() => {
        state.carShow = false
      }, 1000)
    },
    plusCarPanelData (state, id) {
      state.carPanelData.forEach((goods, index) => {
        if (goods.sku_id === id) {
          if (goods.count >= goods.limit_num) return
          goods.count++
          return ''
        }
      })
    },
    subCarPanelData (state, id) {
      state.carPanelData.forEach((goods, index) => {
        if (goods.sku_id === id) {
          if (goods.count <= 1) return
          goods.count--
          return ''
        }
      })
    },
    checkGoods (state, id) {
      state.carPanelData.forEach((goods, index) => {
        if (goods.sku_id === id) {
          goods.checked = !goods.checked
          return ''
        }
      })
    },
    allCheckGoods (state, allChecked) {
      state.carPanelData.forEach((goods, index) => {
        goods.checked = !allChecked
      })
    },
    delCheckGoods (state) {
      let i = state.carPanelData.length
      while (i--) {
        if (state.carPanelData[i].checked) {
          state.carPanelData.splice(i, 1)
        }
      }
    }
  }
})

export default store
