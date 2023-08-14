/*
 * @Author: 倪航天
 * @Date: 2023-08-06 17:05:22
 * @LastEditTime: 2023-08-08 23:50:54
 * @LastEditors: 倪航天
 * @Description: 
 */
import React from 'react';
import { default as Empty } from "./Empty";
import { RenderTyping } from '../typing'


const DefaultCmp = () => {
    return <div> 这是个默认组建请自行开发</div>
}

export default {
    Empty,
    DefaultCmp
} as Record<string, ((() => (React.ReactNode | JSX.Element)) | React.FC<RenderTyping.CmpProps & { children: any }>)>

