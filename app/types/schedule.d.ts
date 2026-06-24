import type { Game } from './game';

export type Schedule = {
    league: {
        name: string;
    };
    games: Game[];
}
