import React from 'react'
import { View, Text, SafeAreaView, TouchableOpacity, Dimensions, } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useSelector } from 'react-redux';
import { styles } from '../../styles/DoctorStyle'
import Config from "react-native-config";
const windowHeight = Dimensions.get('window').height;
// white background
const backgroundStyle = { backgroundColor: 'white', };

// set One Signal notification
export const setNotification = async (res_date: string, userCode: string, pushTime: string, resCode:string, token:string) => {
    let data = {
        "app_id": `${Config.ONESIGNAL}`,
        "include_external_user_ids": [`${userCode}`],
        "channel_for_external_user_ids": "push",
        "headings": { "en": "預約提醒" },
        "contents": { "en": "你的視診預約將於十分鐘後開始" },
        "delayed_option": "timezone",
        "send_after": `${res_date} ${pushTime}:00 GMT+0800`,
        "delivery_time_of_day": `${pushTime}`
    }

    const res = await fetch('https://onesignal.com/api/v1/notifications', {
        method: 'POST',
        headers: {
            'Authorization': `Basic ${Config.OneSignal_REST_KEY}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    const json = await res.json();
    console.log('json', json.id)
    let submitData:any = { "res_code":resCode, "one_signal":json.id }
    console.log('submitData', submitData)
    await fetch(`${Config.REACT_APP_API_SERVER}/reserve/oneSignal`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            "Authorization": `Bearer ${token}`,
          },
        body: JSON.stringify(submitData)
    })
}



export const ResPaymentConfirmPage = (props: any) => {
    const rosterStatus = useSelector((state: any) => state.getPaymentStatus);
    const userCode = useSelector((state: any) => state.getUserStatus.member_code);
    const userToken = useSelector((state: any) => state.getUserStatus.token);

    if (rosterStatus.paymentRoster === 'true') {
        // To get the param passing from the previous screen
        const { resCode, res_date, res_time } = props.route.params;
        console.log('resCode', resCode)
        let time = parseInt(res_time.replace(':', ''), 10)
        if(time % 100 - 10 < 0){
            time = time - 50 
        }else {
            time = time -10
        }
        let pushTime = `${time.toString().substring(0,2)}:${time.toString().substring(2, 4)}`
        console.log(pushTime)
        setNotification(res_date, userCode, pushTime, resCode, userToken);
    }

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
                {rosterStatus.paymentRoster === 'full' &&
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
                {rosterStatus.paymentRoster === 'false' &&
                    <>
                        <View style={{ marginTop: 20 }}>
                            <Icon name="info-circle" size={100} color="red" style={{ textAlign: 'center', marginBottom: 18 }} />
                            <Text style={[styles.subTitle]}>付款失敗</Text>
                        </View>
                        <View style={{ marginTop: 20, }}>
                            <Text style={[styles.contentText]}>未能完成付款程序</Text>
                            <Text style={[styles.contentText, { fontSize: 14 }]}>請於創建預約後十五分鐘內付款，否則預約會被取消</Text>
                            <TouchableOpacity style={styles.button} onPress={() => props.navigation.navigate({ name: '醫生' })}>
                                <Text style={styles.buttonText}>返回</Text></TouchableOpacity>
                        </View>
                    </>
                }
            </View>
        </SafeAreaView>
    )
}