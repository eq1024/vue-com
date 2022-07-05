import uploader from "./eq-uploader/index"
import player from "./eq-player/index"

const components = [uploader, player]

const install = function (Vue) {
    components.forEach(component => {
        Vue.component(component.name, component);
    });
}

/* 
按需导入,默认走install,导入全部
使用el.player则走player中的install,实现按需导入 
*/
export default {
    install,
    player,
    uploader
}