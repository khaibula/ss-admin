import { screensActions } from '../../redux/slices/screensSlice';
import { RootSelector } from '../../redux/createStore';
import { Either } from 'useful-monads';
import {
  ScreenNotFoundById,
  FlatScreenDto,
  ScreenAlreadyExists,
} from '../../apiWorker/typings/index';
import { screenServer } from '../../apiWorker/servers/screenService';
import { call, put, takeEvery, select } from 'redux-saga/effects';
import { asyncScreenActions } from '../../redux/slices/screensSlice';
import { NotificationManager } from 'react-notifications';
export function* addScreen(
  action: ReturnType<typeof asyncScreenActions.addScreen_async>
) {
  yield put(asyncScreenActions.addScreen_request());

  const name = yield select<RootSelector<string>>(
    (state) => state.screens.addScreenName
  );

  try {
    const screenEither: Either<ScreenAlreadyExists, FlatScreenDto> = yield call(
      screenServer.addScreen,
      name
    );
    const screen = screenEither.extract();
    if (screen.right) {
      const screens: FlatScreenDto[] = yield call(screenServer.getScreens);
      yield put(
        screensActions.getAllScreens({
          screens: screens.map((screen) => ({
            ...screen,
            isLoading: false,
          })),
        })
      );
    } else {
      NotificationManager.error(screen.left.message);
      yield put(asyncScreenActions.addScreen_error());
    }
  } catch (error) {
    yield put(asyncScreenActions.addScreen_error());
    NotificationManager.error(
      'Что-то пошло не так, но мы обящательно разберемся'
    );
  }
}

export function* addScreenWatcher() {
  yield takeEvery(asyncScreenActions.addScreen_async, addScreen);
}
