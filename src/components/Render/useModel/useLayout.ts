/*
 * @Author: 倪航天 && 598723187@qq.com
 * @Date: 2023-09-05 14:24:08
 * @LastEditTime: 2023-09-05 15:04:35
 * @Description: TODO:
 */
import { useState } from 'react';
import { FormItemProps, ColProps } from 'antd';
export interface UseLayout {
    labelCol: ColProps | undefined;
    setLabelCol: React.Dispatch<React.SetStateAction<ColProps | undefined>>;
    wrapperCol: ColProps | undefined;
    setWrapperCol: React.Dispatch<React.SetStateAction<ColProps | undefined>>;
}


const useLayout: () => UseLayout = () => {
    const [labelCol, setLabelCol] = useState<FormItemProps["labelCol"]>();
    const [wrapperCol, setWrapperCol] = useState<FormItemProps["wrapperCol"]>();
    return {
        labelCol, setLabelCol,
        wrapperCol, setWrapperCol
    };
}

export default useLayout;