<template>
    <template v-for="(match, i) of matchData.slice(1)" :key="i">
        <div class="data-card">
            <div class="card-tt">
                <time>{{ match[0] }}</time>
                <span>{{ match[1] }}</span>
            </div>
        </div>
        <table class="cards-tb" >
            <thead>
                <tr>
                    <th v-for="hd of matchData[0].slice(2)" :key="i + hd">{{ hd }}</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td v-for="dt of match.slice(2)" :key="dt + Math.random()">
                        {{ dt }}
                    </td>
                </tr>
            </tbody>
        </table>
    </template>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    name: 'DataCard',
    props: {
        matchData: {
            type: Array,
            default: []
        }
    },
    setup(props: any) {
        const matchData = props.matchData;

        return {
            matchData
        }
    },
})
</script>

<style lang="scss" scoped>
    .data-card {
        .card-tt {
            background: $gray2;
            color: $black1;
            width: 100%;
            font-size: 12px;
            padding: 5px 10px;
            overflow: hidden;
            time {
                float: left;
            }
            span {
                float: right;
            }
        }
    }

    .cards-tb {
        width: 100%;
        font-size: 12px;
        text-align: center;
        padding: 10px 0;
        color: $black1;
    }
</style>