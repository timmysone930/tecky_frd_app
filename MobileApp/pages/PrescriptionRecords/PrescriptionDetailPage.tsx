import React, { useState, useEffect } from 'react';
import { View, ScrollView, Text, SafeAreaView, Linking } from 'react-native';
import { useSelector } from 'react-redux';
import { styles } from "../../styles/GeneralStyles"

// Component
import { PrescriptionBasicInfo } from '../../components/prescription/PrescriptionBasicInfo';
import { PrescriptionDetail } from '../../components/prescription/PrescriptionDetail';
import { CostDisplay } from '../../components/prescription/CostDisplay'
import { PayButton } from '../../components/prescription/PayButton'

// Redux
import { store } from '../../redux/store';
import { setPrescriptionCode } from '../../redux/slice';
import Config from 'react-native-config';

import { statueDisplay } from '../../components/prescription/PrescriptionList';

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

    const userToken = useSelector((state: any) => state.getUserStatus.token);
    const init = {
        headers:{
            "Authorization":`Bearer ${userToken}`,
        }
    }

    const reduxData = useSelector((state: any) => state.getPrescriptionCode)
    const prescriptionSelecting = reduxData.prescriptionSelecting ;
    const prescriptionCode = reduxData.prescriptionCode ;

    const [fetchData, setFetchData] = useState(null as any)

    const dataFetching = async () => {
        
    //   const resp = await fetch (`${Config.REACT_APP_API_SERVER}/client/prescription-list`, {
    //     headers:{
    //         "Authorization":`Bearer ${userToken}`,
    //     }
    //   })
    //   const data = (await resp.json()).filter((item: any)=> item.prescription.pres_code == prescriptionCode)[0]
        const data = prescriptionSelecting
        console.log(data);
        const costResp = await fetch(`${Config.REACT_APP_API_SERVER}/payment/search?column=id&where=${data.prescription.payment}`, init)
        const cost = (await costResp.json())[0].amount
        
        const clinicPhoneResp = await fetch(`${Config.REACT_APP_API_SERVER}/clinics/search?column=code&where=${data.clinic_code}`, init)
        const clinicPhone = (await clinicPhoneResp.json())[0].clinic_phone
        console.log(data.prescription.pres_code);
        
        const getTreatmentResp = await fetch(`${Config.REACT_APP_API_SERVER}/prescription/treatment/${data.prescription.pres_code}`, init)
        const treatmentItems = (await getTreatmentResp.json())
        console.log(treatmentItems);
        // console.log({...data, payment_amount: cost, clinic_phone: clinicPhone, treatmentItems});
        setFetchData({...data, payment_amount: cost, clinic_phone: clinicPhone, treatmentItems})
    }
  
    const goToPay = () => {
        store.dispatch(setPrescriptionCode({prescriptionSelecting: fetchData}))
        navigation.navigate("地址確認")
    }

    const [fetched, setFetched] = useState(false)
  
    useEffect(()=>{
        if (!fetched) {
            dataFetching()
            setFetched(true)
        }
        // console.log(fetchData);
    },[])
    
    // const fetchData = FakeData

    return (
        <SafeAreaView>
            <ScrollView>
                
                {fetchData != null &&
                    <View style={[styles.viewContainer]}>

                        {/* Component */}
                        <PrescriptionBasicInfo 
                            pres_code={fetchData.prescription.pres_code}
                            doctor={fetchData.doctor_name}
                            profession={fetchData.spec[0].spec_name}
                            created_at={fetchData.prescription.created_at.split("T")[0]}
                            course_of_treatment={fetchData.treatmentItems[0].total_day}
                            patient_name={fetchData.name}
                            patient_id={fetchData.hkid}
                            orderStatusShow={true}
                            order_status={statueDisplay[fetchData.prescription.order_status]}
                        />

                        {/* Component */}
                        <CostDisplay cost={fetchData.payment_amount}/>

                        <PayButton title={"前往付款"} disabled={fetchData.prescription.order_status != "waiting"} onPressFunction={goToPay}/>

                        {/* Component */}
                        <PrescriptionDetail treatmentItems={fetchData.treatmentItems}/>

                        <Text style={[styles.subTitle, styles.textCenter, styles.mt_10]}>
                            請依照指示及療程服藥。
                        </Text>
                        <Text 
                            onPress={()=>{Linking.openURL(`tel:${fetchData.contact_number}`);} }
                            style={[styles.subTitle, styles.textCenter, styles.mb_10]}
                        >
                            如布疑問請致電 {fetchData.clinic_phone} 查詢。 
                        </Text>
                        
                    </View>
                }
            </ScrollView>
        </SafeAreaView>
    );
}