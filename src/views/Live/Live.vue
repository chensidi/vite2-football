<template>
    <div class="content">
        <van-list
            v-model:loading="loadObj.loading"
            :finished="loadObj.finished"
            finished-text="没有更多了"
            @load="onLoad"
        >
            <div class="video-list">
                <video-cover @click.native="playVideo(item)" v-for="item of lists" :key="item.id" :cover="item" />
            </div>
        </van-list>
    </div>
    <video-player 
        @update="videoObj.showVideo = $event"
        :videoInfo="videoObj" 
    />
</template>

<script lang="ts">
import { defineComponent, reactive, Ref, ref, defineAsyncComponent } from 'vue';

import videoApi from '@/api/video';


export default defineComponent({
    name: 'Live',
    components: {
        'video-cover': defineAsyncComponent(() => import('./components/VideoCover.vue')),
        'video-player': defineAsyncComponent(() => import('./components/VideoPlay.vue'))
    },
    setup() {
        const lists: Ref<Array<any>> = ref([]);

        const getLeagueVideo = async () => {
            const res = await videoApi.getLeagueVideo({league: 'England', after: loadObj.after});
            console.log(res);
            loadObj.after = res.min;
            setTimeout(() => {
                lists.value =  lists.value.concat(res.articles);
                loadObj.loading = false;
            }, 500)
        }

        const loadObj = reactive({ //列表加载相关数据
            loading: false,
            finished: false,
            after: '',
            before: ''
        })

        function onLoad() {
            getLeagueVideo();
        }

        const videoObj = reactive({ //视频播放相关
            showVideo: false,
            cover: '',
            url: ''
        })

        function playVideo(item: any) {
            videoObj.showVideo = true;
            videoObj.cover = item.cover.pic;
            videoObj.url = item.video_info.video_src
        }
        
        return {
            lists,
            loadObj,
            onLoad,
            videoObj,
            playVideo
        }
    },
})
</script>

<style lang="scss" scoped>
    .video-list {
        margin: 0 -10px;
        display: flex;
        flex-wrap: wrap;
        padding: 10px;
        
    }
    .content {
        overflow: hidden;
    }

    .video-player {
        position: fixed;
        width: 100vw;
        height: 100vh;
        top: 0;
        left: 0;
        z-index: 100;
        background: #000;
    }
</style>
