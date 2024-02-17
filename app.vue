<template>
  <div class="layout">
    <SHeader />
    <NuxtPage />
    <SFooter />
  </div>
  <GamePopUp v-if="popupGame" :game="popupGame" @close="popupGame = null"/>
</template>

<script setup lang="ts">
  import { useMainStore } from '~/stores/main';

  const { popupGame } = storeToRefs(useMainStore());

</script>

<style scoped lang="scss">
.layout {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    padding-top: 100px;
    width: 100%;
    min-height: 100vh;
    min-height: 100dvh;
    position: relative;
}
</style>
