import type { SanityImage } from '@sanity/image-url/lib/types/types';

export type Gallery = {
    photoAlbums: {
        name?: string;
        photos?: SanityImage[];
    }[];
    teamName: string;
};
