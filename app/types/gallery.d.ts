import type { SanityImageSource } from '@sanity/image-url';

export type Gallery = {
    photoAlbums: {
        name?: string;
        photos?: SanityImageSource[];
        _key: string;
    }[];
    teamName: string;
    _id: string;
};
