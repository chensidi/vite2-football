<template>
    <div class="person-item">
        <div class="person-l">
            <em>{{ teamA.person }}</em>
            <img :src="teamA.person_logo" alt="">
        </div>
        <div class="person-r">
            <img :src="teamB.person_logo" alt="">
            <em>{{ teamB.person }}</em>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    props: {
        teamA: {
            type: Object,
            default: function() {
                return {}
            }
        },
        teamB: {
            type: Object,
            default: function() {
                return {}
            }
        }
    },
    setup() {
        
    },
})
</script>


<style lang="scss" scoped>
    .person-item {
        padding: 7.5px 0;
        display: flex;
        background: $white2;
        &.odd {
            background: $white3;
        }
        .person-l, .person-r {
            width: 50%;
            overflow: hidden;
            img {
                width: 25px;
                height: 25px;
                vertical-align: middle;
            }
            font-size: 13px;
            em {
                font-style: normal;
                margin: 0 10px;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
                max-width: 70%;
                transform: translateY(3px);
            }
        }
        .person-l {
            padding-right: 30px;
            text-align: right;
        }
        .person-r {
            padding-left: 30px;
            text-align: left;
        }
    }
</style>