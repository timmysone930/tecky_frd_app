import React from 'react'

import { createStackNavigator } from '@react-navigation/stack';
import { Doctor } from '../pages/DoctorPage';
import { DrList } from '../pages/DrListPage';
import { DrInfo } from '../pages/DrInfoPage';
import { ReservationPage } from '../pages/ReservationPage';

const DoctorStack = createStackNavigator();

export const DoctorStacks = () => {
    return (
        <DoctorStack.Navigator screenOptions={{ headerStyle: { backgroundColor: '#245C84' }, headerTintColor: 'white' }} >
            <DoctorStack.Screen name="搜尋醫生" component={Doctor} options={{ headerShown: true }} />
            <DoctorStack.Screen name="醫生列表" component={DrList} />
        </DoctorStack.Navigator>
    )
}

const InnerDoctorStack = createStackNavigator();
export const InnerDoctorStacks = () => {
    return (
        <InnerDoctorStack.Navigator screenOptions={{ headerStyle: { backgroundColor: '#245C84' }, headerTintColor: 'white' }} initialRouteName="醫生詳情">
            <InnerDoctorStack.Screen name="醫生詳情" component={DrInfo} />
            <InnerDoctorStack.Screen name="預約醫生" component={ReservationPage} />
        </InnerDoctorStack.Navigator>
    )
}