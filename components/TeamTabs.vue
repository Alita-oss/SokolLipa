<template>
   <ul>
        <li v-for="team in teams" :key="team" :class="{ active: activeTab === team }" @click="teamClick(team)">{{ team }}</li>
   </ul>
</template>

<script setup lang="ts">
    import { useMainStore } from '~/stores/main';
    const { activeTab } = storeToRefs(useMainStore());

    const teams = [
        'Tym A', 
        'Tym B'
    ];
    const teamClick = (team: string) => {
        activeTab.value = team;
    };
</script>

<style scoped lang="scss">
ul {
    width: 100%;
    display: flex;
    margin: 20px 0 24px;

    li {
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        width: 50%;
        padding: 4px 0;
        font-size: 18px;
        line-height: 28px;

        &.active {
            border-bottom: 2px solid var(--color-green-600);
        }
    }
}
</style>
