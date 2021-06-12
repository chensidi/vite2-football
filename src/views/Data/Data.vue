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
        <league-table v-show="curType == 0" :standing="standing" />
        <!-- 球员数据榜 -->
        <div class="player-data" v-show="curType == 1 || curType == 2">
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
            <player-table 
                :playerLists="rankingList.list" 
                :header="rankingList.header"
            />
        </div>
        <!-- 赛程 -->
        <div v-if="curType == 3">
            <div class="activeRound">
                <span class="item" v-visible="hasRound(false)" @click="changeRound(false)"><van-icon name="arrow-left" class="round-cion" />上一轮</span>
                <span class="item" @click="scheduleInfo.show = true">{{ filterRound(scheduleInfo.rounds) }} <van-icon class="round-cion" name="arrow-down" /></span>
                <span class="item" v-visible="hasRound(true)" @click="changeRound(true)">下一轮<van-icon class="round-cion" name="arrow" /></span>
            </div>
            <schedule-table :matches="scheduleInfo.matches" />
        </div>
    </div>
    <van-popup v-model:show="seasonObj.show" round position="bottom">
        <van-picker
            :columns="seasonObj.columns"
            @cancel="seasonObj.show = false"
            @confirm="onConfirm"
        />
    </van-popup>
    <van-popup v-model:show="scheduleInfo.show" round position="bottom">
        <van-picker
            :columns="scheduleInfo.columns"
            @cancel="scheduleInfo.show = false"
            @confirm="confirmRound"
            :default-index="scheduleInfo.index"
        />
    </van-popup>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, defineAsyncComponent, Ref } from 'vue';
import { useStore } from 'vuex';
import rankingsApi from '@/api/rankings';
import scheduleApi, { scheduleParams } from '@/api/schedule';
import { UILoading, UILoaded } from '@/utils/ui';

const LeagueTable = defineAsyncComponent(() => import('./components/LeagueTable.vue'));
const PlayerTable = defineAsyncComponent(() => import('./components/PlayerTable.vue'));
const ScheduleTable = defineAsyncComponent(() => import('./components/ScheduleTable.vue'));

export default defineComponent({
    components: {
        'league-table': LeagueTable,
        'player-table': PlayerTable,
        'schedule-table': ScheduleTable,
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
            judgeType();
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
            UILoading();
            const res = await rankingsApi.getStanding(seasonId);
            standing.value = res?.content?.rounds[0]?.content?.data;
            UILoaded(500);
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
                judgeType();
            })
        }

        //数据排行tab切换
        const curType: Ref<string|number> = ref('0'); //当前排行数据类别
        function typeChange(name: string | number, title: string) {
            curType.value = name;
            curCateIdx.value = 0;
            judgeType();
        }

        //球员/球队榜数据类别
        const playerCates: Ref<Array<any>> = ref([]);
        const curCateIdx = ref(0);
        const getCateByType = async (type: string = 'person') => {
            const res = await rankingsApi.getCateByType(seasonObj.seasonId, type);
            playerCates.value = res.content.data;
            getRankingByType(type);
        }
        const rankingList = reactive({
            list: [],
            header: []
        })
        const getRankingByType = async (type: string = 'person') => {
            rankingList.list = [];
            UILoading();
            const res = await rankingsApi.getRankingByType(playerCates.value[curCateIdx.value].type, seasonObj.seasonId, type +'_ranking');
            rankingList.list = res.content.data;
            rankingList.header = res.content.header;
            UILoaded(500);
        }
        function cateChange(idx: number | string) {
            const type = curType.value === '1' ? 'person' : 'team';
            getRankingByType(type);
        }

        function judgeType() { //判断应该获取哪个类型的数据
            switch (curType.value) {
                case '0':
                    return getStanding(seasonObj.seasonId);
                case '1':
                    return getCateByType();
                case '2':
                    return getCateByType('team');
                case '3':
                    return getSchedule({seasonId: seasonObj.seasonId})
            }
        }

        const scheduleInfo: {
            rounds: Array<any>,
            matches: Array<any>,
            show: boolean,
            columns: Array<any>,
            index: number
        } = reactive({ //赛程信息
            rounds: [],
            matches: [],
            show: false,
            columns: [],
            index: 0
        })
        const getSchedule = async (params: scheduleParams) => { //获取赛程
            UILoading();
            const res =  await scheduleApi.getSchedule(params);
            scheduleInfo.rounds = res.content.rounds;
            scheduleInfo.matches = res.content.matches;
            scheduleInfo.columns = scheduleInfo.rounds.map((item, i) => {
                return {
                    text: item.name,
                    val: i
                };
            })
            UILoaded(500)
        }

        function filterRound(roundArr: Array<any>) { //筛选当前轮数
            const item = roundArr.find((item, i) => {
                scheduleInfo.index = i;
                return item.current;
            });
            return item?.name;
        }

        function confirmRound({text, val}: {text: string, val: number}) { //确定当前轮数
            console.log(text, val);
            scheduleInfo.index = val;
            const target = scheduleInfo.rounds[val];
            getSchedule({
                seasonId: target.params.season_id,
                roundId: target.params.round_id,
                gameWeek: target.params.gameweek
            })
            scheduleInfo.show = false;
        }

        function hasRound(flag: boolean = true) { //判断是否有上一轮/下一轮
            const idx = scheduleInfo.rounds.findIndex(item => item.current);
            if (flag) { //下一轮
                return idx < scheduleInfo.rounds.length - 1;
            } else { //上一轮
                return idx > 0;
            }
        }

        function changeRound(flag: boolean = true) { //上/下轮切换
            let idx = 1, target;
            scheduleInfo.rounds.find((item, i, arr) => {
                if (item.current) {
                    idx = i;
                    return i;
                }
            })
            if (flag) {
                target = scheduleInfo.rounds[idx + 1];
            } else {
                target = scheduleInfo.rounds[idx - 1];
            }
            getSchedule({
                seasonId: target.params.season_id,
                roundId: target.params.round_id,
                gameWeek: target.params.gameweek
            })
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
            cateChange,
            rankingList,
            scheduleInfo,
            filterRound,
            hasRound,
            changeRound,
            confirmRound,
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

    .activeRound {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-top: 5px;
        .item {
            flex: 1;
            height: 30px;
            text-align: center;
            line-height: 30px;
            font-size: 14px;
        }
    }

    

    
</style>