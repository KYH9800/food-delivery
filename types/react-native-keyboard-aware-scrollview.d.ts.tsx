declare module 'react-native-keyboard-aware-scrollview' {
  import * as React from 'react';
  import {Constructor, ViewProps} from 'react-native';

  class KeyboardAwareScrollViewComponent extends React.Component<ViewProps> {}

  const KeyboardAwareScrollViewBase: KeyboardAwareScrollViewComponent &
    Constructor<any>;

  class KeyboardAwareScrollView extends KeyboardAwareScrollViewComponent {}

  export {KeyboardAwareScrollView};
}

/**********************************************************************
 * 현재 module의 대부분은 typescript로 만들어져 typescript를 지원하는 형태로 나온다.
 * 옛 module도 type 지원하여 나온다. 그러나 그렇지 못한 module 또한 있기 때문에 해당
 * 파일을 만들어 type을 직접 지정해줘야 한다.
 **********************************************************************/

/**********************************************************************
 * type을 직접 지정하고 싶은데 어떻게 접근할까?
 * import { KeyboardAvoidingView } from 'react-native'; -> [cmd + click]
 * KeyboardAvoidingView 해당 태그의 타입으로 넘어가서 비슷하게 참고해서 따오면 된다.
 **********************************************************************/
