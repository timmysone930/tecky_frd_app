
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// pages && components
import { Home } from './pages/Home';
import { Doctor } from './pages/Doctor';

import {
  Image
} from 'react-native';
import { DrList } from './pages/DrList';
import { Tabs } from './components/Tabs';

const Stack = createStackNavigator();
// const Tab = createBottomTabNavigator();

// const DoctorStack = createStackNavigator();

// const DoctorStacks = ()=>{
//     return(
//         <DoctorStack.Navigator initialRouteName='搜尋醫生' >
//         <DoctorStack.Screen name="搜尋醫生" component={Doctor} options={{ headerShown: false }} />
//         <DoctorStack.Screen name="DrList" component={DrList} />
//       </DoctorStack.Navigator>
//     )
// }

// const Tabs = () => {
//   return (
//     <Tab.Navigator initialRouteName="主頁" screenOptions={{ headerStyle: { backgroundColor: '#245C84' }, headerTintColor: 'white'}}>
//       <Tab.Screen name="主頁" component={Home} options={{ headerStyle: { backgroundColor: 'white'}, 
//       headerTitle: () => (<Image  style={{ width: 80, height:40}} source={require("./images/logo.png")} />), 
//       tabBarIcon:({color})=>(<Image style={{ tintColor:color, width:19}} resizeMode="contain" source={require("./images/icons/house-door.png")} />)
//       }} />
//       <Tab.Screen name="搜尋醫生1" component={DoctorStacks} options={{ tabBarLabel: '醫生', tabBarIcon:({color})=>(<Image style={{ tintColor:color, width:19}} resizeMode="contain" source={require("./images/icons/search.png")} />) }} />
//       <Tab.Screen name="預約詳情" component={Doctor} options={{ tabBarLabel: '預約',  tabBarIcon:({color})=>(<Image style={{ tintColor:color, width:19}} resizeMode="contain" source={require("./images/icons/calendar.png")} />) } } />
//       <Tab.Screen name="我的資料" component={Doctor} options={{ tabBarLabel: '我的', tabBarIcon:({color})=>(<Image style={{ tintColor:color, width:19}} resizeMode="contain" source={require("./images/icons/person-circle.png")} />)  }} />
//     </Tab.Navigator>
//   )
// }


const App = () => {

  return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName='Tabs' >
          <Stack.Screen name="Tabs" component={Tabs} options={{ headerShown: false }} />
          {/* <Stack.Screen name="DrList" component={DrList} /> */}
        </Stack.Navigator>
      </NavigationContainer>
  );
};



export default App;
