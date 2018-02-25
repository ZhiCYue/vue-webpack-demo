import * as mutationTypes from '../mutation-type';

// 初始化状态
const state = {
    user: null // 登录用户
};

// getters
// const getters = {};

// mutations
const mutations = {
    [mutationTypes.SYS_SET_USER](_state, {
        user
    }) {
        _state.user = user;
    },

    [mutationTypes.SYS_RESET_USER](_state) {
        _state.user = null;
    }
};

export default {
    state,
    // getters,
    // actions,
    mutations
};
