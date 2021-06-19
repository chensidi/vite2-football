<template>
    <section class="details-wrap" v-cloak>
        <match-bg 
            :teamA="bgInfo.teamA"
            :teamB="bgInfo.teamB"
            :matchTime="bgInfo.matchTime"
            :competition="bgInfo.competition"
            :status="bgInfo.status"
        />
        <van-tabs 
            v-model:active="active" 
            sticky 
            :offset-top="50"
            title-active-color="#16b13a"
            title-inactive-color="#333"
            color="#16b13a"
            animated
            swipeable
        >
            <van-tab title="赛况">
                <section v-if="status === 'Played' && events.length">
                <h3 class="matchd-title">
                    事件
                </h3>
                <event-title 
                    :teamA="bgInfo.teamA" 
                    :teamB="bgInfo.teamB" 
                />
                <match-line :events="events" />
                <div class="event-logo">
                    <span class="event-item">
                        <i class="event-icon icon-scoring"></i>
                        进球
                    </span>
                    <span class="event-item">
                        <i class="event-icon icon-scoring"></i>
                        点球
                    </span>
                    <span class="event-item">
                        <i class="event-icon icon-penaltyno"></i>
                        点球未进
                    </span>
                    <span class="event-item">
                        <i class="event-icon icon-own"></i>
                        乌龙球
                    </span>
                    <span class="event-item">
                        <i class="event-icon icon-assists"></i>
                        助攻
                    </span>
                </div>
                <h3 class="matchd-title">
                    技术统计
                </h3>
                <event-title 
                    :teamA="bgInfo.teamA" 
                    :teamB="bgInfo.teamB" 
                />
                <div class="count-main">
                    <data-percent 
                        v-for="statistic of statistics" 
                        :key="statistic.title" 
                        :title="statistic.title"
                        :teamAVal="statistic.teamAVal"
                        :teamBVal="statistic.teamBVal"
                        :teamAPer="statistic.teamAPer"
                        :teamBPer="statistic.teamBPer"
                    />
                </div>
                <h3 class="matchd-title">
                    相关新闻
                </h3>
                <news-item v-for="item of relatedNews" :key="item.id"  
                    :cover="item.thumb"
                    :title="item.title"
                    :cmtCount="item.commentsTotal"
                    :showcontent="item.showcontent"
                    :author="item.author_classify"
                    :top="item.top"
                    :label="item.label"
                    :id="item.id"
                />
                </section>
                <no-data v-else>
                    暂无比赛数据
                </no-data>
            </van-tab>
            <van-tab title="阵容">
                <section v-if="lineup.length">
                <h3 class="matchd-title">
                    首发阵容
                </h3>
                <div>
                    <against-item 
                        v-for="(item, i) of lineup" 
                        :key="'line-' + i" 
                        :teamA="item.team_A"
                        :teamB="item.team_B"
                        :class="[{'odd': i % 2}]"
                    />
                </div>
                <h3 class="matchd-title">
                    替补阵容
                </h3>
                <against-item 
                    v-for="(item, i) of sub" 
                    :key="'sub-' + i" 
                    :teamA="item.team_A"
                    :teamB="item.team_B"
                    :class="[{'odd': i % 2}]"
                />
                </section>
                <no-data v-else>
                    暂无比赛数据
                </no-data>
            </van-tab>
            <van-tab title="分析">
                <h3 class="matchd-title">
                    对赛往绩
                </h3>
                <battle-overview 
                    :teamA="overview.teamA"
                    :teamB="overview.teamB"
                    :win="overview.win"
                    :draw="overview.draw"
                    :lose="overview.lose"
                    :winPc="overview.winPc"
                    :drawPc="overview.drawPc"
                    :losePc="overview.losePc"
                /> 
                <battle-table 
                    :battleLists="battleLists"
                />

                <section v-if="rankA.length">
                <h3 class="matchd-title">
                    联赛积分榜
                </h3>
                <div class="analysis-team">
                    <img :src="bgInfo.teamA.logo" alt="">
                    {{ bgInfo.teamA.name }}
                </div>
                <rank-table :lists="rankA"></rank-table>
                </section>

                <section v-if="rankB.length">
                <div class="analysis-team">
                    <img :src="bgInfo.teamB.logo" alt="">
                    {{ bgInfo.teamB.name }}
                </div>
                <rank-table :lists="rankB"></rank-table>
                </section>

                <h3 class="matchd-title">
                    近期战绩
                </h3>
                <div class="analysis-team">
                    <img :src="bgInfo.teamA.logo" alt="">
                    {{ bgInfo.teamA.name }}
                </div>
                <battle-table 
                    :battleLists="historyA"
                    tag="1"
                />
                <div class="analysis-team">
                    <img :src="bgInfo.teamB.logo" alt="">
                    {{ bgInfo.teamB.name }}
                </div>
                <battle-table 
                    :battleLists="historyB"
                    tag="1"
                />
            </van-tab>
            <van-tab title="集锦">
                <section v-if="video">
                <h3 class="matchd-title">
                    战报
                </h3>
                <video :src="video" class="match-video" controls></video>
                </section>
                <no-data v-else>
                    暂无比赛数据
                </no-data>
            </van-tab>
        </van-tabs>
    </section>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, toRefs, defineAsyncComponent } from 'vue';
