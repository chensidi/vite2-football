import http from './http'

export default {
    async getPersonInfo(id: string | number) {
        const res = await http.get('/person/getPersonInfo', {id});
        return res.data;  
    }
}