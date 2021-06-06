import http from './http';

const rankingsApi = {
    async getSeasons(competitionId: string | number) {
        const res = await http.get(`/ranking/getSeasons`, {
            competitionId
        })
        return res.data
    },
    async getStanding(seasonId: string | number) {
        const res = await http.get(`/ranking/getRankingByType`, {
            seasonId,
            ranking: 'standing'
        })
        return res.data
    },
    async getCateByType(seasonId: string | number, type: string) {
        const res = await http.get(`/ranking/getCateByType`, {
            seasonId,
            type
        })
        return res.data
    },
    async getRankingByType(type: string, seasonId: string | number, ranking: string) {
        const res = await http.get(`/ranking/getRankingByType`, {
            seasonId,
            type,
            ranking
        })
        return res.data
    }
}

export default rankingsApi;