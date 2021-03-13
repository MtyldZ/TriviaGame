import * as uiActions from './action';
import {createActionsHook} from '../../utils/action';
import {useMemo} from 'react';

export const useUIActions = createActionsHook(uiActions);

export function useSwitchNavigation() {
    const changeSwitchNavigationRoute = useUIActions(actions => actions.changeSwitchNavigationRouteAction);

    return useMemo(() => ({
        navigate: changeSwitchNavigationRoute,
    }), [changeSwitchNavigationRoute]);
}
