import type { SanityImageObjectObject } from '@sanity/image-url';

export type Player = {
    name: string;
    position?: string;
    number?: string;
    info?: string;
    profilePhoto?: SanityImageObject;
    avatar?: SanityImageObject;
};
