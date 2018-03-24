const state = {
  activeIndex: 1,
  tweetItemDialogVisible: false,
  idStr: '',
  screenName: '',
  favorited: false,
  retweeted: false
}

const mutations = {
  SET_ACTIVECALL_STATE  (state, top) {
    state.activeCall.state = top
    state.activeCallState = top
  },
  SET_ACTIVECALL_ID  (state, top) {
    state.activeCall.id = top
    // state.activeCallState = top
  },
  SET_ACTIVE_CALL (state, call) {
    console.log('set chat participant as ' + call)
    state.activeCall = call
  },
  REFRESH_DIRECTORY (state, data) {
    console.log('data refreshed')
    if (data) state.contacts = data
  },
  SET_CONVERSATIONS (state, conversations) {
    state.conversations = conversations
    state.conversations2 = state.conversations[1]
  },
  ADD_CONVERSATION (state, conversation) {
    state.conversations.push(conversation)
    state.conversations2.push(state.conversations[1])
  },
  UPDATE_CALLS (state, calls) {
    console.log('add call if not exist')
    state.calls = calls
    calls.forEach(function (call) {
      if (call.id === state.activeCall.id) {
        state.activeCall = call
      }
    })
  },    
  CHANGE_ACTIVE_INDEX (state, index) {
    state.activeIndex = index
  },
  OPEN_TWEET_ITEM_DIALOG (state) {
    state.tweetItemDialogVisible = true
  },
  CLOSE_TWEET_ITEM_DIALOG (state) {
    state.tweetItemDialogVisible = false
  },
  SET_ID_STR (state, idStr) {
    state.idStr = idStr
  },
  SET_SCREEN_NAME (state, screenName) {
    state.screenName = screenName
  },
  SET_FAVORITED (state, favorited) {
    state.favorited = favorited
  },
  SET_RETWEETED (state, retweeted) {
    state.retweeted = retweeted
  }
}

const actions = {
  connect ({ commit }, credentials) {
    // addEventListeners()
     console.log(
     'credentials' + credentials.username + ' ' + credentials.password
   )
     kandy.connect(credentials)
     addEventListeners()
     commit({type: 'INITIALIZE_ACTIVE_CALL'})
   },
   disconnect ({ commit }) {
     kandy.disconnect()
   },
  changeActiveIndex ({ commit }, index) {
    commit('CHANGE_ACTIVE_INDEX', index)
  },
  openTweetItemDialog ({ commit }, {idStr, screenName, favorited, retweeted}) {
    commit('OPEN_TWEET_ITEM_DIALOG')
    commit('SET_ID_STR', idStr)
    commit('SET_SCREEN_NAME', screenName)
    commit('SET_FAVORITED', favorited)
    commit('SET_RETWEETED', retweeted)
  },
  closeTweetItemDialog ({ commit }) {
    commit('CLOSE_TWEET_ITEM_DIALOG')
  },
  removeSelectedItem ({ commit }) {
    if (state.activeIndex !== 0) {
      commit('SET_SCREEN_NAME', '')
      commit('SET_ID_STR', '')
    }
  }
}

export default {
  state,
  mutations,
  actions
}
