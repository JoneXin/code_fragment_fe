import { getFragmentList } from '@/api/fragment';
import { FragmentType } from '@/typings';
import { makeAutoObservable, runInAction } from 'mobx';

const systemStore = makeAutoObservable({
    fragmentList: [] as FragmentType[],

    async getFragmentList(msg: string) {
        const frgList = await getFragmentList(msg);

        runInAction(() => {
            this.fragmentList = frgList.map((v: FragmentType) => ({ ...v, show: false })) || [];
        });
    },
});

export default systemStore;
