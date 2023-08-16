import { FragmentType } from '@/typings';
import { request } from '@/utils/axios';

/**
 * 新增，更新 fragment
 * @param fragmentList
 * @returns
 */
export function saveFragment(fragmentList: FragmentType[]) {
    return request({
        url: '/api/fg/bulk',
        method: 'post',
        data: fragmentList,
    });
}

/**
 * 新增，更新 fragment
 * @param fragmentList
 * @returns
 */
export function getFragmentList(msg: string) {
    return request({
        url: '/api/fg/list',
        method: 'get',
        params: { msg },
    });
}
