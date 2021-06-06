 <template>
    <div class="matchd-head" v-cloak>
        <div class="head-a">
            <img :src="teamA?.logo" alt="">
            <p>{{ teamA?.name }}</p>
        </div>
        <div class="head-b">
            <img :src="teamB?.logo" alt="">
            <p>{{ teamB?.name }}</p>
        </div>
        <div class="head-c">
            <p>
                {{ matchTime?.show_time_day }}
                {{ matchTime?.show_time_min }}
                {{ competition }}
            </p>
            <p class="spec">{{ teamA?.score }} - {{ teamB?.score }}</p>
            <p>{{ playStatus }}</p>
        </div>
    </div>
</template>

<script lang="ts">
    import { defineComponent, computed } from 'vue'
    export default defineComponent({
        name: 'MatchBg',
        props: {
            teamA: {
                type: Object
            },
            teamB: {
                type: Object
            },
            matchTime: Object,
            status: String,
            competition: String
        },
        setup(props) {
            const playStatus = computed(() => {
                if (props?.status === 'Played') {
                    return '已结束';
                } else {
                    return '未开始'
                }
            })

            return {
                playStatus
            }
        }
    })
</script>

<style scoped lang="scss">
    .matchd-head {
        position: relative;
        height: 140px;
        background: url(https://static1.dongqiudi.com/m/dist/img/matchd-head.7088f53.jpg) no-repeat;
        background-size: 100% auto;
        color: #fff;
    }

    .head-a {
        float: left;
        padding-left: 40px;
    }

    .head-b {
        float: right;
        padding-right: 40px;
    }

    .head-a, .head-b {
        padding-top: 40px;
        img {
            display: block;
            width: 55px;
            height: 55px;
            margin: 0 auto;
        }
        p {
            font-size: 12px;
            line-height: 1;
            margin-top: 10px;
            text-align: center;
        }
    }

    .head-c {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        padding-top: 52px;
        p {
            font-size: 12px;
            line-height: 1;
            text-align: center;
            &.spec {
                font-size: 20px;
                margin: 7.5px 0 10px;
            }
        }
    }
</style>