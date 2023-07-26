import Layout from '@/views/Layout/index.vue'

export default {
  path: '/article',
  component: Layout,
  redirect: '/article/ranking',
  name: 'articleRanking',
  meta: { title: 'article', icon: 'article' },
  children: [
    {
      path: '/article/ranking',
      component: () => import('@/views/Article/Ranking/index.vue'),
      meta: {
        title: 'articleRanking',
        icon: 'article-ranking',
      },
    },
  ],
}
