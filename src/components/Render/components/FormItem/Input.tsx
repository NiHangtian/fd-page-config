/*
 * @Author: 倪航天 && 598723187@qq.com
 * @Date: 2023-08-31 17:46:55
 * @LastEditTime: 2023-09-05 13:55:37
 * @Description: TODO:
 */
import { useMemo } from 'react';
import FormItem from './index'
import { RenderTyping } from '../../typing';
import { Input as AntdInput } from 'antd';
import _ from 'lodash';

const ReadonlyInput = ({ value }: { value?: string }) => {

    return <>{value}</>
}


const Input = (props: RenderTyping.CmpProps) => {
    const FormItemProps = useMemo(() => {
        let newProps = _.cloneDeep(props?.cmpOptions ?? {}) as RenderTyping.CmpProps["cmpOptions"];
        delete newProps.props
        newProps = { ...newProps, ...newProps.formItemProps } as any;
        delete newProps.formItemProps
        return newProps
    }, [props])

    return (
        <FormItem  {...FormItemProps as any} initialValue={props.initialValue} readonly={props.readonly}>
            {props.readonly ?
                <ReadonlyInput />
                : <AntdInput  {...props.cmpOptions.props} disabled={props.disabled} />}
        </FormItem>
    );
}

export default Input;

