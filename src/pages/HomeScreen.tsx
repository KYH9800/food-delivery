import * as React from 'react';
import {useCallback} from 'react';

import {NativeStackScreenProps} from '@react-navigation/native-stack';

// styles
import {styled} from '../styles/styled';

import {
  Text,
  View,
  Button,
  Pressable, // 아무 효과 없음
  // TouchableOpacity, // hover: 반투명 효과
  // Button,
  // Pressable, // 아무 효과 없음
  // TouchableHighlight, // 배경 색이 검어짐
  // TouchableWithoutFeedback, // 배경 색이 옅게 검어짐
} from 'react-native';

type RootStackParamList = {
  Home: undefined;
  Details: undefined;
};

type HomeScreenProps = NativeStackScreenProps<RootStackParamList, 'Home'>;

/**********************************************
 ** 홈 스크린
 **********************************************/
function HomeScreen({navigation, route}: HomeScreenProps) {
  console.log('route: ', route);

  React.useEffect(() => {
    console.log('home');
  }, [navigation]);

  const onClick = useCallback(() => {
    navigation.navigate('Details');
  }, [navigation]);

  const onClickBtn = useCallback(() => {
    navigation.navigate('Details');
  }, [navigation]);

  return (
    <>
      <View style={styled.button}>
        <View style={styled.buttonComponent}>
          <Button title="첫 번째" onPress={onClickBtn} />
        </View>
      </View>

      <View style={styled.navigator}>
        <Pressable onPress={onClick} style={styled.pressableBtn}>
          <Text style={styled.textSt}>두 번째</Text>
        </Pressable>
      </View>

      <View style={styled.button}>
        <Pressable onPress={onClick}>
          <Text>세 번째</Text>
        </Pressable>
      </View>
    </>
  );
}

export default HomeScreen;

// 스타일 지정
