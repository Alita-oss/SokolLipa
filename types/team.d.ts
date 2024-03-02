import type { Player } from './player';
import type { SanityImage } from '@sanity/image-url/lib/types/types';

export type Team = {
    players: Player[];
    name: string;
    logo: SanityImage;
};
