<template>
    <van-list
        v-model:loading="state.loading"
        :finished="state.finished"
        finished-text="没有更多了"
        @load="onLoad"
    >
    <ul class="match-list">
        <li class="match-calendar-item" v-for="item of list" :key="item.match_id">
            <router-link :to="`/matchdetails/${item.match_id}`" class="match-list-item">
                <div class="match-item-a">
                    <img v-lazy="{src:item.team_A_logo}" alt="">
                    <p>{{ item.team_A_name }}</p>
                </div>
                <div class="match-item-b">
                    <img v-lazy="{src:item.team_B_logo}" alt="">
                    <p>{{ item.team_B_name }}</p>
                </div>
                <div class="match-item-c">
                    <p>{{ item.time_utc }} {{ item.competition_name }}</p>
                    <p class="spec" v-if="item.status === 'Played'">{{ item.fs_A }} - {{ item.fs_B }}</p>
                    <p class="spec" v-else>VS</p>
                    <img :src="b64" alt="" class="icon-highlights">
                </div>
            </router-link>
        </li>
    </ul>
    </van-list>
</template>

<script lang="ts">
    import { reactive, toRefs, defineComponent, onMounted } from 'vue'
    import { useStore } from 'vuex'
    import { useRoute } from 'vue-router'
    import matchApi from '@/api/match'

    export default defineComponent({
        name: 'MatchList',
        setup() {
            const b64 = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAALQAAAAoBAMAAAClR805AAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAAwUExURUxpcQCzMQCzLwCyMQSyMACzMQCzMAWwMQCxLwiyMwiyNACyMQCyLxaxOQCzMRaxOp6G9rMAAAAOdFJOUwCAQL8n5pgPYK9wz07xtx2fbQAAAmpJREFUSMftl89rE0EUx7/ZpN0UZM1UbRAlrKOIpxKdFg+FJRXxIpaGpUUQQoONB4XSQymiKJEi6MVD1UvBHMQiXkQo6EVELx48C+Jt82OjpGHxP9A3s0lJrNgkZUEwb3fezkzgs7PfeW8mg8iTn4HY1xQuPEcgduMz1hCQvcCXoNC38CMo9N4++j9BR0y/+I1T/lOL46pfm5e9j3pDhxy/kGeMXaISA8KvkPPfVSIX/dYJek/GU+a+3442NoQrMmKCGqO2eLchxByidW6ujNsiuTN6wGvY9B/QJopIQHOgzzCWyDKWx5DnOYc4P+7sjDaaaAeD7egUwlPql0oSQ5ucjz7lHLidB/Y1390pWi+0oY/WZUOOGtBzDdmAl4tAQo2kC/RNr4EuCxGqrJdpeFGlNVXeCiUPmc15qltBKplWtDebkuHAq3yBy9q4EBZNI/SC58W6FUR97pYgFVk7wliZWYwNAxNNrWHEuhakHe346EKWHay2oE2FPsNr3NwdGpPfyR2Ik7OaYXQncZIyqNRJyvwNfd9V3Rl/z7un/GXLTsrOYk/TuIUe4Q7OwhjOStUZZY2UhgSpkSDdoJ3zv6FHIPMwLVlq4hpjpWaJruIuUgYPJZpWI4mm6kVxNw/0hm5J9I+ThH5NcZ0MTc+HJTGSywvNlmFhxOc6RG9fngZrj91PdX5CRoee2F9IU8pct8YgsLz5DJiaOU3oa/VeFtUBdy0Vod430JiVhr5eXcTCKgiNc7PAg1WMofQh38tWoMnE1vgxUkEcpsUIK8ASPa7Ir1A3CN7f0fvofwod4F/3AA8cAR6Tgjvc/QIJZyVcRvsrLwAAAABJRU5ErkJggg==';
            const store = useStore();
            const route = useRoute();
            const menus = store.getters.getMatchMenus;

            const state = reactive({
                loading: false,
                finished: false,
                refreshing: false,
            });

            const listsObj = reactive({
                list: [],
                nextDate: '',
                prevDate: ''
            })

            async function getList(id: string|number) {
                const api = menus[id as string].api;
                const res = await matchApi.getMenu(api, listsObj.nextDate?listsObj.nextDate:timeFormat(Date.now()))
                listsObj.list.push(...(res.list as []));
                listsObj.nextDate = res.nextDate;
                listsObj.prevDate = res.prevDate;
                state.loading = false;
            }

            function timeFormat(time: number) {
                const date = new Date(time);
                const [year, month, day] = [
                    date.getFullYear(),
                    (date.getMonth() + 1).toString().padStart(2, '0'),
                    date.getDate.toString().padStart(2, '0')
                ]

                return `${year}-${month}-${day} 16:00:00next`;
            }

            function onLoad() {
                setTimeout(() => {
                    const id = route.params.id;
                    getList(id as string);
                }, 100)
            }

            return {
                b64,
                ...toRefs(listsObj),
                state,
                onLoad
            }
        } 
    })
</script>

<style scoped lang="scss">
    .match-list-item {
        position: relative;
        display: block;
        width: auto;
        height: 5.9rem;
        padding: 0 1.9rem;
        border-bottom: 1px solid #e8e8e8;
        background: #f7f7f7;
    }
    .match-item-a, .match-item-b {
        float: left;
        width: 75px;
        padding-top: 16px;
        img {
            display: block;
            width: 42px;
            margin: 0 auto;
        }
        p {
            line-height: 1;
            margin-top: 10px;
            font-size: 10px;
            color: #333;
            text-align: center;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
        }
    }

    .match-item-c {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        padding-top: 12px;
        p {
            font-size: 10px;
            line-height: 1;
            color: #999;
            text-align: center;
            & :first-of-type {
                width: 160px;
                line-height: .8;
                margin: 0 auto;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
            }
            &.spec {
                font-size: 24px;
                line-height: 1.5;
                margin: 10px 0;
                color: #333;
            }
        }
    }

    .match-item-b {
        float: right;
    }

    .icon-highlights {
        display: block;
        width: 92px;
        margin: 0 auto;
        margin-top: .3rem;
    }
</style>