
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { Tabs } from './components/Tabs';
import { DrInfo } from './pages/DrInfo';

const Stack = createStackNavigator();

const App = () => {

  return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName='返回' >
          <Stack.Screen name="返回" component={Tabs} options={{ headerShown: false }} />
          <Stack.Screen name="醫生詳情" component={DrInfo} />
        </Stack.Navigator>
      </NavigationContainer>
  );
};



export default App;
