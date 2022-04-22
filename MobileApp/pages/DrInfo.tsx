import React from 'react'
import { View, Text } from 'react-native';
// Need to be removed; only for testing
import { FakeDrDATA } from './DrList';

export const DrInfo: React.FC = (props: any) => {
    // To get the FlatList data id
    const { id } = props.route.params;
    // Need to be removed; only for testing(will be replaced by fetch)
    let fakeData:any = {}
    {FakeDrDATA.map((item) => {
        if (item['id'] === id) {
            fakeData = item
        }
    }
    )}
    return (
        <View>
            <Text>
                {fakeData['id']}
            </Text>
            <Text>
                
            </Text>
        </View>
    )
}
