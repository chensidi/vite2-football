<template>
    <div class="player-table">
        <table class="cell_data">
            <tbody>
                <tr>
                    <th v-for="item of props.header" :key="item">{{ item }}</th>
                </tr>
                <tr v-for="(item) of props.playerLists" :key="item.person_id">
                    <template v-if="props.header.length === 3">
                        <td class="player-name van-ellipsis">
                            {{ item.rank }}
                            <img v-waitload="item.person_logo" alt="">
                            {{ item.person_name }}
                        </td>
                        <td>{{ item.row_1 }}</td>
                        <td>{{ item.count }}</td>
                    </template>
                    <template v-else>
                        <td class="player-name van-ellipsis">
                            {{ item.rank }}
                            <img v-waitload="item.team_logo" alt="">
                            {{ item.team_name }}
                        </td>
                        <td>{{ item.count }}</td>
                    </template>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

interface propsShape {
    header: Array<any>,
    playerLists: Array<any>
}

export default defineComponent({
    props: {
        header: {
            type: Array,
            default: function(): Array<any> {
                return [];
            }
        },
        playerLists: {
            type: Array,
            default: function(): Array<any> {
                return [];
            }
        }
    },
    setup(props: propsShape) {
        return {
            props
        }
    },
})
</script>

<style lang="scss" scoped>
    .player-table {
        margin-left: 90px;
        height: 100%;
        overflow: auto;
        table {
            width: 100%;
            font-size: 12px;
            text-align: left;
            td {
                height: 30px;
                line-height: 30px;
                font-weight: 400;
                padding: 3px 0;
                border-top: 1px solid #ddd;
                white-space: nowrap;
                box-sizing: border-box;
                img {
                    width: 20px;
                    height: 20px;
                    vertical-align: middle;
                }
            }
            .player-name {
                max-width: 8em;
            }
        }
    }
</style>
