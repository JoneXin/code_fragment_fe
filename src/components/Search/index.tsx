import { Input } from 'antd';
import React, { FC, useEffect, useState } from 'react';
import './index.less';
import { FragmentType } from '@/typings';
import { getFragmentList } from '@/api/fragment';
import systemStore from '@/stores/system';
import useDebounce from '@/hooks/useDebounce';

interface SearchProps extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    style?: React.CSSProperties | undefined;
}

const Search: FC<SearchProps> = (props: SearchProps) => {
    const handleSearchFrg = (val: string) => {
        systemStore.getFragmentList(val);
    };

    const [debounceSearch] = useDebounce(handleSearchFrg, 500);

    return (
        <div className="search-comp">
            <Input
                onInput={(e: any) => debounceSearch(e.target.value)}
                placeholder="请输入代码片段关键字"
                style={{ height: '100%', width: '50%', minWidth: 400, ...props.style }}
            />
        </div>
    );
};

export default Search;
