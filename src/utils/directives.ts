import { App, VNode } from 'vue'

export function setDirectives(app: App<Element>) {
    //图片加载过渡效果
    app.directive('waitload', {
        mounted(el: Element, binding: any, vNode: VNode) {
            el.setAttribute('class', 'hide');
            const img = new Image();
            img.src = binding.value;
            img.onload = function() {
                el.setAttribute('src', binding.value);
                setTimeout(() => el.setAttribute('class', 'loaded'), 200)
            }
        }
    })
}