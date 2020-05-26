import { screensActions } from './../../redux/slices/screensSlice';
import { RootSelector } from './../../redux/createStore';
import { Either } from 'useful-monads';
import {
  ScreenNotFoundById,
  FlatScreenDto,
} from '../../apiWorker/typings/index';
import { screenServer } from '../../apiWorker/servers/screenService';
import { call, put, takeEvery, select } from 'redux-saga/effects';
import { asyncScreenActions } from '../../redux/slices/screensSlice';
import { NotificationManager } from 'react-notifications';
export function* renameScreen(
  action: ReturnType<typeof asyncScreenActions.renameScreen_async>
) {
  yield put(asyncScreenActions.renameScreen_request(action.payload));
  const name = yield select<RootSelector<string>>(
    (state) =>
      state.screens.screensList.find((screen) => screen.id === action.payload)
        ?.renameScreenName ?? ''
  );

  try {
    const screenEither: Either<ScreenNotFoundById, FlatScreenDto> = yield call(
      screenServer.renameScreen,
      action.payload,
      name
    );
    const screen = screenEither.extract();
    if (screen.right) {
      yield put(
        screensActions.renameScreen({
          ...screen.right,
          isLoading: false,
        })
      );
    } else {
      NotificationManager.error(screen.left.message);
      yield put(asyncScreenActions.renameScreen_error(action.payload));
    }
  } catch (error) {
    yield put(asyncScreenActions.renameScreen_error(action.payload));
    NotificationManager.error(
      'Что-то пошло не так, но мы обящательно разберемся'
    );
  }
}

export function* renameScreenWatcher() {
  yield takeEvery(asyncScreenActions.renameScreen_async, renameScreen);
}
