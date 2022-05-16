import React from 'react'
import { View, Text, SafeAreaView, ScrollView, TouchableOpacity, Image, Platform } from 'react-native';
import Config from 'react-native-config';
import { RadioButton } from 'react-native-paper';
import { useSelector } from 'react-redux';
import { useGetReservedSessionByIdQuery, useGetRosterByIdQuery } from '../../API/DoctorAPI';
import { usePostPatientRegisterMutation, usePostPatientReservationMutation, usePutEnableSessionMutation, usePutHoldSessionMutation } from '../../API/PatientAPI';
import { checkRosterStatus } from '../../redux/PaymentSlice';
import { store } from '../../redux/store';
import { requestOneTimePayment } from 'react-native-paypal';
import { useToast } from 'native-base';
import { usePostNewPaymentMutation } from '../../API/PaymentAPI';
import { setMemberCode } from '../../redux/slice';
import { styles } from '../../styles/GeneralStyles'
// white background
const backgroundStyle = {backgroundColor: 'white',};

export const PaymentPage = (props: any) => {
    const toast = useToast()
    // Radio Button
    const [radioValue, setRadioValue] = React.useState('PayPal');
    // get form data
    const formData = useSelector((state: any) => state.getFormData);
    // selected doctor id
    const docInfo = useSelector((state: any) => state.setDoctorID);
    // roster session
    const rosterSession = useGetReservedSessionByIdQuery(formData.reservedSession);
    // to get clinic code from roster table 
    const rosterClinicCode = useGetRosterByIdQuery(formData.reservedTime);
    // convert date to server date
    let convertedDate = formData.reservedDate.substring(0, 10)
    // Register
    const [postPatientRegister] = usePostPatientRegisterMutation();
    const submitData = new FormData();
    // Reservation 
    const [postPatientReservation] = usePostPatientReservationMutation();
    // to enable the select session
    const [putEnableSession] = usePutEnableSessionMutation()
    // to holde session
    const [putHoldSession] = usePutHoldSessionMutation();
    // create payment 
    const [postNewPayment] = usePostNewPaymentMutation()
    // redirect to paypal
    const redirectPaypal = async () => {
        try {  // For one time payments
            const { nonce, payerId, email, firstName, lastName, phone } = await requestOneTimePayment(
                `${Config.PAYPAL}`
                , {
                    amount: `100`, // required
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

    // submit
    const onPress = async () => {
        if (rosterSession.isSuccess) {
            if (rosterSession.currentData === []) {
                // selected session not enable
                store.dispatch(checkRosterStatus({ paymentRoster: 'false' }))
                store.dispatch(setMemberCode({ memberCode: '' }))
                props.navigation.navigate({ name: '預約確認' })
            } else {
                // selected session are available
                toast.show({
                    description: "載入中"
                })
                // hold session
                const holdRes = await putHoldSession(formData.reservedSession)
                // non member
                if (formData.memberCode === '') {
                    // create member
                    submitData.append('hkid', formData.idNumber)
                    submitData.append('id_doc_type', formData.idType)
                    submitData.append('name', formData.name)
                    submitData.append('name_en', formData.name_en)
                    submitData.append('alt_contact', formData.EmergencyContactName)
                    submitData.append('alt_phone', formData.EmergencyContactPhone)
                    submitData.append('gender', formData.title)
                    submitData.append('email', formData.email)
                    submitData.append('phone', formData.phone)
                    submitData.append('birthday', formData.bDay)
                    submitData.append('hkid_img', formData['idImg'])
                    const res: any = await postPatientRegister(submitData)
                    if (res.error) {
                        console.log('member', res.error)
                        store.dispatch(checkRosterStatus({ paymentRoster: 'error' }))
                        store.dispatch(setMemberCode({ memberCode: '' }))
                        props.navigation.navigate({ name: '預約確認' })
                        return
                    }
                }
                // member
                // reservation data
                let resData = {
                    'patient_hkid': formData.idNumber, 'doc_code': docInfo.id, 'res_date': convertedDate, 'res_time': `${rosterSession.data.start_at}:00`, 'res_type': 'online', 'cli_code': rosterClinicCode.data[formData.reservedDate][0]['clinic_code'],
                    'status': 'booked', 'video_url': null, 'is_follow_up': true, 'channel': 'null', 'declare': {
                        "isLeave": formData.leaveHK, "location": formData.Countries, "date_back": formData.backDate,
                        "isFever": formData.isFever, "isCought": formData.isCough, "isVomit": formData.isVomit, "isCold": formData.isCold
                    }
                }
                // create reservation table
                try {
                    const reservationRes: any = await postPatientReservation(resData)
                    if (reservationRes?.data) {
                        // payment
                        const paypalRes = await redirectPaypal();
                        if (paypalRes.status === 'success') {
                            toast.show({
                                description: "付款成功"
                            })
                            // create payment table
                            let paymentData = { "gateway": "paypal", "payment_id": paypalRes.data.nonce, "amount": 100, "payment_status": true, "type": "reservation", "payment_type": "paypal", "res_code": reservationRes.data, "session_id": formData.reservedSession }
                            const paymentRes: any = await postNewPayment(paymentData)
                            console.log('paymentRes', paymentRes)
                            store.dispatch(checkRosterStatus({ paymentRoster: 'true' }))
                            store.dispatch(setMemberCode({ memberCode: '' }))
                            props.navigation.navigate({ name: '預約確認', params: { 'resCode': reservationRes.data, 'res_date':convertedDate,'res_time':`${rosterSession.data.start_at}`  } })
                        } else {
                            toast.show({
                                description: "付款失敗"
                            })
                            // enable the session 
                            const enableRes = await putEnableSession(formData.reservedSession)
                            console.log('enalbeResult', enableRes)
                            store.dispatch(checkRosterStatus({ paymentRoster: 'false' }))
                            store.dispatch(setMemberCode({ memberCode: '' }))
                            props.navigation.navigate({ name: '預約確認' })
                        }

                    } else if (reservationRes.error.data.message === "This patient already have resrvation.") {
                        toast.show({
                            description: "已有預約記錄，無法再次預約"
                        })
                        // enable the session 
                        const enableRes = await putEnableSession(formData.reservedSession)
                        console.log('enalbeResult', enableRes)
                        store.dispatch(checkRosterStatus({ paymentRoster: 'booked' }))
                        store.dispatch(setMemberCode({ memberCode: '' }))
                        props.navigation.navigate({ name: '預約確認' })
                    }
                } catch (err) {
                    console.log(err)
                }
            }
        }
    }

    return (
        <SafeAreaView style={[backgroundStyle, { flex: 1 }]}>
            <ScrollView contentInsetAdjustmentBehavior="automatic" style={{ backgroundColor: 'white', marginBottom: 2, marginLeft: 5 }}>
                <View>
                    <Text style={[styles.subTitle, styles.mv_15,styles.ph_10,styles.pv_10,{marginLeft:5}]}>問診費用：$ 100</Text>
                    <Text style={[styles.warning, styles.ph_10, styles.mb_10]}>如在三十分鐘內沒有完成交易，系統會視之為逾期，客户需重新進行預約</Text>
                </View>
                <RadioButton.Group onValueChange={value => { setRadioValue(value) }} value={radioValue}>
                    <TouchableOpacity style={{ flexDirection: 'row', justifyContent: 'flex-start' }} onPress={() => setRadioValue("PayPal")}>
                        <RadioButton.Item label="" value="PayPal" mode='android' color='#6d7f99' style={{ paddingTop: 30 }} />
                        <Image style={{ width: 200, height: 100, }} resizeMode="contain" resizeMethod="scale" source={{ uri: `${Config.REACT_APP_API_SERVER}/logo_PayPal.png`, }} />
                    </TouchableOpacity>
                </RadioButton.Group>
            </ScrollView>
            {/* Button to go back and next page */}
            <View style={{ flexDirection: 'row' }}>
                <TouchableOpacity style={styles.button} onPress={() => props.navigation.navigate({ name: '醫生' })}>
                    <Text style={styles.buttonText}>返回主頁</Text></TouchableOpacity>
                <TouchableOpacity style={[styles.button, { backgroundColor: '#325C80' }]} onPress={onPress}>
                    <Text style={styles.buttonText}>下一步</Text></TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}