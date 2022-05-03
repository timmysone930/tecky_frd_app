import React from 'react'
import { View, Text, SafeAreaView, StyleSheet, TouchableOpacity, Dimensions, } from 'react-native';
// import icon
import Icon from 'react-native-vector-icons/FontAwesome';
import { useSelector } from 'react-redux';

const windowHeight = Dimensions.get('window').height;

export const ConfirmPaymentPage = (props: any) => {
    // white background
    const backgroundStyle = {
        backgroundColor: 'white',
    };
    // Fake status (for development only )
    // const rosterStatus = true;
    const rosterStatus = useSelector((state: any) => state.getPaymentStatus);

    return (
        <SafeAreaView style={[backgroundStyle, { flex: 1 }]}>
            <View style={{ paddingTop: windowHeight * (1 / 7) }}>
                {rosterStatus.paymentRoster ?
                    <>
                        <View style={{ marginTop: 20 }}>
                            <Icon name="check-circle" size={100} color="#325C80" style={{ textAlign: 'center', marginBottom: 18 }} />
                            <Text style={[styles.subTitle]}>預約確認</Text>
                        </View>
                        <View style={{ marginTop: 20, }}>
                            <Text style={[styles.contentText]}>預約編號：R20220425001</Text>
                            <Text style={[styles.contentText]}>收據已發送到你的電郵</Text>
                            <TouchableOpacity style={styles.button} onPress={() => props.navigation.navigate({ name: '搜尋醫生' })}>
                                <Text style={styles.buttonText}>返回</Text></TouchableOpacity>
                        </View>
                    </>
                    :
                    <>
                        <View style={{ marginTop: 20 }}>
                            <Icon name="info-circle" size={100} color="red" style={{ textAlign: 'center', marginBottom: 18 }} />
                            <Text style={[styles.subTitle]}>預約失敗</Text>
                        </View>
                        <View style={{ marginTop: 20, }}>
                            <Text style={[styles.contentText]}>該時段已滿</Text>
                            <Text style={[styles.contentText]}>請重新選擇時段</Text>
                            <TouchableOpacity style={styles.button} onPress={() => props.navigation.navigate({ name: '預約醫生' })}>
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