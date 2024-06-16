<template>
    <div class="page video-player">
        <video :src="videoUrl" controls playsinline></video> 
    </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router';

const route = useRoute();

const videoUrl = computed(() => {
    const videoId = route.params.id;
    return `https://cdn.sanity.io/files/mgriwqg2/production/${videoId}.mp4`;
});
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
