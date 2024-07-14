<template>
    <li v-if="game" @click="onClick" class="game">
        <div class="game__info">
            <div class="block--left">
                <span class="block__team">
                    {{ game.homeTeam.name }}
                </span>
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
            </div>
            <div class="block--center">
                <div v-if="isFutureGame(game)">VS.</div>
                <div v-else-if="hasScores" class="block__score">
                    {{ game.homeTeamScore + ' - ' + game.awayTeamScore }}
                </div>
            </div>
            <div class="block--right">
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
                <span class="block__team">
                    {{ game.awayTeam.name }}
                </span>
            </div>
        </div>
        <div v-if="isFutureGame(game)" class="game__video">
            <div>
                <div class="block__date">
                    {{ new Date(game.date).toLocaleDateString() }}
                </div>
                <div v-if="!hasScores" class="block__time">
                    {{ new Date(game.date).toLocaleTimeString([], { timeStyle: 'short' }) }}
                </div>
            </div>
        </div>
        <div v-else class="game__video">
            <NuxtLink v-if="hasVideo" :to="`/video/${videoId}`" class="game__video__link" @click.stop>
                <video :src="videoUrl" class="video-poster"></video>
                <div class="game__video__overlay">
                    <img src="@/assets/icons/play.svg" alt="Přehrát" />
                </div>
            </NuxtLink>
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

const hasScores = computed(() => {
    return !isUndefined(props.game.homeTeamScore) && !isUndefined(props.game.awayTeamScore);
});

const hasVideo = computed(() => {
    return props.game.video?.asset?._ref;
});

const videoId = computed(() => {
    if (props.game.video?.asset?._ref) {
        const ref = props.game.video.asset._ref;

        const regex = /([a-f0-9]{40})/;
        const matches = ref.match(regex);

        if (matches) {
            return matches.find((match) => match);
        }
    }
});

const videoUrl = computed(() => {
    return `https://cdn.sanity.io/files/mgriwqg2/production/${videoId.value}.mp4`;
});
</script>

<style scoped lang="scss">
.game {
    display: flex;
    padding: 12px;
    border-bottom: 1px solid var(--color-green-600-half);
    cursor: pointer;

    &:hover {
        background-color: var(--color-green-600-quarter);
    }

    &__info {
        width: 80%;
        display: flex;
        justify-content: center;
        gap: 6px;

        @media (min-width: 1024px) {
            width: 90%;
        }
    }

    &__video {
        width: 20%;
        display: flex;
        justify-content: flex-end;

        @media (min-width: 1024px) {
            width: 10%;
        }

        &__link {
            position: relative;
        }

        &__overlay {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background-color: rgba(0, 0, 0, 0.25);
            border-radius: 9999px;
        }
    }
}
.block {
    &--left {
        width: 100%;
        display: flex;
        justify-content: flex-end;
        align-items: center;
    }

    &--center {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        font-weight: 600;
        min-width: 120px;
    }

    &--right {
        width: 100%;
        display: flex;
        align-items: center;
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
        width: 100%;
        text-align: center;
        font-size: 18px;
        line-height: 28px;
    }

    &__date {
        width: 100%;
        text-align: center;
        font-size: 14px;
        line-height: 1.5;
        white-space: nowrap;
    }

    &__time {
        width: 100%;
        text-align: center;
        white-space: nowrap;
        font-weight: 400;
        font-size: 12px;
    }
}

.video-poster {
    height: 40px;
    aspect-ratio: calc(16 / 9);
}
</style>
