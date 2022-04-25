import React from 'react'
import { View, Text, SafeAreaView, ScrollView, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { RadioButton } from 'react-native-paper';

export const PaymentPage = (props: any) => {
    // white background
    const backgroundStyle = {
        backgroundColor: 'white',
    };
    // Radio Button
    const [radioValue, setRadioValue] = React.useState('PayPal');
    return (
        <SafeAreaView style={[backgroundStyle, { flex: 1 }]}>
            <ScrollView contentInsetAdjustmentBehavior="automatic" style={{ backgroundColor: 'white', marginBottom: 2, marginLeft: 5 }}>

                <View>
                    <Text style={[styles.subTitle, { paddingHorizontal: 15, paddingTop: 15, }]}>問診費用：$100.00</Text>
                </View>

                <RadioButton.Group onValueChange={value => { setRadioValue(value) }} value={radioValue}>
                    <TouchableOpacity style={{ flexDirection: 'row' ,justifyContent:'flex-start'}} onPress={()=>setRadioValue("PayPal")}>
                        <RadioButton.Item label="" value="PayPal" mode='android' color='#6d7f99' style={{paddingTop:30}}/>
                        <Image style={{ width: 200, height: 100, }} resizeMode="contain" resizeMethod="scale" source={require('../images/logo_PayPal.png')} />
                    </TouchableOpacity>
                </RadioButton.Group>

            </ScrollView>
            {/* Button to go back and next page */}
            <View style={{ flexDirection: 'row' }}>
                <TouchableOpacity style={styles.button} onPress={() => props.navigation.navigate({ name: '主頁' })}>
                    <Text style={styles.buttonText}>返回主頁</Text></TouchableOpacity>
                <TouchableOpacity style={[styles.button, { backgroundColor: '#325C80' }]}
                    onPress={() => props.navigation.navigate({ name: '預約確認' })}>
                    <Text style={styles.buttonText}>下一步</Text></TouchableOpacity>
            </View>

        </SafeAreaView>
    )
}


const styles = StyleSheet.create({
    subTitle: {
        color: '#225D66',
        fontSize: 17,
        fontWeight: '600',
        marginTop: 8,
        marginBottom: 15,
    },
    button: {
        width: '50%',
        backgroundColor: '#6d7f99',
        paddingVertical: 16,
    },
    buttonText: {
        color: 'white',
        textAlign: 'center',
        fontSize: 16,
    },
});