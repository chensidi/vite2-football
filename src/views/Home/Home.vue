<template>
    <section>
        <div class="content">
            <van-tabs 
                v-model:active="active" 
                sticky 
                offset-top="50"
                color="#16b13a"
                title-active-color="#16b13a"
                title-inactive-color="#333"
                @change="tabChange"
                :before-change="beforeChange"
            >
                <van-tab 
                    v-for="menu of menus"
                    :key="menu.id"
                    :title="menu.label"
                >
                    {{ menu.label }}
                    <router-view v-slot="{ Component }">
                        <keep-alive>
                            <component :is="Component" />
                        </keep-alive>
                    </router-view>
                </van-tab>
            </van-tabs>
        </div>
    </section>
</template>

<script lang="ts">
import { defineComponent, ref, nextTick } from 'vue'
import { useRouter, onBeforeRouteUpdate, onBeforeRouteLeave } from 'vue-router'
import { Tab, Tabs } from 'vant'
import { useStore } from 'vuex'

interface menu {
    label: string,
    id: number | string
}

export default defineComponent({
    name: 'Home',
    components: {
        [Tab.name]: Tab,
        [Tabs.name]: Tabs
    },
    setup() {
        const menus = ref<Array<menu>>([]); //首页子菜单
        const router = useRouter(); //路由实例
        const active = ref<number>(1); //激活菜单下标
        const scrollTops: Array<number> = []; //记录各个菜单滚动位置
        const store = useStore(); //取出store

        async function getMenus() { //获取菜单
            const data = await store.dispatch('getMenusData');
            const newMenus: Array<{label: string, id: number}> = data.menus.news;
            newMenus.map(item => {
                menus.value.push({
                    label: item.label,
                    id: item.id
                })
            })
            nextTick(() => {
                router.push({name: 'News', params: {id: menus.value[1].id}})
            })
        }

        getMenus();

        function tabChange(name: string|number) { //选项卡切换
            const id = menus.value[name as number].id;
            router.push({name: 'News', params: {id}}).then(() => {
                const top = scrollTops[name as number];
                nextTick(() => {
                    window.scrollTo(0, top);
                })
            })
        }

        function beforeChange(name: string|number) { //切换菜单之前
            scrollTops[name as number] = window.scrollY;
            return true;
        }

        onBeforeRouteUpdate((to, from) => {
            if (to.name === 'Home') {
                active.value = 1;
                return {name: 'News', params: {id: menus.value[1].id}}
            }
        })

        onBeforeRouteLeave((to, from) => { //需要记录离开时的路由
            store.dispatch('setHomeRouteRecord', from.path);
        })

        return {
            menus,
            active,
            tabChange,
            beforeChange
        }
    },
})
</script>

<style scoped lang="scss">
    .content {
        padding-top: 50px;
    }
</style>

