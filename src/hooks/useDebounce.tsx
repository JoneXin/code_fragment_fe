import React, { FC, useEffect, useRef, useState } from 'react';

const useDebounce = (fn: Function, delay: number): [Function] => {
    let timmer = useRef<NodeJS.Timeout>();

    const deBounce = new Proxy(fn, {
        apply(target, thisArgs, args) {
            timmer.current && clearTimeout(timmer.current);

            timmer.current = setTimeout(() => {
                target.apply(thisArgs, [...args]);
            }, delay);
        },
    });

    useEffect(() => {
        return () => {
            clearTimeout(timmer.current);
        };
    }, []);

    return [deBounce];
};

export default useDebounce;
