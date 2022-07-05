import React, { useEffect, useState } from 'react'

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// to store the token permanently
import AsyncStorage from '@react-native-async-storage/async-storage';

import {
    Image
} from 'react-native';

// redux
import { store } from '../redux/store';
import { checkStatus } from '../redux/AuthSlice';
import { setUserInfo } from '../redux/AuthSlice';

// pages && components
import { Home } from '../pages/Home';
import { DoctorStacks } from '../Stack/DoctorStack';
import { MyInfoStacks } from '../Stack/MyInfoStack';
import { ResRecordStacks } from '../Stack/ResRecordStack';
import { useSelector } from 'react-redux';
import { LoginStacks } from '../Stack/LoginStack';

// import icon for FontAwesome
import Icon from 'react-native-vector-icons/FontAwesome';
import Config from 'react-native-config';

// Bottom Tabs
const Tab = createBottomTabNavigator();

export const Tabs = () => {

    // const [isLogin, setIsLogin] = useState(false)

    // get user status
    useEffect(() => {
        console.log("hi Tab");

        const getData = (async () => {
            try {
                const jsonValue = await AsyncStorage.getItem('@storage_Key')

                if (jsonValue != null) {
                    const result: {
                        status: boolean;
                        phone: string;
                        member_code: string;
                        token: string;
                    } = JSON.parse(jsonValue)
                    store.dispatch(checkStatus({ status: true, phone: result.phone }))
                    store.dispatch(setUserInfo({ member_code: result.member_code, token: result.token }))
                    return result
                }

                return null;

            } catch (e) {
                console.log(e);
                return null;
            }
        })()
        
        console.log(getData);
    }, [])

    const isLogin = useSelector((state: any) => state.getUserStatus.isLogin);
    return (
        <Tab.Navigator initialRouteName="醫生" screenOptions={{ headerStyle: { backgroundColor: '#245C84' }, headerTintColor: 'white', headerTitleAlign: 'center', tabBarStyle: { paddingBottom: 10 } }}>
            {/* <Tab.Screen name="主頁" component={Home} options={{
                headerStyle: { backgroundColor: 'white' },
                headerTitle: () => (<Image style={{ width: 80, height: 40 }} source={{uri: `${Config.REACT_APP_API_SERVER}/logo.png`,}
                } />),
                tabBarIcon: ({ color }) => (<Icon name="home" size={21} color={color} />
                )
            }} /> 
            */}
            <Tab.Screen name="醫生" component={DoctorStacks}
                options={{
                    headerShown: false, tabBarLabel: '醫生',
                    tabBarIcon: ({ color }) => (<Icon name="search" size={21} color={color} />),
                }}
            />
            <Tab.Screen name="預約Tab" component={isLogin ? ResRecordStacks : LoginStacks} options={{ headerShown: false, tabBarLabel: '預約', tabBarIcon: ({ color }) => (<Icon name="calendar" size={22} color={color} />) }} />
            <Tab.Screen name="我的資料" component={isLogin ? MyInfoStacks : LoginStacks} options={{ headerShown: false, tabBarLabel: '我的', tabBarIcon: ({ color }) => (<Icon name="user-circle-o" size={22} color={color} />) }} />
        </Tab.Navigator>
    )
}
