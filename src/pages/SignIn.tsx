import React, {useCallback, useRef, useState} from 'react';
import {
  Alert,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

// 보안에 중요한 정보를 담을 때는 이 storage를 사용한다.
import EncryptedStorage from 'react-native-encrypted-storage';

import axios, {AxiosError} from 'axios';
import Config from 'react-native-config';

import {RootStackParamList} from '../../AppInner';
import {useAppDispatch} from '../store';
import userSlice from '../slices/user';
// 커스텀 키보드
import DismissKeyboardView from '../components/DismissKeyboardView';

/**********************************************************
 ** SignInScreenProps
 * navigation.navigate()에서 정해놓은 타입이 안오면 에러를 발생시킨다.
 * 이 설정을 통해 얻을 수 있는 typescript 장점
 **********************************************************/
type SignInScreenProps = NativeStackScreenProps<RootStackParamList, 'SignIn'>;

/**********************************************
 ** 로그인 페이지
 **********************************************/
function SignIn({navigation}: SignInScreenProps) {
  const dispatch = useAppDispatch();
  /**************** useState ****************/
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  /**************** useRef ****************/
  const emailRef = useRef<TextInput | null>(null); // generic
  const passwordRef = useRef<TextInput | null>(null);

  /**********************************************
   * 이메일 작성 함수
   **********************************************/
  const onChangeEmail = useCallback((text: any): void => {
    // console.log('이메일 입력: ', text.trim());
    setEmail(text.trim());
  }, []);

  /**********************************************
   * 비밀번호 작성 함수
   **********************************************/
  const onChangePassword = useCallback((text: any): void => {
    // console.log('비밀번호 입력: ', text.trim());
    setPassword(text.trim());
  }, []);

  /**********************************************
   * 로그인 입력 정보 요청 함수
   **********************************************/
  const onSubmit = useCallback(async () => {
    if (loading) {
      return;
    }
    if (!email || !email.trim()) {
      return Alert.alert('알림', '이메일을 입력해주세요.');
    }
    if (!password || !password.trim()) {
      return Alert.alert('알림', '비밀번호를 입력해주세요.');
    }
    try {
      setLoading(true);

      console.log('Config.API_URL: ', Config.API_URL);
      /**************** axios ****************/
      // const response = await axios.post(`${Config.API_URL}/login`, {
      const response = await axios.post('http://localhost:3105/login', {
        email,
        password,
      });
      console.log(response.data);
      Alert.alert('알림', '로그인 되었습니다.');

      /**************** dispatch ****************/
      dispatch(
        userSlice.actions.setUser({
          name: response.data.data.name,
          email: response.data.data.email,
          accessToken: response.data.data.accessToken,
        }),
      );
      await EncryptedStorage.setItem(
        'refreshToken',
        response.data.data.refreshToken,
      );
    } catch (error: any) {
      const errorResponse: any = (error as AxiosError).response;
      if (errorResponse) {
        Alert.alert('알림', errorResponse.data.message);
      }
    } finally {
      setLoading(false);
    }
  }, [loading, dispatch, email, password]);

  /**********************************************
   * 회원가입하기 네비게이션
   **********************************************/
  const toSignUp = useCallback(() => {
    navigation.navigate('SignUp');
  }, [navigation]);

  const canGoNext = email && password;
  console.log('canGoNext: ', canGoNext);
  return (
    <DismissKeyboardView>
      <View style={styles.inputWrapper}>
        <Text style={styles.label}>이메일</Text>
        <TextInput
          style={styles.textInput}
          onChangeText={onChangeEmail}
          placeholder="이메일을 입력해주세요"
          placeholderTextColor="#666" // placeholder 색상
          importantForAutofill="yes"
          autoComplete="email" // 이메일 자동완성
          textContentType="emailAddress" // text type을 정의
          value={email}
          returnKeyType="next" // 키보드 우측 하단의 있는 버튼의 타입 '다음'
          clearButtonMode="while-editing" // 입력 후 X 버튼 생성 -> 한번에 입력 값을 지워준다.
          ref={emailRef}
          onSubmitEditing={() => passwordRef.current?.focus()} // 여기에 focusing을 준다. (from password)
          blurOnSubmit={false} // 키보드 내려가는걸 막는다.
          // keyboardType="ascii-capable" // 키보드 타입을 정할 수 있다.
        />
      </View>

      <View style={styles.inputWrapper}>
        <Text style={styles.label}>비밀번호</Text>
        <TextInput
          style={styles.textInput}
          placeholder="비밀번호를 입력해주세요(영문,숫자,특수문자)"
          placeholderTextColor="#666"
          importantForAutofill="yes"
          onChangeText={onChangePassword}
          value={password}
          autoComplete="password" // 비밀번호 자동완성
          textContentType="password" // text type을 정의
          secureTextEntry // 비밀번호 가리기
          returnKeyType="send"
          clearButtonMode="while-editing"
          ref={passwordRef}
          onSubmitEditing={onSubmit}
        />
      </View>

      <View style={styles.buttonZone}>
        <Pressable
          style={
            canGoNext
              ? StyleSheet.compose(styles.loginButton, styles.loginButtonActive) // [styles.loginButton, styles.loginButtonActive]
              : styles.loginButton
          }
          onPress={onSubmit}
          disabled={!canGoNext}>
          <Text style={styles.loginButtonText}>로그인</Text>
        </Pressable>

        <Pressable onPress={toSignUp}>
          <Text>회원가입하기</Text>
        </Pressable>
      </View>
    </DismissKeyboardView>
  );
}

export default SignIn;

/**************** StyleSheet ****************/
const styles = StyleSheet.create({
  textInput: {
    padding: 5,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  inputWrapper: {
    padding: 20,
  },
  label: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 20,
  },
  buttonZone: {
    alignItems: 'center',
  },
  loginButton: {
    backgroundColor: 'gray',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  loginButtonActive: {
    backgroundColor: 'blue',
  },
  loginButtonText: {
    color: 'white',
    fontSize: 16,
  },
});
