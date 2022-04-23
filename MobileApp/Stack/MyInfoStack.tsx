import React from 'react';
import { MyInfoPage } from '../pages/MyInfoPage';
import { PrescriptionListPage } from '../pages/PrescriptionRecords/PrescriptionListPage';
import { createStackNavigator } from '@react-navigation/stack';
import PrescriptionDetailPage from '../pages/PrescriptionRecords/PrescriptionDetailPage';


const MyInfoStack = createStackNavigator();

export const MyInfoStacks = () => {
    return (
        <MyInfoStack.Navigator screenOptions={{ headerStyle: { backgroundColor: '#245C84' }, headerTintColor: 'white' }} >
            <MyInfoStack.Screen name="查看" component={MyInfoPage} options={{ headerShown: true }} />
            <MyInfoStack.Screen name="帳戶資料" component={PrescriptionListPage} />
            <MyInfoStack.Screen name="預約記錄" component={PrescriptionListPage} />
            <MyInfoStack.Screen name="藥單記錄" component={PrescriptionStacks} options={{ headerShown: false }}/>
            <MyInfoStack.Screen name="送藥地址" component={PrescriptionListPage} />
        </MyInfoStack.Navigator>
    )
}

const PrescriptionStack = createStackNavigator();

const PrescriptionStacks = () => {
    return (
        <PrescriptionStack.Navigator screenOptions={{ headerStyle: { backgroundColor: '#245C84' }, headerTintColor: 'white' }}>
            <PrescriptionStack.Screen name="藥單記錄-首頁" component={PrescriptionListPage} options={{ headerTitle: "藥單記錄" }}/>
            <PrescriptionStack.Screen name="藥單詳情" component={PrescriptionDetailPage} options={{ headerTitle: "藥單記錄" }}/>
            <PrescriptionStack.Screen name="藥單付款" component={PrescriptionListPage} options={{ headerTitle: "藥單記錄" }}/>
        </PrescriptionStack.Navigator>
    )
}

