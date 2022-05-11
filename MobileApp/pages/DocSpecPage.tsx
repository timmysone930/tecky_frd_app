import React from 'react'
import {SafeAreaView,ScrollView,} from 'react-native';
import { DocSpecCardComponent } from '../components/doctor/DocSpecCardComponent';

export const DocSpecPage = (props:any) => {
    // Set background to white
    const backgroundStyle = {backgroundColor:'white',};
    return (
        <SafeAreaView style={[backgroundStyle, { flex: 1 }]}>
                <ScrollView contentInsetAdjustmentBehavior="automatic" style={backgroundStyle}>
                    {/* Card component */}
                    <DocSpecCardComponent props={props}/>
                </ScrollView>
        </SafeAreaView>
    )
}
