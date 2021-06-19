import http from './http';

export default {
    async getLeagueVideo(
        {league, before, after}: 
        {league: string, before?: number|string, after?: number|string}) {
        const res = await http.post('/video/getVideoList', {league, before, after});
        return res.data;
    }
}