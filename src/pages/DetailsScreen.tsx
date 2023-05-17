/* eslint-disable react-native/no-inline-styles */
import * as React from 'react';
import {useCallback} from 'react';

import {Text, View, Pressable} from 'react-native';

import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {ParamListBase} from '@react-navigation/native';

// styles
import {styled} from '../styles/styled';

// type을 지정
type DetailsScreenProps = NativeStackScreenProps<ParamListBase, 'Details'>;

/**********************************************
 ** 상세 스크린
 **********************************************/
function DetailsScreen({navigation, route}: DetailsScreenProps) {
  console.log('route: ', route);

  React.useEffect(() => {
    console.log('detail');
  }, [navigation]);

  const onClick = useCallback(() => {
    navigation.navigate('Home');
  }, [navigation]);

  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Pressable onPress={onClick} style={styled.pressableBtn}>
        <Text style={styled.textSt}>Details Screen</Text>
      </Pressable>
    </View>
  );
}

export default DetailsScreen;
