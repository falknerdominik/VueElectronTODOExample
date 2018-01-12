const state = {
  url: 'localhost:3000/todo'
}

const mutations = {
  CHANGE_ENDPOINT (state, endpoint) {
    state.url = endpoint;
  },
  // INCREMENT_MAIN_COUNTER (state) {
  //   state.main++
  // }
}

const actions = {
  changeEndpoint (context, { endpoint } ) {
    return new Promise((resolve, reject) => {
      context.commit('CHANGE_ENDPOINT', endpoint);
    })
  }
}

const getters = {
  endpoint: state => state.url
}

export default {
  state,
  mutations,
  actions,
  getters
}
