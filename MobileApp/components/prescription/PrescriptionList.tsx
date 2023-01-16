import React from 'react'
import { FlatList, View, Text, TouchableOpacity } from 'react-native';
import { DisplayPaymentStatus } from "./DisplayPaymentStatus"
import { styles } from "../../styles/RecordListStyle"
//Redux
import { store } from '../../redux/store';
import { setPrescriptionCode } from '../../redux/slice';

interface Props {
    data: Array<{
        pres_code: string,
        doctor_name: string,
        created_at: string,
        payment_status: string,
        prescription: any
    }>,
    changePage: string,
    navigation: any
}

export const statueDisplay: any = {
    paid: "已付款",
    waiting: "待付款",
    pending: "待發貨",
    cancel: "已取消",
    sent: "已送出",
    received: "已取"
}

export const PrescriptionList = (props: Props) => {
    // console.log("JNIKJNIJNIJNI", props.data);
    // console.log("PRESCRIPTION ONLY", props.data.map(item=>item.prescription));


    return (
        <FlatList
            data={props.data}
            renderItem={
                ({ item }) => (
                    <TouchableOpacity
                        style={[styles.box]}
                        onPress={() => {
                            store.dispatch(setPrescriptionCode({ prescriptionSelecting: item }))
                            props.navigation.navigate(props.changePage)
                        }}
                    >
                        <View>
                            <Text style={[styles.resCode]}>
                                {item.prescription.pres_code}
                            </Text>
                            <Text style={[styles.resDoctor]}>
                                醫生: {item.doctor_name}
                            </Text>
                            <Text style={[styles.contentFont]}>
                                開藥日期: {item.prescription.created_at.split("T")[0]}
                            </Text>
                        </View>
                        <View>
                        {
                                item.prescription.payment_status == "waiting" ?
                            <DisplayPaymentStatus 
                            paymentStatus={statueDisplay[item.prescription.payment_status]} /> :
                                <DisplayPaymentStatus 
                                paymentStatus={statueDisplay[item.prescription.order_status]} /> 

                            }
                        </View>
                    </TouchableOpacity>
                )
            }
            keyExtractor={item => item.prescription.pres_code}
        />
    )
}