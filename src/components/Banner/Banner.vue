<template>
    <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
        <van-swipe-item v-for="{thumb, title, id} of list" :key="id">
            <router-link :to="{name: 'Article', params: {id}}" class="banner-link">
                <img :src="regImg(thumb)" class="banner-img" alt="">
                <p class="banner-tit van-ellipsis">
                    {{ title }}
                </p>
            </router-link>
        </van-swipe-item>
    </van-swipe>
</template>

<script lang="ts">
import { defineComponent, onUpdated, Ref, ref, watch } from 'vue'

interface bannerItem {
   thumb: string,
   title: string,
   id: string | number 
}

export default defineComponent({
    name: 'Banners',
    props: {
        list: {
            type: Array,
            default: []
        }
    },
    setup(props: any) {
        function regImg (url: string) {
            let reg = /(\d+)\x(\d+)/;
            url = url.replace(reg, function() {
                return '1600x900'
            })
            return url;
        }

        let list: Ref<Array<bannerItem>> = ref(props.list);
        
        onUpdated(() => {
            list.value = props.list;
        })

        return {
            regImg,
            list
        }
    },
})
</script>

<style lang="scss" scoped>
    .banner-link {
        display: block;
        position: relative;
         .banner-img {
            width: 100%;
            height: 200px;
            object-fit: cover;
        }
        .banner-tit {
            position: absolute;
            bottom: 20px;
            width: 100%;
            text-align: center;
            font-size: 12px;
            color: $white;
            background: linear-gradient(to top, rgba(0,0,0,.5), rgba(0,0,0,.3));
            padding: 3px 0;
        }
    }
</style>
