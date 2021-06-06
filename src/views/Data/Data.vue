<template>
    <div class="content">
        <van-tabs v-model:active="active" @change="leagueChange">
            <van-tab :name="item.competition_id" :title="item.label" v-for="item of rankings" :key="item.competition_id">
            </van-tab>
        </van-tabs>
        <div class="tabs-hd">
            <span class="choose-season" @click="seasonObj.show = true ">{{ seasonObj.seasonName }} <van-icon name="arrow-down" /></span>
            <van-tabs type="card" class="my-data-tabs" @change="typeChange">
                <van-tab name="0" title="积分"></van-tab>
                <van-tab name="1" title="球员榜"></van-tab>
                <van-tab name="2" title="球队榜"></van-tab>
                <van-tab name="3" title="赛程"></van-tab>
            </van-tabs>
        </div>
        <!-- 球队积分榜 -->
        <LeagueTable v-show="curType == 0" :standing="standing" />
        <!-- 球员数据榜 -->
        <div class="player-data" v-show="curType == 1">
            <aside>
                <van-sidebar v-model="curCateIdx" @change="cateChange">
                    <van-sidebar-item 
                        :title="item.name" 
                        :name="item.type"
                        v-for="item of playerCates" 
                        :key="item.type" 
                    />
                </van-sidebar>
            </aside>
            <div class="player-table">
                <table class="cell_data">
                    <tbody>
                        <tr>
                            <th>球员</th>
                            <th>球队</th>
                            <th>进球数</th>
                        </tr>
                        <tr v-for="item of playerLists" :key="item.person_id">
                            <td>
                                <img v-waitload="item.person_logo" alt="">
                                {{ item.person_name }}
                            </td>
                            <td>{{ item.row_1 }}</td>
                            <td>{{ item.count }}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
    <van-popup v-model:show="seasonObj.show" round position="bottom">
        <van-picker
            :columns="seasonObj.columns"
            @cancel="seasonObj.show = false"
            @confirm="onConfirm"
        />
    </van-popup>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, defineAsyncComponent, Ref } from 'vue';
import { useStore } from 'vuex';
import rankingsApi from '@/api/rankings';
import { UILoading, UILoaded } from '@/utils/ui';

const LeagueTable = defineAsyncComponent(() => import('./components/LeagueTable.vue'))

export default defineComponent({
    components: {
        LeagueTable
    },
    setup() {
        const store = useStore();

        const rankings = store.getters.getRankings;

        //赛季选择器
        const seasonObj = reactive({
            seasonId: '',
            seasonName: '',
            show: false,
            columns: [] as any
        })

        function onConfirm(value: any) { //选择赛季
            seasonObj.seasonId = value.val;
            seasonObj.seasonName = value.text;
            seasonObj.show = false;

            //判断当前的排行数据类型 积分？球员榜？球队榜？
            getStanding(seasonObj.seasonId);
        }

        //获取赛季历史
        const seasonList = ref([] as any);
        const getSeasons = async (competitionId: string | number) => {
            const res = await rankingsApi.getSeasons(competitionId);
            seasonList.value = res;
            seasonObj.columns = (res as Array<any>).map((item) => {
                return {
                    text: item['season_name'],
                    val: item['season_id']
                }
            });
            seasonObj.seasonName = res[0]['season_name'];
            seasonObj.seasonId = res[0]['season_id'];
            return res;
        }

        //获取积分
        const standing = ref([] as any);
        const getStanding = async (seasonId: string | number) => {
            const res = await rankingsApi.getStanding(seasonId);
            standing.value = res.content.rounds[0].content.data;
        }

        //联赛改变
        function leagueChange(name: string | number, title: string) {
            UILoading();
            leagueInit(name);
            UILoaded(500);
        }

        //联赛排行初始化
        function leagueInit(competitionId: number | string) {
            getSeasons(competitionId).then(res => {
                // 判断联赛类型 积分？球队榜？球员榜？
                getStanding(res[0].season_id);
            })
        }

        //数据排行tab切换
        const curType: Ref<string|number> = ref('0'); //当前排行数据类别
        function typeChange(name: string | number, title: string) {
            curType.value = name;
            switch (name) {
                case '1':
                    getCateByType();
            }
        }

        //球员榜数据类别
        const playerCates: Ref<Array<any>> = ref([]);
        const curCateIdx = ref(0);
        const getCateByType = async () => {
            const res = await rankingsApi.getCateByType(seasonObj.seasonId, 'person');
            console.log(res);
            playerCates.value = res.content.data;
            getRankingByType();
        }
        const playerLists = ref([]);
        const getRankingByType = async () => {
            const res = await rankingsApi.getRankingByType(playerCates.value[curCateIdx.value].type, seasonObj.seasonId, 'person_ranking');
            playerLists.value = res.content.data;
        }
        function cateChange(idx: number | string) {
            getRankingByType();
        }

        leagueInit(rankings[0].competition_id);

        return {
            rankings,
            standing,
            seasonObj,
            onConfirm,
            leagueChange,
            typeChange,
            curType,
            playerCates,
            curCateIdx,
            playerLists,
            cateChange
        }
    },
})
</script>

<style scoped lang="scss">
    .tabs-hd {
        display: flex;
        align-items: center;
    }
    .my-data-tabs {
        flex: 1;
        :deep {
            .van-tabs__wrap {
                top: 4px;
                position: relative;
            }
            .van-tabs__nav--card {
                border: none;
                margin: 0;
                background: #001529;
                .van-tab {
                    color: $white3;
                    border-right: 1px solid $white3;
                    &.van-tab--active {
                        background: $sky;
                    }
                }
            }
        }
    }
    .choose-season {
        font-size: 14px;
        padding: {
            left: 10px;
            right: 10px;
        }
    }

    .player-data {
        padding: {
            top: 5px;
        }
        position: absolute;
        bottom: 50px;
        top: 123px;
        overflow: hidden;
        width: 100%;
        aside {
            float: left;
            overflow: auto;
            max-height: 100%;
        }
    }

    .van-sidebar {
        width: 90px;
    }
    .van-sidebar-item {
        padding: 13px 9px;
        font-size: 12px;
        text-align: center;
    }
    .player-table {
        margin-left: 90px;
        height: 100%;
        overflow: auto;
        table {
            width: 100%;
            font-size: 12px;
            text-align: left;
            td {
                    /* text-align: center; */
                    height: 30px;
                    /* font-size: .75rem; */
                    line-height: 30px;
                    /* text-align: center; */
                    font-weight: 400;
                    padding: 3px 0;
                    /* border-bottom: 1px solid #ccc; */
                    border-top: 1px solid #ddd;
                    white-space: nowrap;
                    box-sizing: border-box;
                img {
                    width: 20px;
                    height: 20px;
                    vertical-align: middle;
                }
            }
        }
    }
</style>