/*
 * @Author: 倪航天 && 598723187@qq.com
 * @Date: 2023-09-04 17:13:44
 * @LastEditTime: 2023-09-04 17:17:59
 * @Description: TODO:
 */
import React from 'react';
import { Form } from 'antd';
import type { FormItemProps } from 'antd';


const FormItem = Form.Item

const Index: React.FC<{
    readonly?: boolean,
} & FormItemProps> = ({ children, ...props }) => {
    return (
        <FormItem  {...props}>
            {children}
        </FormItem>
    );
}

export default Index;