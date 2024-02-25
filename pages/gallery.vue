<template>
    <div class="page">
        <TeamTabs />
    </div>
</template>

<script setup lang="ts">
    import { useMainStore } from '~/stores/main';
    const { activeTab } = storeToRefs(useMainStore());
</script>

<style scoped lang="scss">

</style>