import Vue from 'vue';
import Vuex from 'vuex';
import moduleSystem from './modules/system';

Vue.use(Vuex);
const store = new Vuex.Store({
    modules: {
        system: moduleSystem
    }
});

export default store;

