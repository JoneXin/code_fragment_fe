import React, { FC, useEffect, useRef, useState } from 'react';
import './index.less';
import { Button, Card, Popover, FloatButton, message, Checkbox, Spin } from 'antd';
import { FragmentType } from '@/typings';
import anime from 'animejs/lib/anime.es.js';
import Editor from '../Editor';
import { copyToClipbord } from '@/utils/tools';
import systemStore from '@/stores/system';
import { CheckboxChangeEvent } from 'antd/es/checkbox';
import { observer } from 'mobx-react-lite';
import { saveFragment } from '@/api/fragment';

interface CoderProps {
    fragmentList: FragmentType[];
    operateDetail: (idx: number, open: boolean) => void;
}

const Coder: FC<CoderProps> = (props: CoderProps) => {
    const animation = useRef<anime.AnimeInstance>();
    const [messageApi, contextHolder] = message.useMessage();
    const [enableEdit, setEnableEdit] = useState(false);
    const [loading, setLoading] = useState(false);

    const backToPre = (idx: number) => {
        animation.current?.pause();
        anime({
            targets: `.card-${idx}`,
            width: '300px',
            height: '200px',
            left: `${getPosByIdx(idx, 4).left}px`,
            top: `${getPosByIdx(idx, 4).top}px`,
            duration: 0,
            'z-index': 1,
        });
    };

    const expandToDetail = (idx: number) => {
        anime({
            targets: `.card-${idx}`,
            'z-index': 999,
            duration: 0,
        });
        animation.current = anime({
            targets: `.card-${idx}`,
            width: '100%',
            height: '800px',
            left: '0',
            top: 0,
            duration: 0,
        });
    };

    const handleCopyCode = (idx: number) => {
        copyToClipbord(systemStore.fragmentList[idx].content);
        messageApi.info('复制成功!');
    };

    const operateDetail = (idx: number, open: boolean) => {
        open ? expandToDetail(idx) : backToPre(idx);
        props.operateDetail(idx, open);
    };

    const operate = (idx: number) => (
        <div>
            <Button style={{ marginLeft: 5 }} size="small" type="primary" onClick={() => handleCopyCode(idx)}>
                复制
            </Button>
            {systemStore.fragmentList[idx].show ? (
                <Button style={{ marginLeft: 5 }} size="small" onClick={() => operateDetail(idx, false)}>
                    收起
                </Button>
            ) : (
                <Button style={{ marginLeft: 5 }} size="small" onClick={() => operateDetail(idx, true)}>
                    展开
                </Button>
            )}
        </div>
    );

    const saveCodeContent = async (idx: number) => {
        const fragment = systemStore.fragmentList[idx];
        try {
            setLoading(true);
            await saveFragment([fragment]);
            messageApi.success('更新成功!');
        } catch (error) {
            console.log(error);
            messageApi.error(String(error));
        }
        setLoading(false);
    };

    const deleteFragment = (idx: number) => {
        const fragment = systemStore.fragmentList[idx];
    };

    const onChange = (e: CheckboxChangeEvent) => {
        setEnableEdit(e.target.checked);
    };

    const getPosByIdx = (idx: number, cols: number) => {
        const left = (idx % cols) * 300 + (idx % cols) * 20 + 20;
        const top = Math.floor(idx / cols) * 200 + Math.floor(idx / cols) * 20 + 20;

        return {
            left,
            top,
        };
    };

    return (
        <Spin spinning={loading}>
            <div className="coder-box">
                {contextHolder}
                {props.fragmentList.map((frg, idx) => (
                    <div className={`card-${idx}`} key={`card-${idx}`} style={{ ...getPosByIdx(idx, 4) }}>
                        <div className="code-header">
                            <span>{frg.title}</span>
                            {operate(idx)}
                        </div>
                        <div className="code-content">
                            {frg.show ? (
                                <div className="code-editor">
                                    <div className="code-edit-nav">
                                        <Checkbox style={{ marginLeft: 5 }} onChange={onChange}>
                                            启动编辑
                                        </Checkbox>
                                        <Button style={{ marginLeft: 5 }} type="primary" onClick={() => saveCodeContent(idx)}>
                                            保存编辑
                                        </Button>
                                        <Button style={{ marginLeft: 5 }} type="default" color="red" onClick={() => deleteFragment(idx)}>
                                            删除此片段
                                        </Button>
                                    </div>
                                    <Editor
                                        content={frg.content}
                                        aceProps={{ height: '660px', width: '100%', readOnly: !enableEdit }}
                                        setContent={(val: string) => (systemStore.fragmentList[idx].content = val)}
                                    ></Editor>
                                </div>
                            ) : (
                                <div className="code-desc">
                                    {/* <p>描述:</p> */}
                                    <p className="desc">{frg.desc}</p>
                                    <p className="time">更新时间：{frg.time}</p>
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </Spin>
    );
};

export default Coder;
