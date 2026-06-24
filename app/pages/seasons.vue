<template>
    <div class="page">
        <TeamTabs />
        <div v-if="seasons?.length" class="seasons">
            <div v-for="season in seasons" :key="season._id" class="seasons__season">
                <h3 v-if="season.year" class="seasons__season__title">{{ season.year }}</h3>
                <UnorderedList v-if="season.schedules?.length">
                    <ListItemGame v-for="(game, index) in getGames(season)" :key="index" :game="game" />
                </UnorderedList>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import type { Season } from '~/types/season';
import { useMainStore } from '~/stores/main';
const { activeTab } = storeToRefs(useMainStore());

const query = groq`
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
                    description,
                },
            },
        }
    `;
const { data, refresh } = useSanityQuery<Season[]>(query);
const seasons = computed(() => {
    return data?.value
        ?.filter((season) => season.schedules?.length)
        .sort((a, b) => parseInt(b.year as string) - parseInt(a.year as string));
});
const getGames = (season: Season) => {
    //season.schedules[].games;
    const { schedules } = season;
    const schedule = schedules?.find((value) => {
        return value.league.name === activeTab.value;
    });
    return schedule?.games;
};
</script>

<style lang="scss" scoped>
.seasons {
    display: grid;
    gap: 40px;

    &__season {
        &__title {
            font-weight: 600;
            margin-bottom: 8px;
            font-size: 24px;
            line-height: 32px;
        }
    }
}
</style>
