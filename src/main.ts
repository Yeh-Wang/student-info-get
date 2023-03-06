import "babel-polyfill"
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import Es6Promise from 'es6-promise'
Es6Promise.polyfill()

createApp(App).use(router).use(ElementPlus).mount('#app')
