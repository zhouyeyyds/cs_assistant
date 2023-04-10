import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path:"/",
    name:"home",
    component:()=>import("../views/home/Home.vue")
  },
  {
    path: '/test',
    name: 'test',
    component: () => import('../views/test/Test.vue'),
  },
  {
    path: '/my',
    name: 'my',
    component: () => import('../views/my/My.vue')
  },
  {
    path: '/search',
    name: 'search',
    component: () => import('../views/search/Search.vue')
  },
  {
    path: '/setting',
    name: 'setting',
    component: () => import('../views/setting/Setting.vue')
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('../views/about/About.vue')
  },
  {
    path: '/practice',
    name: 'practice',
    component: () => import('../views/test/Practice.vue')
  },
  {
    path: '/errorbook',
    name: 'errorbook',
    component: () => import('../views/errorbook/Errorbook.vue')
  },
  {
    path:'/error',
    name:"error",
    component: () => import('../views/errorbook/Error.vue'),
  },
  {
    path:'/simulate',
    name:"simulate",
    component: () => import('../views/test/Simulate.vue'),
  },
  {
    path:'/finish',
    name:"finish",
    component: () => import('../views/test/Finish.vue'),
  },
  {
    path:'/curerror',
    name:"curerror",
    component: () => import('../views/test/CurError.vue'),
  },
  {
    path:'/collect',
    name:"collect",
    component: () => import('../views/home/collect/Collect.vue'),
  },
  {
    path:'/bookmarks',
    name:"bookmarks",
    component: () => import('../views/home/collect/Bookmarks.vue'),
  },
  {
    path:'/analysis',
    name:"analysis",
    component: () => import('../views/home/analysis/Analysis.vue'),
  },
  {
    path:'/lib',
    name:"lib",
    component: () => import('../views/home/lib/Lib.vue'),
  },
  {
    path:'/liblist',
    name:"liblist",
    component: () => import('../views/home/lib/Liblist.vue'),
  },

]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
