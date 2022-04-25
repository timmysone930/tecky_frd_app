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


// Bottom Tabs
const Tab = createBottomTabNavigator();

export const Tabs = () => {
  return (
    <Tab.Navigator initialRouteName="主頁" screenOptions={{ headerStyle: { backgroundColor: '#245C84' }, headerTintColor: 'white' }}>
      <Tab.Screen name="主頁" component={Home} options={{
        headerStyle: { backgroundColor: 'white' },
        headerTitle: () => (<Image style={{ width: 80, height: 40 }} source={require("../images/logo.png")} />),
        tabBarIcon: ({ color }) => (<Image style={{ tintColor: color, width: 19 }} resizeMode="contain" source={require("../images/icons/house-door.png")} />)
      }} />
      <Tab.Screen name="醫生" component={DoctorStacks}
      options={{headerShown: false,tabBarLabel: '醫生', 
      tabBarIcon:({color})=>(<Image style={{ tintColor:color, width:19}} resizeMode="contain" source={require("../images/icons/search.png")} />),
    }} 
      />
      <Tab.Screen name="預約Tab" component={ResRecordStacks} options={{headerShown:false,tabBarLabel: '預約', tabBarIcon: ({ color }) => (<Image style={{ tintColor: color, width: 19 }} resizeMode="contain" source={require("../images/icons/calendar.png")} />) }} />
      <Tab.Screen name="我的資料" component={MyInfoStacks} options={{headerShown: false, tabBarLabel: '我的', tabBarIcon: ({ color }) => (<Image style={{ tintColor: color, width: 19 }} resizeMode="contain" source={require("../images/icons/person-circle.png")} />) }} />
    </Tab.Navigator>
  )
}
