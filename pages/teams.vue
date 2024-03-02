<template>
    <div class="page">

    </div>
</template>

<script setup lang="ts">
    import type { Team } from '~/types/team';

    const query = groq `*[_type == 'team' && name == 'Lípa'][0]`;
    const { data, refresh } = useSanityQuery<Team>(query);
</script>

<style scoped lang="scss">

</style>