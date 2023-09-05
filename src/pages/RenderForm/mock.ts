/*
 * @Author: 倪航天 && 598723187@qq.com
 * @Date: 2023-09-01 16:18:18
 * @LastEditTime: 2023-09-04 17:56:57
 * @Description: TODO:
 */
import { RenderTyping } from '@/components/Render/typing'

export const mock: RenderTyping.SchemaType = {
    type: "form",

    styles: {

    },
    layout: { type: "Row" },

    modules: [
        {
            id: "123",
            cmpId: "Input",
            cmpOptions: {
                label: "Input",
                name: "name",
                layout: { type: "Col", span: 12 },
                formItemProps: {
                    labelCol: {
                        span: 8,
                    },
                    wrapperCol: {
                        span: 16
                    }
                }
            }
        }
    ]
}