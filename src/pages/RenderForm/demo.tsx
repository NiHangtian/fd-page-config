/*
 * @Author: nihangtian 598723187@qq.com
 * @Date: 2023-08-31 17:46:55
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2023-09-04 17:56:24
 * @FilePath: /fd-page-config/src/pages/RenderForm/demo.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import React, { useState, useMemo } from 'react';
import Render from '@/components/Render';
import { Modal, Button, Form } from 'antd';
import { mock } from './mock';
import { ProFormTextArea, ProForm } from '@ant-design/pro-form'
import { jsonParse } from '@/utils';


const Demo = () => {
    const [form] = Form.useForm()
    const [proForm] = ProForm.useForm()

    const [visible, setVisible] = useState(false);
    const [schema, setSchema] = useState(JSON.stringify(mock, undefined, 2));

    const mySchema = useMemo(() => jsonParse(schema), [schema])
    return (
        <>
            <Button type="primary" onClick={() => { setVisible(true) }}>编辑模版</Button>
            <Modal title="编辑模版" width={980} open={visible} onCancel={() => setVisible(false)} onOk={() => { form.submit() }}>
                <Form form={form} onFinish={(values) => {
                    setSchema(values.schema);
                    setVisible(false)
                }} initialValues={{ schema }}>
                    <ProFormTextArea name="schema"
                        fieldProps={{
                            autoSize: { minRows: 30 },
                            allowClear: true
                        }}
                        rules={[{
                            required: true, validator: async (rule, value) => {
                                try {
                                    JSON.parse(value)
                                } catch (error) {
                                    throw new Error('使用Json格式');
                                }
                            }
                        }]} />
                </Form>
            </Modal>
            <ProForm layout="horizontal">
                <Render form={proForm} options={{ schema: mySchema, params: {} }} />
            </ProForm>

        </>
    );
}

export default Demo;