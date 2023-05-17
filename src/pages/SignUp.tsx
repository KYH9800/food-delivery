import React, {useCallback, useRef, useState} from 'react';
import {
  ActivityIndicator,
  Alert,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

import DismissKeyboardView from '../components/DismissKeyboardView';
import {RootStackParamList} from '../../AppInner';

import axios, {AxiosError} from 'axios';

import Config from 'react-native-config'; // .env

type SignUpScreenProps = NativeStackScreenProps<RootStackParamList, 'SignUp'>;

/**********************************************
 ** 회원가입 페이지
 **********************************************/
function SignUp({navigation}: SignUpScreenProps) {
  /**************** useState ****************/
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  /**************** useRef ****************/
  const emailRef = useRef<TextInput | null>(null);
  const nameRef = useRef<TextInput | null>(null);
  const passwordRef = useRef<TextInput | null>(null);

  const onChangeEmail = useCallback(text => {
    setEmail(text.trim()); // 스페이스바 입력하지 못하게 trim()을 사용
  }, []);

  const onChangeName = useCallback(text => {
    setName(text.trim());
  }, []);

  const onChangePassword = useCallback(text => {
    setPassword(text.trim());
  }, []);

  /**********************************************
   * 입력한 정보 요청 함수
   **********************************************/
  const onSubmit = useCallback(async () => {
    if (loading) {
      return; // 로딩중일때 막아준다.
    }

    if (!email || !email.trim()) {
      return Alert.alert('알림', '이메일을 입력해주세요.');
    }

    if (!name || !name.trim()) {
      return Alert.alert('알림', '이름을 입력해주세요.');
    }

    if (!password || !password.trim()) {
      return Alert.alert('알림', '비밀번호를 입력해주세요.');
    }

    let emailCondition = // 이메일을 검사하는 정규표현식
      !/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/.test(
        email,
      );
    if (emailCondition) {
      return Alert.alert('알림', '올바른 이메일 주소가 아닙니다.');
    }

    let passwordCondision = // 패스워드를 검사하는 정규표현식
      !/^(?=.*[A-Za-z])(?=.*[0-9])(?=.*[$@^!%*#?&]).{8,50}$/.test(password);
    if (passwordCondision) {
      return Alert.alert(
        '알림',
        '비밀번호는 영문,숫자,특수문자($@^!%*#?&)를 모두 포함하여 8자 이상 입력해야합니다.', // 비밀번호의 조건
      );
    }

    console.log(email, name, password);
    try {
      setLoading(true);
      // const response = await axios.post(`${Config.API_URL}/user`, {
      const response = await axios.post('http://localhost:3105/login', {
        email,
        name,
        password,
      });
      console.log(response.data);
      Alert.alert('알림', '회원가입 되었습니다.');
      navigation.navigate('SignIn');
    } catch (error) {
      const errorResponse = (error as AxiosError).response;
      console.error(errorResponse);
      if (errorResponse) {
        Alert.alert('알림', errorResponse.data.message);
      }
    } finally {
      setLoading(false);
    }

    /*****************************************************************************
     ** 최신 문법에서 finally가 추가됨 비동기/동기 방식으로 서버에 요청을 보낼 것
     ** useCallback에서는 async를 사용할 수 있으나 useEffect는 안됨 -> 사용할 수 있는 방법이 있음
     ** useEffect(() => { return () => {...}}) cleanup 함수
     *****************************************************************************/
    try {
      setLoading(true);
      console.log('이메일/이름/비밀번호: ', email, name, password);
      console.log('API_URL: ', Config.API_URL);
      // const response = await axios.post(`${Config.API_URL}/user`, {
      const response = await axios.post('http://localhost:3105/user', {
        email,
        name,
        password,
      });
      console.log(response.data);

      Alert.alert('알림', '회원가입 되었습니다.');
      navigation.navigate('SignIn');
    } catch (error) {
      //! 타입스크립트가 error의 타입을 추론 못할수 있으니 AxiosError라는 별칭을 정해준다.
      const errorResponse = (error as AxiosError).response;
      console.error(errorResponse);

      if (errorResponse) {
        Alert.alert('알림', errorResponse.data.message);
      }
    } finally {
      setLoading(false);
    }
  }, [loading, navigation, email, name, password]);

  const canGoNext = email && name && password;
  return (
    /*********************************************
     ** <DismissKeyboardView children={undefined}>
     * 직접만든 커스텀 태그
     * 밑에 input창을 누르면 화면에 맞춰 올라온다.
     * 밖깥 부분을 누르면 키보드가 사라진다.
     *********************************************/
    /*********************************************
     ** KeyboardAvoidingView 태그를 활용하는 방법이 있다.
      <KeyboardAvoidingView
        {...props}
        behavior={Platfotm.OS === 'android' ? 'position' : 'padding'}
        style={props.style}>
        {children}
      </KeyboardAvoidingView>
     *********************************************/
    <DismissKeyboardView>
      <View>
        <View style={styles.inputWrapper}>
          <Text style={styles.label}>이메일</Text>
          <TextInput
            style={styles.textInput}
            onChangeText={onChangeEmail}
            placeholder="이메일을 입력해주세요"
            placeholderTextColor="#666"
            textContentType="emailAddress"
            value={email}
            returnKeyType="next"
            clearButtonMode="while-editing"
            ref={emailRef}
            onSubmitEditing={() => nameRef.current?.focus()}
            blurOnSubmit={false}
          />
        </View>
        <View style={styles.inputWrapper}>
          <Text style={styles.label}>이름</Text>
          <TextInput
            style={styles.textInput}
            placeholder="이름을 입력해주세요."
            placeholderTextColor="#666"
            onChangeText={onChangeName}
            value={name}
            textContentType="name"
            returnKeyType="next"
            clearButtonMode="while-editing"
            ref={nameRef}
            onSubmitEditing={() => passwordRef.current?.focus()}
            blurOnSubmit={false}
          />
        </View>
        <View style={styles.inputWrapper}>
          <Text style={styles.label}>비밀번호</Text>
          <TextInput
            style={styles.textInput}
            placeholder="비밀번호를 입력해주세요(영문,숫자,특수문자)"
            placeholderTextColor="#666"
            onChangeText={onChangePassword}
            value={password}
            keyboardType={
              Platform.OS === 'android' ? 'default' : 'ascii-capable'
            }
            textContentType="password"
            secureTextEntry
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
                ? StyleSheet.compose(
                    styles.loginButton,
                    styles.loginButtonActive,
                  )
                : styles.loginButton
            }
            disabled={!canGoNext || loading} // 로딩중일때는 클릭 못하게하기 위해 disabled || 로딩중... 추가
            onPress={onSubmit}>
            {loading ? (
              <ActivityIndicator color="black" /> // 로딩중을 나타내는 태그
            ) : (
              <Text style={styles.loginButtonText}>회원가입</Text>
            )}
          </Pressable>
        </View>
      </View>
    </DismissKeyboardView>
  );
}

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

export default SignUp;
