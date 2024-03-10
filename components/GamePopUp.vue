<template>
    <div v-if="game" class="scorecard" @click="close">
        <Transition name="fade">
            <div v-if="show" class="scorecard__main" @click.stop>
                <div class="scorecard__closer" @click="close">
                    <img src="@/assets/icons/close.svg" alt="close">
                </div>
                <h1 class="scorecard__title">
                    Výsledková listina
                </h1>
                <div class="scorecard__content">
                    <div class="scorecard__score--mobile">
                        <span class="scorecard__score--mobile__score">
                            {{ game.homeTeamScore }}
                        </span>
                        <span>-</span>
                        <span class="scorecard__score--mobile__score">
                            {{ game.awayTeamScore }}
                        </span>
                    </div>
                    <div class="scorecard__content__inner">
                        <div class="scorecard__team-info">
                            <SanityImage 
                                v-if="game.homeTeam?.logo?.asset?._ref"
                                :asset-id="game.homeTeam.logo.asset._ref"
                                :alt="game.homeTeam.logo.alt"
                                auto="format"
                                height="80"
                                width="80"
                                fit="max"
                                h="160"
                                w="160"
                            />
                            <span>
                                {{ game.homeTeam.name }}
                            </span>
                        </div>
                        <div v-if="!isUndefined(game.homeTeamScore) || !isUndefined(game.awayTeamScore)" class="scorecard__score--desktop">
                            {{ game.homeTeamScore + ' - ' + game.awayTeamScore }}
                        </div>
                        <div class="scorecard__team-info">
                            <SanityImage 
                                v-if="game.awayTeam?.logo?.asset?._ref"
                                :asset-id="game.awayTeam.logo.asset._ref"
                                :alt="game.awayTeam.logo.alt"
                                auto="format"
                                height="80"
                                width="80"
                                fit="max"
                                h="160"
                                w="160"
                            />
                            <span>
                                {{ game.awayTeam.name }}
                            </span>
                        </div>
                    </div>
                    <div class="scorecard__date">
                        {{ new Date(game.date).toLocaleDateString() }}
                    </div>
                    <div class="scorecard__time">
                        {{ new  Date(game.date).toLocaleTimeString([], { timeStyle: 'short' }) }}
                    </div>
                </div>
            </div>
        </Transition>
    </div>
</template>

<script setup lang="ts">
    import type { Game } from '~/types/game';

    const isUndefined = useIsUndefined();

    const emit = defineEmits(['close']);
    const props = defineProps<{
        game?: Game;
    }>();
    const close = () => {
        show.value = false; 
        setTimeout(() => {
            emit('close');  
        }, 400);    
    };
    const show = ref(false);
    onMounted(() => {
        setTimeout(() => {
            show.value = true;
        }, 50);
    });
</script>

<style lang="scss" scoped>
.scorecard {
    height: 100vh;
    width: 100vw;
    position: fixed;
    left: 0;
    top: 0;
    z-index: var(--z-scorecard);
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #0f172acc;
    
    &__main {
        max-width: 800px;
        border-radius: 8px;
        background-color: #fff;
        height: auto;
        width: 100%;
        position: relative;
        display: flex;
        flex-direction: column;
        align-items: center;
        font-weight: 600;
        padding: 24px 40px;
    }

    &__closer {
        position: absolute;
        top: 0;
        left: 0;
        padding: 12px 16px;
        cursor: pointer;
    }

    &__title {
        font-size: 24px;
        line-height: 32px;
        margin-bottom: 24px;

        @media (min-width: 1024px) {
            font-size: 30px;
            line-height: 36px;
        }
    }

    &__content {
        width: 100%;

        &__inner {
            display: flex;
            justify-content: space-between;
            align-items: center;
            width: 100%;
            padding: 20px 0;
        }
    }

    &__score {
        width: 50%;
        text-align: center;

        &--desktop {
            white-space: nowrap;
            display: flex;
            justify-content: center;
            width: 33.3333%;
            height: auto;
            font-size: 48px;
            line-height: 1;
        }

        &--mobile {
            white-space: nowrap;
            width: 100%;
            display: flex;
            justify-content: space-between;
            font-size: 42px;
            line-height: 1;
            margin: 16px 0;

            @media (min-width: 1024px) {
                display: none;
                width: 0;
                height: 0;
            }  
        }
    }

    &__team-info {
        text-align: center;
        font-size: 24px;
        line-height: 32px;
        width: 50%;
        display: grid;
        grid-template-columns: repeat(1,minmax(0,1fr));
        grid-template-rows: repeat(2,minmax(0,1fr));
        place-items: center;

        @media (min-width: 1024px) {
            width: 33.3333%;
        }
    }

    &__date {
        display: flex;
        justify-content: center;
        font-size: 20px;
        line-height: 28px;
        padding-top: 20px;
    }

    &__time {
        display: flex;
        justify-content: center;
        white-space: nowrap;
        font-weight: 400;
    }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
