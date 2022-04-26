import React from 'react'
import { View, Text, SafeAreaView, ScrollView } from 'react-native'

export const ResSuccessPage = () => {
    // white background
    const backgroundStyle = {
        backgroundColor: 'white',
    };
    return (
        <SafeAreaView style={[backgroundStyle, { flex: 1 }]}>
            <ScrollView contentInsetAdjustmentBehavior="automatic" style={{ backgroundColor: 'white' }}>
                <View><Text>HI</Text></View>
            </ScrollView>
        </SafeAreaView>
    )
}
