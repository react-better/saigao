/**
 * Created by hao.cheng on 2017/4/28.
 */

/**
 * 校验是否登录
 * @param permits
 */
export const checkLogin = (permits: any): boolean =>
    (process.env.NODE_ENV === 'production' && !!permits) || process.env.NODE_ENV === 'development';
