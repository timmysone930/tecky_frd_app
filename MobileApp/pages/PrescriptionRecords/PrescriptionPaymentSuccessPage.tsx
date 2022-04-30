import React from 'react'
import { View, Text, SafeAreaView, StyleSheet, TouchableOpacity, Dimensions, } from 'react-native';
// import icon
import Icon from 'react-native-vector-icons/FontAwesome';

const windowHeight = Dimensions.get('window').height;

export const PrescriptionPaymentSuccessPage = (props: any) => {
    // white background
    const backgroundStyle = {
        backgroundColor: 'white',
    };
    // Fake status (for development only )
    const rosterStatus = true;

    return (
        <SafeAreaView style={[backgroundStyle, { flex: 1 }]}>
            <View style={{ paddingTop: windowHeight * (1 / 7) }}>
                {rosterStatus ?
                    <>
                        <View style={{ marginTop: 20 }}>
                            <Icon name="check-circle" size={100} color="#325C80" style={{ textAlign: 'center', marginBottom: 18 }} />
                            <Text style={[styles.subTitle]}>付款完成</Text>
                        </View>
                        <View style={{ marginTop: 20, }}>
                            <Text style={[styles.contentText]}>藥單編號：RM220319001</Text>
                            <Text style={[styles.contentText]}>收據已發送到你的電郵</Text>
                            <TouchableOpacity style={styles.button} onPress={() => props.navigation.navigate({ name: '藥單記錄表' })}>
                                <Text style={styles.buttonText}>返回</Text></TouchableOpacity>
                        </View>
                    </>
                    :
                    <>
                        <View style={{ marginTop: 20 }}>
                            <Icon name="info-circle" size={100} color="red" style={{ textAlign: 'center', marginBottom: 18 }} />
                            <Text style={[styles.subTitle]}>付款失敗</Text>
                        </View>
                        <View style={{ marginTop: 20, }}>
                            <Text style={[styles.contentText]}>請重新付款</Text>
                            <TouchableOpacity style={styles.button} onPress={() => props.navigation.navigate({ name: '藥單記錄表' })}>
                                <Text style={styles.buttonText}>返回</Text></TouchableOpacity>
                        </View>
                    </>

                }

            </View>
        </SafeAreaView>
    )
}


const styles = StyleSheet.create({
    subTitle: {
        color: '#225D66',
        fontSize: 26,
        fontWeight: '900',
        marginTop: 10,
        marginBottom: 15,
        textAlign: 'center',
    },
    contentText: {
        color: '#3B3B3B',
        marginVertical: 10,
        fontSize: 20,
        fontWeight: '500',
        marginTop: 8,
        marginBottom: 15,
        textAlign: 'center',
    },
    button: {
        backgroundColor: '#6d7f99',
        paddingVertical: 16,
        marginHorizontal: 40,
        marginTop: 20,
        borderRadius: 4,
    },
    buttonText: {
        color: 'white',
        textAlign: 'center',
        fontSize: 16,
    },

});