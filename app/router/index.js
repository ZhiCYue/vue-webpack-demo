import Vue from 'vue';
import Router from 'vue-router';
import HomePage from '@/pages/main/home';
import LoginPage from '@/pages/main/login';

import ElementUIPage from '@/pages/test/element-ui';

import TestPage from '@/pages/test';

Vue.use(Router);

const router = new Router({
    routes: [
        {
            name: 'default',
            path: '/',
            component: HomePage
        },
        {
            name: 'login',
            path: '/login',
            component: LoginPage
        },
        {
            name: 'home',
            path: '/home',
            component: HomePage
        },
        {
            name: 'test',
            path: '/test',
            component: TestPage
        },
        {
            name: 'elementui',
            path: '/elementui/:id',
            component: ElementUIPage
        }
    ]
});

export default router;
