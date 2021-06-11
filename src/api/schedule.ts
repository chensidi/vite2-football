import http from './http';

export interface scheduleParams {
    seasonId: string | number,
    roundId?: string | number,
    gameWeek?: string | number
}

export default {
    async getSchedule(params: scheduleParams) {
        const {
            seasonId,
            roundId,
            gameWeek
        } = params;
        const res = await http.post('/schedule/getSchedule', {
            seasonId,
            roundId,
            gameWeek
        })
        return res.data;
    }
}