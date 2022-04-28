import React from 'react'
import { View, ScrollView, Text, SafeAreaView, Linking } from 'react-native';
import { useSelector } from 'react-redux';
import { styles } from "../../styles/GeneralStyles"

// Component
import { PrescriptionBasicInfo } from '../../components/prescription/PrescriptionBasicInfo';
import { PrescriptionDetail } from '../../components/prescription/PrescriptionDetail';
import { CostDisplay } from '../../components/prescription/CostDisplay'
import { PayButton } from '../../components/prescription/PayButton'

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
            clinic_code: "123",
            area: "新界",
            district: "馬鞍山",
            addr: "ABC 大廈 10樓 10室",
        },
        {
            clinic_code: "456",
            area: "新界",
            district: "青衣",
            addr: "CDE 大廈 20樓 3室",
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

export function PrescriptionDetailPage({navigation}:any) {

    const prescriptionCode = useSelector((state: any) => state.getPrescriptionCode).prescriptionCode ;
    
    const fetchData = FakeData

    return (
        <SafeAreaView>
            <ScrollView>
                <View style={[styles.viewContainer]}>

                    {/* Component */}
                    <PrescriptionBasicInfo 
                        pres_code={prescriptionCode}
                        doctor={fetchData.doctor}
                        profession={fetchData.profession}
                        created_at={fetchData.created_at}
                        course_of_treatment={fetchData.course_of_treatment}
                        patient_name={fetchData.patient_name}
                        patient_id={fetchData.patient_id}
                        orderStatusShow={true}
                        order_status={fetchData.order_status}
                    />

                    {/* Component */}
                    <CostDisplay cost={fetchData.cost}/>

                    <PayButton title={"前往付款"} disabled={false} onPressFunction={()=>{navigation.navigate("地址確認")}}/>

                    {/* Component */}
                    <PrescriptionDetail prescription_details={fetchData.prescription_details}/>

                    <Text style={[styles.subTitle, styles.textCenter, styles.mt_10]}>
                        請依照指示及療程服藥。
                    </Text>
                    <Text 
                        onPress={()=>{Linking.openURL(`tel:${fetchData.contact_number}`);} }
                        style={[styles.subTitle, styles.textCenter, styles.mb_10]}
                    >
                        如布疑問請致電 {fetchData.contact_number} 查詢。 
                    </Text>
                    
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}