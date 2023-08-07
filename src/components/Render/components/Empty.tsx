/*
 * @Author: 倪航天
 * @Date: 2023-08-07 23:21:49
 * @LastEditTime: 2023-08-07 23:29:37
 * @LastEditors: 倪航天
 * @Description: 空状态
 */
import React from 'react';
import { Empty as AntdEmpty } from 'antd';
import { RenderTyping } from '../typing'

const Empty: React.FC<RenderTyping.CmpProps> = ({
    initialValue,
    CmpOptions,
}) => {
    return (
        <>
            <AntdEmpty description={initialValue} {...CmpOptions?.props} />
        </>
    );
}

export default Empty;