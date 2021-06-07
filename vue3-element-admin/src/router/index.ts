import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import Layout from '@/layout/index.vue'

// 看作是异步获取路由
export const asyncRoutes: Array<RouteRecordRaw> = [
  {
    path: '/documentation',
    component: Layout, // 布局组件作为一级路由
    redirect: '/documentation/index',
    name: 'DocumentationLayout',
    children: [
      {
        path: 'index',
        name: 'Documentation',
        component: () => import(/* webpackChunkName: "documentation" */ '@/views/documentation/index.vue'),
        meta: {
          title: 'Documentation',
          icon: 'documentation',
          hidden: false, // 菜单栏不显示
          // 路由是否缓存 没有这个属性或false都会缓存 true不缓存
          noCache: true
        }
      }
    ]
  },
  {
    path: '/async',
    component: Layout,
    redirect: '/async/index',
    name: 'AsyncLayout',
    children: [
      {
        path: 'index',
        name: 'Async',
        component: () => import(/* webpackChunkName: "async" */ '@/views/async.vue'),
        meta: {
          title: '动态路由',
          icon: 'guide'
          // 当guide路由激活时高亮选中的是 documentation/index菜单
          // activeMenu: '/documentation/index'
        }
      }
    ]
  },
  {
    path: '/guide',
    component: Layout,
    redirect: '/guide/index',
    name: 'GuideLayout',
    meta: {
      title: 'GuideLay',
      icon: 'guide'
    },
    children: [
      {
        path: 'index',
        name: 'Guide',
        component: () => import(/* webpackChunkName: "guide" */ '@/views/guide/index.vue'),
        meta: {
          title: 'Guide',
          icon: 'guide'
          // 当guide路由激活时高亮选中的是 documentation/index菜单
          // activeMenu: '/documentation/index'
        }
      },
      {
        path: 'guide2',
        name: 'Guide2',
        component: () => import(/* webpackChunkName: "guide" */ '@/views/guide/index.vue'),
        meta: {
          title: 'Guide2',
          icon: 'guide'
          // 当guide路由激活时高亮选中的是 documentation/index菜单
          // activeMenu: '/documentation/index'
        }
      },
      {
        path: 'guide3',
        name: 'Guide3',
        component: () => import(/* webpackChunkName: "guide" */ '@/views/guide/index.vue'),
        meta: {
          title: 'Guide3',
          icon: 'guide'
          // 当guide路由激活时高亮选中的是 documentation/index菜单
          // activeMenu: '/documentation/index'
        }
      }
    ]
  },
  {
    path: '/system',
    component: Layout,
    redirect: '/system/user',
    name: 'SystemLayout',
    meta: {
      title: 'System',
      icon: 'lock',
      alwaysShow: true // 根路由始终显示 哪怕只有一个子路由
    },
    children: [
      {
        path: 'menu',
        name: 'Menu Management',
        component: () => import(/* webpackChunkName: "menu" */ '@/views/system/menu/index.vue'),
        meta: {
          title: 'Menu Management',
          hidden: false,
          breadcrumb: false
        }
      },
      {
        path: 'role',
        name: 'Role Management',
        component: () => import(/* webpackChunkName: "role" */ '@/views/system/role/index.vue'),
        meta: {
          title: 'Role Management',
          hidden: false
        }
      },
      {
        path: 'user',
        name: 'User Management',
        component: () => import(/* webpackChunkName: "user" */ '@/views/system/user/index.vue'),
        meta: {
          title: 'User Management'
        }
      }
    ]
  },
  { // 外链路由
    path: '/external-link',
    component: Layout,
    children: [
      {
        path: 'https://www.baidu.com/',
        redirect: '/',
        meta: {
          title: 'External Link',
          icon: 'link'
        }
      }
    ]
  },
  { // 404一定放在要在最后面
    path: '/:pathMatch(.*)*',
    redirect: '/404',
    meta: {
      hidden: true
    }
  }
]

export const constantRoutes: Array<RouteRecordRaw> = [
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    name: 'DashboardLayout',
    children: [
      {
        path: 'dashboard',
        name: 'Dashboard',
        component: () => import(/* webpackChunkName: "dashboard" */ '@/views/dashboard/index.vue'),
        meta: {
          title: 'Dashboard',
          // icon: 'dashboard'
          icon: 'el-icon-platform-eleme',
          affix: true // 固定显示在tagsView中
        }
      }
    ]
  },
  {
    path: '/redirect',
    component: Layout,
    meta: {
      hidden: true
    },
    name: 'Redirect',
    children: [
      { // 带参数的动态路由正则匹配
        // https://next.router.vuejs.org/zh/guide/essentials/route-matching-syntax.html#%E5%8F%AF%E9%87%8D%E5%A4%8D%E7%9A%84%E5%8F%82%E6%95%B0
        path: '/redirect/:path(.*)', // 要匹配多级路由 应该加*号
        component: () => import('@/views/redirect/index.vue')
      }
    ]
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/login/index.vue')
  },
  {
    path: '/profile',
    component: Layout,
    redirect: '/profile/index',
    name: 'ProfileLayout',
    children: [
      {
        path: 'index',
        name: 'Profile',
        component: () => import('@/views/profile/index.vue'),
        meta: {
          hidden: true,
          title: '个人中心'
        }
      }
    ]
  },
  {
    path: '/401',
    component: Layout,
    name: '401Layout',
    children: [
      {
        path: '',
        component: () => import('@/views/error-page/401.vue'),
        meta: {
          title: '401',
          icon: '404',
          hidden: true
        }
      }
    ]
  },
  {
    path: '/404',
    component: () => import('@/views/error-page/404.vue'),
    meta: {
      hidden: true // 404 hidden掉
    }
  }
]

// export const routes = [
//   ...constantRoutes,
//   ...asyncRoutes
// ]
export const routes = constantRoutes

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
