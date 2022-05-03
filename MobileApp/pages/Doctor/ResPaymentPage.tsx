import React from 'react'
import { View, Text, SafeAreaView, ScrollView, StyleSheet, TouchableOpacity, Image, Platform } from 'react-native';
import Config from 'react-native-config';
import { RadioButton } from 'react-native-paper';
import { useSelector } from 'react-redux';
import { useGetReservedSessionByIdQuery } from '../../API/DoctorAPI';
import { usePostPatientRegisterMutation, usePostPatientReservationMutation } from '../../API/PatientAPI';
import { checkRosterStatus } from '../../redux/PaymentSlice';
import { store } from '../../redux/store';

export const PaymentPage = (props: any) => {
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
    // selected doctor id
    const docInfo = useSelector((state: any) => state.setDoctorID);
    // roster session
    const rosterSession = useGetReservedSessionByIdQuery(formData.reservedSession);
    // Register
    const [postPatientRegister] = usePostPatientRegisterMutation();
    const submitData = new FormData();
    // Reservation 
    const [postPatientReservation] = usePostPatientReservationMutation();
    const reservationData = new FormData();
    reservationData.append('patient_hkid', formData.idNumber)
    reservationData.append('"doc_code', docInfo.id)
    reservationData.append('res_date', formData.reservedDate)
    reservationData.append('res_time', reserveSession)
    reservationData.append('res_type', 'booked')
    // reservationData.append('cli_code','booked')
    reservationData.append('status', 'booked')
    reservationData.append('session_id', formData.reservedSession)
    reservationData.append('declare', {
        "related_res": "string",
        "isLeave": formData.leaveHK, "location": formData.Countries, "date_back": formData.backDate,
        "isFever": formData.isFever, "isCought": formData.isCough, "isVomit": formData.isVomit, "isCold": formData.isCold
    })

    // submit
    const onPress = async () => {
        if (rosterSession.isSuccess) {
            if (rosterSession.currentData === []) {
                // selected session not enable
                store.dispatch(checkRosterStatus({ paymentRoster: false }))
                props.navigation.navigate({ name: '預約確認' })
            } else {
                if(formData.memberCode === ''){
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
                    const res: any = await postPatientRegister(submitData)
                    console.log(res)
                    console.log(res.error)
                    store.dispatch(checkRosterStatus({ paymentRoster: true }))
                }else{
                    console.log(formData)
                }
                // props.navigation.navigate({ name: '預約確認' })
            }
        }
    }
    return (
        <SafeAreaView style={[backgroundStyle, { flex: 1 }]}>
            <ScrollView contentInsetAdjustmentBehavior="automatic" style={{ backgroundColor: 'white', marginBottom: 2, marginLeft: 5 }}>
                <View>
                    <Text style={[styles.subTitle, { paddingHorizontal: 15, paddingTop: 15, }]}>問診費用：$ {docInfo.docData.video_diag_fee}</Text>
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
});