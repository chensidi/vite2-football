<template>
    <div class="charts" id="charts">
    </div>
</template>

<script lang="ts">
import { defineComponent, onUpdated } from 'vue';
import * as echarts from 'echarts/core';
import {
    RadarChart
} from 'echarts/charts';

import {
    CanvasRenderer
} from 'echarts/renderers';

echarts.use(
    [RadarChart, CanvasRenderer]
);

export default defineComponent({
    name: 'PersonChart',
    props: {
        chartInfo: []
    },
    setup(props: any) {
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

        onUpdated(() => drawCharts(props.chartInfo))
    },
})
</script>


<style lang="scss" scoped>
    .charts {
        width: 100%;
        height: 250px;
    }
</style>