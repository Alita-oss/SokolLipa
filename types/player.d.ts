import type { SanityImage } from '@sanity/image-url/lib/types/types';

export type Player = {
    name: string;
    position?: string;
    number?: string;
    info?: string;
    profilePhoto?: SanityImage;
    avatar?: SanityImage;
};
