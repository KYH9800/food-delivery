import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {Provider} from 'react-redux';
import store from './src/store';
import AppInner from './AppInner';

/****************************************************************************
 ** 공식문서에서 태그 관련 문서 읽다가 우측에 목록에서 점 찍혀 있는 것은 사용시 주의해서 사용해야 함
 ** 공식문서가 그닥 친절하지 않음...
 ****************************************************************************/

/**************************************************************************************
 * local-server-port: 3105
 * Provider를 깜싼 내부에서만 redux 사용을 위한 useSelector를 사용할수 있기 때문에 AppInner.tsx를 추가.
 *! 서버 요청은 axios 사용(요즘 ky나 got으로 넘어가는 추세이나 react-native와 호환 여부 불투명)
 **************************************************************************************/
function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <AppInner />
      </NavigationContainer>
    </Provider>
  );
}

export default App;
