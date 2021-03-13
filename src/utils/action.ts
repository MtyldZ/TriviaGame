import {useMemo, useRef} from 'react';
import {useDispatch} from 'react-redux';
import {bindActionCreators} from 'redux';

export function createActionsHook<T>(actions: T) {
    return function useActions<K>(selector: (actions: T) => K): K {
        const dispatch = useDispatch();
        const selectorRef = useRef(selector);

        return useMemo(
            () => {
                const selected = selectorRef.current ? selectorRef.current(actions) : actions;

                if (Array.isArray(selected)) {
                    return selected.map(a => bindActionCreators(a, dispatch));
                }

                return bindActionCreators(selected as any, dispatch);
            },
            [dispatch],
        );
    };
}
