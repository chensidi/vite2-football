<template>
  <div>
    <h4 class="tit">转会记录</h4>
    <div
      class="tranfer-item"
      v-for="(
        { date, cost, fromImg, fromTeam, toImg, toTeam, type }, i
      ) of list"
      :key="i"
    >
      <div class="trs-info">
        <time>{{ date }}</time>
        <p>{{ cost ? cost : "" }} {{ !cost ? type : "" }}</p>
      </div>
      <div class="trs-team">
        <span class="txt-r van-ellipsis">
          <em>{{ fromTeam }}</em>
          <img :src="fromImg" alt="" />
        </span>
        <van-icon
          name="share"
          style="margin: 0 5px; transform: translateY(-5px)"
        />
        <span class="txt-l van-ellipsis">
          <img :src="toImg" alt="" />
          <em>{{ toTeam }}</em>
        </span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "Transfer",
  props: {
    list: {
      type: Array,
      default: [],
    },
  },
  setup(props: any) {
    return {
      list: props.list,
    };
  },
});
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

.tranfer-item {
  @include flex(flex-start);
  padding: 8px;
  .trs-info {
    font-size: 12px;
    width: 20%;
  }
  .trs-team {
    font-size: 13px;
    em {
      font-style: normal;
    }
    flex: 1;
    text-align: center;
    img {
      width: 20px;
      height: 20px;
      vertical-align: middle;
      margin: 0 3px;
    }
    span {
      width: 40%;
      display: inline-block;
    }
  }
}
</style>
