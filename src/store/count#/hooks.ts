import {createActionsHook} from '../../utils/action';
import * as countActions from './action';

export const useCountActions = createActionsHook(countActions);
