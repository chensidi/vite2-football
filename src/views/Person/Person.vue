<template>
    <div>
        <div class="bg-info">
            <van-icon name="arrow-left" class="back" @click="back" />
            <div class="head">
                <div class="head-img">
                    <img :src="bgInfo.personImgUrl" alt="">
                    <img class="team-logo" :src="bgInfo.clubImgUrl" alt="">
                </div>
                <h4>{{ bgInfo.name }}</h4>
                <p>{{ bgInfo.enName }}</p>
                <p>
                    身   高：{{ bgInfo.height }} / 体   重：{{ bgInfo.weight }} / {{ bgInfo.country }} <img class="country-logo" :src="bgInfo.countryImgUrl" alt="">
                </p>
                <div class="bottom-info">
                    <span class="van-hairline--right">{{ bgInfo.age }}</span>
                    <span>{{ bgInfo.club }} / {{ bgInfo.number }}</span>
                    <span class="van-hairline--left">{{ bgInfo.position }} / {{ bgInfo.useFoot }}</span>
                </div>
            </div>
        </div>
        <div>
            <div class="charts" id="charts">
            </div>
            <van-grid :column-num="2" class="my-grid">
                <van-grid-item>
                    <span>惯用脚</span>
                    <img :src="skillInfo.useFootImg" alt="">
                </van-grid-item>
                <van-grid-item>
                    <span>
                        国际声望
                    </span>
                    <van-rate
                        v-model="skillInfo.countryKnown"
                        :size="20"
                        color="#ffd21e"
                        void-icon="star"
                        void-color="#eee"
                    />
                </van-grid-item>
                <van-grid-item>
                    <span>逆足能力</span>
                    <van-rate
                        v-model="skillInfo.uselessFoot"
                        :size="20"
                        color="#ffd21e"
                        void-icon="star"
                        void-color="#eee"
                    />
                </van-grid-item>
                <van-grid-item>
                    <span>花式技巧</span>
                    <van-rate
                        v-model="skillInfo.showSkill"
                        :size="20"
                        color="#ffd21e"
                        void-icon="star"
                        void-color="#eee"
                    />
                </van-grid-item>
            </van-grid>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import * as echarts from 'echarts';

import personApi from '@/api/person';

interface bgInfoShape {
    name?: string,
    enName?: string,
    clubImgUrl?: string,
    countryImgUrl?: string,
    personImgUrl?: string,
    height?: string,
    weight?: string,
    country?: string,
    age?: string,
    club?: string,
    number?: string,
    position?: string,
    useFoot?: string
}

interface skillShap {
    useFootImg?: string,
    countryKnown?: number,
    uselessFoot?: number,
    showSkill?: number,
}

export default defineComponent({
    setup() {

        const { params: {id} } = useRoute();
        const { back } = useRouter();

        const bgInfo: bgInfoShape = reactive({}); //背景信息
        const skillInfo:skillShap = reactive({}); //技巧能力
        const getPersonInfo = async () => {
            const res = await personApi.getPersonInfo(id as string);
            console.log(res);
            bgInfo.name = res.basicInfo.name;
            bgInfo.enName = res.basicInfo.enName;
            bgInfo.clubImgUrl = res.basicInfo.clubImgUrl;
            bgInfo.countryImgUrl = res.basicInfo.countryImgUrl;
            bgInfo.personImgUrl = res.basicInfo.personImgUrl;
            bgInfo.height = res.basicInfo.otherInfo.height;
            bgInfo.weight = res.basicInfo.otherInfo.weight;
            bgInfo.country = res.basicInfo.otherInfo.country;
            bgInfo.age = res.basicInfo.otherInfo.age;
            bgInfo.club = res.basicInfo.otherInfo.club;
            bgInfo.number = res.basicInfo.otherInfo.number;
            bgInfo.position = res.basicInfo.otherInfo.position;
            bgInfo.useFoot = res.basicInfo.otherInfo.useFoot;

            skillInfo.useFootImg = res.desc.useFootImg;
            skillInfo.showSkill = res.desc.showSkill;
            skillInfo.uselessFoot = res.desc.uselessFoot;
            skillInfo.countryKnown = res.desc.countryKnown;
            drawCharts(res.chartInfo);
        }

        function drawCharts(chartInfo: Array<any>) { //球员能力值雷达图
            var chartDom = document.getElementById('charts');
            var myChart = echarts.init(chartDom as HTMLElement);
            var option;

            let indicator = chartInfo.map(item => {
                return {text: {label: item.label, value: Number(item.value)}, max: 100}
            })
            let values = chartInfo.map(item => item.value);
            option = {
                backgroundColor: '#fff',
                radar: [
                    {
                        indicator: indicator,
                        name: {
                            formatter: (val: any) => val.label + val.value,
                            textStyle: {
                                color: '#fff',
                                backgroundColor: '#f40',
                                borderRadius: 3,
                                padding: [3, 5]
                            }
                        },
                        center: ['50%', '50%'],
                        radius: 80
                    }
                ],
                series: [
                    {
                        type: 'radar',
                        tooltip: {
                            trigger: 'item'
                        },
                        areaStyle: {
                            color: '#5fccff'
                        },
                        itemStyle: {     //此属性的颜色和下面areaStyle属性的颜色都设置成相同色即可实现
                            color: '#5fccff',
                            borderColor: '#5fccff',
                            borderWidth: 0,
                        },
                        emphasis: {
                            borderWidth: 50
                        },
                        axisLine: {     //配置雷达图的射线样式颜色
                            lineStyle: {
                                color: '#000',
                            },
                        },
                        data: [
                            {
                                value: values,
                                name: '能力值'
                            }
                        ]
                    },
                ],
                /* axisLine: { // (圆内的几条直线)坐标轴轴线相关设置
                    lineStyle: {
                        color: '#fff',
                        // 坐标轴线线的颜色。
                        width: 1,
                        // 坐标轴线线宽。
                        type: 'solid',
                        // 坐标轴线线的类型。
                    }
                } */
            }
            option && myChart.setOption(option);
        }

        getPersonInfo();

        return {
            bgInfo,
            back,
            skillInfo
        }
    },
})
</script>

<style lang="scss" scoped>
    .bg-info {
        position: relative;
        background: $green;
        color: $gray2;
        font-size: 12px;
        padding: 20px 10px 10px;
        .back {
            position: absolute;
            left: 5px;
            top:10px;
            color: #fff;
            font-size: 18px;
        }
        .head {
            text-align: center;
            .head-img {
                width: 50px;
                height: 50px;
                display: block;
                margin: auto;
                position: relative;
                img {
                    width: 100%;
                    border-radius: 50%;
                    &.team-logo {
                        position: absolute;
                        width: 18px;
                        height: 18px;
                        bottom: 0px;
                        right: -5px;
                    }
                }
            }
            h4 {
                font-size: 14px;
                line-height: 2;
                margin-top: 5px;
            }
            p {
                font-size: 12px;
                color: $gray2;
                line-height: 2;
            }
            .country-logo {
                width: 20px;
                vertical-align: middle;
            }
            .bottom-info {
                display: flex;
                margin: 10px 0;
                span {
                    flex: 1;
                    &:nth-child(2) {
                        flex: 2;
                    }
                }
            }
        }
    }

    .charts {
        width: 100%;
        height: 250px;
    }

    .my-grid {
        font-size: 14px;
        img {
            width: 30%;
        }
        span {
            color: $black1;
            position: absolute;
            top: 0;
        }
        & :deep .van-grid-item__content {
            padding: 20px 8px;
        }
    }
</style>
