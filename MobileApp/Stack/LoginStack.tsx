import React from 'react'

import { createStackNavigator } from '@react-navigation/stack';
import { LoginPage } from '../pages/Auth/LoginPage';
import { RegisterPage } from '../pages/Auth/RegisterPage';
import { RegSuccessPage } from '../pages/Auth/RegSuccessPage';

const LoginStack = createStackNavigator();

export const LoginStacks = () => {
    return (
        <LoginStack.Navigator screenOptions={{ headerStyle: { backgroundColor: 'white' }, headerTintColor: 'black', headerTitleAlign: 'center' }} >
           <LoginStack.Screen name="會員登入" component={LoginPage} />
        </LoginStack.Navigator>
    )
}

const InnerLoginStack = createStackNavigator();
export const InnerLoginStacks = () => {
    return (
        <InnerLoginStack.Navigator screenOptions={{ headerStyle: { backgroundColor: '#245C84' }, headerTintColor: 'white' , headerTitleAlign: 'center' }} initialRouteName="註冊">
            <InnerLoginStack.Screen name="註冊" component={RegisterPage} />
            <InnerLoginStack.Screen name="註冊成功" component={RegSuccessPage} options={{ headerShown: false, animationEnabled:false}} />
        </InnerLoginStack.Navigator>
    )
}
