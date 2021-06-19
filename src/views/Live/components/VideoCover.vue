<template>
    <div class="video-block">
        <div class="video-box">
            <div class="img-wrap">
            <img v-lazy="props.cover.thumb" alt="">
            </div>
            <p class="van-multi-ellipsis--l2">
                {{ props.cover.title }}
            </p>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

interface coverType {
    thumb: string,
    title: string
}
export default defineComponent({
    props: {
        cover: {
            type: Object,
            default: function(): coverType {
                return {
                    thumb: '',
                    title: ''
                }
            }
        }
    },
    setup(props: any) {
        return {
           props 
        }
    },
})
</script>

<style lang="scss" scoped>
    .video-block {
        width: 50%;
        padding: 5px;
        background: transparent;
        .video-box {
            border-radius: 4px;
            background-color: $white;
        }
        p {
            font-size: 12px;
            margin: 5px;
            line-height: 1.5;
            min-height: 3em;
        }
        .img-wrap {
            width: 100%;
            position: relative;
            height: 0;
            padding-bottom: 60%;
            img {
                width: 100%;
                // height: 80%;
                object-fit: cover;
                position: absolute;
                width: 100%;
                height: 100%;
            }
        }
    }
</style>
