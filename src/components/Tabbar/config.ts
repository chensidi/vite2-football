export declare interface menuItem {
    to: string,
    icon: string,
    name: string,
    path?: string
}

const menuList: Array<menuItem> = [
    {
        to: '/home',
        icon: 'home-o',
        name: '首页',
        path: 'Home'
    },
    {
        to: '/live',
        icon: 'play-circle-o',
        name: '直播',
        path: 'Live'
    },
    {
        to: '/match',
        icon: 'tv-o',
        name: '比赛',
        path: 'Match'
    },
    {
        to: '/data',
        icon: 'bar-chart-o',
        name: '数据',
        path: 'Data'
    },
]

export default menuList;