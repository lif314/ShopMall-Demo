module.exports = {
  presets: [
    '@vue/cli-plugin-babel/preset'
  ],
  // elementui 按需引入配置
  "plugins": [
    [
      "component",
      {
        "libraryName": "element-ui",
        "styleLibraryName": "theme-chalk"
      }
    ]
  ]
}
