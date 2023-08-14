/*
 * @Author: 倪航天
 * @Date: 2023-07-31 23:23:19
 * @LastEditTime: 2023-08-14 23:22:55
 * @LastEditors: 倪航天
 * @Description: 
 */
import type { ColProps, FormInstance, FormItemProps, RowProps } from "antd";


declare namespace RenderTyping {
    private type Readonly = boolean;
    private type Params = Record<string, any>;
    private type Text = string | {
        text: string;
        styles?: React.CSSProperties;
    }
    type Layout = ColProps & RowProps & {
        type: "Row" | "Col"
    };
    type actionType = {
        setLoading: React.Dispatch<React.SetStateAction<boolean>>;
        form: FormInstance<any>;
        filterEnum: filterEnum;
        id: React.Key;
    }
    type FieldType = string | undefined | null | {
        value?: string | Record<string, string>;
        staticValue?: any;
        valueEnum?: Record<string | number, string | number>;
        filterName?: string;
    }

    type filterEnum = Record<string, (e: any) => (any | Promise<any>)>;
    interface RuleListType {
        current: FieldType | FieldType[];
        operator: "!=" | "==" | "notIn" | "in";
        compare: FieldType | FieldType[];
    }
    interface RuleType {
        ruleList: RuleListType[];
        rule: "!&&" | "!||" | "&&" | "||";
    }
    /**
     * @description: 
     * @param {string} field 取值逻辑 
     * @param {string} styles 取值逻辑 
     * @param {string} field 取值逻辑 
     * @param {string} field 取值逻辑 
     */
    interface defaultCmpOptionsType {
        field?: {
            value: string | Record<string, string>;
            [key: string]: any;
        }
        styles?: React.CSSProperties;
        required?: boolean;
        name?: FormItemProps["name"];
        label?: string | {
            tip: Text;
        } & Text;
        layout?: Layout;
        readonly?: boolean;
        initialValue?: any;
        props?: Record<string, any>;
    }

    interface ContextType {
        form: FormInstance<any>;
        filterEnum: filterEnum;
        readonly?: Readonly;
    }
    /**
    * @description: 模块统一配置
    * @param {React.Key} id 唯一ID作为HTML中的ID  可以传入不传入时默认生成uuid
    * @param {string} cmpId 组建code名称
    * @param {defaultCmpOptionsType} cmpOptions 组建默认配置
    */
    interface ModuleOptions {
        id: React.Key;
        cmpId: string;
        cmpOptions: defaultCmpOptionsType & Record<string, any>;
        cmpRules?: {
            readonlyRule?: RuleType[];
            showRule?: RuleType[];
            disabledRule?: RuleType[];
        }
        modules?: ModuleOptions[];

    }
    interface SchemaType {
        type: "form";
        apiOptions?: {
            params: Params;
            url: string;
            dataField: string;
        }[];
        styles: React.CSSProperties;
        layout?: Layout;
        modules: ModuleOptions[];
    }

    interface OptionsType {
        schema?: SchemaType;
        params: Params;
    }

    interface ModuleRenderContainerProps {
        schema: SchemaType;
        params: Params;

    }

    interface ModuleRenderProps {
        readonly?: Readonly;
        params: Params
        moduleOptions: ModuleOptions;
        disabled?: boolean;
    }

    interface CmpProps {
        initialValue?: any;
        readonly?: Readonly;
        disabled?: boolean;
        cmpOptions: defaultCmpOptionsType;
    }
}


