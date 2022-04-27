import React from 'react';
import { MyInfoPage } from '../pages/MyInfoPage';
import { createStackNavigator } from '@react-navigation/stack';

// Screen component
import { PrescriptionListPage } from '../pages/PrescriptionRecords/PrescriptionListPage';
import { PrescriptionStacks } from './PrescriptionStack';
import { UserAddressStacks } from './UserAddressStack';


const MyInfoStack = createStackNavigator();

export const MyInfoStacks = () => {
    return (
        <MyInfoStack.Navigator screenOptions={{ headerStyle: { backgroundColor: '#245C84' }, headerTintColor: 'white' }} >
            <MyInfoStack.Screen name="查看" component={MyInfoPage} options={{ headerShown: true }} />
            <MyInfoStack.Screen name="帳戶資料" component={PrescriptionListPage} />
            <MyInfoStack.Screen name="預約記錄" component={PrescriptionListPage} />
            <MyInfoStack.Screen name="藥單記錄" component={PrescriptionStacks} options={{ headerShown: false }}/>
            <MyInfoStack.Screen name="送藥地址" component={UserAddressStacks} options={{ headerShown: false }}/>
        </MyInfoStack.Navigator>
    )
}


