import React from 'react';
import { PrescriptionListPage } from '../pages/PrescriptionRecords/PrescriptionListPage';
import { createStackNavigator } from '@react-navigation/stack';
import {PrescriptionDetailPage } from '../pages/PrescriptionRecords/PrescriptionDetailPage';
import { DeliveryOptionPage } from '../pages/PrescriptionRecords/DeliveryOptionPage';
import { PrescriptionPaymentConfirm } from '../pages/PrescriptionRecords/PrescriptionPaymentConfirmPage';
import { PrescriptionNewAddrPage } from '../pages/PrescriptionRecords/PrescriptionNewAddrPage';

const PrescriptionStack = createStackNavigator();

export const PrescriptionStacks = () => {
    return (
        <PrescriptionStack.Navigator screenOptions={{ headerStyle: { backgroundColor: '#245C84' }, headerTintColor: 'white', headerTitleAlign: 'center' }}>
            <PrescriptionStack.Screen name="藥單記錄表" component={PrescriptionListPage} options={{ headerTitle: "藥單記錄", headerShown: true }}/>
            <PrescriptionStack.Screen name="藥單詳情" component={PrescriptionDetailPage} options={{ headerShown: true }}/>
            <PrescriptionStack.Screen name="新增地址" component={PrescriptionNewAddrPage} options={{ headerShown: true }}/>
            <PrescriptionStack.Screen name="地址確認" component={DeliveryOptionPage} options={{ headerShown: true }}/>
            <PrescriptionStack.Screen name="付款確認" component={PrescriptionPaymentConfirm} options={{ headerShown: true }}/>
            
        </PrescriptionStack.Navigator>
    )
}

import { PrescriptionPaymentPage } from '../pages/PrescriptionRecords/PrescriptionPaymentPage';
import { PrescriptionPaymentSuccessPage } from '../pages/PrescriptionRecords/PrescriptionPaymentSuccessPage';

const InnerPrescriptionStack = createStackNavigator();

export const InnerPrescriptionStacks = () => {

    return (
        <InnerPrescriptionStack.Navigator screenOptions={{ headerStyle: { backgroundColor: '#245C84' }, headerTintColor: 'white' }} initialRouteName="付款">
            <PrescriptionStack.Screen name="付款" component={PrescriptionPaymentPage} options={{ headerShown: true }}/>
            <PrescriptionStack.Screen name="付款完成" component={PrescriptionPaymentSuccessPage}  options={{ headerShown: false, animationEnabled: false }}/>
        </InnerPrescriptionStack.Navigator>
    )
}