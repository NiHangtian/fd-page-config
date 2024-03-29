/*
 * @Author: 倪航天
 * @Date: 2023-08-01 22:27:29
 * @LastEditTime: 2023-09-05 14:05:34
 * @LastEditors: Please set LastEditors
 * @Description: 好用的函数
 */
import type { RenderTyping } from '@/components/Render/typing';

import { UUID } from 'uuidjs';

export function getIsContain(params: any, target: any) {
    if (Array.isArray(params) && Array.isArray(target)) {
        return params.some(item => target.find(it => it === item));
    }
    if (Array.isArray(params)) {
        return params.some(item => item === target);
    }
    if (Array.isArray(target)) {
        return target.some(item => item === params);
    }
    return false
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
export function getInitialValueByField(params: Record<string, any>, field: RenderTyping.FieldType, filterEnum?: RenderTyping.filterEnum) {
    if ((field ?? true) === true) return;  // ts 不识别；  以后再用
    if (field === undefined || field === null) return;
    let initValue = undefined;

    if (typeof field === "string" && (initValue = getValueByPath(field, params))) return initValue;


    if (typeof field === "object") {
        const { value, valueEnum, filterName, staticValue } = field;
        initValue = staticValue;
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

export function getRuleByParams(params: Record<string, any>, rule: RenderTyping.RuleListType) {
    let { current, compare } = rule;
    const currentValue = Array.isArray(current) ? current.map(item => getInitialValueByField(params, item)) : getInitialValueByField(params, current);
    const compareValue = Array.isArray(compare) ? compare.map(item => getInitialValueByField(params, item)) : getInitialValueByField(params, compare);

    let isMath = false
    switch (rule.operator) {
        case "!=":
            isMath = currentValue !== compareValue
            break;
        case "in":
            isMath = getIsContain(currentValue, compareValue)
            break;
        case "notIn":
            isMath = !getIsContain(currentValue, compareValue)
            break;
        default:
            isMath = currentValue === compareValue
    }
    return isMath

}




export class DomainId {
    private cmpIdDomain: Record<string, number> = {

    }


    public getId(cmpId: string, id?: React.Key) {
        if (this.cmpIdDomain[cmpId] || (this.cmpIdDomain[cmpId] = 0)) this.cmpIdDomain[cmpId] = ++this.cmpIdDomain[cmpId]
        if (id === undefined === null) return String(id);
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



export function getIsMatchRule(params: Record<string, any>, ruleValue: RenderTyping.RuleType[]): boolean {
    if (!Array.isArray(ruleValue)) throw new Error("rule数据类型不符合预期");

    return ruleValue.reduce((pre, ruleType) => {
        if (pre === true) return pre;
        const { ruleList, rule } = ruleType;
        const isRuleList = ruleList.map(item => getRuleByParams(params, item));

        switch (rule) {
            case "||":
                return isRuleList.some(item => item);
            case "!||":
                return !isRuleList.some(item => item);
            case "!&&":
                return !isRuleList.every(item => item);
            case "&&":
                return isRuleList.every(item => item);
            default:
                return false;
        }
    }, false);

}

const defaultParamsEnum = {
    Array: [],
    Object: {},
    String: "",
    Number: NaN
}
type JsonParseDefaultParams = "Array" | "Object" | "String" | "Number";
type JsonParse = (params: any, defaultParams?: JsonParseDefaultParams | any) => any;
/**
 * @description: JSON.parse 防止报错
 * @param {any} params
 * @param {JsonParseDefaultParams｜any} defaultParams 默认为Object {} 
 * @return {any} 一旦报错返回默认值
 */
export const jsonParse: JsonParse = function (params: any,
    defaultParams = "Object") {
    try {
        return JSON.parse(params)
    } catch (error) {
        return defaultParamsEnum?.[defaultParams as JsonParseDefaultParams] ?? defaultParams
    }
}

export function sleep(params: number = 200) {

    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(null)
        }, params);
    })
}

