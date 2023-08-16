import { FC, useEffect } from 'react';

const Footer: FC = () => {
    useEffect(() => {
        console.log('Footer   render!!!!');
    }, []);

    return <div></div>;
};
export default Footer;
