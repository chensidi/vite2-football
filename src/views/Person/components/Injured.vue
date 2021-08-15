<template>
    <div>
        <h4 class="tit">伤病记录</h4>
        <div class="injured-item" v-for="({reason, team, date}, i) of list" :key="i">
            <van-icon name="plus" style="color: red; font-weight: 900" />
            <div class="inj-info">
                <h5>{{ reason }}</h5>
                <p>{{ date }}</p>
            </div>
            <span class="team-name txt-r">
                {{ team }}
            </span>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    props: {
    list: {
      type: Array,
      default: [],
    },
  },
    setup(props: any) {
        return {
            list: props.list
        }
    },
})
</script>

<style lang="scss" scoped>
    .tit {
        background: #e9e9e9;
        color: #555;
        width: 100%;
        font-size: 0.6rem;
        padding: 0.25rem 0.5rem;
        overflow: hidden;
    }

    .injured-item {
        @include flex(flex-start);
        font-size: 12px;
        padding: 15px;
        .inj-info {
            margin-left: 15px;
            h5 {
                color: $black1;
                margin: 3px 0;
            }
            p {
                color: $gray1;
            }
        }
        .team-name {
            flex: 1;
        }
    }
</style>