import type { Player } from './player';
import type { SanityImageObjectObject } from '@sanity/image-url';

export type Team = {
    players: Player[];
    name: string;
    logo: SanityImageObject;
};
