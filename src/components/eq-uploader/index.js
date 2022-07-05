import uploader from './eq-uploader.vue';

/* Vue导入组件 */
uploader.install = function (Vue) {
    Vue.component(uploader.name, uploader);
};

export default uploader;