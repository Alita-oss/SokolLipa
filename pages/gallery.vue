<template>
    <div class="page">
        <TeamTabs />
        <div v-if="galleries">
            <div v-for="gallery in galleries" :key="gallery._id">
                <div v-if="gallery.teamName == activeTab && gallery.photoAlbums">
                    <div v-for="album in gallery.photoAlbums" :key="album._key">
                        <h3 class="album__title">{{ album.name }}</h3>
                        <div v-if="album.photos" class="album__photos">
                            <div v-for="photo in album.photos" :key="photo._id" class="album__photo photo">
                                <SanityImage 
                                    v-if="photo.asset?._ref"
                                    :asset-id="photo.asset._ref"
                                    :alt="photo.alt"
                                    auto="format"
                                    height="536"
                                    width="800"
                                    fit="max"
                                    h="1072"
                                    w="1600"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
    import type { Gallery } from '~/types/gallery';
    import { useMainStore } from '~/stores/main';
    const { activeTab } = storeToRefs(useMainStore());

    const query = groq `*[_type == 'photoGallery']`;
    const { data, refresh } = useSanityQuery<Gallery[]>(query);

    const galleries = computed(() => {
    return data?.value
});
</script>

<style scoped lang="scss">
.album {
    &__title {
        margin: 0 0 10px 0;
        font-size: 20px;
        line-height: 28px;
        text-align: center;
    }

    &__photos {
        width: 100%;
        display: grid;
        gap: 16px;
        margin: 0 0 40px 0;  

        @media (min-width: 1024px) {
            grid-template-columns: repeat(2, minmax(0, 1fr));
        }
    }

    &__photo {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;

        &__caption {
            font-style: italic;
        }

        img {
            object-fit: cover;
            max-width: 100%;
            height: auto;
            transition: opacity .15s;
            border-radius: 10px;
        }
    }
}
</style>