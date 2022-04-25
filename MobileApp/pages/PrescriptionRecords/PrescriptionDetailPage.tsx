import React from 'react'
import { View, ScrollView, Text, SafeAreaView } from 'react-native';
import { styles } from "../../styles/GeneralStyles"

export const FakeData = {
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
    pick_up_store: [
        {
            district: "馬鞍山",
            addr: "Room 11, ABC centre, Kowloon Bay, Kowloon"  
        },
        {
            district: "青衣",
            addr: "Room 2, DEF centre, Tsing Yi, NT"
        }
    ],
    remark: "",
    doctor: "陳大文 Chan Tai Man",
    profession: "表列中醫",
    course_of_treatment: "3日",
    patient_name: "張中和",
    patient_id: "A123456(7)",
    cost: "$300",
    contact_number: "1234 5678",
}

// Component
import { PrescriptionBasicInfo } from '../../components/prescription/PrescriptionBasicInfo';
import { PrescriptionDetail } from '../../components/prescription/PrescriptionDetail';
import { CostDisplay } from '../../components/prescription/CostDisplay'
import { PayButton } from '../../components/prescription/PayButton'

interface Props {
    data: any,
    changePage: () => void
}

function RenderDetail (props: Props) {
    return (
        <View style={[styles.viewContainer]}>

            {/* Component */}
            <PrescriptionBasicInfo 
                doctor={props.data.doctor}
                profession={props.data.profession}
                created_at={props.data.created_at}
                course_of_treatment={props.data.course_of_treatment}
                patient_name={props.data.patient_name}
                patient_id={props.data.patient_id}
                orderStatusShow={true}
                pres_code={props.data.pres_code}
                order_status={props.data.order_status}
            />

            {/* Component */}
            <CostDisplay cost={props.data.cost}/>

            <PayButton title={"前往付款"} disabled={false} onPressFunction={props.changePage}/>

            {/* Component */}
            <PrescriptionDetail prescription_details={props.data.prescription_details}/>

            <Text style={[styles.subTitle, styles.textCenter, styles.mt_10]}>
                請依照指示及療程服藥。
            </Text>
            <Text style={[styles.subTitle, styles.textCenter, styles.mb_10]}>
                如布疑問請致電 {props.data.contact_number} 查詢。 
            </Text>
        </View>
    )
}

export function PrescriptionDetailPage({navigation}:any) {
    return (
        <SafeAreaView>
            <ScrollView>
                <RenderDetail data={FakeData} changePage={()=>{navigation.navigate("地址確認")}}/>
            </ScrollView>
        </SafeAreaView>
    );
}