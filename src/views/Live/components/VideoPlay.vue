<template>
    <transition name="slide" class="video-player" v-show="videoInfo.showVideo">
        <div>
            <van-icon name="arrow-left" class="back" @click.native="hide" />
            <div class="video-wrap">
                <video 
                    controls 
                    :src="videoInfo.url"
                    :poster="videoInfo.cover"
                    ref="video"
                >
                </video>
            </div>
        </div>
    </transition>
</template>

<script lang="ts">
import { defineComponent, ref, Ref, VideoHTMLAttributes, watch, watchEffect } from 'vue'

export default defineComponent({
    props: {
        videoInfo: {
            type: Object,
            default: function() {
                return {
                    cover: '',
                    url: ''
                }
            }
        }
    },
    setup(props: any, {emit}) {

        function hide() {
            emit('update', false);
            video.value.pause();
        }

        const video: Ref<any> = ref(null);

        watch(props.videoInfo, (now, old) => {
            if (now.showVideo) {
                setTimeout(() => video.value.play())
            }
        })

        return {
            hide,
            videoInfo: props.videoInfo,
            video
        }
    },
})
</script>


<style lang="scss" scoped>
    .video-wrap {
        height: 100%;
        video {
            width: 100%;
            height: 100%;
            object-fit: contain;
        }
    }
    .slide-enter-from, .slide-leave-to {
        transform: translateX(100%);
    }
    .slide-enter-active, .slide-leave-active {
        transition: all .3s;
    }
    .slide-enter-to, .slide-leave-from {
        transform: translateX(0%);
    }

    .video-player {
        position: fixed;
        width: 100vw;
        height: 100vh;
        top: 0;
        left: 0;
        z-index: 10000;
        background: #000;
    }

    .back {
        position: absolute;
        top: 10px;
        left: 10px;
        font-size: 20px;
        color: #fff;
        z-index: 1;
    }
</style>