import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { AccountInfoPage } from '../pages/AccountInfo/AccountInfoPage';
import { InfoEditPage } from '../pages/AccountInfo/InfoEditPage';
import { AccountDeletionPage } from '../pages/AccountInfo/AccountDeletion';

const UserInfoStack = createStackNavigator();

export const UserInfoStacks = () => {
    return (
        <UserInfoStack.Navigator 
            screenOptions={{ 
                headerStyle: { backgroundColor: '#245C84' },
                headerTintColor: 'white',
                headerTitleAlign: 'center'
            }}
        >
            <UserInfoStack.Screen name="我的資料" component={AccountInfoPage} options={{ headerShown: true}}/>
            <UserInfoStack.Screen name="變更帳戶資料" component={InfoEditPage} options={{ headerShown: true }}/>
            <UserInfoStack.Screen name="刪除帳號" component={AccountDeletionPage} options={{ headerShown: true}}/>
        </UserInfoStack.Navigator>
    )
}
