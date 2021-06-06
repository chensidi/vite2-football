<template>
    <iframe 
        :src="url" 
        frameborder="0" 
        class="out-import scroll_config"
        @load="loaded"
        v-cloak
    >
    </iframe>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useRoute } from 'vue-router'
import { Toast } from 'vant' 

export default defineComponent({
    name: 'Article',
    setup() {
        const route = useRoute();
        const { id } = route.params;
        const url = `https://m.dongqiudi.net/article/${id}.html`

        function loaded() {
            console.log('laoded')
            Toast.clear()
        }

        Toast.loading({
            message: '加载中...',
            forbidClick: true,
            duration: 0,
            loadingType: 'spinner'
        });

        return {
            url,
            loaded
        }
    },
})
</script>

<style scoped lang="scss">
    .out-import {
        width: 100%;
        height: 100vh;
        padding-bottom: 50px;
    }
</style>
