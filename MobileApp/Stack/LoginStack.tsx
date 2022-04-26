import React from 'react'

import { createStackNavigator } from '@react-navigation/stack';
import { LoginPage } from '../pages/Auth/LoginPage';
import { RegisterPage } from '../pages/Auth/RegisterPage';
import { ResSuccessPage } from '../pages/Auth/ResSuccessPage';

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
        <InnerLoginStack.Navigator screenOptions={{ headerStyle: { backgroundColor: '#245C84' }, headerTintColor: 'white' }} initialRouteName="注冊">
            <InnerLoginStack.Screen name="注冊" component={RegisterPage} />
            <InnerLoginStack.Screen name="注冊成功" component={ResSuccessPage} options={{ headerShown: false, animationEnabled:false}} />
        </InnerLoginStack.Navigator>
    )
}
