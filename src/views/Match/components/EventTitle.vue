<template>
    <ul class="clearfix">
        <li class="team-item left">
            <span class="team-text">{{ teamA?.name }}</span>
            <img :src="teamA?.logo" alt="">
        </li>
        <li class="team-item right">
            <img :src="teamB?.logo" alt="">
            <span class="team-text">{{ teamB?.name }}</span>
        </li>
    </ul>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    props: ['teamA', 'teamB'],
    setup() {
        
    },
})
</script>


<style scoped lang="scss">

    .team-item {
        width: 50%;
        line-height: 40px;
        font-size: 12px;
        background: #f2f2f2;
        img {
            display: inline-block;
            width: 25px;
            height: 25px;
            margin-top: 7.5px;
            vertical-align: top;
        }
    }

    .team-item.left {
        float: left;
        padding-right: 30px;
        text-align: right;
    }
    .team-item.right {
        float: right;
        padding-left: 30px;
        text-align: left;
    }
    .team-text {
        margin: 0 10px;
    }
</style>