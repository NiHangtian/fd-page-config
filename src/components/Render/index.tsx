/*
 * @Author: 倪航天
 * @Date: 2023-07-31 22:59:44
 * @LastEditTime: 2023-08-07 23:31:58
 * @LastEditors: 倪航天
 * @Description: 配置化入口
 */


import React, { useEffect, useState, useMemo, createContext, useImperativeHandle } from 'react';
import { Form, Spin, Skeleton } from 'antd';
import { RenderTyping } from './typing';
import { ModuleRenderContainer } from './ModuleRender'
import { setModuleId } from '@/utils';

export const Context = createContext<RenderTyping.ContextType>({} as any)

const mock: RenderTyping.SchemaType = {
    type: "form",

    styles: {

    },
    modules: [
        {
            id: "123",
            cmpId: "Empty",
            cmpOptions: {}
        }
    ]
}


const defaultOptions: RenderTyping.OptionsType = {
    schema: mock,
    params: {},
}

const RenderPage = <T extends any,>(
    props: RenderTyping.RenderPageProps<T>,
    ref: React.Ref<RenderTyping.actionType>
) => {

    const { options = defaultOptions, params, filterEnum, request, readonly, id = "RenderPage" } = props;
    const Domain = setModuleId(options.schema?.modules || [])
    const [form] = props.form ? [props.form] : Form.useForm();
    const [initData, setInitData] = useState(options)
    let [loading, setLoading] = useState(false);
    if (typeof props.loading === "boolean" && (loading = props.loading)) {
        setLoading = props.setLoading ?? setLoading
    };

    const action = useMemo(() => ({
        setLoading,
        form,
        filterEnum: filterEnum ?? {},
        id
    }), [])

    useImperativeHandle(ref, () => action, [action])

    useEffect(() => {
        if (request) {
            (async () => {
                const requestResult = await request(params ?? ({} as T), options, action);
                setModuleId(requestResult.schema?.modules || [], Domain);
                setInitData(requestResult)
            })()
        }
    }, [params])

    const FormBox = form ? React.Fragment : Form
    return (

        <div id={String(id)}>
            <Context.Provider value={{ form: form, filterEnum: filterEnum ?? {}, readonly }}>
                <FormBox {...(form ? {} : {})}>
                    <Spin spinning={loading} >
                        {loading ? <Skeleton active /> : <>
                            {initData.schema &&
                                <ModuleRenderContainer
                                    schema={initData.schema}
                                    params={initData.params}
                                />}
                        </>}
                    </Spin>
                </FormBox>
            </Context.Provider>
        </div >
    );
}

const Index: (<Values = any>(props: RenderTyping.RenderPageProps<Values> & {
    children?: React.ReactNode;
} & {
    ref?: React.Ref<RenderTyping.actionType> | undefined;
}) => React.ReactElement) = React.forwardRef(RenderPage) as unknown as any
export default Index;