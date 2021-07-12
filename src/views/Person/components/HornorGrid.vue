<template>
  <div class="hornor-block">
    <template v-for="hornor of hornorData" :key="hornor.name">
      <h3>
        {{ hornor.name }} <em class="num">{{ hornor.years.length }}</em> 个
      </h3>
      <div class="hornor-grid">
        <div
          class="hornor-item"
          v-for="(year, i) of hornor.years"
          :key="`${year}-${i}`"
        >
          <img :src="hornor.img" alt="" />
          <span>{{ year }}</span>
        </div>
      </div>
    </template>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

interface hornorItemShape {
  name: string;
  years: Array<string>;
  img: string;
}

export default defineComponent({
  name: "HornorGrid",
  props: {
    hornorData: {
      type: Array,
      default: [],
    },
  },
  setup(props: any) {
    const hornorData: Array<hornorItemShape> = props.hornorData;

    return {
      hornorData,
    };
  },
});
</script>

<style lang="scss" scoped>
.hornor-block {
  h3 {
    font-size: 14px;
    text-align: center;
    line-height: 2;
  }
  .num {
    font: {
      size: 15px;
      weight: 600;
      style: normal;
    }
  }
  .hornor-grid {
    display: flex;
    flex-wrap: wrap;
    margin-bottom: 15px;
    .hornor-item {
      width: 20%;
      padding: 5px 10px;
      font-size: 12px;
      text-align: center;
      img {
        display: block;
        width: 80%;
        margin: 5px auto;
      }
    }
    border-bottom: 4px solid $gray2;
  }
}
</style>