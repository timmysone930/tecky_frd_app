import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { UserAddressPage } from '../pages/Address/UserAddressPage';
import { EditAddressPage } from '../pages/Address/EditAddressPage';

const UserAddressStack = createStackNavigator();

export const UserAddressStacks = () => {
    return (
        <UserAddressStack.Navigator screenOptions={{ headerStyle: { backgroundColor: '#245C84' }, headerTintColor: 'white', headerTitleAlign: 'center' }} >
            <UserAddressStack.Screen name="我的地址" component={UserAddressPage} options={{ headerShown: true }} />
            <UserAddressStack.Screen name="編輯地址" component={EditAddressPage} options={{ headerShown: true }} />
        </UserAddressStack.Navigator>
    )
}