<template>
    <van-pull-refresh v-model="state.refreshing" @refresh="onRefresh">
        <van-list
            v-model:loading="state.loading"
            :finished="state.finished"
            finished-text="没有更多了"
            @load="onLoad"
        >
            <div class="news-list">
                <news-item
                    v-for="item of lists"
                    :key="item.id"
                    :cover="item.thumb"
                    :title="item.title"
                    :cmtCount="item.comments_total"
                    :showcontent="item.showcontent"
                    :author="item.author_classify"
                    :top="item.top"
                    :label="item.label"
                    :id="item.id"
                />
            </div>
        </van-list>
    </van-pull-refresh>
    <span class="go-top" @click.stop="backTop">
        <van-icon class="back-top" name="back-top" />
    </span> 
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, reactive, nextTick } from 'vue'
import { onBeforeRouteUpdate, useRoute } from 'vue-router'
import { List, PullRefresh } from 'vant'

import NewsItem from './NewsItem.vue'
import homeApi from '@/api/home'
import { pageData } from '@/api/home'

interface NewsItemShape {
    id: number,
    thumb: string,
    title: string,
    comments_total: number,
    showcontent: string,
    author_classify: string,
    top: boolean | undefined,
    label: string,
}

export default defineComponent({
    name: 'News',
    components: {
        'news-item': NewsItem,
        [List.name]: List,
        [PullRefresh.name]: PullRefresh,
    },
    setup() {
        const lists = ref<Array<NewsItemShape>>([])
        const state = reactive({
            loading: false,
            finished: false,
            refreshing: false,
        });
        const pageInfo: pageData = reactive({
            after: '',
            page: '',
            tabId: ''
        })

        const route = useRoute()

        async function getContentList(idx: string | number) {
            const data = await homeApi.getContentList(idx);
            const articles: Array<NewsItemShape> = data.articles
            lists.value = articles.filter(item => {
                return item.thumb !== ''
            })
            pageInfo.after = data.min;
            pageInfo.page = data.page + 1;
            pageInfo.tabId = `tab_${idx}`;
            state.loading = false;
        }

        async function getPageData(id: number|string) { //分页
            pageInfo.tabId = id;
            const data = await homeApi.getPageData(pageInfo);
            let articles: Array<NewsItemShape> = data.articles;
            console.log(articles)
            articles = articles.filter(item => {
                return item.thumb !== ''
            })
            lists.value = lists.value.concat(articles);
            pageInfo.after = data.min;
            pageInfo.page = data.page + 1;
            state.loading = false;
        }

        function onLoad() {
            /*
                1.看是否有数据
                有的话，说明请求过，采用分页接口
                2.如果没有数据，则使用原始接口
            */
            setTimeout(() => {
                const id = route.params.id;
                if (lists.value.length > 0) {
                    getPageData(id as string);
                } else {
                    getContentList(id as string)
                }
            }, 100)
        }

        async function onRefresh() { //下拉刷新
            await refresh();
            state.refreshing = false;
        }

        async function refresh() { //刷新处理函数
            const id = route.params.id;
            const data = await homeApi.refresh(id as string);
            const articles: Array<NewsItemShape> = data.articles;
            lists.value = articles;
            pageInfo.after = data.min;
            pageInfo.page = data.page + 1;
        }

        function backTop() { //返回顶部
            window.scrollTo(0, 0)
        }

        return {
            lists,
            state,
            onLoad,
            onRefresh,
            backTop,
        }
    },
})
</script>

<style lang="scss" scoped>
    .go-top {
        position: fixed;
        right: 10px;
        bottom: 100px;
        background: rgba($green,1);
        color: $white;
        width: 40px;
        height: 40px;
        border-radius: 50%;
        z-index: 100;
        box-shadow: 0px 0px 10px 3px rgba(0,0,0, .2);
        i {
            font-size: 20px;
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate3d(-50%, -50%, 0);
        }
    }
</style>
