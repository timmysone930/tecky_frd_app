import React from 'react';
import { MyInfoPage } from '../pages/MyInfoPage';
import { createStackNavigator } from '@react-navigation/stack';

// Screen component
import { PrescriptionStacks } from './PrescriptionStack';
import { UserAddressStacks } from './UserAddressStack';
import { UserInfoStacks } from './UserInfoStack';
import { ResRecordStacks } from './ResRecordStack';


const MyInfoStack = createStackNavigator();

export const MyInfoStacks = () => {
    return (
        <MyInfoStack.Navigator 
            screenOptions={{ headerStyle: { backgroundColor: '#245C84' }, headerTintColor: 'white', headerTitleAlign: 'center' }} 
            initialRouteName="查看"
        >
            <MyInfoStack.Screen name="查看" component={MyInfoPage} options={{ headerShown: true }} />
            <MyInfoStack.Screen name="帳戶資料" component={UserInfoStacks} options={{ headerShown: false}}/>
            <MyInfoStack.Screen name="預約記錄 " component={ResRecordStacks} options={{ headerShown: false }}/>
            <MyInfoStack.Screen name="藥單記錄" component={PrescriptionStacks} options={{ headerShown: false }}/>
            <MyInfoStack.Screen name="送藥地址" component={UserAddressStacks} options={{ headerShown: false }}/>
        </MyInfoStack.Navigator>
    )
}
