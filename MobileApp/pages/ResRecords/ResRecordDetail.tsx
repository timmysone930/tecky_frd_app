import React, { useEffect, useState, useRef } from 'react';
import { View, Text, SafeAreaView, ScrollView, TouchableOpacity, Linking } from 'react-native';
import { useGetOneDoctorQuery } from '../../API/DoctorAPI';
import { SpinnerComponent } from '../../components/utils/SpinnerComponent';
import { BottomLineComponent } from '../../components/utils/BottomLineComponent';
import { styles } from '../../styles/GeneralStyles';

// API
import { useGetReservationListQuery } from '../../API/PatientAPI';
import Config from 'react-native-config';
import { requestOneTimePayment } from 'react-native-paypal';
import { store } from '../../redux/store';
import { checkRosterStatus } from '../../redux/PaymentSlice';
import { usePostNewPaymentMutation } from '../../API/PaymentAPI';
import { useToast } from 'native-base';
import { setNotification } from '../Reservation/ResPaymentConfirmPage';
import { useSelector } from 'react-redux';

const rowTitleArr = ['預約編號：', '預約醫生：', '預約日期：', '預約時間：']
enum ButtonText {
    start = "開始診症",
    finish = "診症完成",
    cancel = "已取消",
    outOfTime = "現時不在預約時間段"
}
// white background
const backgroundStyle = { backgroundColor: 'white', };

