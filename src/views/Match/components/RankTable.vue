<template>
    <table class="battle-table">
        <thead>
            <tr>
                <th v-for="head of props.columns" :key="head.prop">{{ head.title }}</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="(item, i) of props.lists" :key="i">
                <td v-for="(itemSub, j) of Object.keys(item)" :key="Number(i) + Number(j)">{{ item[keys[j]] }}</td>
            </tr>
        </tbody>
    </table>
</template>

<script lang="ts">
import { defineComponent, Ref, ref } from 'vue';

interface propsShape {
    columns: Array<any>,
    lists: Array<any>
}

export default defineComponent({
    props: {
        columns: {
            type: Array,
            default: function(): Array<any> {
                return [
                    {
                        prop: 'name',
                        title: '全场'
                    },
                    {
                        prop: 'matches_total',
                        title: '赛'
                    },
                    {
                        prop: 'matches_won',
                        title: '胜'
                    },
                    {
                        prop: 'matches_draw',
                        title: '平'
                    },
                    {
                        prop: 'matches_lost',
                        title: '负'
                    },
                    {
                        prop: 'goals_pro',
                        title: '得'
                    },
                    {
                        prop: 'goals_against',
                        title: '失'
                    },
                    {
                        prop: 'points',
                        title: '积分'
                    },
                    {
                        prop: 'rank',
                        title: '排名'
                    },
                    {
                        prop: 'win_rate',
                        title: '胜率'
                    }
                ]
            }
        },
        lists: {
            type: Array,
            default: function(): Array<any> {
                return []
            }
        }
    },
    setup(props: propsShape) {
        const keys: Ref<Array<any>> = ref([])
        function getAllKeys() {
            props.columns.map(item => {
                keys.value.push((item as any)['prop']);
            })
        }

        getAllKeys();

        return {
            keys,
            props
        }
    },
})
</script>


<style scoped lang="scss">
    .battle-table {
        font-size: 13px;
        width: 100%;
        text-align: center;
        line-height: 2;
    }
</style>