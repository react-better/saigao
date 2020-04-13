export interface IFMenuBase {
    key: string;
    title: string;
    icon?: string;
    component?: string;
    query?: string;
    requireAuth?: string;
    route?: string;
    /** 是否登录校验，true不进行校验（访客） */
    login?: boolean;
}

export interface IFMenu extends IFMenuBase {
    subs?: IFMenu[];
}

const menus: {
    menus: IFMenu[];
    others: IFMenu[] | [];
    [index: string]: any;
} = {
    menus: [
        // 菜单相关路由
        { key: '/app/dashboard/index', title: '首页', icon: 'mobile', component: 'Dashboard' },
        {
            key: '/subs4',
            title: '页面',
            icon: 'switcher',
            subs: [
                { key: '/login', title: '登录' },
                { key: '/404', title: '404' },
            ],
        },
        {
            key: '/app/auth',
            title: '权限管理',
            icon: 'safety',
            subs: [
                { key: '/app/auth/basic', title: '基础演示', component: 'AuthBasic' },
                {
                    key: '/app/auth/routerEnter',
                    title: '路由拦截',
                    component: 'RouterEnter',
                    requireAuth: 'auth/testPage',
                },
            ],
        },
        {
            key: '/app/extension',
            title: '功能扩展',
            icon: 'bars',
            subs: [
                {
                    key: '/app/extension/queryParams',
                    title: '问号形式参数',
                    component: 'QueryParams',
                    query: '?param1=1&param2=2',
                },
                {
                    key: '/app/extension/visitor',
                    title: '访客模式',
                    component: 'Visitor',
                    login: true,
                },
                {
                    key: '/app/extension/multiple',
                    title: '多级菜单',
                    subs: [
                        {
                            key: '/app/extension/multiple/child',
                            title: '多级菜单子菜单',
                            subs: [
                                {
                                    key: '/app/extension/multiple/child/child',
                                    title: '多级菜单子子菜单',
                                    component: 'MultipleMenu',
                                },
                            ],
                        },
                    ],
                },
            ],
        },
    ],
    others: [], // 非菜单相关路由
};

export default menus;
