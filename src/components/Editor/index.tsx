import react, { FC, forwardRef, useImperativeHandle, useRef, useEffect, useState } from 'react';
import AceEditor, { IAceEditorProps } from 'react-ace';
import 'ace-builds/src-noconflict/mode-javascript';
import 'ace-builds/src-noconflict/mode-json';
import 'ace-builds/src-noconflict/theme-github';
import 'ace-builds/src-noconflict/ext-language_tools';
import 'ace-builds/src-noconflict/ext-language_tools';
import 'ace-builds/src-noconflict/theme-dawn';
import 'ace-builds/src-noconflict/theme-terminal';
import 'ace-builds/src-noconflict/theme-github';

interface EditorProps {
    content?: any;
    setContent?: (val: any) => void;
    aceProps?: IAceEditorProps;
}

const Editor: FC<EditorProps> = (props: EditorProps) => {
    return (
        <>
            <AceEditor
                style={{ borderRadius: ' 5px' }}
                mode={'javascript'}
                width="600px"
                height="400px"
                showPrintMargin
                wrapEnabled
                showGutter={false}
                readOnly={true}
                highlightActiveLine //突出活动线
                enableSnippets //启用代码段
                // showFoldWidgets={true}
                setOptions={{
                    enableBasicAutocompletion: true, //启用基本自动完成功能
                    enableLiveAutocompletion: true, //启用实时自动完成功能 （比如：智能代码提示）
                    enableSnippets: true, //启用代码段
                    showLineNumbers: true,
                    tabSize: 4,
                }}
                value={props.content}
                annotations={[{ row: 0, column: 2, type: 'error', text: 'Some error.' }]}
                fontSize={14}
                theme="dawn"
                onChange={data => {
                    props.setContent && props.setContent(data);
                }}
                name="Editor"
                editorProps={{ $blockScrolling: true }}
                {...props.aceProps}
            />
        </>
    );
};

export default Editor;
