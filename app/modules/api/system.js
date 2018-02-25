import ajax from '@share-components/ajax';

export default {
    login({ username, password, code }) {
        return ajax.get('/login', {
            account: username,
            password,
            code
        });
    },
    logout() {
        return ajax.get('/logout');
    },
    /**
     * 获取铃音列表
     */
    getRingList({}){
        return ajax.get('/api/ringList', {
            
        });
    },
};
