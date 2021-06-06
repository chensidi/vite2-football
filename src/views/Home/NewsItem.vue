<template>
    <div class="news-list-item">
        <router-link :to="{name: 'Article', params: {id}}">
            <div class="news-list-img-side">
                <img v-lazy="{src:cover}" alt="">
            </div>
            <div class="news-list-info">
                <h3>{{ title }}</h3>
                <div class="news-list-tag">
                    <span class="news-list-comment">
                        {{ cmtCount }}评论
                    </span>
                    <span v-if="isOwner" class="news-list-tag-item news-list-tag-common green-bd">懂球号</span>
                    <span v-if="top" class="news-list-tag-item news-list-tag-common blue-bd">顶置</span>
                    <span v-if="label" class="news-list-tag-item news-list-tag-common blue-bd">{{ label }}</span>
                </div>
            </div>
        </router-link>
    </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'

export default defineComponent({
    name: 'NewsItem',
    props: {
        id: [Number, String],
        cover: {
            type: String,
            required: true
        },
        title: {
            type: String,
            required: true
        },
        cmtCount: {
            type: Number,
            required: true
        },
        showcontent: {
            type: String,
            default: ''
        },
        author: {
            type: String,
            default: ''
        },
        top: {
            type: Boolean,
            default: false
        },
        label: {
            type: String,
            default: ''
        }
    },
    setup(props) {
        const owners: Array<string> = ['自产UGC', 'kol'];
        const isOwner = computed(() => owners.includes(props.author));

        return {
            isOwner
        }
    }
})
</script>

<style lang="scss" scoped>
    .news-list-item {
        a {
            padding: 12px;
            border-bottom: 1px solid #e9e9e9;
            background: #f7f7f7;
            position: relative;
            width: 100%;
            box-sizing: border-box;
            display: block;
            overflow: hidden;
            min-height: 68px; 
        }
        img {
            width: 100%;
        }
    }

    .news-list-img-side {
        width: 90px;
        float: left;
        margin-right: 16px;
        position: relative;
        line-height: 0;
        margin-bottom: 3.2px;
        height: 68px;
    }

    .news-list-info {
        overflow: hidden;
    }

    .news-list-tag {
        right: 12px;
        .news-list-tag-item {
            display: inline-block;
            border: {
                width: 1px;
                style: solid;
            }
            padding: 2px 3.2px;
            margin-left: 3.2px;
            line-height: 1.5;
        }
    }

    .news-list-comment {
        color: $gray1;
    }

    .news-list-tag, .open-app {
        position: absolute;
        bottom: 5.6px;
        font-size: 10px;
    }
</style>