export const ResRecordDetail = (props: any, { navigation }: any) => {

    const toast = useToast()
    const userToken = useSelector((state: any) => state.getUserStatus.token);
    const init = {
        headers:{
            "Authorization":`Bearer ${userToken}`,
        }
    };
    // To get the param passing from the previous screen
    const { resCode, docCode, data } = props.route.params;
    // to Get user code
    const userCode = useSelector((state: any) => state.getUserStatus.member_code);

    const [reservationData, setReservationData] = useState(data.item)

    let recordData = useGetReservationListQuery();
    // get doctor name
    const docData = useGetOneDoctorQuery({docCode:docCode, token:userToken});
    // console.log('docData',docData)
    let rowCellArr: [string, string, string, string];
    if (docData.isSuccess) {
        rowCellArr = [resCode, docData.data[0].name, data.item.res_date, data.item.res_time.substring(0, 5)]
    }

    const isInRange = (value: any, range: any) => {
        return value >= range[0] && value <= range[1];
    }

    const intervalId = useRef(null as any)

    const time = useRef(null as any)
    const [buttonText, setButtonText] = useState(ButtonText.outOfTime)

    useEffect(() => {
        time.current = new Date()
        // time.current.setUTCHours(time.current.getUTCHours() + 8)
        // current date
        const year = time.current.getFullYear()
        const month = time.current.getMonth() + 1
        const date = time.current.getDate()
        // current time 
        const fullDate = `${year}-${month < 10 ? (`0` + month) : month}-${date < 10 ? (`0` + date) : date}`

        let hours = time.current.getHours()
        let mins = time.current.getMinutes()
        // current fulltime 
        let currentFullTime = `${hours}:${mins < 10 ? (`0` + mins) : mins}`

        // reservation time
        const resFullDate = data.item.res_date
        const resHours = parseInt(data.item.res_time.split(":")[0])
        const resMins = parseInt(data.item.res_time.split(":")[1]) - 5

        // reservation end time
        let resEndHours: number = resHours
        let resEndMins: number = resMins + 30
        if (resEndMins >= 60) {
            resEndHours += 1
            resEndMins -= 60
        }
        // reservation time range
        const resStart = `${resHours}:${resMins < 10 ? (`0` + resMins) : resMins}`
        const resEnd = `${resEndHours}:${resEndMins < 10 ? (`0` + resEndMins) : resEndMins}`

        // Check if current time in the time range
        const range = [resStart, resEnd];
        console.log(rowCellArr[0]);
        console.log(currentFullTime, range);
        console.log(reservationData);
        if (reservationData.status == 'booked' &&
            reservationData.video_url == null &&
            fullDate == resFullDate &&
            isInRange(currentFullTime, range)) {
            // enable the button
            setButtonText(ButtonText.start)
            // Start Fetching every mins
            intervalId.current = setInterval(async () => {
                // refetching
                const getURL = await fetch (`${Config.REACT_APP_API_SERVER}/reserve/video/${rowCellArr[0]}`, init)
                const url = getURL.status == 200 ? (await getURL.json()).video_url : null

                setReservationData({...reservationData, video_url: url})

                // Get current time
                time.current = new Date()
                time.current.setUTCHours(time.current.getUTCHours() + 8)
                hours = time.current.getHours()
                mins = time.current.getMinutes()
                // current fulltime 
                currentFullTime = `${hours}:${mins < 10 ? (`0` + mins) : mins}`

                if (!isInRange(currentFullTime, range)) {
                    clearInterval(intervalId.current)
                }
            }, 60000)
        } else if (reservationData.status == 'booked' &&
                    reservationData.video_url != null &&
                    fullDate == resFullDate &&
                    isInRange(currentFullTime, range)) {
            setButtonText(ButtonText.start)
        } else if (reservationData.status == 'cancel') {
            setButtonText(ButtonText.cancel)
        } else if (reservationData.status == 'finish') {
            setButtonText(ButtonText.finish)
        } else {
            setButtonText(ButtonText.outOfTime)
        }
        return () => clearInterval(intervalId.current)
    }, [navigation])

    // redirect to paypal
    const redirectPaypal = async () => {
        try {  // For one time payments
            const { nonce, payerId, email, firstName, lastName, phone } = await requestOneTimePayment(
                `${Config.PAYPAL}`
                , {
                    amount: `${Config.Res_code}`, // required
                    currency: 'HKD',
                    localeCode: 'zh_HK',
                    shippingAddressRequired: false,
                    userAction: 'commit', // display 'Pay Now' on the PayPal review page
                    intent: 'authorize',
                }
            );
            return { status: 'success', data: { 'nonce': nonce, 'payerId': payerId, 'email': email, "firstName": firstName, "lastName": lastName, "phone": phone } }
        } catch (error) {
            console.error(error);
            console.log('error' + JSON.stringify(error));
            return { status: 'error', data: { error } }
        }
    }
    // create payment 
    const [postNewPayment] = usePostNewPaymentMutation()
    console.log('reservationData',reservationData.session_id)
    // paypal
    const onClickPaypal = async () => {
        toast.show({
            description: "載入中"
        })
        const paypalRes = await redirectPaypal();

        if (paypalRes.status === 'success') {
            toast.show({
                description: "付款成功"
            })
            // create payment table
            let paymentData = { "gateway": "paypal", "payment_id": paypalRes.data.nonce, "amount": `${Config.Res_code}`, "payment_status": true, "type": "reservation", "payment_type": "paypal", "res_code": reservationData.res_code, "session_id": reservationData.session_id }
            const paymentRes: any = await postNewPayment({data:paymentData, token:userToken})
            console.log('paymentRes', paymentRes)
            let time = parseInt(data.item.res_time.replace(':', ''), 10)
            if(time % 100 - 10 < 0){
                time = time - 50 
            }else {
                time = time -10
            }
            let pushTime = `${time.toString().substring(0,2)}:${time.toString().substring(2, 4)}`
            setNotification(reservationData.res_date, userCode, pushTime, reservationData.res_code, userToken)
            props.navigation.navigate({ name: '預約記錄' })
        } else {
            toast.show({
                description: "付款失敗"
            })
        }

    }


    return (
        <SafeAreaView style={[backgroundStyle, { flex: 1 }]}>
            <ScrollView
                contentInsetAdjustmentBehavior="automatic"
                style={{ backgroundColor: 'white', marginBottom: 2, marginLeft: 5 }}
            >
                {/* Info */}
                <Text style={[styles.subTitle, styles.mv_10, { paddingTop: 25, paddingHorizontal: 15 }]}>應診提示</Text>
                <Text style={styles.greyInfoText}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce sit amet est ipsum. Nullam sagittis eu elit nec porta. Nulla sollicitudin magna non
                    purus auctor malesuada.
                </Text>
                <BottomLineComponent />
                {docData.isLoading && <SpinnerComponent />}
                {docData.isSuccess &&
                    rowTitleArr.map((item, idx) => (
                        <View style={[backgroundStyle, styles.flexRow, { marginBottom: 1, marginHorizontal: 15 }]} key={`confirm_row_${idx}`}>
                            <View style={{ flex: 1.3 }}><Text style={styles.rowTitle}>{item}</Text></View>
                            <View style={{ flex: 3 }}><Text style={styles.rowCellText}>{rowCellArr[idx]}</Text></View>
                        </View>
                    ))
                }
                {reservationData.status !== 'finish' ?
                    <TouchableOpacity
                        disabled={buttonText == ButtonText.start ? false : true}
                        style={buttonText == ButtonText.start ? styles.fullButton : styles.disableButton}
                        onPress={() => Linking.openURL(reservationData.video_url)}
                    >
                        <Text style={styles.buttonText}>{buttonText}</Text></TouchableOpacity> :
                    null}
                {reservationData.status === 'cancel' ? <Text style={[styles.warning, styles.textCenter, { marginVertical: 20, }]}>* 請聯絡客服了解預約詳情</Text> : null}
                {reservationData.payment === null &&
                    <>
                        <TouchableOpacity style={styles.fullButton} onPress={onClickPaypal}>
                            <Text style={styles.buttonText}>進行付款</Text></TouchableOpacity>
                        <Text style={[styles.warning, styles.textCenter, { marginVertical: 10, }]}>*請於創建預約後十五分鐘內付款，否則預約會被取消</Text>
                    </>
                }
            </ScrollView>
        </SafeAreaView>
    )
}