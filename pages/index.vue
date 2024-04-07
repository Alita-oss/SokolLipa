<template>
    <div v-if="teamASeason" class="page">
        <div class="hero">
            <SanityImage 
                v-if="srcOfHero"
                :asset-id="srcOfHero.asset._ref"
                alt="Souboj o míč mezi hráči"
                w="1600"
            />
            <div v-if="nextGame" class="hero__info">
               <HeroInfo :game="nextGame"/>
            </div>
        </div>
        <h3 class="season__title">{{ teamASeason.year }} Tým A</h3>
        <UnorderedList>
            <ListItemGame v-for="(game, index) in teamASeason.games" :key="index" :game="game" />
        </UnorderedList>
    </div>
</template>

<script setup lang="ts">
import type { Season } from '~/types/season';
import type { SanityImageSource } from '@sanity/image-url/lib/types/types';

const heroQuery = groq `*[_type == 'hero'][0]{image}`;
const seasonQuery = groq `
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
                },
            },
        }
    `;
const sanitySeasons = useSanityQuery<Season[]>(seasonQuery);
const teamASeason = computed(() => {
    const seasons = sanitySeasons.data?.value
        ?.filter((season) => season.schedules?.length)
        .sort((a, b) => parseInt(b.year as string) - parseInt(a.year as string));
        
    return seasons && { year: seasons[0].year, games: seasons[0].schedules?.find((x) => x.league.name === 'Tym A')?.games };
});

const sanityHero = useSanityQuery<SanityImageSource>(heroQuery);
const srcOfHero = computed(() => {
    return sanityHero.data.value?.image;
});

const nextGame = computed(() => {
    const dt = new Date();
    return teamASeason?.value?.games?.find((game) => {
        const gameDate = new Date(game.date);
        return gameDate > dt;
    }); 
});
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
    justify-content: end;
    color: rgb(255, 255, 255);
    height: 300px;
    background-repeat: no-repeat;
    background-position: center center;
    background-size: cover;
    margin-top: -20px;
    position: relative;

    @media (min-width: 1024px) {
        height: 400px;
    }

    &__info {
        position: absolute;
        width: 100%;
        height: 100%;
    }
}

</style>
