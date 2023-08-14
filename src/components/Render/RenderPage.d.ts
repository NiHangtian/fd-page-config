/*
 * @Author: 倪航天
 * @Date: 2023-08-14 23:21:31
 * @LastEditTime: 2023-08-14 23:22:41
 * @LastEditors: 倪航天
 * @Description: 
 */
import type { RenderTyping } from './typing'

export interface RenderPageProps<T extends any> {
    options?: RenderTyping.OptionsType;
    form: FormInstance<any>;
    readonly?: RenderTyping.Readonly;
    id?: React.Key;
    filterEnum?: RenderTyping.filterEnum;
    request?: (e: T, options?: RenderTyping.OptionsType, action: RenderTyping.actionType) => Promise<RenderTyping.OptionsType>;
    params?: T;
    loading?: boolean;
    setLoading?: React.Dispatch<React.SetStateAction<boolean>>;

}