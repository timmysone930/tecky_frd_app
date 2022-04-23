import React, { useState } from 'react'
import {
  View, Text, SafeAreaView, FlatList, StyleSheet, Image, Button, Touchable
} from 'react-native';

const FakeData = {
    pres_code: "RM220319001",
    prescription_details: [
        "acetaminophen: 3粒 (止痛)",
        "diphenhydramine: 100ml (止咳)",
        "Eurax: 50ml (外用止痕)"
    ],
    created_at: "2022年3月19日",
    order_status: "待付款",
    payment: "",
    is_delivery: "",
    courier_code: "",
    delivery_contact: "",
    delivery_phone: "",
    area: "",
    district: "",
    addr: "",
    pick_up_store: "",
    remark: "",
    doctor: "陳大文 Chan Tai Man",
    profession: "表列中醫",
    course_of_treatment: "3日",
    patient_name: "張中和",
    patient_id: "A123456(7)",
    cost: "$300"
}

import { styles } from './css/prescriptionPageCSS';
import { DisplayOrderStatus } from '../../components/prescription/DisplayOrderStatus';
import { TouchableHighlight } from 'react-native-gesture-handler';
function RenderDetail (props: any) {
    const contentItemToDisplay:any = {
        "醫生": "doctor" , 
        "專科": "profession", 
        "開藥日期": "created_at", 
        "療程": "course_of_treatment", 
        "應診者": "patient_name", 
        "身份證": "patient_id"
    };
    return (
        <View style={[styles.viewContainer]}>
            <View style={[styles.RowCenterBetween, {marginBottom:10}]}>
               <Text style={[styles.prescriptionCode]}>{props.data.pres_code}</Text>
               <DisplayOrderStatus orderStatus={props.data.order_status}/>
            </View>
            {
                Object.keys(contentItemToDisplay).map((key)=>(
                    <Text style={[styles.contentFont, {marginBottom:10}]} key={key}>
                        {key}：{props.data[contentItemToDisplay[key]]}
                    </Text>
                ))
            }
            <View style={[styles.costDisplay]}>
                <Text style={[styles.costDisplay]}>
                    藥費合共：{props.data.cost}
                </Text>
            </View>
            <TouchableHighlight 
                style={[styles.payButton , {marginBottom:40}]} 
                onPress={()=>console.log("pressed")}
            >
                <Text style={{fontSize: 22, color: "white"}}>前往付款</Text>
            </TouchableHighlight>
            <Text style={[{ fontSize: 22, marginBottom:10}]}>
                藥物明細：
            </Text>
            {
                props.data.prescription_details.map((item: string)=>(
                    <Text style={[styles.contentFont, {marginBottom:10}]}>
                        {props.data.prescription_details.indexOf(item) + 1}. {item}
                    </Text>
                ))
            }
        </View>
    )
}

function PrescriptionDetailPage() {
    return (
        <SafeAreaView>
            <RenderDetail data={FakeData} />
        </SafeAreaView>
    );
}

export default PrescriptionDetailPage;