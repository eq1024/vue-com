import player from './eq-player.vue';

/* Vue导入组件 */
player.install = function (Vue) {
  Vue.component(player.name, player);
};
export default player;