import React from 'react';
import { PrescriptionListPage } from '../pages/PrescriptionRecords/PrescriptionListPage';
import { createStackNavigator } from '@react-navigation/stack';
import {PrescriptionDetailPage } from '../pages/PrescriptionRecords/PrescriptionDetailPage';
import { DeliveryOptionPage } from '../pages/PrescriptionRecords/DeliveryOptionPage';
import { PrescriptionPaymentConfirm } from '../pages/PrescriptionRecords/PrescriptionPaymentConfirmPage';

const PrescriptionStack = createStackNavigator();

export const PrescriptionStacks = () => {
    return (
        <PrescriptionStack.Navigator screenOptions={{ headerStyle: { backgroundColor: '#245C84' }, headerTintColor: 'white' }}>
            <PrescriptionStack.Screen name="藥單記錄-首頁" component={PrescriptionListPage} options={{ headerTitle: "藥單記錄" }}/>
            <PrescriptionStack.Screen name="藥單詳情" component={PrescriptionDetailPage} options={{ headerTitle: "藥單記錄" }}/>
            <PrescriptionStack.Screen name="地址確認" component={DeliveryOptionPage} options={{ headerTitle: "藥單記錄" }}/>
            <PrescriptionStack.Screen name="付款確認" component={PrescriptionPaymentConfirm} options={{ headerTitle: "藥單記錄" }}/>
        </PrescriptionStack.Navigator>
    )
}