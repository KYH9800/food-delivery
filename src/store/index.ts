import {configureStore} from '@reduxjs/toolkit';
import {useDispatch} from 'react-redux';
import rootReducer from './reducer';

/****************************************************
 * redux typescript 적용은 공식문서를 참고하면됨
 * 공식문서에서도 typescript의 사용을 강력 권장하고 있음
 * 이제는 typescript의 시대가 되어버림
 ****************************************************/
const store = configureStore({
  reducer: rootReducer,
  /*********** 이 부분이 있어야지 Flipper와 연동이 된다.(여기부터) ***********/
  middleware: getDefaultMiddleware => {
    if (__DEV__) {
      const createDebugger = require('redux-flipper').default;
      return getDefaultMiddleware().concat(createDebugger());
    }
    return getDefaultMiddleware();
  },
  /*********** 이 부분이 있어야지 Flipper와 연동이 된다.(여기까지) ***********/
});
export default store;

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
