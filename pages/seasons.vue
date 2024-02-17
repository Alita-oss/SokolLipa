<template>
    <div class="page">
        <div v-if="seasons?.length" class="seasons">
            <div v-for="season in seasons" :key="season._id" class="seasons__season">
                <h3 v-if="season.year" class="seasons__season__title">{{ season.year }}</h3>
                <UnorderedList v-if="season.schedules?.length">
                    <ListItemGame v-for="(game, index) in season.schedules[0].games" :key="index" :game="game" />
                </UnorderedList>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import type {Season} from '~/types/season';

    const query = groq `
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
    const { data, refresh } = useSanityQuery<Season[]>(query);

    const activeTab = 'Tym A';

    const seasons = computed(() => {
        return data?.value?.filter((season) => season.schedules?.length).sort((a, b) => parseInt(b.year as string) - parseInt(a.year as string));
    });
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
