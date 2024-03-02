import type { SanityImage } from '@sanity/image-url/lib/types/types';

export type Game = {
    homeTeam: {
        logo: SanityImage;
        name: string;
        players?: [];
    };
    awayTeam: {
        logo: SanityImage;
        name: string;
        players?: [];
    };
    homeTeamScore: number;
    awayTeamScore: number;
    date: Date;
    description?: string;
};
