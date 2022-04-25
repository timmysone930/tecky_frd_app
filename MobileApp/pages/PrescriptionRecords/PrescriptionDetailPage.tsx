import React, { useState } from 'react'
import {
  View, ScrollView, Text, SafeAreaView, FlatList, StyleSheet, Image, Touchable
} from 'react-native';
import { Button } from 'react-native-paper';

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
    cost: "$300",
    contact_number: "1234 5678"
}

// import { styles } from './styles/prescriptionPageStyles';
import { DisplayOrderStatus } from '../../components/prescription/DisplayOrderStatus';
import { PayButton } from "../../components/prescription/PayButton"
import { styles } from "../../styles/GeneralStyles"
interface Props {
    data: any,
    changePage: () => void
}

function RenderDetail (props: Props) {
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
            <View style={[styles.RowCenterBetween, styles.mb_10]}>
               <Text style={[styles.title]}>{props.data.pres_code}</Text>
               <DisplayOrderStatus orderStatus={props.data.order_status}/>
            </View>
            {
                Object.keys(contentItemToDisplay).map((key)=>(
                    <Text style={[styles.contentFont, styles.mb_10]} key={key}>
                        {key}：{props.data[contentItemToDisplay[key]]}
                    </Text>
                ))
            }
            <View style={[styles.costDisplay, styles.mb_10]}>
                <Text style={[styles.costDisplay, styles.title]}>
                    藥費合共：{props.data.cost}
                </Text>
            </View>
            <Button mode="contained" color='#325C80' onPress={props.changePage} disabled={false}> 
                <Text>
                    前往付款
                </Text>
            </Button>
            <Text style={[{ fontSize: 22}, styles.mb_10, styles.mt_30 , styles.title]}>
                藥物明細：
            </Text>
            {
                props.data.prescription_details.map((item: string)=>(
                    <Text key={item} style={[styles.contentFont, styles.mb_10]}>
                        {props.data.prescription_details.indexOf(item) + 1}. {item}
                    </Text>
                ))
            }
            <Text style={[styles.subTitle, styles.textCenter, styles.mt_10]}>
                請依照指示及療程服藥。
            </Text>
            <Text style={[styles.subTitle, styles.textCenter, styles.mb_10]}>
                如布疑問請致電 {props.data.contact_number} 查詢。 
            </Text>
        </View>
    )
}

function PrescriptionDetailPage({navigation}:any) {
    return (
        <SafeAreaView>
            <ScrollView>
                <RenderDetail data={FakeData} changePage={()=>{navigation.navigate("藥單付款-step1")}}/>
            </ScrollView>
        </SafeAreaView>
    );
}

export default PrescriptionDetailPage;