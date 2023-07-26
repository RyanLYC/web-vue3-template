import Layout from '@/views/Layout/index.vue'

export default {
  path: '/user',
  component: Layout,
  redirect: '/user/manage',
  name: 'userManage',
  meta: {
    title: 'user',
    icon: 'personnel',
  },
  children: [
    {
      path: '/user/manage',
      component: () => import('@/views/User/Manage/index.vue'),
      meta: {
        title: 'userManage',
        icon: 'personnel-manage',
      },
    },
    {
      path: '/user/info/:id',
      name: 'userInfo',
      component: () => import('@/views/User/Info/index.vue'),
      meta: {
        title: 'userInfo',
      },
    },
  ],
}
