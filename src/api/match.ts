import http from './http'

const matchApi = {
    async getMenu(api: string, start?: string) {
        const res = await http.post(`/match/getMatchMenu`, {
            api,
            start
        })
        return res.data
    },
    async getSituation(matchId: string | number) {
        const res = await http.get(`/match/getSituation`, {
            matchId
        })
        return res.data
    },
    async getLineup(matchId: string | number) {
        const res = await http.get(`/match/getLineup`, {
            matchId
        })
        return res.data;
    },
    async getAnalysis(matchId: string | number) {
        const res = await http.get(`/match/getAnalysis`, {
            matchId
        })
        return res.data;
    },
    async getHighlights(matchId: string | number) {
        const res = await http.get(`/match/getHighlights`, {
            matchId
        })
        return res.data;
    }
}

export default matchApi;