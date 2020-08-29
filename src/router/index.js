import Vue from 'vue'
import VueRouter from 'vue-router'

const AllList = () => import('views/songList/AllList')
const Commends = () => import('views/commends/Commends')
const Rank = () => import('views/rank/Rank')
const Search = () => import('views/search/Search')
const ListPage = () => import('views/listPage/ListPage')
const Player = () => import('views/player/Player')

Vue.use(VueRouter)

  const routes = [
    {
      path: '/',
      redirect: '/commends'
    },
    {
      path: '/commends',
      component:Commends
    },
    {
      path: '/allList',
      component:AllList
    },
    {
      path: '/rank',
      component:Rank
    },
    {
      path: '/search',
      component: Search
    },
    {
      path: '/list/:id',
      component: ListPage
    },
    {
      path: '/player',
      component: Player
    }

  ]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
