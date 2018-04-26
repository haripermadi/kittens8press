import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import About from './views/About.vue'
import PostArticle from './views/PostArticle'
import MyArticles from './views/MyArticles'
import store from './store'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/about',
      name: 'about',
      component: About
    },
    {
      path: '/postarticle',
      name: 'PostArticle',
      component: PostArticle,
      beforeEnter: (to, from, next) => {
        console.log('beforeenter===', store.state.activeUser)
        if (store.state.activeUser.token !== '') {
          next()
        } else {
          next({path: '/'})
        }
      }
    },
    {
      path: '/myarticles',
      name: 'MyArticles',
      component: MyArticles,
      beforeEnter: (to, from, next) => {
        console.log('beforeenter===', store.state.activeUser)
        if (store.state.activeUser.token !== '') {
          next()
        } else {
          next({path: '/'})
        }
      }
    }
  ]
})
