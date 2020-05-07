import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { state } from './state';
import { mainSaga } from '../controller/mainSaga';
import createSagaMiddleware from 'redux-saga';
import { Selector } from '@reduxjs/toolkit';
const sagaMiddleware = createSagaMiddleware();
export const store = configureStore({
    reducer: state,
    middleware: [sagaMiddleware, ...getDefaultMiddleware()],
});
sagaMiddleware.run(mainSaga);

export type RootState = ReturnType<typeof state>;
export type AppDispatch = typeof store.dispatch;
export type RootSelector<T> = Selector<RootState, T>;
export const getState = store.getState;
