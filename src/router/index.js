import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)
import Login from '@/page/login'
import manage from '@/page/manage'
import home from '@/page/home'
import gameDetails from '@/page/gameDetails'
import addGame from '@/page/addGame'
import gameEditor from '@/page/gameEditor'
import userAdmin from '@/page/userAdmin'
export default new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    {
      path:'/manage',
      component:manage,
      children:[
        {
          path:'',
          component:home,
          meta: ['首页'],
        },

        {
          name:'gameDetails',
          path:'/gameDetails',
          component:gameDetails,
          meta: ['游戏详情页'],
        },
        {
          path:'/addGame',
          component:addGame,
          meta: ['添加游戏'],
        },
        {
          name:'gameEditor',
          path:'/gameEditor',
          component:gameEditor,
          meta: ['编辑游戏'],
        },
        {
          name:'userAdmin',
          path:'/userAdmin',
          component:userAdmin,
          meta: ['用户管理'],
        }
      ]

    }
  ]
})