import { useRoute } from 'vue-router';

import matchApi from '@/api/match';
import { UILoading, UILoaded } from '@/utils/ui';

const BattleOverview = defineAsyncComponent(() => import('./components/BattleOverview.vue'))
const NoMatchData = defineAsyncComponent(() => import('./components/NoData.vue'))
const AgainstItem = defineAsyncComponent(() => import('./components/AgainstItem.vue'))
const NewsItem = defineAsyncComponent(() => import('@/views/Home/NewsItem.vue'));
const DataPercent = defineAsyncComponent(() => import('./components/DataPercent.vue'))
const EventTitle = defineAsyncComponent(() => import('./components/EventTitle.vue'))
const MatchLine = defineAsyncComponent(() => import('./components/MatchLine.vue'))
const MatchBg = defineAsyncComponent(() => import('./components/MatchBg.vue'))
const BattleTable = defineAsyncComponent(() => import('./components/BattleTable.vue'))
const RankTable = defineAsyncComponent(() => import('./components/RankTable.vue'))

export default defineComponent({
    setup() {
        const route = useRoute();
        const active = ref(0);
        const list = new Array(50);

        const events = ref<any>([]); //事件数组
        const statistics = ref<any>([]); //技术统计
        const bgInfo = reactive<any>({
            teamA: null,
            teamB: null,
            matchTime: null,
            status: '',
            competition: ''
        }); //头部信息
        const relatedNews = ref<any>([]); //相关新闻
        const getSituation = async () => { //获取赛况
            UILoading();
            const res = await matchApi.getSituation(route.params.id as string);
            try {
                if (res.info.status === 'Played') { //已结束的比赛才有赛况内容
                    Object.values(res.info.events).map(event => {
                        events.value.push(event);
                    })
                    getStatistics(res.info.statistics.list);
                }
                relatedNews.value = res.info.relateArticle;
            } catch (e) {
                console.log(e)
            }
            getBgInfo(res);
            UILoaded(500);
        }

        const [lineup, sub] = [ref([] as Array<any>), ref([] as Array<any>)]; //首发&替补
        const getLineup = async () => { //获取阵容
            const res = await matchApi.getLineup(route.params.id as string);
            try {
                lineup.value = res.info.lineup;
                sub.value = res.info.sub;
                lineup.value.unshift({ //人员最前面插入队名
                    team_A: {
                        person: res.match.team_A.name,
                        person_logo: res.match.team_A.logo
                    },
                    team_B: {
                        person: res.match.team_B.name,
                        person_logo: res.match.team_B.logo
                    }
                })
            } catch (e) {
                console.log(e)
            }
        }

        const battleData: {
            overview: any,
            battleLists: Array<any>,
            historyA: Array<any>,
            historyB: Array<any>,
            rankA: Array<any>,
            rankB: Array<any>,
        } = reactive({ //交锋数据
            overview: null,
            battleLists: [],
            historyA: [],
            historyB: [],
            rankA: [],
            rankB: []
        })
        const getAnalysis = async () => { //数据分析
            const res = await matchApi.getAnalysis(route.params.id as string);
            
            try {
                battleData.overview = {
                    teamA: res.info.team_A,
                    teamB: res.info.team_B,
                    win: res.info.battle_history.team_A.win,
                    draw: res.info.battle_history.team_A.draw,
                    lose: res.info.battle_history.team_B.win,
                    winPc: res.info.battle_history.percent.win,
                    drawPc: res.info.battle_history.percent.draw,
                    losePc: res.info.battle_history.percent.lose,
                }

                battleData.battleLists = res.info.battle_history.list;
                battleData.historyA = res.info.recent_record.team_A;
                battleData.historyB = res.info.recent_record.team_B;

                battleData.rankA = Object.values(res.info.league_table.team_A);
                battleData.rankB = Object.values(res.info.league_table.team_B);
            } catch (e) {
                console.log(e)
            }
        }

        function getBgInfo(res: any) { //背景数据
            bgInfo.teamA = res.match.team_A;
            bgInfo.teamB = res.match.team_B;
            bgInfo.matchTime = {
                show_time_day: res.show_time_day,
                show_time_min: res.show_time_min
            },
            bgInfo.status = res.info.status;
            bgInfo.competition = res.match.competition.short_name;
        }

        function getStatistics(list: Array<any>) { //技术统计数据
            list.map((item) => {
                statistics.value.push({
                    title: item.type,
                    teamAVal: item.team_A.value,
                    teamBVal: item.team_B.value,
                    teamAPer: item.team_A.per,
                    teamBPer: item.team_B.per,
                })
            })
        }

        const hightLights: {
            video: null | string,
            gifs: Array<any>
        } = reactive({
            video: null,
            gifs: []
        })
        const getHighLights = async () => { //获取集锦
            const res = await matchApi.getHighlights(route.params.id as string);
            hightLights.video = res.info.article;
            hightLights.gifs = res.info.gifCollection;
        }

        getSituation();
        getLineup();
        getAnalysis();
        getHighLights();

        return {
            active,
            list,
            events,
            ...toRefs(bgInfo),
            bgInfo,
            statistics,
            relatedNews,
            lineup,
            sub,
            ...toRefs(battleData),
            battleData,
            ...toRefs(hightLights)
        }
    },
    components: {
        'match-bg': MatchBg,
        'match-line': MatchLine,
        'event-title': EventTitle,
        'data-percent': DataPercent,
        'news-item': NewsItem,
        'no-data': NoMatchData,
        'against-item': AgainstItem,
        'battle-overview': BattleOverview,
        'battle-table': BattleTable,
        'rank-table': RankTable
    }
})
</script>

