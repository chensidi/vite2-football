<template>
    <div class="content">
        <van-list
            v-model:loading="loadObj.loading"
            :finished="loadObj.finished"
            finished-text="没有更多了"
            @load="onLoad"
            ref="listRef"
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
    <more-nav @changes="onLeagueChange" />
</template>

<script lang="ts">
import { defineComponent, reactive, Ref, ref, defineAsyncComponent } from 'vue';

import videoApi from '@/api/video';


export default defineComponent({
    name: 'Live',
    components: {
        'video-cover': defineAsyncComponent(() => import('./components/VideoCover.vue')),
        'video-player': defineAsyncComponent(() => import('./components/VideoPlay.vue')),
        'more-nav': defineAsyncComponent(() => import('./components/MoreNav.vue')),
    },
    setup() {
        const lists: Ref<Array<any>> = ref([]);

        const getLeagueVideo = async (league = 'England') => {
            const res = await videoApi.getLeagueVideo({league, after: loadObj.after});
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
            before: '',
            league: 'England'
        })

        const listRef = ref();
        function onLoad() {
            getLeagueVideo(loadObj.league);
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

        function onLeagueChange(val: string): void { //视频类别变化
            loadObj.after = '';
            loadObj.before = '';
            loadObj.loading = true;
            window.scrollTo(0, 0);
            lists.value = [];
            getLeagueVideo(val);
            loadObj.league = val;
        }
        
        return {
            lists,
            loadObj,
            onLoad,
            videoObj,
            playVideo,
            onLeagueChange
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
