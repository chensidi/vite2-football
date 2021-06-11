import { createStore, ActionContext, } from 'vuex';

import sessionStore from '@/utils/sessionStore';
import homeApi from '@/api/home';

interface state {
    homeRouteRecord: string,
    matchRouteRecord: string,
    activeName: string,
    matchMenu: Array<any> | null,
    rankings: Array<any> | null
}

const state: state = {
    homeRouteRecord: '',
    matchRouteRecord: '/match',
    activeName: '首页',
    matchMenu: null,
    rankings: null
}

const mutations = {
    setHomeRouteRecord(state: state, path: string) {
        state.homeRouteRecord = path;
        sessionStore.set('homeRouteRecord', path);
    },
    setMatchRouteRecord(state: state, path: string) {
        state.matchRouteRecord = path;
        sessionStore.set('matchRouteRecord', path);
    },
    setActive(state: state, name: string) {
        state.activeName = name;
    },
    setMatchMenu(state: state, menuArr: any[]) {
        state.matchMenu = menuArr;
        sessionStore.set('matchMenu', menuArr);
    },
    setRankings(state: state, rankingArr: any[]) {
        state.rankings = rankingArr;
        sessionStore.set('rankings', rankingArr);
    }
}

const actions = {
    setHomeRouteRecord({commit}: ActionContext<state, state>, path: string) {
        commit('setHomeRouteRecord', path);
    },
    setMatchRouteRecord({commit}: ActionContext<state, state>, path: string) {
        commit('setMatchRouteRecord', path);
    },
    setActive({commit}: ActionContext<state, state>, name: string) {
        commit('setActive', name);
    },
    setMatchMenu({commit}: ActionContext<state, state>, menuArr: any[]) {
        commit('setMatchMenu', menuArr);
    },
    setRankings({commit}: ActionContext<state, state>, rankingArr: any[]) {
        commit('setRankings', rankingArr);
    },
    async getMenusData({commit}: ActionContext<state, state>) {
        const data = await homeApi.getMenu();
        commit('setMatchMenu', data.menus.match_tab);
        commit('setRankings', data.menus.ranking_new);
        return data;
    }
}

const getters = {
    getMatchMenus(state: state) {
        return state.matchMenu || sessionStore.get('matchMenu')
    },
    getHomeRouteRecord(state: state) {
        return state.homeRouteRecord || sessionStore.get('homeRouteRecord')
    },
    getMatchRouteRecord(state: state) {
        return state.matchRouteRecord || sessionStore.get('matchRouteRecord')
    },
    getRankings(state: state) {
        return state.rankings || sessionStore.get('rankings')
    },
}

interface customInf {
    name: string,
    city: string
}

const customModule = {
    namespaced: true,
    state: {
        name: 'custom',
        city: 'ChengDu'
    },
    mutations: {
        changeCity(state: customInf, city: string) {
            state.city = city;
        }
    },
    actions: {
        changeCity({commit}: any, city: string) {
            commit('changeCity', city)
        }
    }
}

const store = createStore({
    state,
    mutations,
    actions,
    getters,
    modules: {
        customModule
    }
})

export default store;