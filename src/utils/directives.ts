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

export function setVisible(app: App<Element>) {
    app.directive('visible', {
        mounted(el: HTMLElement, binding: any) {
            el.style.visibility = binding.value ? '' : 'hidden';
        },
        updated(el: HTMLElement, binding: any) {
            el.style.visibility = binding.value ? '' : 'hidden';
        }
    })
}

export default {
    install(app: App<Element>, options: any) {
        setDirectives(app);
        setVisible(app);
    }
}