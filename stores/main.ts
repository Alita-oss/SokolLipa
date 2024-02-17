import { defineStore } from 'pinia';
import type { Game } from '~/types/game';

export const useMainStore = defineStore('main', () => {
    const popupGame = ref<Game | null>(null);

    return { popupGame };
});
