import react, { FC, forwardRef, useImperativeHandle, useRef, useEffect, useState } from 'react';
import RenModal from '../Modal';
import AceEditor from 'react-ace';
import 'ace-builds/src-noconflict/mode-javascript';
import 'ace-builds/src-noconflict/mode-json';
import 'ace-builds/src-noconflict/theme-github';
import 'ace-builds/src-noconflict/ext-language_tools';
import 'ace-builds/src-noconflict/ext-language_tools';
import 'ace-builds/src-noconflict/theme-dawn';
import { Segmented } from 'antd';

const langOptions = ['javascript'];

const JsonEditorModal: FC = (props: any, ref) => {
    const [data, setData] = useState('');
    const [langMode, setLangMode] = useState('javascript');

    const jsonEditorModalRef = useRef(null);

    const showJsonEditorModalRef = (data: string) => {
        setData(data);
        console.log(data, '====');

        (jsonEditorModalRef?.current as any).showModal();
    };

    const hideJsonEditorModalRef = () => {
        (jsonEditorModalRef?.current as any).hideModal();
    };

    useImperativeHandle(ref, () => ({
        showModal: showJsonEditorModalRef,
        hideModal: hideJsonEditorModalRef,
    }));

    const handleOk = () => {
        setData('');
        hideJsonEditorModalRef();
        props.handleOk && props.handleOk(data);
    };

    const handleCancel = () => {
        setData('');
        hideJsonEditorModalRef();
        props.handleCancel && props.handleCancel();
    };

    return (
        <>
            <RenModal ref={jsonEditorModalRef} title="配置详情" handleOk={handleOk} handleCancel={handleCancel}>
                <span>配置文件格式选择:</span>
                <Segmented options={langOptions} onChange={(mode: any) => setLangMode(mode)} style={{ margin: '10px' }} />
                <AceEditor
                    style={{ borderRadius: ' 5px' }}
                    mode={langMode}
                    width="700"
                    showPrintMargin
                    wrapEnabled
                    highlightActiveLine //突出活动线
                    enableSnippets //启用代码段
                    setOptions={{
                        enableBasicAutocompletion: true, //启用基本自动完成功能
                        enableLiveAutocompletion: true, //启用实时自动完成功能 （比如：智能代码提示）
                        enableSnippets: true, //启用代码段
                        showLineNumbers: true,
                        tabSize: 4,
                    }}
                    value={data}
                    annotations={[{ row: 0, column: 2, type: 'error', text: 'Some error.' }]}
                    fontSize={14}
                    theme="dawn"
                    onChange={data => setData(data)}
                    name="JsonEditorModal"
                    editorProps={{ $blockScrolling: true }}
                />
            </RenModal>
        </>
    );
};

export default forwardRef(JsonEditorModal as any) as any;
