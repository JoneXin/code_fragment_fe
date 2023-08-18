import { Button, Checkbox, Form, Input, message, Select, Space, Spin, Upload, UploadProps } from 'antd';
import react, { useState, FC, useRef, useImperativeHandle, forwardRef } from 'react';
// import './index.less';
import { UploadOutlined, MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import RenModal from '@/components/Modal';
import EditorModal from '@/components/EditorModal';
import { saveFragment } from '@/api/fragment';

// 新增发布
const NewFragment: FC = (props: any, ref) => {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const [configList, setConfigList] = useState([]);
    const [curConfIdx, setCurConfIdx] = useState(0);
    const [messageApi, contextHolder] = message.useMessage();

    const jsonEditorModalRef = useRef<any>(null);
    const modalRef = useRef<any>(null);

    const onFinish = (values: any) => {
        console.log('Success:', values);
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };

    const showJsonEditorModalRef = () => {
        // setCurConfIdx(idx);
        // const { configContent } = form.getFieldValue('config')[idx] || [];
        (jsonEditorModalRef?.current as any).showModal(form.getFieldValue('content') || '');
    };

    const hideJsonEditorModalRef = () => {
        (jsonEditorModalRef?.current as any).hideModal();
    };

    const getEditorInfo = (jsonInfo: any) => {
        form.setFieldValue('content', jsonInfo);
    };

    useImperativeHandle(ref, () => ({
        getProgramInfo: () => form.getFieldsValue(),
        showModal: modalRef.current.showModal,
        hideModal: modalRef.current.hideModal,
    }));

    const addFragment = async () => {
        try {
            await form.validateFields();
            try {
                setLoading(true);
                await saveFragment([
                    {
                        ...form.getFieldsValue(),
                    },
                ]);
                messageApi.success('新增成功!');
                form.resetFields();
                modalRef.current.hideModal();
            } catch (error) {
                console.log(error);
                messageApi.error(String(error));
            }
            setLoading(false);
        } catch {}
    };

    return (
        <RenModal maskClosable={false} ref={modalRef} handleOk={addFragment} title="新增代码片段" handleCancel={() => form.resetFields()}>
            {contextHolder}
            <Spin spinning={loading}>
                <Form
                    name="newProgramForm"
                    form={form}
                    labelCol={{ span: 6 }}
                    wrapperCol={{ span: 18 }}
                    style={{ width: 600 }}
                    initialValues={{ remember: false }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                >
                    <Form.Item label="title" name="title" rules={[{ required: true, message: 'title' }]}>
                        <Input />
                    </Form.Item>

                    <Form.Item label="描述" name="desc" rules={[{ required: false }]}>
                        <Input.TextArea />
                    </Form.Item>

                    <Form.Item name="content" label="代码片段" rules={[{ required: true, message: '请输入配置文件内容' }]}>
                        <Input placeholder="双击打开 代码框" onDoubleClick={() => showJsonEditorModalRef()} />
                    </Form.Item>
                </Form>

                <EditorModal ref={jsonEditorModalRef} handleOk={getEditorInfo} mode="javascript"></EditorModal>
            </Spin>
        </RenModal>
    );
};
export default forwardRef(NewFragment as any) as any;
