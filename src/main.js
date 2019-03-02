import Vue from 'vue'
import Vuex from 'vuex'
import BootstrapVue from "bootstrap-vue"
import VueRouter from 'vue-router'
import VueFire from 'vuefire'
import App from './App.vue'
import firebase from 'firebase'

Vue.config.productionTip = false

// Components
import MainPage from './components/MainPage.vue'
import Navbar from './components/Navbar.vue'
import Feed from './components/Feed.vue'
import Blog from './components/Blog.vue'
import Profile from './components/Profile.vue'
import Login from './components/Login.vue'
import Register from './components/Register.vue'
import Messages from './components/Messages.vue'
import People from './components/People.vue'
import ProfileView from './components/ProfileView.vue'

// Projects
import Projects from './components/Projects.vue'
import ProjectView from './components/ProjectView.vue'
import NewProject from './components/NewProject.vue'
import db from './components/firebaseInit'

import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap-vue/dist/bootstrap-vue.css"

Vue.use(BootstrapVue)
Vue.use(VueRouter)
Vue.use(VueFire)
Vue.use(Vuex)

const router = new VueRouter({
  routes: [
    { path: '/', component: App,
      children: [
        {
          path: '/profile',
          name: 'profile',
          component: Profile,
          meta: {
            requiresAuth: true
          }
        },
        {
          path: '/read/:blog_id',
          name: 'blog',
          component: Blog,
        },
        {
          path: '/login',
          name: 'login',
          component: Login
        },
        {
          path: '/register',
          name: 'register',
          component: Register
        },
        {
          path: '/feed',
          name: 'feed',
          component: Feed,
          meta: {
            requiresAuth: true
          }
        },
        // PEOPLE
        {
          path: '/people',
          name: 'people',
          component: People,
          meta: {
            requiresAuth: true
          }
        },
        {
          path: '/u/:userid',
          name: 'user-view',
          component: ProfileView,
          meta: {
            requiresAuth: true
          }
        },
        // MESSAGES
        {
          path: '/messages',
          name: 'messages',
          component: Messages,
          meta: {
            requiresAuth: true
          }
        },

        // PROJECTS
        {
          path: '/projects',
          name: 'projects',
          component: Projects,
          meta: {
            requiresAuth: true
          }
        },
        {
          path: '/new',
          name: 'new-project',
          component: NewProject,
          meta: {
            requiresAuth: true
          }
        },
        {
          path: '/proj/:projid',
          name: 'project-view',
          component: ProjectView,
          meta: {
            requiresAuth: true
          }
        }
      ]}
  ]
})

// Initialize Firebase
let app;
var database = firebase.database();



firebase.auth().onAuthStateChanged(function(user) {
  console.log("CREASION")
  if (!app) {
    var uid = '0'
    if (user) {
      uid = user.uid
    }

    const store = new Vuex.Store({
      state: {
        uid: uid,
        name: '',
        notifications: []
      },
      getters: {
        currentUid: state => {
          return state.uid
        }
      },
      mutations: {
        addNot(state, not) {
          const notif = {
            msg : msg,
            icon: icon
          }
          console.log("NOTIF ICON: " + not)
          state.notifications.push(not)
        },
        addSuccessNot(state, msg) {
          const notif = {
            msg: msg, icon: "fa-check"
          }
          state.notifications.push(notif)
        },
        removeNot(state) {
          state.notifications.pop()
        },
        // Set a new display name
        setName(state, newName) {
          console.log("Nombre cambiado")
          state.name = newName
        },
        setUid(state, newUid) {
          console.log("Uid cambiado")
          state.uid = newUid
        },

        // Log out
        logout(state) {
          console.log("Sesión cerrada")
          state.name = ''
          state.uid = '0'
        }
      }

    })

    app = new Vue({
      router,
      store,
      data: {
        globalUid: uid
      }
    }).$mount('#app')
  }
});

// to -> target route object being navigated to
// from -> current route being navigated away from
// next -> function that must be called to resolve the hook
router.beforeEach((to, from, next) => {
  let currentUser = firebase.auth().currentUser;
  let requiresAuth = to.matched.some( record => record.meta.requiresAuth);

  // If the route we navigate to requires authentication and there is no current
  // user logged in
  if (requiresAuth && !currentUser) {
    next('login')
  }
  // If the route we navigate does not require authentication and there is a user logged in
  else if (!requiresAuth && currentUser) next ('feed')
  else next()
})
