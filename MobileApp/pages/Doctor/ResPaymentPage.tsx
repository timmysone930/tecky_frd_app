import React from 'react'
import { View, Text, SafeAreaView, ScrollView, StyleSheet, TouchableOpacity, Image, Platform } from 'react-native';
import Config from 'react-native-config';
import { RadioButton } from 'react-native-paper';
import { useSelector } from 'react-redux';
import { useGetReservedSessionByIdQuery, useGetRosterByIdQuery } from '../../API/DoctorAPI';
import { usePostPatientRegisterMutation, usePostPatientReservationMutation, usePutDisableSessionMutation, usePutEnableSessionMutation, usePutHoldSessionMutation } from '../../API/PatientAPI';
import { checkRosterStatus } from '../../redux/PaymentSlice';
import { store } from '../../redux/store';
import { requestOneTimePayment } from 'react-native-paypal';
import { useToast } from 'native-base';
import { usePostNewPaymentMutation } from '../../API/PaymentAPI';
import { setMemberCode } from '../../redux/slice';

export const PaymentPage = (props: any) => {
    const toast = useToast()
    // To get the param passing from the previous screen
    const { reserveSession } = props.route.params;
    // white background
    const backgroundStyle = {
        backgroundColor: 'white',
    };
    // Radio Button
    const [radioValue, setRadioValue] = React.useState('PayPal');
    // get form data
    const formData = useSelector((state: any) => state.getFormData);
    console.log(formData,'formData')
    // selected doctor id
    const docInfo = useSelector((state: any) => state.setDoctorID);
    // roster session
    const rosterSession = useGetReservedSessionByIdQuery(formData.reservedSession);
    // to get clinic code from roster table 
    const rosterClinicCode = useGetRosterByIdQuery(formData.reservedTime);
    // convert chinese date to server date
    let year = formData.reservedDate.substring(0, formData.reservedDate.lastIndexOf("年"))
    let month = formData.reservedDate.substring(formData.reservedDate.indexOf("年") + 1, formData.reservedDate.lastIndexOf("月"))
    month < 10 ? month = `0${month}` : month = month
    let date = formData.reservedDate.substring(formData.reservedDate.indexOf("月") + 1, formData.reservedDate.lastIndexOf("日"))
    date < 10 ? date = `0${date}` : date = date
    let convertedDate = `${year}-${month}-${date}`
    // Register
    const [postPatientRegister] = usePostPatientRegisterMutation();
    const submitData = new FormData();
    submitData.append('hkid', formData.idNumber)
    submitData.append('id_doc_type', formData.idType)
    submitData.append('name', formData.name)
    submitData.append('alt_contact', formData.EmergencyContactName)
    submitData.append('alt_phone', formData.EmergencyContactPhone)
    submitData.append('gender', formData.title)
    submitData.append('email', formData.email)
    submitData.append('phone', formData.phone)
    submitData.append('birthday', formData.bDay)
    submitData.append('hkid_img', {
        name: formData['idImg'][0].fileName, type: formData['idImg'][0].type, uri: Platform.OS === 'android' ? formData['idImg'][0].uri : formData['idImg'][0].uri.replace('file://', ''),
    })
    // Reservation 
    const [postPatientReservation] = usePostPatientReservationMutation();
    // to disable the selected session 
    const [putDisableSession] = usePutDisableSessionMutation()
    // to enable the select session
    const [putEnableSession] = usePutEnableSessionMutation()
    // to holde session
    const [putHoldSession] = usePutHoldSessionMutation();
    // create payment 
    const [postNewPayment] = usePostNewPaymentMutation()
    // redirect to paypal
    const redirectPaypal = async () => {
        try {
            // For one time payments
            const { nonce, payerId, email, firstName, lastName, phone } = await requestOneTimePayment(
                //  "eyJ2ZXJzaW9uIjoyLCJhdXRob3JpemF0aW9uRmluZ2VycHJpbnQiOiJleUowZVhBaU9pSktWMVFpTENKaGJHY2lPaUpGVXpJMU5pSXNJbXRwWkNJNklqSXdNVGd3TkRJMk1UWXRjMkZ1WkdKdmVDSXNJbWx6Y3lJNkltaDBkSEJ6T2k4dllYQnBMbk5oYm1SaWIzZ3VZbkpoYVc1MGNtVmxaMkYwWlhkaGVTNWpiMjBpZlEuZXlKbGVIQWlPakUyTlRFM016TXdNREVzSW1wMGFTSTZJamRrWWpGaVpqVTRMVFUxWTJNdE5ERXpNaTFpTWpKaExUQTVNRGt4TkdJNVpXTXlNeUlzSW5OMVlpSTZJbVJqY0hOd2VUSmljbmRrYW5JemNXNGlMQ0pwYzNNaU9pSm9kSFJ3Y3pvdkwyRndhUzV6WVc1a1ltOTRMbUp5WVdsdWRISmxaV2RoZEdWM1lYa3VZMjl0SWl3aWJXVnlZMmhoYm5RaU9uc2ljSFZpYkdsalgybGtJam9pWkdOd2MzQjVNbUp5ZDJScWNqTnhiaUlzSW5abGNtbG1lVjlqWVhKa1gySjVYMlJsWm1GMWJIUWlPblJ5ZFdWOUxDSnlhV2RvZEhNaU9sc2liV0Z1WVdkbFgzWmhkV3gwSWwwc0luTmpiM0JsSWpwYklrSnlZV2x1ZEhKbFpUcFdZWFZzZENKZExDSnZjSFJwYjI1eklqcDdmWDAuNFBaeTB2cE9uLU10WC0tbjdJeWtVWVo3U2F6SzFYWnRDUDZGLUFSUTlRZk1sZFYwZVhyckF2TUwwMklRWU94T3NaM2hSQjhhV3Q2bU5ScUhrVkllQUEiLCJjb25maWdVcmwiOiJodHRwczovL2FwaS5zYW5kYm94LmJyYWludHJlZWdhdGV3YXkuY29tOjQ0My9tZXJjaGFudHMvZGNwc3B5MmJyd2RqcjNxbi9jbGllbnRfYXBpL3YxL2NvbmZpZ3VyYXRpb24iLCJncmFwaFFMIjp7InVybCI6Imh0dHBzOi8vcGF5bWVudHMuc2FuZGJveC5icmFpbnRyZWUtYXBpLmNvbS9ncmFwaHFsIiwiZGF0ZSI6IjIwMTgtMDUtMDgiLCJmZWF0dXJlcyI6WyJ0b2tlbml6ZV9jcmVkaXRfY2FyZHMiXX0sImNsaWVudEFwaVVybCI6Imh0dHBzOi8vYXBpLnNhbmRib3guYnJhaW50cmVlZ2F0ZXdheS5jb206NDQzL21lcmNoYW50cy9kY3BzcHkyYnJ3ZGpyM3FuL2NsaWVudF9hcGkiLCJlbnZpcm9ubWVudCI6InNhbmRib3giLCJtZXJjaGFudElkIjoiZGNwc3B5MmJyd2RqcjNxbiIsImFzc2V0c1VybCI6Imh0dHBzOi8vYXNzZXRzLmJyYWludHJlZWdhdGV3YXkuY29tIiwiYXV0aFVybCI6Imh0dHBzOi8vYXV0aC52ZW5tby5zYW5kYm94LmJyYWludHJlZWdhdGV3YXkuY29tIiwidmVubW8iOiJvZmZsaW5lIiwiY2hhbGxlbmdlcyI6WyJjdnYiLCJwb3N0YWxfY29kZSJdLCJ0aHJlZURTZWN1cmVFbmFibGVkIjp0cnVlLCJhbmFseXRpY3MiOnsidXJsIjoiaHR0cHM6Ly9vcmlnaW4tYW5hbHl0aWNzLXNhbmQuc2FuZGJveC5icmFpbnRyZWUtYXBpLmNvbS9kY3BzcHkyYnJ3ZGpyM3FuIn0sImFwcGxlUGF5Ijp7ImNvdW50cnlDb2RlIjoiVVMiLCJjdXJyZW5jeUNvZGUiOiJVU0QiLCJtZXJjaGFudElkZW50aWZpZXIiOiJtZXJjaGFudC5jb20uYnJhaW50cmVlcGF5bWVudHMuYXBwbGUtcGF5LWRlbW8uQnJhaW50cmVlLURlbW8iLCJzdGF0dXMiOiJtb2NrIiwic3VwcG9ydGVkTmV0d29ya3MiOlsidmlzYSIsIm1hc3RlcmNhcmQiLCJhbWV4IiwiZGlzY292ZXIiLCJtYWVzdHJvIl19LCJwYXlwYWxFbmFibGVkIjp0cnVlLCJicmFpbnRyZWVfYXBpIjp7InVybCI6Imh0dHBzOi8vcGF5bWVudHMuc2FuZGJveC5icmFpbnRyZWUtYXBpLmNvbSIsImFjY2Vzc190b2tlbiI6ImV5SjBlWEFpT2lKS1YxUWlMQ0poYkdjaU9pSkZVekkxTmlJc0ltdHBaQ0k2SWpJd01UZ3dOREkyTVRZdGMyRnVaR0p2ZUNJc0ltbHpjeUk2SW1oMGRIQnpPaTh2WVhCcExuTmhibVJpYjNndVluSmhhVzUwY21WbFoyRjBaWGRoZVM1amIyMGlmUS5leUpsZUhBaU9qRTJOVEUzTXpNd01ERXNJbXAwYVNJNkltSm1Zell4WVdFMkxUTTNOV1V0TkdabE9TMWhZVFJtTFRZek1EVmhOV0l6TldWbVpDSXNJbk4xWWlJNkltUmpjSE53ZVRKaWNuZGthbkl6Y1c0aUxDSnBjM01pT2lKb2RIUndjem92TDJGd2FTNXpZVzVrWW05NExtSnlZV2x1ZEhKbFpXZGhkR1YzWVhrdVkyOXRJaXdpYldWeVkyaGhiblFpT25zaWNIVmliR2xqWDJsa0lqb2laR053YzNCNU1tSnlkMlJxY2pOeGJpSXNJblpsY21sbWVWOWpZWEprWDJKNVgyUmxabUYxYkhRaU9uUnlkV1Y5TENKeWFXZG9kSE1pT2xzaWRHOXJaVzVwZW1VaUxDSnRZVzVoWjJWZmRtRjFiSFFpWFN3aWMyTnZjR1VpT2xzaVFuSmhhVzUwY21WbE9sWmhkV3gwSWwwc0ltOXdkR2x2Ym5NaU9udDlmUS5tU2ZaMzlTNlZ0aEFZeDFLdnFyaG5jd2NDcGN3dDB5b0ZadXlENFVfVU01ODVwa3c5c3VTcDA0SzU3T0QtekZJeUZhTUlyM2Zsb0FVeENzSmxOM2lHQSJ9LCJwYXlwYWwiOnsiYmlsbGluZ0FncmVlbWVudHNFbmFibGVkIjp0cnVlLCJlbnZpcm9ubWVudE5vTmV0d29yayI6dHJ1ZSwidW52ZXR0ZWRNZXJjaGFudCI6ZmFsc2UsImFsbG93SHR0cCI6dHJ1ZSwiZGlzcGxheU5hbWUiOiJBY21lIFdpZGdldHMsIEx0ZC4gKFNhbmRib3gpIiwiY2xpZW50SWQiOm51bGwsInByaXZhY3lVcmwiOiJodHRwOi8vZXhhbXBsZS5jb20vcHAiLCJ1c2VyQWdyZWVtZW50VXJsIjoiaHR0cDovL2V4YW1wbGUuY29tL3RvcyIsImJhc2VVcmwiOiJodHRwczovL2Fzc2V0cy5icmFpbnRyZWVnYXRld2F5LmNvbSIsImFzc2V0c1VybCI6Imh0dHBzOi8vY2hlY2tvdXQucGF5cGFsLmNvbSIsImRpcmVjdEJhc2VVcmwiOm51bGwsImVudmlyb25tZW50Ijoib2ZmbGluZSIsImJyYWludHJlZUNsaWVudElkIjoibWFzdGVyY2xpZW50MyIsIm1lcmNoYW50QWNjb3VudElkIjoic3RjaDJuZmRmd3N6eXR3NSIsImN1cnJlbmN5SXNvQ29kZSI6IlVTRCJ9fQ=="
                `${Config.PAYPAL}`
                , {
                    amount: `${docInfo.docData.video_diag_fee}`, // required
                    // any PayPal supported currency (see here: https://developer.paypal.com/docs/integration/direct/rest/currency-codes/#paypal-account-payments)
                    currency: 'HKD',
                    // any PayPal supported locale (see here: https://braintree.github.io/braintree_ios/Classes/BTPayPalRequest.html#/c:objc(cs)BTPayPalRequest(py)localeCode)
                    localeCode: 'zh_HK',
                    shippingAddressRequired: false,
                    userAction: 'commit', // display 'Pay Now' on the PayPal review page
                    // one of 'authorize', 'sale', 'order'. defaults to 'authorize'. see details here: https://developer.paypal.com/docs/api/payments/v1/#payment-create-request-body
                    intent: 'authorize',
                }
            );
            console.log(nonce, payerId, email, firstName, lastName, phone);
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
                console.log('hold', holdRes)
                // non member
                if (formData.memberCode === '') {
                    // create member
                    const res: any = await postPatientRegister(submitData)
                    console.log('member', res)
                    if(res.error){
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
                    'patient_hkid': formData.idNumber, 'doc_code': docInfo.id, 'res_date': convertedDate, 'res_time': `${rosterSession.data.start_at}:00`, 'res_type': 'online', 'cli_code': rosterClinicCode.data[0]['clinic_code'],
                    'status': 'booked', 'video_url': null, 'is_follow_up': true, 'channel': 'null', 'declare': {
                        "isLeave": formData.leaveHK, "location": formData.Countries, "date_back": formData.backDate,
                        "isFever": formData.isFever, "isCought": formData.isCough, "isVomit": formData.isVomit, "isCold": formData.isCold
                    }
                }
                // create reservation table
                try {
                    const reservationRes: any = await postPatientReservation(resData)
                    console.log('resResult', reservationRes)
                    if (reservationRes?.data) {
                        // payment
                        const paypalRes = await redirectPaypal();
                        if (paypalRes.status === 'success') {
                            toast.show({
                                description: "付款成功"
                            })
                            // create payment table
                            let paymentData = { "gateway": "paypal", "payment_id": paypalRes.data.nonce, "amount": docInfo.docData.video_diag_fee, "payment_status": true, "type": "reservation", "payment_type": "paypal", "res_code": reservationRes.data, "session_id": formData.reservedSession }
                            console.log(paymentData)
                            const paymentRes: any = await postNewPayment(paymentData)
                            console.log('paymentRes', paymentRes)
                            store.dispatch(checkRosterStatus({ paymentRoster: 'true' }))
                            store.dispatch(setMemberCode({ memberCode: '' }))
                            props.navigation.navigate({ name: '預約確認', params: { 'resCode': reservationRes.data } })
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
                            description: "已有預約記錄人，無法再次預約"
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
                    <Text style={[styles.subTitle]}>問診費用：$ {docInfo.docData.video_diag_fee}</Text>
                    <Text style={[styles.warning]}>如在三十分鐘內沒有完成交易，系統會視之為逾期，客户需重新進行預約</Text>
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
                <TouchableOpacity style={styles.button} onPress={() => props.navigation.navigate({ name: '主頁' })}>
                    <Text style={styles.buttonText}>返回主頁</Text></TouchableOpacity>
                <TouchableOpacity style={[styles.button, { backgroundColor: '#325C80' }]} onPress={onPress}>
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
        paddingHorizontal: 15,
        paddingTop: 15,
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
    warning: {
        fontSize: 11,
        color: 'red',
        marginBottom: 10,
        paddingHorizontal: 15
    },
});