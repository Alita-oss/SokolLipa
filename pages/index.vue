<template>
    <div v-if="teamASeason" class="page">
        <div class="hero">
            <SanityImage v-if="srcOfHero" :asset-id="srcOfHero.asset._ref" alt="Souboj o míč mezi hráči" w="1600" />
            <div v-if="nextGame" class="hero__info">
                <HeroInfo :game="nextGame" />
            </div>
        </div>
        <h3 class="season__title">{{ teamASeason.year }} Tým A</h3>
        <UnorderedList>
            <ListItemGame v-for="(game, index) in remainingGames" :key="index" :game="game" />
        </UnorderedList>
    </div>
</template>

<script setup lang="ts">
import type { Season } from '~/types/season';
import type { SanityImageSource } from '@sanity/image-url/lib/types/types';
import type { Game } from '~/types/game';

const heroQuery = groq`*[_type == 'hero'][0]{image}`;
const seasonQuery = groq`
        *[_type == 'season']{
            _id,
            year,
            "schedules": schedules[]{
                _id,
                league->{name},
                "games": games[]{
                    awayTeam->{name, logo},
                    homeTeam->{name, logo},
                    awayTeamScore,
                    homeTeamScore,
                    date,
                    video,
                },
            },
        }
    `;
const sanitySeasons = useSanityQuery<Season[]>(seasonQuery);
const teamASeason = computed(() => {
    const seasons = sanitySeasons.data?.value
        ?.filter((season) => season.schedules?.length)
        .sort((a, b) => parseInt(b.year as string) - parseInt(a.year as string));
    const games = seasons && seasons[0].schedules?.find((x) => x.league.name === 'Tym A')?.games;

    return seasons && { year: seasons[0].year, games };
});

const sanityHero = useSanityQuery<SanityImageSource>(heroQuery);
const srcOfHero = computed(() => {
    return sanityHero.data.value?.image;
});

const nextGame = computed(() => {
    return teamASeason?.value?.games?.find((game) => {
        return isFutureGame(game);
    });
});
const remainingGames = computed(() => {
    return teamASeason?.value?.games?.filter((game) => {
        return isFutureGame(game) && game.date !== nextGame.value?.date;
    });
});

const isFutureGame = (game: Game): boolean => {
    const dt = new Date();

    return new Date(game.date) > dt;
};
</script>

<style lang="scss" scoped>
.season {
    &__title {
        display: flex;
        justify-content: center;
        font-size: 32px;
        line-height: 36px;
        padding: 40px 0 20px;

        @media (min-width: 1024px) {
            font-size: 42px;
            line-height: 1;
            padding: 50px 0 30px;
        }
    }
}

.hero {
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    color: rgb(255, 255, 255);
    height: 300px;
    background-repeat: no-repeat;
    background-position: center center;
    background-size: cover;
    margin-top: -20px;
    position: relative;

    img {
        height: 300px;
        object-fit: cover;

        @media (min-width: 1024px) {
            height: 400px;
        }
    }

    @media (min-width: 1024px) {
        height: 400px;
        margin-top: -50px;
    }

    &__info {
        position: absolute;
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: flex-end;
    }
}
</style>
