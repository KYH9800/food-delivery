import React from 'react';
import {
  TouchableWithoutFeedback,
  Keyboard,
  StyleProp,
  ViewStyle,
} from 'react-native'; // StyleProp, ViewStyle,
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview'; // npm install @types/...

const DismissKeyboardView: React.FC<{style?: StyleProp<ViewStyle>}> = ({
  children,
  ...props
}) => (
  <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
    <KeyboardAwareScrollView {...props} style={props.style}>
      {children}
    </KeyboardAwareScrollView>
  </TouchableWithoutFeedback>
);

export default DismissKeyboardView;

/* 1 */
/**********************************************************
 ** react-native-keyboard-aware-scrollview
 * 해당 라이브러리를 활용하여 input창 클릭시 화면 스크롤도 가능하게끔 커스텀
 *? <DismissKeyboardView>
 *?   ...여기 내부에 있는 부분이 children이 된다.
 *? </DismissKeyboardView>
 **********************************************************/

/* 2 */
/**********************************************************
 * children의 경우 tpye을 지정할 때, React.FC를 쓰는 것이 좋다.
 * 변수에 타입을 넣어주는 것
 * React.FC: 함수 컴포넌트에 대한 타입, 기본값이다. 싫으면 function을 쓰면된다.
 **********************************************************/

/* 3 */
/**********************************************************
 ** StyleProp<ViewStyle>
 * 이 부분은 외워야한다. StyleSheet를 사용하기 위해서는 이걸 써야한다.
 * StyleSheet의 타입 추문이 잘 되려면 이걸 써야한다.
 **********************************************************/
