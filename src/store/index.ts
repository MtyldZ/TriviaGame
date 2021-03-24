import {applyMiddleware, combineReducers, createStore} from 'redux';
import createSagaMiddleware from 'redux-saga';
import {rootSaga} from './saga';
import {uiReducer} from './ui/reducer';
import {counterReducer} from './count#/reducer';
import {triviaGameReducer} from './triviagame/reducer';

export const rootReducer = combineReducers({
    ui: uiReducer,
    counter: counterReducer,
    triviagame: triviaGameReducer,
});

const sagaMiddleware = createSagaMiddleware();
export const store = createStore(
    rootReducer,
    applyMiddleware(
        sagaMiddleware,
    ),
);

sagaMiddleware.run(rootSaga);
