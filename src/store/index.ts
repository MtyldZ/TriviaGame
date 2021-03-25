import {applyMiddleware, combineReducers, createStore} from 'redux';
import createSagaMiddleware from 'redux-saga';
import {rootSaga} from './saga';
import {uiReducer} from './ui/reducer';
import {triviaGameReducer} from './triviaGame/reducer';

export const rootReducer = combineReducers({
    ui: uiReducer,
    triviaGame: triviaGameReducer,
});

const sagaMiddleware = createSagaMiddleware();
export const store = createStore(
    rootReducer,
    applyMiddleware(
        sagaMiddleware,
    ),
);

sagaMiddleware.run(rootSaga);
