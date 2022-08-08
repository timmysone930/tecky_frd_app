import React from 'react'
import { View, Text, SafeAreaView, ScrollView, TouchableOpacity, Image, Platform } from 'react-native';
import Config from 'react-native-config';
// import { RadioButton } from 'react-native-paper';
import { useSelector } from 'react-redux';
import { useGetReservedSessionByIdQuery, useGetRosterByIdQuery } from '../../API/DoctorAPI';
import { usePostPatientRegisterMutation, usePostPatientReservationMutation, usePutEnableSessionMutation, usePutHoldSessionMutation } from '../../API/PatientAPI';
import { checkRosterStatus } from '../../redux/PaymentSlice';
import { store } from '../../redux/store';
// import { requestOneTimePayment } from 'react-native-paypal';
import { useToast } from 'native-base';
// import { usePostNewPaymentMutation } from '../../API/PaymentAPI';
import { setMemberCode } from '../../redux/slice';

import { styles } from '../../styles/GeneralStyles'
// import { SpinnerComponent } from '../../components/utils/SpinnerComponent';
// import { ResRecordStatus } from '../../components/reservationRecord/ResRecordStatus';

function timer(t:number):Promise<boolean>{
    return new Promise( rec => {
        setTimeout( () => rec(true), t)
    })
}

const backgroundStyle = { backgroundColor: 'white', };

export const ResPaymentBookingConfirmPage = (props: any) => {

    // get JWT token
    const userToken = useSelector((state: any) => state.getUserStatus.token);
    const toast = useToast();

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

    // to holde session
    const [putHoldSession] = usePutHoldSessionMutation();
    // create payment 

    
    // submit
    const onPress = async () => {
        // setSubmitStatus(false)
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
            submitData.append('hkid_img', formData['idImg']);

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
                                    "isLeave": formData.leaveHK,
                                    "location": formData.Countries,
                                    "date_back": formData.backDate === '選擇日期' ? '' : formData.backDate,
                                    "isFever": formData.isFever,
                                    "isCought": formData.isCough,
                                    "isVomit": formData.isVomit,
                                    "isCold": formData.isCold
                                }
                            }
                            console.log(resData);

                            const res = await fetch(`${Config.REACT_APP_API_SERVER}/reserve/addApprove`,{
                                method:"POST",
                                headers: {
                                    "Authorization": `Bearer ${userToken}`,
                                    'content-type': 'application/json'
                                },
                                body: JSON.stringify(resData)
                            })
                            const result = await res.json();

                            console.log("RESULT", result);

                            if(res.status === 200){
                                toast.show({
                                    description: "預約成功"
                                })
                                console.log("first")

                                store.dispatch(checkRosterStatus({ paymentRoster: 'true' }))
                                store.dispatch(setMemberCode({ memberCode: '' }))

                                await timer(1000)

                                props.navigation.navigate({ 
                                    name: '預約確認',
                                    params: { 
                                        'resCode': result.code,
                                        'res_date': formData.reservedDate,
                                        'res_time': `${rosterSession.data.start_at}`
                                    }
                                });

                            }
                            else{
                                toast.show({
                                    description: "預約失敗"
                                })

                                store.dispatch(checkRosterStatus({ paymentRoster: 'false' }))
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

    return (
        <SafeAreaView style={[backgroundStyle, { flex: 1 }]}>
            <ScrollView 
                contentInsetAdjustmentBehavior="automatic" 
                style={{ backgroundColor: 'white', marginBottom: 2, marginLeft: 5 }}
            >
                <View>
                    <Text style={[styles.subTitle, styles.mv_15, styles.ph_10, styles.pv_10, { marginLeft: 5 }]}>
                        預約費用：$ 0
                    </Text>

                    <Text style={[styles.subTitle, styles.ph_10, { marginLeft: 5 }]}>
                        醫生：{ docInfo.docData.name }
                    </Text>

         
    
                </View>
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
                    onPress={() => onPress()}
                >
                    <Text style={styles.buttonText}>預約確認</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}