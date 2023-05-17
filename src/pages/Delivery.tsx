import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Complete from './Compolete';
import Ing from './Ing';

const Stack = createNativeStackNavigator();

function Delivery(): any {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Ing" component={Ing} options={{title: '내 오더'}} />
      <Stack.Screen
        name="Complete"
        component={Complete}
        options={{title: '완료하기'}}
      />
    </Stack.Navigator>
  );
}

export default Delivery;
