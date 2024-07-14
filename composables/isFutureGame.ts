import type { Game } from '~/types/game';

export const isFutureGame = (game: Game): boolean => {
    const dt = new Date();

    return new Date(game.date) > dt;
};
