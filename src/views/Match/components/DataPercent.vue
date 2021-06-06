<template>
    <div class="count-item clearfix">
        <div class="count-a">
            <span class="count-num">{{ teamAVal }}</span>
            <span class="count-line-con">
                <span :class="[{'ranks_l': !better}, 'count-line']" :style="{width: `${teamAPer}%`}">
                </span>
            </span>
        </div>
        <div class="count-c">{{ title }}</div>
        <div class="count-b">
            <span class="count-line-con">
                <span :class="[{'ranks_l': better}, 'count-line']" :style="{width: `${teamBPer}%`}">
                </span>
            </span>
            <span class="count-num">{{ teamBVal }}</span>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';

export default defineComponent({
    name: 'DataPercent',
    props: {
        title: String,
        teamAVal: [Number, String],
        teamAPer: [Number, String],
        teamBVal: [Number, String],
        teamBPer: [Number, String]
    },
    setup(props) {
        const {teamAPer, teamBPer} = props;

        const better = computed(() => {
            return ((teamAPer as number) > (teamBPer as number));
        })

        return {
            better
        }
    },
})
</script>


<style scoped lang="scss">
    .count-item {
        position: relative;
        line-height: 1;
        margin-top: 20px;
        font-size: 12px;
        color: #555;
    }

    .count-a, .count-b {
        box-sizing: border-box;
        width: 50%;
    }

    .count-a {
        float: left;
        padding-right: 30px;
        text-align: right;
        .count-num {
            margin-right: 20px;
        }
        .count-line {
            right: 0;
        }
    }

    .count-b {
        float: right;
        padding-left: 30px;
        text-align: left;
        .count-num {
            margin-left: 20px;
        }
        .count-line {
            left: 0;
        }
    }

    .count-c {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        font-size: 12px;
        text-align: center;
    }

    .count-line-con {
        position: relative;
        display: inline-block;
        width: 110px;
        height: 12px;
        background: #e9e9e9;
        vertical-align: top;
    }

    .count-num {
        font-size: 12px;
    }

    .count-line.ranks_l {
        background: #888;
    }

    .count-line {
        position: absolute;
        top: 0;
        width: 33%;
        height: .75rem;
        background: #16b13a;
    }
</style>