/*
 * @Author: 倪航天
 * @Date: 2023-08-06 17:05:22
 * @LastEditTime: 2023-08-08 00:15:05
 * @LastEditors: 倪航天
 * @Description: 
 */
import { default as Empty } from "./Empty";
import { RenderTyping } from '../typing'


const DefaultCmp = () => {
    return <div> 没有这是个默认组建请自行开发</div>
}

export default {
    Empty,
    DefaultCmp
} as Record<string, (() => (React.ReactNode | JSX.Element)) | (React.ReactNode | React.FC<any> | JSX.Element)>


