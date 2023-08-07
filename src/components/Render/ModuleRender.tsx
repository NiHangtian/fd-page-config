/*
 * @Author: 倪航天
 * @Date: 2023-08-06 16:06:25
 * @LastEditTime: 2023-08-08 00:11:28
 * @LastEditors: 倪航天
 * @Description: 
 */
import React, { useMemo, useContext } from 'react';
import type { RenderTyping } from './typing';
import { Col as AntdCol, Row as AntdRow } from 'antd';
import Grid from '@/components/Grid'
import defCmp from './components';
import { Context } from './index';
import { getInitialValueByField } from '@/utils';

const layoutEnum = {
    Col: AntdCol,
    Row: AntdRow,
}

export const ModuleRender = (props: RenderTyping.ModuleRenderProps) => {


    const { moduleOptions, params } = props;
    const { cmpOptions } = moduleOptions;
    const { filterEnum } = useContext(Context)
    const CMP = defCmp?.[moduleOptions.cmpId] ?? defCmp.DefaultCmp;
    const layout = moduleOptions?.cmpOptions?.layout || {};
    const initialValue = useMemo(() => {
        let init = cmpOptions.initialValue;
        if (cmpOptions.field) {
            init = getInitialValueByField(params, cmpOptions.field, filterEnum);
        }
        return init
    }, [params, filterEnum])

    return (
        <Grid {...layout} >
            <CMP initialValue={initialValue} cmpOptions={cmpOptions}>
                {moduleOptions?.modules && moduleOptions?.modules?.length > 0 && moduleOptions.modules.map(item => {
                    return <ModuleRender key={item.id} moduleOptions={item} params={params} />
                })}
            </CMP>
        </Grid>
    );
}




export const ModuleRenderContainer = ({ schema, params }: RenderTyping.ModuleRenderContainerProps) => {

    return (
        <Grid   {...schema?.layout}>
            {schema.modules.map(item => {
                return <ModuleRender
                    key={item.id}
                    params={params}
                    moduleOptions={item}
                />
            })}
        </Grid>
    )
}

