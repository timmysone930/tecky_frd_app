import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { ResRecordPage } from '../pages/ResRecordPage';
import { ResRecordDetail } from '../pages/ResRecords/ResRecordDetail';



const ResRecordStack = createStackNavigator();

export const ResRecordStacks = () => {
    return (
        <ResRecordStack.Navigator screenOptions={{ headerStyle: { backgroundColor: '#245C84' }, headerTintColor: 'white', headerTitleAlign: 'center' }} initialRouteName="預約記錄">
            <ResRecordStack.Screen name="預約記錄" component={ResRecordPage} options={{ headerShown: true }} />
            <ResRecordStack.Screen name="預約詳情界面" component={InnerResRecordStacks} options={{ headerShown: false }} />
        </ResRecordStack.Navigator>
    )
}

const InnerResRecordStack = createStackNavigator();
export const InnerResRecordStacks = () => {
    return (
        <InnerResRecordStack.Navigator screenOptions={{ headerStyle: { backgroundColor: '#245C84' }, headerTintColor: 'white' }} initialRouteName="預約詳情">
            <InnerResRecordStack.Screen name="預約詳情" component={ResRecordDetail} />
        </InnerResRecordStack.Navigator>
    )
}