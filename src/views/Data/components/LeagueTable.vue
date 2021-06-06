<template>
    <table class="cell_data">
        <tbody>
            <tr>
                <th></th>
                <th class="team">球队</th>
                <th>场</th>
                <th>胜</th>
                <th>平</th>
                <th>负</th>
                <th>进/失</th>
                <th>积分</th>
            </tr>
            <tr v-for="item of standing" :key="item.team_id">
                <th>{{ item.rank }}</th>
                <th class="team">
                    <img v-waitload="item.team_logo" alt="">
                    {{ item.team_name }}
                </th>
                <th>{{ item.matches_total }}</th>
                <th>{{ item.matches_won }}</th>
                <th>{{ item.matches_draw }}</th>
                <th>{{ item.matches_lost }}</th>
                <th>{{ item.goals_pro }}/{{ item.goals_against }}</th>
                <th>{{ item.points }}</th>
            </tr>
        </tbody>
    </table>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    props: {
        standing: {
            type: Array,
            default: []
        }
    },
    setup() {
        
    },
})
</script>

<style scoped lang="scss">
    .cell_data {
        width: 100%;
        border-collapse: collapse;
        border-spacing: 0;
        border-top: 1px solid #ddd;
        background: #e2e2e2;
        .team {
            text-align: left;
            width: 30%;
            white-space: nowrap;
        }
        th {
            height: 30px;
            font-size: 13px;
            line-height: 30px;
            text-align: center;
            font-weight: 400;
            padding: 3px 0;
            border-bottom: 1px solid #ccc;
            border-top: 1px solid #ddd;
            white-space: nowrap;
            box-sizing: border-box;
        }
        img {
            vertical-align: middle;
            height: 20px;
            display: inline-block;
            width: auto;
        }
    }
</style>
