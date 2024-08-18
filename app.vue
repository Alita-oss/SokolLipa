<template>
    <div class="layout">
        <SHeader />
        <NuxtPwaManifest />
        <NuxtPage />
        <SFooter />
    </div>
    <Transition name="fade">
        <GamePopUp v-if="popupGame" :game="popupGame" @close="popupGame = null" />
    </Transition>
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
    height: 100vh;
    height: 100dvh;
    position: relative;
}

.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.2s ease;
}
.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}
</style>
