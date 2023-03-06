const { defineConfig } = require('@vue/cli-service')
const { VantResolver } = require('unplugin-vue-components/resolvers');
const ComponentsPlugin = require('unplugin-vue-components/webpack');

module.exports = defineConfig({
  transpileDependencies: true,

  devServer:{
    host:'128.0.0.1',
    client:{
      webSocketURL:'ws://10.161.34.135:8080/ws',
    },
    headers:{
      'Access-Control-Allow-Origin':'*',
    }
  }
})

module.exports = {
  configureWebpack: {
    plugins: [
      ComponentsPlugin({
        resolvers: [VantResolver()],
      }),
    ],
  },
};

