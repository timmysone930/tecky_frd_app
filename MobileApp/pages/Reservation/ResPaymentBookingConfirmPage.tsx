import React from 'react'
import { View, Text, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import Config from 'react-native-config';

import { useSelector } from 'react-redux';
import { useGetReservedSessionByIdQuery, useGetRosterByIdQuery } from '../../API/DoctorAPI';
import { usePostPatientRegisterMutation, usePutHoldSessionMutation } from '../../API/PatientAPI';
import { checkRosterStatus } from '../../redux/PaymentSlice';
import { store } from '../../redux/store';
import { useToast } from 'native-base';

import { setMemberCode } from '../../redux/slice';

import { styles } from '../../styles/GeneralStyles'


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
                                // console.log("first")

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
                    {/* <Text style={[styles.subTitle, styles.mv_15, styles.ph_10, styles.pv_10, { marginLeft: 5 }]}>
                        預約編號: {formData.idNumber}
                    </Text> */}

                    <Text  style={[styles.subTitle, styles.mv_15, styles.ph_10, styles.pv_10, { marginLeft: 5 }]}>
                        預約日期: {formData.reservedDate}
                    </Text>

                    <Text style={[styles.subTitle, styles.ph_10,  { marginLeft: 5 }]}>
                        預約時段: {`${rosterSession.currentData['start_at']} - ${rosterSession.currentData['end_at']}`}
                    </Text>

                    {/* if you can read this, I just realize they dont upload or store the regarding booking spec_name to the end*/}
                    {/* Add oil if you can fix this and discover it */}
                    <Text style={[styles.subTitle,  styles.ph_10,  { marginLeft: 5, marginTop: 20 }]}>
                        科目: { docInfo.docData.spec_name[0] }
                    </Text>

                    <Text style={[styles.subTitle, styles.ph_10, { marginLeft: 5 }]}>
                        醫生：{ docInfo.docData.name }
                    </Text>

                    <Text style={[styles.subTitle, styles.ph_10, { marginLeft: 5, marginTop: 20 }]}>
                        應診者： { formData.name }
                    </Text>

                    <Text style={[styles.subTitle, styles.ph_10, { marginLeft: 5 }]}>
                        身份證類型：{ formData.idType }
                    </Text>

                    <Text style={[styles.subTitle, styles.ph_10, { marginLeft: 5 }]}>
                        身份證編號：{ formData.idNumber }
                    </Text>
                    
                    <Text style={[styles.subTitle, styles.mv_15, styles.ph_10, styles.pv_10, { marginLeft: 5 }]}>
                        預約費用：待更新 
                    </Text>

                    <Text style={[styles.subTitle, styles.mv_15, styles.ph_10, styles.pv_10, { marginLeft: 5 }]}>
                        此為預約請求，問診費用待確定後會更新及另收取。注意手機應用程式通知，謝謝。
                    </Text>

                    <Text style={[styles.subTitle, styles.mv_15, styles.ph_10, styles.pv_10, { marginLeft: 5 }]}>
                        如有查詢可致電+852 2951 1988 
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