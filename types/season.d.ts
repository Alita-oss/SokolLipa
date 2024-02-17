import type { Schedule } from './schedule';

export type Season = {
    year: number | string;
    schedules?: Schedule[];
    schedule?: Schedule;
    _id: string;
}
