<template>
    <table class="battle-table">
        <thead>
            <tr>
                <th>日期</th>
                <th>赛事</th>
                <th>主队</th>
                <th>比分</th>
                <th>客队</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="(item, i) of battleLists" :key="item.date + i">
                <td>{{ item.date }} <br> {{ item.year }}</td>
                <td>{{ item.competition }}</td>
                <td :class="getClass(1, item)">{{ item.team_A_name }}</td>
                <td>
                    <span :class="['score', `${item.color}`]">{{ item.score }}</span>
                </td>
                <td :class="getClass(2, item)">{{ item.team_B_name }}</td>
            </tr>
        </tbody>
    </table>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    props: {
        battleLists: {
            type: Array,
            default: []
        },
        tag: {
            type: [Number, String],
            default: 0
        }
    },
    setup(props) {
        function computedClass(flag: number, item: any): string { //计算球队类名
            if (flag === 1) { // 表示左侧球队
                if (item.main_team === 'team_A') { //主队
                    if (item.color === 'win') {
                        return 'win-color';
                    } else if (item.color === 'draw') {
                        return 'draw-color';
                    } else {
                        return '';
                    }
                } else { //客队
                    if (item.color === 'win') {
                        return ''
                    } else if (item.color === 'draw') {
                        return '';
                    } else {
                        return 'lose-color';
                    }
                }
            } else { //右侧球队
                if (item.main_team === 'team_B') { //主队
                    if (item.color === 'win') {
                        return 'win-color';
                    } else if (item.color === 'draw') {
                        return 'draw-color';
                    } else {
                        return '';
                    }
                } else { //客队
                    if (item.color === 'win') {
                        return ''
                    } else if (item.color === 'draw') {
                        return '';
                    } else {
                        return 'lose-color';
                    }
                }
            }
        }

        function getMainClass(flag: number, item: any): string {
            if (flag === 1) { //左侧球队
                if (item.main_team === 'team_A') { //主队
                    return `${item.color}-color`;
                } else {
                    return '';
                }
            } else { //右侧球队
                if (item.main_team === 'team_B') { //主队
                    return `${item.color}-color`;
                } else {
                    return '';
                }
            }
        }

        function getClass(flag: number, item: any) {
            if (props.tag) {
                return getMainClass(flag, item);
            }
            return computedClass(flag, item);
        }

        return {
            computedClass,
            getMainClass,
            getClass
        }
    },
})
</script>


<style lang="scss" scoped>
    .battle-table {
        width: 100%;
        font-size: 13px;
        color: $black1;
        border-collapse: collapse;
        border-spacing: 0;
        text-align: center;
        tr {
            border-top: 1px solid #e8e8e8;
        }
        thead {
            line-height: 2;
        }
        .win {
            background: $red;
        }
        .lose {
            background: $sky;
        }
        .draw {
            background: $green;
        }
        .score {
            display: inline-block;
            width: 35px;
            line-height: 1.125;
            color: $white;
            border-radius: 2px;
        }
        .win-color {
            color: $red;
        }
        .lose-color {
            color: $sky;
        }
        .draw-color {
            color: $green;
        }
    }
</style>