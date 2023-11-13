import { createStore } from 'vuex'

export default createStore({
  state: {
    isLoginIn:!!localStorage.getItem('token'),
  },
  getters: {
  },
  mutations: {
    setLogerIn(state,value){
      state.isLoginIn=value;
    }
  },
  actions: {
  },
  modules: {
  }
})
