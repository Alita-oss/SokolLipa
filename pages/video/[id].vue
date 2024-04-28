<template>
    <div class="page video-player">
        <video src="@/assets/videos/bob.mp4" controls playsinline></video>
    </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router';

const route = useRoute();
</script>

<style scoped lang="scss">
video {
    width: 100%;
    height: auto;
}

.video-player {
    display: flex;
    align-items: center;
    height: 100%;
    position: relative;
}
</style>