<style scoped lang="scss">
    .details-wrap {
        padding: {
            top: 50px;
            // bottom: 50px;
        }
    }

    .count-main {
        padding-bottom: 20px;
        background: #f7f7f7;
        overflow: hidden;
    }
    .matchd-title {
        line-height: 30px;
        height: 30px;
        padding-left: 12px;
        font-size: 14px;
        background: #e8e8e8;
        font-weight: 700;
        margin: 0;
    }

    .event-logo {
        display: flex;
        background: $white2;
        .event-item {
            flex: 1;
            font-size: 12px;
            line-height: 2.5;
            text-align: center;
        }
    }

    .event-icon {
        display: inline-block;
        width: 12px;
        height: 12px;
        vertical-align: middle;
        background-repeat: no-repeat;
        background-position: 50%;
        background-size: 12px auto;
    }

    .icon-scoring {
        background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAMAAADXqc3KAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAADAUExURUxpcbu6u3x9fLCwsKurq5mZmWpqanV1dbSztHh4eJiYmHNzc7Oxs2RkZLu7u4WFhY+Pj4ODg2hoaGVlZba2tr67vqWjpaWlpW9vb3Jycvf39/z8/P////7+/paWlmBgYPn5+VtbW+no6WJiYm9vb2ZmZo+Pj/Hx8fX19dra2mlpaXx8fO7v7oODg+vr66+vr2tra9XV1YmJiaqqqp+fn7a2tpubm3Nzc6ampt7e3qKiosC+v+Lh4cvKy+Df4Hl5eYzbs0sAAAAadFJOUwBW9y98eu3+KvCk1CXUW7GlsbHtW1uiorCwxDtzNwAAAZtJREFUKM9VUud6ozAQlG1AxiX1KgJ1kOgdY2wn7/9WEfhyl9t/O7PfzmwB4B5b+3HvOPtnewu+xma3fk9EGIrkfb3b/MMfXFnecEVI1d1K6X77xC2IYw9lfSUvCnkxPll3fAUx96nnFxgXvkd9juFqkV0PPPC0RmocM6S1h4phPVvYJRdkcI2ycSoMoanXhzsADic2KH8mVDuqmfCLiMEDsCoGa48i0zuKjBZC3k2yygKPCSF5X3N1ncKwe1O87lNCkmewFyLFGHdtYyrCpu0wHppQ7IGTRLEpKyExkxMCy5prPkkHvEZvAUKoaENiVhJO3CQ+717BsVWL+RgyIdipnq1TXR7BS8Rnj4FqiBAkz4LZeRG9ADuNF+KaNxg3+XUhzqkNDmlLfdMV43OWnfHATULb9ADAk4x1VpR57BvVOC+LTMXyaV6im3dTlF4QNarokkbDkLvLHVeSheRux3Q/McHk6s+hJGNJ6/mUBrSvGJPW5wm/u4LBWCulzykT7sOXZ/gJq2bs+zGq4I/Nf3+ytX8fHef46+/7fADrNT/I0Ic0YwAAAABJRU5ErkJggg==);
    }
    .icon-penalty {
        background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAMAAADXqc3KAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAACQUExURUxpcUCwWCakQx2gPGK9dWi/fJnSpYnLmDCnTRWdNQ+bMYPKk5nTpXjGiFa2bZHPn4DJkAmYLfL/5uf/3Pb/6e//4+n/3lm9a+v/4AGUJSmmRhCbMrvrunTJgReeNzSrTt371tf40MXwwdP2zWnEeOP92VC5ZEe0XSGiPx2gPGDBcX7PiYnTkT2wVZbanKnjqxVMW30AAAARdFJOUwCx1LF6o1Yq8e3UfFt7pFtqG38aMQAAAX5JREFUKM9dUtlywyAMJIkT22mTDgaMuQ/j207+/+8K7pWphgekRdKyEgBflmeHY1keD1kOXi0/b1xDIaA25v4CvRfj8qQawik8l7H4+Im/cSprYtdpeljSSMpvX/ELpy0mNXaUOlwT3FJ+2esXc1vVCBGrlCUI1ZWbi9TnrB+kQTsQXARQ06ziHBM4my1OGZ1SXRUB7HrGc3DTjD8bQmLtvo+9CKmfI9M3cIgszSrbzgchgu9auRoI9QEcBTSU0qCG+EIPKlA6DwIeQal7GZ8tHKafQ77IFrVhKkHZ+yqaUyIBIrjo4DaU4KpQ5NhUkjMI2SgTdYKWKzj1LnGs7ACjbXZ3XH8CmZH73W8DpcPmkwiVNxnIjWpwEoh6az2dXXQaZaIm90ki65bNY1JhuS3OdnK67yJuIfTmQRIH8jD9PG+7iOAyMpHo1HsrHp3p8j2okTEdOzXxrBNj49vfaCHjHnUd8obB4v11GXiUaV3VMPHzvz3JTteyvJ5+1+cTix4u2mGPX5oAAAAASUVORK5CYII=);
    }
    .icon-penaltyno {
        background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAMAAADXqc3KAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAADYUExURUxpcV+7dJbRoZLQnli4bheeNzOoT4bKljqsVXjGiECwVyekQw+aMR2gPGe/eyShQRGbMnjGiDWqTv///+3/4/v//vmzsuX/2uUHAhWdNvixsDOpTQqYLvT/6FS6aB2gPOkyLIfRkvT++es5NOYUDuo1MAKUJ2nFeP/8/uowK5LWoNL1zYXPmNP03vN6eP6ytCSkQ5vaqHbKhvT/9Oo7NnzPiN386P/S1+b93df4z0e1XcHtvqnjt9361er98cXwwvZ7e+s7Ntz45v3/8fq1tL7svPewr+s8N6x8fRoAAAATdFJOUwB6Vluk7fAq/Hux1NSxovntbbE+6xlsAAABn0lEQVQoz11SaXOrMAx00hAgR9sZYcAYzH0UCCHkTpO0rwf5///oifScevxBsytrZa0I+ThybzSWpPGoJ5PfRx4onNkML1cGv6ibYb1eCNe23fS4roc3X7iq5Julc/JdNz85y02uqB94X1kAAH3dC7F/pRgulP61vpLDtmoz2KXpDrK22iLT6QzcGVTRyoLA9wPQV1GVzdwBPqjtBcxD8+ENzmd488x4Drldy0RliTID3TMvOmC++aDDTEmYSkYsSQQyFzO2rNj8h7iwEzYiY9vmwn8BPY48L4p1ePHTA7PHRGLi/VQUAbReFHktBEVhFKkrkXvx5DiaRr8IqmmOU6T3ZNIYmoH4ZykLGQTWEzIV+y6/E2/b2Fx1jLYXU9Lj7w7NsF2EwLqYnpVR55H3iMybJbQhAkApWJ4ZtrBcc7kbyQZHEl5LIBNGFWy6kRB5WNLt87wT7ZqYP29pObya1edlkAVnxJFZYljy/qdRvDmWvoG/cYy8PDZc/bGWJfXjzjB2TzxhP9aizu0dO6S+3xzcu9s/e6JOJ5I0mX6vz39rgDlbvZwLFQAAAABJRU5ErkJggg==);
    }
    .icon-own {
        background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAMAAADXqc3KAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAB7UExURUxpcfmRzPmUzPtUsvp3wf0knvtYtPmCxf4NlP8Fkv0enf0zpvpqvPtGrf0TmP8Fk/X19fX//P8AjfX/+v8EkvX7+PxTsv8AiPbs8f4am/8PlvthuPtwvv4pofbk7vbf7Pp/xf05qPfQ5ffH4v1GrfqQzPjA3/mm1fi02rA7E2kAAAAQdFJOUwBbVqR893oq1O3tsaKlsLEyA6/QAAABY0lEQVQoz11SiZLCIAxF7emxUu6zUKDq/3/hhuqqs5nONOQleeERhJ7Wd6dhHIdT16Nv6w+tZoTBp9vDF7Q7mngXjBBjH9Ecd3/xRovMqVqNWRXlWejmGd9rESbOp1mIuf6D0PutfysCxRhT5ZzanNm2lefA7pQ/ATtXgPOVHaBAS6umCuB3RZG6Rw2T+sE5pVMoBbgoxXcjWYNOMKVfbwEny5hNONxWTwg7oQHiQgjrFshgi7PggzugkZWswi1qUm9OdITiYM2IxpIo2OwAIIS4QCudHdHgYB7MadaSEGludXSO44Cu5XW9BfLl8px8LlfU+VyBKS2LEMuStqzkO9R7xyfoKkRSKlW56ESjB00uJmM1R58nYM0+zgpnc9lE9NYWv26sdPXFWr+JiPZGbuPgrbuuh/3roYyUDJhAMR6ZlKb5PC2RGpgUTl6Sz9MCz7kFmWJ0xbTnf3vS/dT1+Xmvzy+BdSgUO6W2+wAAAABJRU5ErkJggg==);
    }
    .icon-assists {
        background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAUCAMAAACgaw2xAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAEIUExURUxpcebm5vz8/NnZ2f////r5+vLy8vj4+Pf39//8//r6+vr6+vf39/j4+Pn5+fb29vT09PTz9Pf39/r6+vLw8v7+/re3t5+fn5KSkv///+Xl5fr8+vj4+P///+Hg4cPDw/b19qioqPb29vb29vb19YiIiMnIydPT035+fv////b19vHw8YCAgPz8/Pr5+mpra9DP0O/u7319fcrKynBwcHl5eYyMjJ+foHNzc9XU1eTk5ODf4GRkZISDhImJirW1tpCQkMXFxqSkpP7+/piYmKysrO3s7ZWVlYeHh9vb28C/wIWFhbCwsaGhoqenqFlZWvT09Orp6pqbnL69vnd2d7m5uVxcXFRVVeaScaoAAAApdFJOUwDinPAEiuP+Ugti2FwnRMKUnM4+72/z8PA087Dw4dnw9PAettnw8PDwsTYS6wAAAVZJREFUGNNNkeV2wkAQRgMUCQ7F6i4TdzcIRNBg7fu/SZO0NHw/ds+59+zM7iyCnIKiyfpSeHooXSJZ0Hbuvh3vpbXA8Y/PmSh6E2vcRKpawBGEms9El1G+iEJLmxgzXvHZ/2JoySYWtDSxDC4k18KxexJNdmWO7QUnLXUSto4Y9v/EjUZIHhkyGgllChhF7v3ySnmmzF2IQ5WjCGAmDFJ+cacJZgQYRmFRRAG4e2GUijo72Vg4xBQjATB1pYjv6YFXW3F2Sy8u75Ls2DnQUz5KRF41xIj1dx64+sykDWvPYsWY93XfcHAIp0uPN2lxur9uFRvJMMJgwds7HfCVKUrzXKfeSBt3eIsYQyTLOC5tprkKenrzUQzU+P74OiAE2bvKpvfJxXzLMP43bXu1s48Yifut6mxoTmYwsnImGO4gEbQg8yxVq55xpPQxfBsOCr3bfNY3yQ851z3d4LvuoQAAAABJRU5ErkJggg==);
    }

    .analysis-team {
        font-size: 14px;
        padding: 10px 12px;
        img {
            width: 25px;
            height: 25px;
            vertical-align: middle;
            margin-right: 10px;
        }
    }
    .match-video {
        width: 100%;
        padding: 10px;
    }
</style>