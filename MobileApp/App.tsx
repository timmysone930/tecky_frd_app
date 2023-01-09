
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Tabs } from './components/Tabs';
import { InnerDoctorStacks } from './Stack/DoctorStack';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import { InnerLoginStacks } from './Stack/LoginStack';
import { InnerPrescriptionStacks } from './Stack/PrescriptionStack';

import { NativeBaseProvider } from 'native-base';
import { StripeProvider } from '@stripe/stripe-react-native';
import Config from 'react-native-config';
// import RNBootSplash from "react-native-bootsplash";

const Stack = createStackNavigator();

const App = () => {
  return (
    <Provider store={store}>
      <NativeBaseProvider>
      <StripeProvider
      publishableKey={Config.STRIPE_PUBLIC_KEY}
      // urlScheme="your-url-scheme" // required for 3D Secure and bank redirects
      // merchantIdentifier="merchant.com.{{YOUR_APP_NAME}}" // required for Apple Pay
    >
        {/* <NavigationContainer onReady={() => RNBootSplash.hide()}> */}
        <NavigationContainer>
          <Stack.Navigator 
            initialRouteName='返回' 
            screenOptions={{ headerStyle: { backgroundColor: '#245C84' }, headerTintColor: 'white' }}
          >
            <Stack.Screen name="返回" component={Tabs} options={{ headerShown: false }} />
            <Stack.Screen name="相關醫生" component={InnerDoctorStacks} options={{ headerShown: false }} />
            <Stack.Screen name="註冊界面" component={InnerLoginStacks} options={{ headerShown: false }} />
            <Stack.Screen name="藥單付款" component={InnerPrescriptionStacks} options={{ headerShown: false }} />
          </Stack.Navigator>
        </NavigationContainer>
        </StripeProvider>
      </NativeBaseProvider>
    </Provider>
  );
};



export default App;
