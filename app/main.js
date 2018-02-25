import Vue from 'vue';
import axios from 'axios';
import App from './app.vue';
import router from './router';
import store from './store';

import "@view-components/mea-utils/rem";

import '@/public/css/normalize.css';
import '@/public/css/base.css';
import '@/public/css/main.css';

// import { Button, Dialog, MessageBox } from '@view-components/mea-element-ui/src'
// import { Button, Dialog, MessageBox } from 'element-ui'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

// Vue.use(Button)
// Vue.use(Dialog)
// Vue.prototype.$confirm = MessageBox.confirm
Vue.use(ElementUI)

import {Toast, Confirm, Tip} from "@share-components/sr-message-box";

Vue.use(Toast, { duration: '1500', style: { top: '40%' } });
Vue.use(Confirm);
Vue.use(Tip);

import SrFullLoading from '@share-components/sr-full-loading';

Vue.use(SrFullLoading);
Vue.prototype.$ajax = axios;

/* eslint-disable no-new */

new Vue({
    el: '#app',
    router,
    store,
    template: '<App/>',
    components: { App }
});

