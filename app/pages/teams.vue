<template>
    <div class="page">
        <div v-if="data?.players?.length" class="players">
            <PlayerCard v-for="player in data.players" :key="player._id" :player="player" />
        </div>
    </div>
</template>

<script setup lang="ts">
import type { Team } from "~/types/team";

const query = groq`*[_type == 'team' && name == 'Lípa'][0]`;
const { data, refresh } = useSanityQuery<Team>(query);
</script>

<style scoped lang="scss">
.players {
    display: grid;
    gap: 20px;

    @media (min-width: 1024px) {
        grid-template-columns: repeat(2, 1fr);
    }
}
</style>
