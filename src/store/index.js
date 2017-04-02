import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({})

store.registerModule('vux', {
  state: {
    isLoading: false,
    direction: 'forward'
  },
  mutations: {
    updateLoadingStatus (state, payload) {
      state.isLoading = payload.isLoading
    },
    updateDirection (state, payload) {
      state.direction = payload.direction
    }
  }
})

store.registerModule('zxy', {
  state: {
    isLogin: false,
    dividerText: '下面没有内容啦',
    recommendation: {
      Title: '',
      WxAccount: '',
      Nickname: '',
      Telphone: '',
      Email: '',
      Content: '',
      Pictures: []
    },
    rules: ''
  },
  actions: {
    setRecommendation ({commit}, recommendation) {
      commit('SETRECOMMENDATION', recommendation)
    },
    clearRecommendation ({commit}) {
      commit('CLEARRECOMMENDATION')
    },
    getRecommendationValidation ({commit}) {
      commit('GETRECOMMENDATIONVALIDATION')
    },
    setRules ({commit}, rules) {
      commit('SETRULES', rules)
    }
  },
  mutations: {
    SETRECOMMENDATION (state, recommendation) {
      state.recommendation = recommendation
    },
    CLEARRECOMMENDATION (state) {
      state.recommendation.Title = ''
      state.recommendation.WxAccount = ''
      state.recommendation.Nickname = ''
      state.recommendation.Telphone = ''
      state.recommendation.Email = ''
      state.recommendation.Content = ''
      state.recommendation.Pictures = []
    },
    SETRULES (state, rules) {
      state.rules = rules
    }
  },
  getters: {
    getRecommendationValidation (state) {
      var validation = { success: true }
      console.log(state.recommendation)
      if (state.recommendation.Title === '' || state.recommendation.Title === null) {
        validation.success = false
        validation.error = '标题必须填写'
      } else if (state.recommendation.WxAccount === '' || state.recommendation.WxAccount === null) {
        validation.success = false
        validation.error = '微信号必须填写'
      } else if (state.recommendation.Nickname === '' || state.recommendation.Nickname === null) {
        validation.success = false
        validation.error = '姓名必须填写'
      } else if (state.recommendation.Telphone === '' || state.recommendation.Telphone === null) {
        validation.success = false
        validation.error = '手机号必须填写'
      } else if (state.recommendation.Email === '' || state.recommendation.Email === null) {
        validation.success = false
        validation.error = '邮箱必须填写'
      } else if (state.recommendation.Content === '' || state.recommendation.Content === null) {
        validation.success = false
        validation.error = '正文必须填写'
      }
      return validation
    }
  }
})

export default store
