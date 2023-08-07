/*
 * @Author: 倪航天
 * @Date: 2023-08-01 22:27:29
 * @LastEditTime: 2023-08-07 23:54:01
 * @LastEditors: 倪航天
 * @Description: 好用的函数
 */
import type { RenderTyping } from '@/components/Render/typing';

import { UUID } from 'uuidjs';


/**
 * @description: 配置链接
 * @param {string} str  "/home/{aaa.bbb}/{ccc}"
 * @param {Record} replacements {aaa:{bbb:123},ccc:456}
 * @return {*} "/home/123/456"
 */
export function replaceBracesValue(str: string, replacements: Record<string, any>) {
    const re = /{([^}]+)}/g;
    const result = str?.replace(re, (match, p1) => {
        return getValueByPath(p1, replacements) ?? match
    })
    return result
}

/**
 * @description: 更具路径获取参数
 * @param {string} path aa.bb
 * @param {Record} replacements {aa:{bb:123}}
 * @return {any} 123
 */
export function getValueByPath(path: string, replacements: Record<string, any>) {
    let value = replacements
    path.split('.').forEach((key) => {
        ({ [key]: value } = value ?? {});
    })
    return value as any
}

export function getInitialValueByField(params: Record<string, any>, field: RenderTyping.FieldType, filterEnum?: RenderTyping.filterEnum) {
    if ((field ?? true) === true) return;  // ts 不识别；  以后再用
    if (field == undefined) return;
    let initValue = undefined;

    if (typeof field === "string" && (initValue = getValueByPath(field, params))) return initValue;
    if (typeof field === "object") {
        const { value, valueEnum, filterName } = field;
        if (typeof value === "string" && (initValue = getValueByPath(value, params))) {
            if (valueEnum) (initValue = valueEnum[initValue] ?? initValue)
        }
        if (typeof value === "object") {
            initValue = Object.keys(value).reduce((pre, key) => {
                pre[key] = getValueByPath(value[key], params)
                return pre
            }, {} as Record<string, any>)
        }
        if (filterName && filterEnum && filterEnum[filterName]) return filterEnum[filterName](initValue)
        return initValue
    }

    throw Error("field 类型错误");
}


export class DomainId {
    private cmpIdDomain: Record<string, number> = {

    }

    constructor() {

    }

    public getId(cmpId: string, id?: React.Key) {
        const _this = this
        if (_this.cmpIdDomain[cmpId] || (_this.cmpIdDomain[cmpId] = 0)) _this.cmpIdDomain[cmpId] = ++_this.cmpIdDomain[cmpId]
        if (id == undefined) return String(id);
        return UUID.genV4()
    }

    get cmpAllNum() {
        return this.cmpIdDomain
    }
}

export function setModuleId(params: RenderTyping.ModuleOptions[], Domain?: DomainId) {
    const myDomain = Domain || new DomainId()
    params.forEach(item => {
        item.id = String(myDomain.getId(item.cmpId, item.id));
        if (item.modules && item.modules?.length > 0) setModuleId(item.modules, Domain)
    })

    return myDomain
}
