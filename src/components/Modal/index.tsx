import React, { FC, useState, useImperativeHandle } from 'react';
import { Button, Modal } from 'antd';

const RenModal: FC = (props: any, ref: any) => {
    const [open, setOpen] = useState(false);

    const showModal = () => {
        setOpen(true);
    };
    const hideModal = () => {
        setOpen(false);
    };

    useImperativeHandle(ref, () => ({
        showModal,
        hideModal,
    }));

    const handleOk = () => {
        props.handleOk && props.handleOk();
    };

    const handleCancel = () => {
        setOpen(false);
        props.handleCancel && props.handleCancel();
    };

    return (
        <>
            <Modal
                maskClosable={props.maskClosable ?? false}
                open={open}
                title={props.title}
                onOk={handleOk}
                onCancel={handleCancel}
                width={props.width || 800}
                okText="确定"
                cancelText="取消"
                footer={props.footer}
            >
                {props.children}
            </Modal>
        </>
    );
};

export default React.forwardRef(RenModal as any) as any;
