<template>
    <div v-if="teamASeason" class="page">
        <h3 class="season__title">{{ teamASeason.year }} Tým A</h3>
        <UnorderedList>
            <ListItemGame v-for="(game, index) in teamASeason.games" :key="index" :game="game" />
        </UnorderedList>
    </div>
</template>

<script setup lang="ts">
import type { Season } from '~/types/season';

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
const { data, refresh } = useSanityQuery<Season[]>(seasonQuery);
const teamASeason = computed(() => {
    const seasons = data?.value
        ?.filter((season) => season.schedules?.length)
        .sort((a, b) => parseInt(b.year as string) - parseInt(a.year as string));
        
    return seasons && { year: seasons[0].year, games: seasons[0].schedules?.find((x) => x.league.name === 'Tym A')?.games };
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
</style>
