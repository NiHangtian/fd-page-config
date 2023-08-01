/*
 * @Author: 倪航天
 * @Date: 2023-08-01 22:27:29
 * @LastEditTime: 2023-08-01 23:10:28
 * @LastEditors: 倪航天
 * @Description: 好用的函数
 */

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