import React from 'react'

import { createStackNavigator } from '@react-navigation/stack';
import { DocSpecPage } from '../pages/DocSpecPage';
import { ReservationPage } from '../pages/Doctor/ReservationPage';
import { ReserveIDCardPage } from '../pages/Doctor/ResUploadIdCardPage';
import { PolicyPage } from '../pages/Doctor/PolicyPage';
import { DocListPage } from '../pages/Doctor/DocListPage';
import { DocDetailPage } from '../pages/Doctor/DocDetailPage';
import { HealthDeForm } from '../pages/Doctor/HealthDeFormPage';
import { ConfirmResPage } from '../pages/Doctor/ConfirmResPage';
import { PaymentPage } from '../pages/Doctor/ResPaymentPage';
import { ConfirmPaymentPage } from '../pages/Doctor/ResPaymentConfirmPage';
import { useSelector } from 'react-redux';
import { LoginStacks } from './LoginStack';

const DoctorStack = createStackNavigator();

export const DoctorStacks = () => {
    return (
        <DoctorStack.Navigator screenOptions={{ headerStyle: { backgroundColor: '#245C84' }, headerTintColor: 'white', headerTitleAlign: 'center' }} >
            <DoctorStack.Screen name="搜尋醫生" component={DocSpecPage} options={{ headerShown: true }} />
            <DoctorStack.Screen name="醫生列表" component={DocListPage} />
            {/* <DoctorStack.Screen name="預約確認" component={ConfirmPaymentPage} options={{ headerShown: false, animationEnabled: false }} /> */}
        </DoctorStack.Navigator>
    )
}

const InnerDoctorStack = createStackNavigator();
export const InnerDoctorStacks = () => {
    // get user status
    const isLogin = useSelector((state: any) => state.getUserStatus.isLogin);
    return (
        <InnerDoctorStack.Navigator screenOptions={{ headerStyle: { backgroundColor: '#245C84' }, headerTintColor: 'white' }} initialRouteName="醫生詳情">
            <InnerDoctorStack.Screen name="醫生詳情" component={DocDetailPage} />
            {isLogin?<InnerDoctorStack.Screen name="預約醫生" component={ReservationPage} options={{headerShown: true }}/>:
            <InnerDoctorStack.Screen name="預約醫生" component={LoginStacks} options={{headerShown: false }}/>
            }
            <InnerDoctorStack.Screen name="上傳身份證明文件" component={ReserveIDCardPage} />
            <InnerDoctorStack.Screen name="健康申報表" component={HealthDeForm} />
            <InnerDoctorStack.Screen name="預約須知" component={PolicyPage} />
            <InnerDoctorStack.Screen name="確認預約資料" component={ConfirmResPage} />
            <InnerDoctorStack.Screen name="付款" component={PaymentPage} />
            <InnerDoctorStack.Screen name="預約確認" component={ConfirmPaymentPage} options={{ headerShown: false, animationEnabled: false }} />
        </InnerDoctorStack.Navigator>
    )
}
