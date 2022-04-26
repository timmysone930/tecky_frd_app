
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Tabs } from './components/Tabs';
import { InnerDoctorStacks } from './Stack/DoctorStack';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import { InnerLoginStacks } from './Stack/LoginStack';

import { NativeBaseProvider } from 'native-base';

const Stack = createStackNavigator();

const App = () => {
  return (
    <Provider store={store}>
      <NativeBaseProvider>
        <NavigationContainer>
          <Stack.Navigator initialRouteName='返回' screenOptions={{ headerStyle: { backgroundColor: '#245C84' }, headerTintColor: 'white' }}>
            <Stack.Screen name="返回" component={Tabs} options={{ headerShown: false }} />
            <Stack.Screen name="醫生相關" component={InnerDoctorStacks} options={{ headerShown: false }} />
            <Stack.Screen name="注冊界面" component={InnerLoginStacks} options={{ headerShown: false }} />
          </Stack.Navigator>
        </NavigationContainer>
      </NativeBaseProvider>
    </Provider>
  );
};



export default App;
