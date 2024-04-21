<template>
    <span v-if="countdown && isMobile" class="hero__countdown fuzz">
        {{ countdown }}
    </span>
    <div v-if="game" class="hero__row">
        <div class="hero__row__section">
            <SanityImage 
                v-if="game.homeTeam?.logo?.asset?._ref"
                :asset-id="game.homeTeam.logo.asset._ref"
                :alt="game.homeTeam.logo.alt"
                auto="format"
                height="100"
                width="100"
                fit="max"
                h="200"
                w="200"
            />
        </div>
        <div v-if="countdown && !isMobile" class="hero__row__section">
            <span class="hero__countdown fuzz">
                {{ countdown }}
            </span> 
        </div>
        <div class="hero__row__section">
            <SanityImage 
                v-if="game.awayTeam?.logo?.asset?._ref" 
                :asset-id="game.awayTeam.logo.asset._ref"
                :alt="game.awayTeam.logo.alt"
                auto="format"
                height="100"
                width="100"
                fit="max"
                h="200"
                w="200"
            />
        </div>
    </div>

    <div v-if="game" class="hero__row">
        <span class="hero__row__section hero__row__section--big hero__row__section__team-name fuzz">
            {{ game.homeTeam.name }}
        </span>
        <div class="hero__row__section hero__row__section--medium">
            <span class="fuzz">
                {{ new Date(game.date).toLocaleDateString() }}
            </span>
            <span class="fuzz">
                {{ new  Date(game.date).toLocaleTimeString([], { timeStyle: 'short' }) }}
            </span>
        </div>
        <span class="hero__row__section hero__row__section--big hero__row__section__team-name fuzz">
            {{ game.awayTeam.name }}
        </span>
    </div>
</template>

<script setup lang="ts">
import type { Game } from '~/types/game';

const { isMobile } = useDevice();
const props = defineProps<{
    game?: Game;
}>();
const countdown = ref('');

const setCountdown = () => {
    if (!props.game?.date) {
        return;
    }
    
    const currentDate = new Date();
    const nextGameDate = new Date(props.game.date);
    const diff = nextGameDate.getTime() - currentDate.getTime();
    
    const seconds = Math.floor((diff / 1000) % 60).toString().padStart(2, '0');
    const minutes = Math.floor((diff / (1000 * 60)) % 60).toString().padStart(2, '0');
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24).toString().padStart(2, '0');
    const days = Math.floor((diff / (1000 * 60 * 60 * 24))).toString();

    countdown.value = `${days}:${hours}:${minutes}:${seconds}`;
};

(() => {
    if (!props.game?.date) {
        return;
    }

    setCountdown();

    setInterval(() => {
        setCountdown();
    }, 1000);
})();
</script>

<style scoped lang="scss">
.hero {
    display: flex;
    flex-direction: column;
    justify-content: end;
    color: #fff;
    height: 300px;
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
    margin-top: -20px;

    @media (min-width: 1024px) {
        height: 400px;
    }

    &__row {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 112px;

        @media (min-width: 1024px) {
            height: 128px;
        }

        &__section {
            display: flex;
            flex-direction: column;
            align-items: center;
            width: 50%;
    
            @media (min-width: 1024px) {
                width: 33.3333%;
            }
    
            &--big {
                font-weight: 700;
                font-size: 30px;
                line-height: 36px;
            }
    
            &--medium {
                font-weight: 700;
                font-size: 24px;
                line-height: 32px;
            }

            &__team-name {
                display: none;

                @media (min-width: 1024px) {
                    display: flex;
                }
            }
        }
    }

    &__countdown {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 112px;
        font-weight: 700;
        font-size: 36px;
        line-height: 40px;

        @media (min-width: 1024px) {
            font-weight: 700;
            font-size: 60px;
            line-height: 1;
        }
    }
}

.fuzz {
    text-shadow: 0 0 16px #000;
}
</style>
