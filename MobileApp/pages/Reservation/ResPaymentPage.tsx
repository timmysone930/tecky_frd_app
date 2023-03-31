import React, { useEffect, useState } from 'react'
import { View, Text, SafeAreaView, ScrollView, TouchableOpacity, Image, Platform } from 'react-native';
import Config from 'react-native-config';
import { RadioButton } from 'react-native-paper';
import { useSelector } from 'react-redux';
import { useGetReservedSessionByIdQuery, useGetRosterByIdQuery } from '../../API/DoctorAPI';
import { usePostPatientRegisterMutation, usePostPatientReservationMutation, usePutEnableSessionMutation, usePutHoldSessionMutation } from '../../API/PatientAPI';
import { checkRosterStatus } from '../../redux/PaymentSlice';
import { store } from '../../redux/store';
import { useToast } from 'native-base';
import { usePostNewPaymentMutation } from '../../API/PaymentAPI';
import { setMemberCode } from '../../redux/slice';
import { styles } from '../../styles/GeneralStyles'
import { SpinnerComponent } from '../../components/utils/SpinnerComponent';
import { useStripe } from '@stripe/stripe-react-native';
import { useGetUserInfoQuery } from '../../API/UserInfoAPI';
// white background
const backgroundStyle = { backgroundColor: 'white', };

