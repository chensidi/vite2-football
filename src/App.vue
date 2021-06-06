<template>
  <Header />
  <router-view v-slot="{ Component }">
    <keep-alive :include="['Home', 'Match']">
      <component :is="Component" />
    </keep-alive>
  </router-view>
  <Tabbar />
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import Tabbar from '@/components/Tabbar/Tabbar.vue'
import Header from '@/components/Header/Header.vue'

export default defineComponent({
  name: 'App',
  components: {
    Tabbar,
    Header
  }
})
</script>

<style lang="scss">
  /* * {
    margin: 0;
    padding: 0;
  } */
</style>