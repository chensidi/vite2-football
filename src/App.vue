<template>
  <Header v-show="showHead" />
  <router-view v-slot="{ Component }">
    <keep-alive :include="['Home', 'Match', 'Live', 'Data']">
      <component :is="Component" />
    </keep-alive>
  </router-view>
  <Tabbar v-show="showTabbar" />
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';
import { useStore } from 'vuex'

import Tabbar from '@/components/Tabbar/Tabbar.vue'
import Header from '@/components/Header/Header.vue'

export default defineComponent({
  name: 'App',
  components: {
    Tabbar,
    Header
  },
  setup() {
    const store = useStore();

    const showTabbar = computed(() => store.getters.getShowTab);
    const showHead = computed(() => store.getters.getShowHead);

    return {
      showTabbar,
      showHead,
    }
  }
})
</script>

<style lang="scss">
  /* * {
    margin: 0;
    padding: 0;
  } */
</style>