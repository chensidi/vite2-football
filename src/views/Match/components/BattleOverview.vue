<template>
    <div class="battle-overview">
        <div class="tt">
            <span class="t_a">{{ teamA }}</span>
            <em>
                近五场交锋记录
            </em>
            <span class="t_b">{{ teamB }}</span>
        </div>
        <div class="percent">
            <div class="win" :style="{width: winPc + '%'}">{{ win }} 胜</div>
            <div class="draw" :style="{width: drawPc + '%'}">{{ draw }} 平</div>
            <div class="loss" :style="{width: losePc + '%'}">{{ lose }} 胜</div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    name: 'BattleOverview',
    props: {
        teamA: String,
        teamB: String,
        win: {
            type: Number,
            required: true
        },
        draw: {
            type: Number,
            required: true
        },
        lose: {
            type: Number,
            required: true
        },
        winPc: Number,
        losePc: Number,
        drawPc: Number,
    },
})
</script>


<style lang="scss" scoped>
    .battle-overview {
        padding: 10px;
        .tt {
            text-align: center;
            font-weight: 600;
            font-size: 12px;
            &::after {
                clear: both;
                contain: "";
                display: block;
            }
            .t_a {
                float: left;
            }
            .t_b {
                float: right;
            }
            em {
                font-style: normal;
            }
        }
        .percent {
            height: 30px;
            margin-top: 10px;
        }
        .win, .draw, .loss {
            float: left;
            line-height: 30px;
            font-size: 13px;
            color: $white;
            padding: 0 5px;
        }
        .win {
            background: $red;
            text-align: left;
        }
        .draw {
            background: $green;
            text-align: center;
        }
        .loss {
            background: $sky;
            text-align: right;
        }
    }
</style>