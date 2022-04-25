import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { ResRecordPage } from '../pages/ResRecordPage';



const ResRecordStack = createStackNavigator();

export const ResRecordStacks = () => {
    return (
        <ResRecordStack.Navigator screenOptions={{ headerStyle: { backgroundColor: '#245C84' }, headerTintColor: 'white' }} >
            <ResRecordStack.Screen name="預約記錄" component={ResRecordPage} options={{ headerShown: true }} />
        </ResRecordStack.Navigator>
    )
}