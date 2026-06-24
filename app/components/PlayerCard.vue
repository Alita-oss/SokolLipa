<template>
    <div v-if="player" class="card">
        <div class="card__image">
            <SanityImage
                v-if="player.profilePhoto"
                :asset-id="player.profilePhoto.asset._ref"
                :alt="player.name"
                auto="format"
                height="240"
                fit="max"
                h="480"
            />
        </div>
        <div class="card__info">
            <h3 class="card__number">{{ player.number }}</h3>
            <h3 class="card__name">{{ player.name }}</h3>
            <h4 class="card__position">{{ player.position }}</h4>
        </div>
    </div>
</template>

<script setup lang="ts">
import type { Player } from "~/types/player";

defineProps<{
    player: Player;
}>();
</script>

<style scoped lang="scss">
.card {
    display: flex;
    gap: 20px;
    border-radius: 8px;
    box-shadow: 4px 3px 10px 1px #0003;

    &__image {
        img {
            border-top-left-radius: 8px;
            border-bottom-left-radius: 8px;
        }
    }

    &__number {
        font-size: 48px;
        font-family: Varsity;
        font-weight: 300;
    }

    &__name {
        font-size: 28px;
    }

    &__position {
        font-size: 24px;
    }
}
</style>
