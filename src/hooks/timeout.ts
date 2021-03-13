import {useCallback, useEffect, useRef} from 'react';

export function useTimeout(handler: Function, timeout?: number) {
    const callbackRef = useRef<Function>();
    const idRef = useRef<number>();

    useEffect(() => {
        callbackRef.current = handler;
    });

    useEffect(() => {
        if (timeout !== null) {
            const id = setTimeout(() => callbackRef.current(), timeout);
            idRef.current = id;
            return () => clearTimeout(id);
        } else {
            idRef.current = null;
        }
    }, [timeout]);

    return useCallback(() => {
        clearTimeout(idRef.current);
    }, []);
}
