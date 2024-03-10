<template>
    <li v-if="game" @click="onClick">
        <div class="block block--left">
            <SanityImage 
                v-if="game.homeTeam?.logo?.asset?._ref"
                :asset-id="game.homeTeam.logo.asset._ref"
                :alt="game.homeTeam.logo.alt"
                auto="format"
                height="40"
                width="40"
                fit="max"
                h="80"
                w="80"
            />
            <span class="block__team">
                {{ game.homeTeam.name }}
            </span>
        </div>
        <div class="block block--center">
            <div v-if="hasScores" class="block__score">
                {{ game.homeTeamScore + ' - ' + game.awayTeamScore }}
            </div>
            <div class="block__date">
                {{ new Date(game.date).toLocaleDateString() }}
            </div>
            <div v-if="!hasScores" class="block__time">
                {{ new  Date(game.date).toLocaleTimeString([], { timeStyle: 'short' }) }}
            </div>
        </div>
        <div class="block  block--right">
            <span class="block__team">
                {{ game.awayTeam.name }}
            </span>
            <SanityImage
                v-if="game.awayTeam?.logo?.asset?._ref" 
                :asset-id="game.awayTeam.logo.asset._ref"
                :alt="game.awayTeam.logo.alt"
                auto="format"
                height="40"
                width="40"
                fit="max"
                h="80"
                w="80"
            />
        </div>
    </li>
</template>

<script setup lang="ts">
    import { useMainStore } from '~/stores/main';
    import type { Game } from '~/types/game';

    const isUndefined = useIsUndefined();

    const props = defineProps<{
        game: Game;
    }>();

    const { popupGame } = storeToRefs(useMainStore());
    const onClick = () => {
        popupGame.value = props.game;
    };

    const hasScores = !isUndefined(props.game.homeTeamScore) && !isUndefined(props.game.awayTeamScore);
</script>

<style scoped lang="scss">
li {
    display: flex;
    justify-content: space-between;
    padding: 12px;
    border-bottom: 1px solid var(--color-green-600-half);
    cursor: pointer;
    
    &:hover {
       background-color: var(--color-green-600-quarter);
    }
}
.block {
    display: flex;
    align-items: center;
    width: 33.33333%;

    &--left {
        justify-content: left;
    }

    &--center {
        justify-content: center;
        flex-direction: column;
        font-weight: 600;
    }

    &--right {
       justify-content: right; 
    }

    &__team {
        display: none;
        margin: 0 14px;
        font-size: 18px;
        line-height: 28px;

        @media (min-width: 1024px) {
            display: block;
        }
    }
    
    &__score {
        font-size: 18px;
        line-height: 28px;
    }

    &__date {
        font-size: 18px;
        line-height: 28px;
        white-space: nowrap;
    }

    &__time {
        white-space: nowrap;
        font-weight: 400;
    }
}
</style>
