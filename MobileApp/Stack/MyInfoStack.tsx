import React from 'react';
import { MyInfoPage } from '../pages/MyInfoPage';
import { PrescriptionListPage } from '../pages/PrescriptionRecords/PrescriptionListPage';
import { createStackNavigator } from '@react-navigation/stack';

const MyInfoStack = createStackNavigator();

export const MyInfoStacks = () => {
    return (
        <MyInfoStack.Navigator screenOptions={{ headerStyle: { backgroundColor: '#245C84' }, headerTintColor: 'white' }} >
            <MyInfoStack.Screen name="我的資料" component={MyInfoPage} options={{ headerShown: true }} />
            <MyInfoStack.Screen name="帳戶資料" component={PrescriptionListPage} />
            <MyInfoStack.Screen name="預約記錄" component={PrescriptionListPage} />
            <MyInfoStack.Screen name="藥單記錄" component={PrescriptionListPage} />
            <MyInfoStack.Screen name="送藥地址" component={PrescriptionListPage} />
        </MyInfoStack.Navigator>
    )
}