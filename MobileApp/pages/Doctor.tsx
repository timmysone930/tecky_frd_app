import React from 'react'

import {
    SafeAreaView,
    ScrollView,
} from 'react-native';

import { DrTypeCard } from '../components/doctor/DrTypeCard';

export const Doctor = (props:any) => {
    const backgroundStyle = {
        backgroundColor:'white',
    };
    return (
        <SafeAreaView style={[backgroundStyle, { flex: 1 }]}>
                <ScrollView contentInsetAdjustmentBehavior="automatic" style={backgroundStyle}>
                    {/* Card component */}
                    <DrTypeCard props={props}/>
                </ScrollView>

        </SafeAreaView>
    )
}
