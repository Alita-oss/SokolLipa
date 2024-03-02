<template>
    <div class="page">
        <TeamTabs />
    </div>
</template>

<script setup lang="ts">
    import type { Gallery } from '~/types/gallery';
    import { useMainStore } from '~/stores/main';
    const { activeTab } = storeToRefs(useMainStore());

    const query = groq `*[_type == 'photoGallery']`;
    const { data, refresh } = useSanityQuery<Gallery>(query);
</script>

<style scoped lang="scss">

</style>