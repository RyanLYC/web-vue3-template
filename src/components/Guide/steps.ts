// 此处不要导入 @/i18n 使用 i18n.global ，因为我们在 router 中 layout 不是按需加载，所以会在 Guide 会在 I18n 初始化完成之前被直接调用。导致 i18n 为 undefined
const steps = () => {
  // i18n: any
  return [
    // {
    //   element: '#guide-start',
    //   popover: {
    //     title: i18n.t('guide.guideTitle'),
    //     description: i18n.t('guide.guideDesc'),
    //   },
    // },
    {
      element: '#guide-start',
      popover: {
        title: '引导',
        description: '打开引导功能',
        position: 'bottom-right',
      },
    },
    {
      element: '#guide-hamburger',
      popover: {
        title: '收缩按钮',
        description: '展开或收起左侧菜单',
      },
    },
    {
      element: '#guide-breadcrumb',
      popover: {
        title: '面包屑',
        description: '指示当前页面位置',
      },
    },
    {
      element: '#guide-search',
      popover: {
        title: '搜索',
        description: '页面链接搜索',
      },
    },
  ]
}
export default steps
