import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import { DocSpecPage } from '../pages/DocSpecPage';
import { ReservationPage } from '../pages/Reservation/ReservationPage';
import { ResAddInfoPage } from '../pages/Reservation/ResAddInfoPage';
import { ResPolicyPage } from '../pages/Reservation/ResPolicyPage';
import { DocListPage } from '../pages/Doctor/DocListPage';
import { DocDetailPage } from '../pages/Doctor/DocDetailPage';
import { ResHealthFormPage } from '../pages/Reservation/ResHealthFormPage';
import { ResDetailConfirmPage } from '../pages/Reservation/ResDetailConfirmPage';
import { PaymentPage } from '../pages/Reservation/ResPaymentPage';
import { ResPaymentConfirmPage } from '../pages/Reservation/ResPaymentConfirmPage';
import { useSelector } from 'react-redux';
import { LoginStacks } from './LoginStack';

const DoctorStack = createStackNavigator();

export const DoctorStacks = () => {
    return (
        <DoctorStack.Navigator screenOptions={{ headerStyle: { backgroundColor: '#245C84' }, headerTintColor: 'white', headerTitleAlign: 'center' }} >
            <DoctorStack.Screen name="搜尋醫生" component={DocSpecPage} options={{ headerShown: true }} />
            <DoctorStack.Screen name="醫生列表" component={DocListPage} />
        </DoctorStack.Navigator>
    )
}

const InnerDoctorStack = createStackNavigator();
export const InnerDoctorStacks = () => {
    // get user status
    const isLogin = useSelector((state: any) => state.getUserStatus.isLogin);
    return (
        <InnerDoctorStack.Navigator 
            screenOptions={{ headerStyle: { backgroundColor: '#245C84' }, headerTintColor: 'white' }} 
            initialRouteName="醫生詳情"
        >
            <InnerDoctorStack.Screen name="醫生詳情" component={DocDetailPage} />
            {isLogin
                ? <InnerDoctorStack.Screen name="預約醫生" component={ReservationPage} options={{headerShown: true }}/>
                : <InnerDoctorStack.Screen name="預約醫生" component={LoginStacks} options={{headerShown: false }}/>
            }
            <InnerDoctorStack.Screen name="上傳身份證明文件" component={ResAddInfoPage} />
            <InnerDoctorStack.Screen name="健康申報表" component={ResHealthFormPage} />
            <InnerDoctorStack.Screen name="預約須知" component={ResPolicyPage} />
            <InnerDoctorStack.Screen name="確認預約資料" component={ResDetailConfirmPage} />
            <InnerDoctorStack.Screen name="付款" component={PaymentPage} />
            <InnerDoctorStack.Screen 
                name="預約確認" 
                component={ResPaymentConfirmPage} 
                options={{ headerShown: false, animationEnabled: false }}
            />
        </InnerDoctorStack.Navigator>
    )
}
