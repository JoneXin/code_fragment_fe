import React, { FC, useEffect, useRef, useState } from 'react';

const useThrottle = (fn: Function, delay: number): [Function] => {
    let timmer = useRef<NodeJS.Timeout>();
    const throttle = new Proxy(fn, {
        apply(target, thisArg, args) {
            if (timmer.current) return;

            timmer.current = setTimeout(() => {
                target.apply(thisArg, [...args]);
                // clear timer
                clearTimeout(timmer.current);
                timmer.current = undefined;
            }, delay);
        },
    });

    useEffect(() => {
        return () => {
            clearTimeout(timmer.current);
        };
    }, []);

    return [throttle];
};

export default useThrottle;
