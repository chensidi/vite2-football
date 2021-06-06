import http from './http'

interface result {
    code?: number,
    data: any
}

export interface pageData {
    tabId: number | string, 
    after: number | string, 
    page: number | string
}

const homeApi = {
    async getMenu() { //获取首页菜单
        const res: result = await http.get(`/home/getHomeMenu`);
        return res.data
    },
    async getContentList(tabId: number | string) { //获取首页列表
        const res: result = await http.post('/home/getContentListByTab', {tabId})
        return res.data
    },
    async getPageData(pageData: pageData) { //分页
        const res = await http.post('/home/getPageData', pageData)
        return res.data;
    },
    async refresh(tabId: number | string) { //根据tabId刷新
        const res = await http.get('/home/refresh', {tabId})
        return res.data;
    }
}

export default homeApi