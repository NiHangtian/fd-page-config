/*
 * @Author: 倪航天
 * @Date: 2023-08-06 16:06:25
 * @LastEditTime: 2023-08-08 23:39:20
 * @LastEditors: 倪航天
 * @Description: 
 */
import React, { useMemo, useContext } from 'react';
import type { RenderTyping } from './typing';
import Grid from '@/components/Grid'
import defCmp from './components';
import { Context } from './index';
import { getInitialValueByField, getIsMatchRule } from '@/utils';



export const ModuleRender = (props: RenderTyping.ModuleRenderProps) => {


    const { moduleOptions, params, readonly: fsReadOnly, disabled: fsDisabled } = props;
    const { cmpOptions } = moduleOptions;
    const { filterEnum, readonly: highestReadonly } = useContext(Context)
    const CMP = defCmp?.[moduleOptions.cmpId] ?? defCmp.DefaultCmp;
    const layout = moduleOptions?.cmpOptions?.layout || {};
    const initialValue = useMemo(() => {
        let init = cmpOptions.initialValue;
        if (cmpOptions.field) {
            init = getInitialValueByField(params, cmpOptions.field, filterEnum);
        }
        return init
    }, [params, filterEnum]);


    /**
     * @description: 全局中的readonly 权重最高   全局>自身options>自身Rules>父组建集成
     */
    const readonly = useMemo(() => {
        if (typeof highestReadonly === "boolean") return highestReadonly;
        if (typeof cmpOptions.readonly === "boolean") return highestReadonly;
        if (moduleOptions.cmpRules?.readonlyRule) return getIsMatchRule(params, moduleOptions.cmpRules.readonlyRule);
        return fsReadOnly;
    }, [highestReadonly, fsReadOnly, moduleOptions, params]);

    /**
    * @description: 全局中的readonly 权重最高   全局>自身options>自身Rules>父组建集成
    */
    const isShow = useMemo(() => {
        if (moduleOptions.cmpRules?.showRule) return getIsMatchRule(params, moduleOptions.cmpRules.showRule);
    }, [])

    const disabled = useMemo(() => {
        if (moduleOptions.cmpRules?.disabledRule) return getIsMatchRule(params, moduleOptions.cmpRules.disabledRule);
        return fsDisabled
    }, [])

    if (isShow === false) return null;
    return (
        <Grid {...layout} >
            <CMP initialValue={initialValue} readonly={readonly} disabled={disabled} cmpOptions={cmpOptions}>
                {moduleOptions?.modules && moduleOptions?.modules?.length > 0 && moduleOptions.modules.map(item => {
                    return <ModuleRender disabled={disabled} readonly={readonly} key={item.id} moduleOptions={item} params={params} />
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