export const PaymentPage = (props: any) => {
    // get JWT token
    const userToken = useSelector((state: any) => state.getUserStatus.token);
    const userInfo = useSelector((state: any) => state.getUserInfo);
    const userData = useGetUserInfoQuery(userToken)


    const toast = useToast();

    // Radio Button
    const [radioValue, setRadioValue] = React.useState('stripe');
    // get form data
    const formData = useSelector((state: any) => state.getFormData);
    // selected doctor id
    const docInfo = useSelector((state: any) => state.setDoctorID);
    // to get clinic code from roster table 
    const rosterClinicCode = useGetRosterByIdQuery(formData.reservedTime);
    // Register
    const [postPatientRegister] = usePostPatientRegisterMutation();
    const submitData = new FormData();

    // roster session
    const rosterSession = useGetReservedSessionByIdQuery({ rosterId: formData.reservedSession, token: userToken });
    // Reservation 
    const [postPatientReservation] = usePostPatientReservationMutation();
    // to enable the select session
    const [putEnableSession] = usePutEnableSessionMutation()
    // to holde session
    const [putHoldSession] = usePutHoldSessionMutation();
    // create payment 
    const [postNewPayment] = usePostNewPaymentMutation()
    // submit disable
    const [submitStatus, setSubmitStatus] = React.useState(true);
    // redirect to paypal

    async function emailReceipt(res_code: string) {
        const email = await fetch(`${Config.REACT_APP_API_SERVER}/payment/receipt/reserve`, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${userToken}`,
                "Content-Type": 'application/json'
            },
            body: JSON.stringify({
                res_code: res_code
            })
        })

        console.log(email);
    }

    // stripe implementation

    console.log('HAHA', JSON.stringify(props));


    const { initPaymentSheet, presentPaymentSheet } = useStripe();
    const [loading, setLoading] = useState(false);
    const [paymentId, setPaymentId] = useState("")


    const fetchPaymentSheetParams = async () => {
        const response = await fetch(`${Config.REACT_APP_API_SERVER}/payment/payment-sheet`, {
            method: 'POST',
            body: JSON.stringify({
                "amount": docInfo.docData.video_diag_fee === 0 ? 0 : docInfo.docData.video_diag_fee || 9999,

                //    "amount": Array.isArray(prescriptionDetail.bill)?prescriptionDetail.bill[0].totel_amount+'':9999+'',

            }),
            headers: {
                'Content-Type': 'application/json',
            },
        });
        const { paymentIntent, ephemeralKey, customer, publishableKey } = await response.json();
        setPaymentId(paymentIntent)
        return {
            paymentIntent,
            ephemeralKey,
            customer,
            publishableKey
        };
    };

    const initializePaymentSheet = async () => {
        const {
            paymentIntent,
            ephemeralKey,
            customer,
            publishableKey,
        } = await fetchPaymentSheetParams();

        const { error } = await initPaymentSheet({
            merchantDisplayName: "Telemedicine",
            customerId: customer,
            customerEphemeralKeySecret: ephemeralKey,
            paymentIntentClientSecret: paymentIntent,
            // Set `allowsDelayedPaymentMethods` to true if your business can handle payment
            //methods that complete payment after a delay, like SEPA Debit and Sofort.
            allowsDelayedPaymentMethods: true,
            defaultBillingDetails: {
                name: userData.data.name_en,
            }
        });
        if (!error) {
            setLoading(true);
        }
    };

    // submit
    const onPress = async () => {
        setSubmitStatus(false)
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
            const res: any = await postPatientRegister(submitData);


            if (res.error) {
                console.log('member', res.error)
                store.dispatch(checkRosterStatus({ paymentRoster: 'error' }))
                store.dispatch(setMemberCode({ memberCode: '' }))
                props.navigation.navigate({ name: '預約確認' })
                return
            }

        }

        // refetch
        rosterSession.refetch();
        rosterClinicCode.refetch();

        // check session status
        if (rosterClinicCode.isSuccess) {

            if (rosterSession.currentData && Array.isArray(rosterSession.currentData) && rosterSession.currentData.length === 0) {
                // selected session not enable
                store.dispatch(checkRosterStatus({ paymentRoster: 'full' }))
                store.dispatch(setMemberCode({ memberCode: '' }))
                props.navigation.navigate({ name: '預約確認' })
            }
            else {
                try {
                    // hold session
                    const holdRes: any = await putHoldSession(formData.reservedSession)
                    console.log('holderes', holdRes)

                    if (holdRes !== undefined) {

                        if (holdRes.error && holdRes?.error.status === 400) {
                            store.dispatch(checkRosterStatus({ paymentRoster: 'full' }))
                            store.dispatch(setMemberCode({ memberCode: '' }))
                            props.navigation.navigate({ name: '預約確認' })
                        }
                        else if (holdRes.data && holdRes?.data.status === 'hold') {
                            // selected session are available
                            toast.show({
                                description: "載入中"
                            })

                            console.log(docInfo)

                            // member
                            // reservation data
                            let resData = {
                                'patient_hkid': formData.idNumber,
                                'doc_code': docInfo.id,
                                'res_date': formData.reservedDate,
                                'res_time': `${rosterSession.data.start_at}:00`,
                                'res_type': 'online',
                                'cli_code': rosterClinicCode.data[formData.reservedDate][0]['cli_code'],
                                'session_id': formData.reservedSession,
                                'status': 'booked',
                                'video_url': null,
                                'is_follow_up': true,
                                'channel': 'null',
                                'declare': {
                                    "isLeave": formData.leaveHK || false,
                                    "location": formData.Countries || "",
                                    "date_back": formData.backDate === '選擇日期' ? '' : formData.backDate,
                                    "isFever": formData.isFever || false,
                                    "isCought": formData.isCough || false,
                                    "isVomit": formData.isVomit || false,
                                    "isCold": formData.isCold || false
                                }
                            }

                            // create reservation data
                            const reservationRes: any = await postPatientReservation({
                                data: resData,
                                token: userToken
                            })

                            console.log(reservationRes?.data)

                            if (reservationRes?.data) {

                                // payment
                                // const paypalRes = await redirectPaypal(docInfo.docData.video_diag_fee+"" || "9999");
                                const { error } = await presentPaymentSheet();



                                // if (paypalRes.status === 'success') {
                                if (!error) {
                                    toast.show({
                                        description: "付款成功"
                                    })

                                    // create payment table
                                    // let paymentData = { 
                                    //     "gateway": "paypal", 
                                    //     "payment_id": paypalRes.data.nonce,
                                    //     "amount": paypalRes.data.payAmount,
                                    //     "payment_status": true,
                                    //     "type": "reservation",
                                    //     "payment_type": "paypal",
                                    //     "res_code": reservationRes.data,
                                    //     "session_id": formData.reservedSession,
                                    //     "deviceData": paypalRes.data.deviceData
                                    // }
                                    let paymentData = {
                                        "gateway": "stripe",
                                        "payment_id": paymentId,
                                        "amount": docInfo.docData.video_diag_fee === 0 ? 0 + '' : docInfo.docData.video_diag_fee + '' || 9999 + '',
                                        "payment_status": true,
                                        "type": "reservation",
                                        "payment_type": "stripe",
                                        "res_code": reservationRes.data,
                                        "session_id": formData.reservedSession,
                                    }
                                    const paymentRes: any = await postNewPayment({ data: paymentData, token: userToken })
                                    console.log('paymentRes', paymentRes)

                                    emailReceipt(reservationRes.data)

                                    store.dispatch(checkRosterStatus({ paymentRoster: 'true' }))
                                    store.dispatch(setMemberCode({ memberCode: '' }))

                                    props.navigation.navigate({
                                        name: '預約確認',
                                        params: {
                                            'resCode': reservationRes.data,
                                            'res_date': formData.reservedDate,
                                            'res_time': `${rosterSession.data.start_at}`
                                        }
                                    })

                                }
                                else {
                                    toast.show({
                                        description: "付款失敗"
                                    })

                                    store.dispatch(checkRosterStatus({ paymentRoster: 'false' }))
                                    store.dispatch(setMemberCode({ memberCode: '' }))
                                    props.navigation.navigate({ name: '預約確認' })
                                }
                            }
                            else if (reservationRes.error.data.message === "This patient already have resrvation.") {
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
                        }
                    }
                }
                catch (err) {
                    console.log(err)
                }
            }
        }
        else if (rosterClinicCode.isError) {
            store.dispatch(checkRosterStatus({ paymentRoster: 'full' }))
            store.dispatch(setMemberCode({ memberCode: '' }))
            props.navigation.navigate({ name: '預約確認' })
        }
    }

    useEffect(() => {
        initializePaymentSheet();
    }, []);

    useEffect(() => {
        if (paymentId !== '') {
            setSubmitStatus(true)
        } else {
            setSubmitStatus(false);
        };
    }, [paymentId])

    return (
        <SafeAreaView style={[backgroundStyle, { flex: 1 }]}>
            <ScrollView
                contentInsetAdjustmentBehavior="automatic"
                style={{ backgroundColor: 'white', marginBottom: 2, marginLeft: 5 }}
            >
                {submitStatus ?
                    <>
                        <View>
                            <Text style={[styles.subTitle, styles.mv_15, styles.ph_10, styles.pv_10, { marginLeft: 5 }]}>
                                問診費用：$ {docInfo.docData.video_diag_fee === 0 ? 0 : docInfo.docData.video_diag_fee || 9999}
                            </Text>
                            <Text style={[styles.warning, styles.ph_10, styles.mb_10]}>
                                如在十五分鐘內沒有完成交易，系統會視之為逾期，客户需重新進行預約
                            </Text>
                        </View>
                        <RadioButton.Group
                            onValueChange={value => { setRadioValue(value) }}
                            value={radioValue}
                        >
                            {/* <TouchableOpacity 
                                style={{ flexDirection: 'row', justifyContent: 'flex-start' }} 
                                onPress={() => setRadioValue("PayPal")}
                            >
                                <RadioButton.Item label="" value="PayPal" mode='android' color='#6d7f99' style={{ paddingTop: 30 }} />
                                <Image 
                                    style={{ width: 200, height: 100, }} 
                                    resizeMode="contain" 
                                    resizeMethod="scale" 
                                    source={{ uri: `${Config.REACT_APP_API_SERVER}/logo_PayPal.png`, }} 
                                />
                            </TouchableOpacity> */}
                            <TouchableOpacity
                                style={{ flexDirection: 'row', justifyContent: 'flex-start' }}
                                onPress={() => setRadioValue("stripe")}
                            >
                                <RadioButton.Item label="" value="stripe" mode='android' color='#6d7f99' style={{ paddingTop: 30 }} />
                                <Image
                                    style={{ width: 200, height: 100, }}
                                    resizeMode="contain"
                                    resizeMethod="scale"
                                    source={{ uri: `${Config.REACT_APP_API_SERVER}/logo_stripe.png`, }}
                                />
                            </TouchableOpacity>
                        </RadioButton.Group>
                    </>
                    :
                    <>
                        <SpinnerComponent />
                    </>
                }
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
                    onPress={onPress}
                    disabled={!submitStatus}
                >
                    <Text style={styles.buttonText}>下一步</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}