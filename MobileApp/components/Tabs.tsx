import React from 'react'

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import {
  Image
} from 'react-native';

// pages && components
import { Home } from '../pages/Home';
import { DoctorStacks } from '../Stack/DoctorStack';
import { MyInfoStacks } from '../Stack/MyInfoStack';
import { ResRecordStacks } from '../Stack/ResRecordStack';
import { useSelector } from 'react-redux';
import { LoginStacks } from '../Stack/LoginStack';

// import icon for FontAwesome
import Icon from 'react-native-vector-icons/FontAwesome';

// Bottom Tabs
const Tab = createBottomTabNavigator();

export const Tabs = () => {
  
  // get user status
  const isLogin = useSelector((state: any) => state.getUserStatus.isLogin);
  return (
    <Tab.Navigator initialRouteName="主頁" screenOptions={{ headerStyle: { backgroundColor: '#245C84' }, headerTintColor: 'white', headerTitleAlign: 'center' }}>
      <Tab.Screen name="主頁" component={Home} options={{
        headerStyle: { backgroundColor: 'white' },
        headerTitle: () => (<Image style={{ width: 80, height: 40 }} source={require("../images/logo.png")} />),
        tabBarIcon: ({ color }) => (<Icon name="home" size={22} color={color} />
        )
      }} />
      <Tab.Screen name="醫生" component={DoctorStacks}
        options={{
          headerShown: false, tabBarLabel: '醫生',
          tabBarIcon: ({ color }) => (<Icon name="search" size={22} color={color} />),
        }}
      />
      <Tab.Screen name="預約Tab" component={isLogin? ResRecordStacks: LoginStacks} options={{headerShown: false, tabBarLabel: '預約', tabBarIcon: ({ color }) => (<Icon name="calendar" size={22} color={color} />) }} /> 
      <Tab.Screen name="我的資料" component={MyInfoStacks} options={{ headerShown: false, tabBarLabel: '我的', tabBarIcon: ({ color }) => (<Icon name="user-circle-o" size={22} color={color} />) }} />
    </Tab.Navigator>
  )
}
