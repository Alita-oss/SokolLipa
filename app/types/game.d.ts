import type { SanityImageObjectObject } from '@sanity/image-url';

export type Game = {
    homeTeam: {
        logo: SanityImageObject;
        name: string;
        players?: [];
    };
    awayTeam: {
        logo: SanityImageObject;
        name: string;
        players?: [];
    };
    homeTeamScore: number;
    awayTeamScore: number;
    date: Date;
    description?: string;
    video: {
        asset: {
            _ref: string;
            _type: string;
        };
    };
};
