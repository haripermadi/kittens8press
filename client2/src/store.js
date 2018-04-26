import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    activeUser: {
      token: localStorage.getItem('token') || '',
      username: localStorage.getItem('username') || '',
      userId: localStorage.getItem('userId') || ''
    },
    listArticles: []
  },
  getters: {
    getActiveUser: function (state) {
      return state.activeUser
    }
  },
  mutations: {
    getAllArticles: function (state, payload) {
      state.listArticles = payload
    },
    addArticle: function (state, payload) {
      state.listArticles.push(payload)
    }
  },
  actions: {
    signUp: function (context, payload) {
      axios({
        method: 'post',
        url: 'http://localhost:3000/users/signup',
        data: {
          username: payload.name,
          email: payload.email,
          password: payload.password
        }
      }).then(response => {
        console.log('signup===', response)
        alert('signup success!!')
        localStorage.setItem('token', response.data.userNew.token)
        localStorage.setItem('username', response.data.userNew.username)
        localStorage.setItem('userId', response.data.userNew.id)
        location.reload()
      }).catch(error => {
        console.log(error)
      })
    },
    signIn: function (context, payload) {
      axios({
        method: 'post',
        url: 'http://localhost:3000/users/signin',
        data: {
          email: payload.email,
          password: payload.password
        }
      }).then(response => {
        console.log('signup===', response)
        alert('signin success!!')
        localStorage.setItem('token', response.data.loginUser.token)
        localStorage.setItem('username', response.data.loginUser.username)
        localStorage.setItem('userId', response.data.loginUser.id)
        location.reload()
      }).catch(error => {
        console.log(error)
      })
    },
    getAllArticles: function (context, payload) {
      axios({
        method: 'get',
        url: 'http://localhost:3000/article'
      }).then(response => {
        context.commit('getAllArticles', response.data.articles)
      }).catch(error => {
        console.log(error)
      })
    },
    addArticle: function (context, payload) {
      axios({
        method: 'post',
        url: 'http://localhost:3000/article',
        headers: {
          token: context.state.activeUser.token
        },
        data: payload
      }).then(response => {
        console.log(response)
        context.commit('addArticle', response.data.articleInputed)
      })
    }
  }
})
