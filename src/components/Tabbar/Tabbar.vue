<template>
    <van-tabbar class="my-tabbar" active-color="#16b13a" v-model="active">
        <van-tabbar-item 
            :icon="item.icon"
            v-for="item of menuList"
            :key="item.to"
            :name="item.name"
            @click.stop="goMenu(item)"
        >
            {{ item.name }}
        </van-tabbar-item>
    </van-tabbar>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';
import { Tabbar, TabbarItem } from 'vant';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';

import menuList, { menuItem } from './config'

export default defineComponent({
    components: {
        [Tabbar.name]: Tabbar,
        [TabbarItem.name]: TabbarItem,
    },
    setup() {
        const store = useStore();
        const router = useRouter();
        const active = computed(() => store.state.activeName)

        function goMenu(item: menuItem) {
            let path = item.to;
            if (item.path === 'Home') {
                path = store.getters.getHomeRouteRecord;
            } else if (item.path === 'Match') {
                path = store.getters.getMatchRouteRecord;
            }
            router.push(path);
        }

        return { 
            menuList,
            active, 
            goMenu
        };
    },
})
</script>

<style lang="scss" scoped>
   
</style>
