import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'vant/lib/index.css';
import fastClick from 'fastclick';
import VueLazyLoad from 'vue3-lazyload';
import { Icon, Tab, Tabs, List, Popup, Picker, Sidebar, SidebarItem, Grid, GridItem, Rate } from 'vant';

import '@/utils/rem';
import myDirectives from '@/utils/directives';

fastClick(document.body);

const app = createApp(App)

app.use(router)
    .use(store)
    .mount('#app')

//全局注册vant组件库
app.use(VueLazyLoad)
    .use(Icon)
    .use(Tab)
    .use(Tabs)
    .use(List)
    .use(Popup)
    .use(Picker)
    .use(Sidebar)
    .use(SidebarItem)
    .use(Grid)
    .use(GridItem)
    .use(Rate)

//自定义指令
app.use(myDirectives);

    



