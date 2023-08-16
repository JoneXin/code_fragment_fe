import { FC, useRef } from 'react';
import { observer } from 'mobx-react-lite';
import Search from '@/components/Search';
import Coder from '@/components/Coder';
import './index.less';
import systemStore from '@/stores/system';
import { Button } from 'antd';
import NewFragment from './new_fragment';

const Home: FC = () => {
    const newFragment = () => {
        (newFragmentRef.current as any).showModal();
    };

    const newFragmentRef = useRef();

    const operateDetail = (idx: number, open: boolean) => {
        if (open) {
            systemStore.fragmentList = systemStore.fragmentList.map((v, index) => {
                return index == idx ? { ...v, show: true } : v;
            });
        } else {
            systemStore.fragmentList = systemStore.fragmentList.map(v => ({ ...v, show: false }));
        }
    };

    return (
        <div className="home">
            <div className="new-fragment">
                <NewFragment ref={newFragmentRef}></NewFragment>
                <Button size="large" style={{ backgroundColor: 'rgba(128, 128, 128, 0.414)', color: 'white' }} onClick={() => newFragment()}>
                    新增代码片段
                </Button>
            </div>
            <Search></Search>
            <Coder fragmentList={systemStore.fragmentList} operateDetail={operateDetail}></Coder>
        </div>
    );
};
export default observer(Home);
