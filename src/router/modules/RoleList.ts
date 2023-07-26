import Layout from '@/views/Layout/index.vue'

export default {
  path: '/user',
  component: Layout,
  redirect: '/user/manage',
  name: 'roleList',
  meta: {
    title: 'user',
    icon: 'personnel',
  },
  children: [
    {
      path: '/user/role',
      component: () => import('@/views/User/List/index.vue'),
      meta: {
        title: 'roleList',
        icon: 'role',
      },
    },
  ],
}
