// 菜单 侧边栏
export default [
  {
    title: '首页',
    icon: 'clipboard',
    path: '/admin/'
  },
  {
    title: '文章管理',
    icon: 'file-text',
    path: '/admin/Blog'
  },
  {
    title: '分类管理',
    icon: 'list-alt',
    path: '/admin/BlogCategory'
  },
  {
    title: '标签管理',
    icon: 'tags',
    path: '/admin/Tag'
  },
  {
    title: '评论管理',
    icon: 'comments',
    path: '/admin/Comment'
  },
  {
    title: '用户管理',
    icon: 'user',
    path: '/admin/User'
  },
  {
    title: '页面管理',
    icon: 'file-o',
    path: '/admin/Page'
  },
  {
    title: '系统管理',
    icon: 'gears',
    children: [
      {
        title: '站点设置',
        icon: 'gear',
        path: '/admin/Configure'
      },
      {
        title: '友链管理',
        icon: 'external-link',
        path: '/admin/Link'
      },
      {
        title: '导航管理',
        icon: 'navicon',
        path: '/admin/Navigation'
      },
      {
        title: '短信配置',
        icon: 'envelope',
        path: '/admin/SmsConfig'
      }
    ]
  }
]
