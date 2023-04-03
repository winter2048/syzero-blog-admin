import layoutHeaderAside from '@/layout/header-aside'

// 由于懒加载页面太多的话会造成webpack热更新太慢，所以开发环境不使用懒加载，只有生产环境使用懒加载
const _import = require('@/libs/util.import.' + process.env.NODE_ENV)

/**
 * 在主框架内显示
 */
const frameIn = [{
  path: '/admin',
  redirect: {
    name: 'admin'
  },
  component: layoutHeaderAside,
  children: [
    // 首页
    {
      path: '',
      name: 'admin',
      meta: {
        title: '首页',
        auth: true
      },
      component: _import('system/admin')
    },
    {
      path: 'BlogCategory',
      name: 'BlogCategory',
      meta: {
        title: '分类管理',
        auth: true
      },
      component: _import('admin/BlogCategory')
    },
    {
      path: 'Tag',
      name: 'Tag',
      meta: {
        title: '标签管理',
        auth: true
      },
      component: _import('admin/Tag')
    },
    {
      path: 'Blog',
      name: 'Blog',
      meta: {
        title: '文章管理',
        auth: true,
        cache: true
      },
      component: _import('admin/Blog')
    },
    {
      path: 'BlogEdit/:id',
      name: 'BlogEdit',
      meta: {
        title: '编辑文章',
        auth: true,
        cache: true
      },
      props: true,
      component: _import('admin/Blog/Edit')
    },
    {
      path: 'Comment',
      name: 'Comment',
      meta: {
        title: '评论管理',
        auth: true
      },
      component: _import('admin/Comment')
    },
    {
      path: 'User',
      name: 'User',
      meta: {
        title: '用户管理',
        auth: true
      },
      component: _import('admin/User')
    },
    {
      path: 'Navigation',
      name: 'Navigation',
      meta: {
        title: '导航管理',
        auth: true
      },
      component: _import('admin/Navigation')
    },
    {
      path: 'Link',
      name: 'Link',
      meta: {
        title: '友链管理',
        auth: true
      },
      component: _import('admin/Link')
    },
    {
      path: 'Page',
      name: 'Page',
      meta: {
        title: '页面管理',
        auth: true,
        cache: true
      },
      component: _import('admin/Page')
    },
    {
      path: 'PageEdit/:id',
      name: 'PageEdit',
      meta: {
        title: '编辑页面',
        auth: true,
        cache: true
      },
      props: true,
      component: _import('admin/Page/Edit')
    },
    {
      path: 'Configure',
      name: 'Configure',
      meta: {
        title: '站点设置',
        auth: true
      },
      component: _import('admin/Configure')
    },
    {
      path: 'SmsConfig',
      name: 'SmsConfig',
      meta: {
        title: '短信配置',
        auth: true
      },
      component: _import('admin/SmsConfig')
    },
    // 系统 前端日志
    {
      path: 'log',
      name: 'log',
      meta: {
        title: '前端日志',
        auth: true
      },
      component: _import('system/log')
    },
    // 刷新页面 必须保留
    {
      path: 'refresh',
      name: 'refresh',
      hidden: true,
      component: _import('system/function/refresh')
    },
    // 页面重定向 必须保留
    {
      path: 'redirect/:route*',
      name: 'redirect',
      hidden: true,
      component: _import('system/function/redirect')
    }
  ]
}]

/**
 * 在主框架之外显示
 */
const frameOut = [
  // 登录
  {
    path: '/login',
    name: 'login',
    component: _import('system/login')
  },
  {
    path: '/',
    name: 'redirectAdmin',
    redirect: {
      name: 'admin'
    }
  }
]

/**
 * 错误页面
 */
const errorPage = [{
  path: '*',
  name: '404',
  component: _import('system/error/404')
}]

// 导出需要显示菜单的
export const frameInRoutes = frameIn

// 重新组织后导出
export default [
  ...frameIn,
  ...frameOut,
  ...errorPage
]
