import Vue from 'vue';
import loadingVue from './loading.vue';

const LoadingConstructor = Vue.extend(loadingVue);


let fullscreenLoading;

LoadingConstructor.prototype.close = function () {
    fullscreenLoading = undefined;
    this.visible = false;

    if (this.$el &&
        this.$el.parentNode) {
        this.$el.parentNode.removeChild(this.$el);
    }

    this.$destroy();
};

const Loading = () => {
    if (fullscreenLoading) {
        return fullscreenLoading;
    }

    const instance = new LoadingConstructor({
        el: document.createElement('div')
    });


    document.body.appendChild(instance.$el);

    Vue.nextTick(() => {
        instance.visible = true;
    });

    fullscreenLoading = instance;
    return instance;
};

export default Loading;
