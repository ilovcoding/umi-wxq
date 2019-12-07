
// ref: https://umijs.org/config/
// exact 开启路由精准匹配模式 防止报错
export default {
  treeShaking: true,
  history: 'hash',
  // title:"明理苑网络文化工作室",  
  routes: [
    {
      exact: true,
      path: '/online/wechat',
      component: '../pages/online/wechat',
      title: "明理苑网络文化工作室"
    },
    {
      // exact: true,
      path: '/',
      component: '../layouts/index',
      routes: [
        { path: '/', component: '../pages/index' },
        { path: '/wechat', component: '../pages/wechat' },
        { path: '/setting', component: '../pages/setting/index' },
        { path: '/online/setting', component: '../pages/online/setting', title: "微信墙设置" },
        { path: '/online/check', component: '../pages/online/check/index', title: "消息记录" },
      ]

    },
  ],
  plugins: [
    // ref: https://umijs.org/plugin/umi-plugin-react.html
    ['umi-plugin-react', {
      antd: true,
      dva: true,
      dynamicImport: false,
      title: '明理苑网络文化工作室',
      dll: false,

      routes: {
        exclude: [
          /models\//,
          /services\//,
          /model\.(t|j)sx?$/,
          /service\.(t|j)sx?$/,
          /components\//,
        ],
      },
    }],
  ],
  proxy: {
    "/api/*": {
      "target": "http://dx.hfutonline.cn",
      "secure": false,
      "changeOrigin": true
    }
  },
}
