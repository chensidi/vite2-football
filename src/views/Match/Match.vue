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
import { defineComponent, ref, nextTick, onMounted } from 'vue'
import { useStore } from 'vuex'
import { useRouter, onBeforeRouteLeave } from 'vue-router'

export default defineComponent({
    name: 'Match',
    setup() {
        console.log('22')
        const store = useStore();
        const menus = store.getters.getMatchMenus;
        const active = ref<number>(0); //激活菜单下标

        const router = useRouter();
        onMounted(() => {
            router.push({name: 'MatchList', params: {id: 0}})
        })

        function tabChange(name: number|string) {
            router.push({name: 'MatchList', params: {id: name}}).then(() => {
                const top = scrollTops[name as number];
                nextTick(() => {
                    window.scrollTo(0, top);
                })
            })
        }

        onBeforeRouteLeave((to, from) => {
            console.log('match leave');
            store.dispatch('setMatchRouteRecord', from.path)
        })

        const scrollTops: Array<number> = []; //记录各个菜单滚动位置
        function beforeChange(name: string|number) { //切换菜单之前
            scrollTops[name as number] = window.scrollY;
            return true;
        }

        return {
            menus,
            active,
            tabChange,
            beforeChange,
        }
    },
})
</script>

<style scoped lang="scss">
    .content {
        padding-top: 50px;
    }
</style>