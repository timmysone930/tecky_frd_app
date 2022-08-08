import React from 'react'
import { View, Text, SafeAreaView, ScrollView, TouchableOpacity, Image, Platform } from 'react-native';
import Config from 'react-native-config';

import { styles } from '../../styles/GeneralStyles'

const backgroundStyle = { backgroundColor: 'white', };

export const ResPaymentBookingConfirmPage = (props: any) => {

    return (
        <SafeAreaView style={[backgroundStyle, { flex: 1 }]}>
            <ScrollView 
                contentInsetAdjustmentBehavior="automatic" 
                style={{ backgroundColor: 'white', marginBottom: 2, marginLeft: 5 }}
            >
                <Text>Hello</Text>
            </ScrollView>

            {/* Button to go back and next page */}
            <View style={{ flexDirection: 'row' }}>

                <TouchableOpacity 
                    style={styles.button} 
                    onPress={() => props.navigation.navigate({ name: '醫生' })}
                >
                    <Text style={styles.buttonText}>返回主頁</Text>
                </TouchableOpacity>

                <TouchableOpacity 
                    style={[styles.button, { backgroundColor: '#325C80' }]} 
   
                >
                    <Text style={styles.buttonText}>下一步</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}