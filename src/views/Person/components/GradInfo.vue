<template>
  <van-grid :column-num="2" class="my-grid">
    <van-grid-item>
      <span>惯用脚</span>
      <img :src="skillInfo.useFootImg" alt="" />
    </van-grid-item>
    <van-grid-item>
      <span> 国际声望 </span>
      <van-rate
        v-model="skillInfo.countryKnown"
        :size="20"
        color="#ffd21e"
        void-icon="star"
        void-color="#eee"
      />
    </van-grid-item>
    <van-grid-item>
      <span>逆足能力</span>
      <van-rate
        v-model="skillInfo.uselessFoot"
        :size="20"
        color="#ffd21e"
        void-icon="star"
        void-color="#eee"
      />
    </van-grid-item>
    <van-grid-item>
      <span>花式技巧</span>
      <van-rate
        v-model="skillInfo.showSkill"
        :size="20"
        color="#ffd21e"
        void-icon="star"
        void-color="#eee"
      />
    </van-grid-item>
  </van-grid>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'

export default defineComponent({
    name: 'GradInfo',
    props: {
        skillInfo: {}
    },
    setup(props: any) {
        const skillInfo = computed(() => props.skillInfo);

        return {
            skillInfo
        }
    },
})
</script>

<style lang="scss" scoped>
    .my-grid {
        font-size: 14px;
        img {
            width: 30%;
        }
        span {
            color: $black1;
            position: absolute;
            top: 0;
        }
        & :deep .van-grid-item__content {
            padding: 20px 8px;
        }
    }
</style>
