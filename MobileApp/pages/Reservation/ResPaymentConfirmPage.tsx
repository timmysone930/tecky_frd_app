import React from 'react'
import { View, Text, SafeAreaView, TouchableOpacity, Dimensions, } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useSelector } from 'react-redux';
import {styles} from '../../styles/DoctorStyle'
const windowHeight = Dimensions.get('window').height;
// white background
const backgroundStyle = { backgroundColor: 'white',};

export const ResPaymentConfirmPage = (props: any) => {
    const rosterStatus = useSelector((state: any) => state.getPaymentStatus);

    return (
        <SafeAreaView style={[backgroundStyle, { flex: 1 }]}>
            <View style={{ paddingTop: windowHeight * (1 / 7) }}>
                {rosterStatus.paymentRoster === 'true' &&
                    <>
                        <View style={{ marginTop: 20 }}>
                            <Icon name="check-circle" size={100} color="#325C80" style={{ textAlign: 'center', marginBottom: 18 }} />
                            <Text style={[styles.subTitle]}>預約確認</Text>
                        </View>
                        <View style={{ marginTop: 20, }}>
                            <Text style={[styles.contentText]}>預約編號：{props.route.params.resCode}</Text>
                            <Text style={[styles.contentText]}>收據已發送到你的電郵</Text>
                            <TouchableOpacity style={styles.button} onPress={() => props.navigation.navigate({ name: '搜尋醫生' })}>
                                <Text style={styles.buttonText}>返回</Text></TouchableOpacity>
                        </View>
                    </>
                }
                {rosterStatus.paymentRoster === 'false' &&
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
                {rosterStatus.paymentRoster === 'booked' &&
                    <>
                        <View style={{ marginTop: 20 }}>
                            <Icon name="info-circle" size={100} color="red" style={{ textAlign: 'center', marginBottom: 18 }} />
                            <Text style={[styles.subTitle]}>預約失敗</Text>
                        </View>
                        <View style={{ marginTop: 20, }}>
                            <Text style={[styles.contentText]}>你已有預約記錄</Text>
                            <Text style={[styles.contentText]}>如有疑問，請與相關職員聯絡</Text>
                            <TouchableOpacity style={styles.button} onPress={() => props.navigation.navigate({ name: '醫生' })}>
                                <Text style={styles.buttonText}>返回</Text></TouchableOpacity>
                        </View>
                    </>
                }
                {rosterStatus.paymentRoster === 'error' &&
                    <>
                        <View style={{ marginTop: 20 }}>
                            <Icon name="info-circle" size={100} color="red" style={{ textAlign: 'center', marginBottom: 18 }} />
                            <Text style={[styles.subTitle]}>預約失敗</Text>
                        </View>
                        <View style={{ marginTop: 20, }}>
                            <Text style={[styles.contentText]}>系統出現錯誤</Text>
                            <Text style={[styles.contentText]}>請與相關職員聯絡</Text>
                            <TouchableOpacity style={styles.button} onPress={() => props.navigation.navigate({ name: '醫生' })}>
                                <Text style={styles.buttonText}>返回</Text></TouchableOpacity>
                        </View>
                    </>
                }
            </View>
        </SafeAreaView>
    )
}