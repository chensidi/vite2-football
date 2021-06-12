<template>
    <table class="schedule-table">
        <tbody>
            <tr v-for="item of matches" :key="item.match_id">
                <td>{{ item.start_play }}</td>
                <td class="team-a">
                    {{ item.team_A_name }}
                    <img :src="item.team_A_logo" alt="">
                </td>
                <td v-if="item.status == 'Fixture'">VS</td>
                <td v-else>{{ item.score_A }} - {{ item.score_B }}</td>
                <td class="team-b">
                    <img :src="item.team_B_logo" alt="">
                    {{ item.team_B_name }}
                </td>
            </tr>
        </tbody>
    </table>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    name: 'ScheduleTable',
    props: {
        matches: Array
    },
    setup() {
    },
})
</script>

<style lang="scss" scoped>
    .schedule-table {
        width: 100%;
        font-size: 12px;
        background: $gray2;
        img {
            vertical-align: middle;
            height: 20px;
            display: inline-block;
            width: auto;
        }
        .team-a{
            text-align: right;
            padding-right: 10px;
        }
        .team-b {
            text-align: left;
            padding-left: 10px;
        }
        td {
            text-align: center;
            padding: 5px 0;
            border-bottom: 1px solid #ccc;
        }
    }

    .round-icon {
        vertical-align: -1px;
        font-size: 13px;
        margin: 0 2px;
    }
</style>
