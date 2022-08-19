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

export function PrescriptionDetailPage({ navigation }:any) {

    try {
        
        // const userToken = useSelector((state: any) => state.getUserStatus.token);
        // const init = {
        //     headers:{
        //         "Authorization":`Bearer ${userToken}`,
        //     }
        // }
    
        const reduxData = useSelector((state: any) => state.getPrescriptionCode)
        
        const [fetchData, setFetchData] = useState(null as any)
        
        
        const dataFetching = async () => {
            const prescriptionSelecting = reduxData.prescriptionSelecting ;
            const data = prescriptionSelecting
            console.log(data);
            // const prescriptionCode = reduxData.prescriptionCode ;
            // const costResp = await fetch(`${Config.REACT_APP_API_SERVER}/payment/search?column=id&where=${data.prescription.payment}`, init)
            // const cost = (await costResp.json())[0].amount
            
            // const clinicPhoneResp = await fetch(`${Config.REACT_APP_API_SERVER}/clinics/search?column=code&where=${data.clinic_code}`, init)
            // const clinicPhone = (await clinicPhoneResp.json())[0].clinic_phone
            // console.log(data.prescription.pres_code);
            
            // const getTreatmentResp = await fetch(`${Config.REACT_APP_API_SERVER}/prescription/treatment/${data.prescription.pres_code}`, init)
            // const treatmentItems = (await getTreatmentResp.json())
            // console.log(treatmentItems);
    
            // console.log({...data, payment_amount: cost, clinic_phone: clinicPhone, treatmentItems});
    
            // setFetchData({...data, payment_amount: cost, clinic_phone: clinicPhone, treatmentItems})
            setFetchData(data)
        }
      
        const goToPay = () => {
            store.dispatch(setPrescriptionCode({prescriptionSelecting: fetchData}))
            // navigation.navigate("地址確認")
            navigation.navigate({name: "地址確認"})

        }
    
        const [fetched, setFetched] = useState(false)
      
        useEffect(()=>{
            if (!fetched) {
                dataFetching()
                setFetched(true)
            }
            // console.log("fetchData", fetchData);
            // console.log(fetchData.prescription.order_status)
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
                                course_of_treatment={fetchData.bill[0].treatment_days + " " + fetchData.bill[0].treatment_unit}
                                patient_name={fetchData.name}
                                patient_id={fetchData.hkid}
                                orderStatusShow={true}
                                payment_status={statueDisplay[fetchData.prescription.payment_status]}
                            />
    
                            {/* Component */}
                            <CostDisplay cost={fetchData.bill[0].totel_amount}/>
    
                            <PayButton 
                                title={"前往付款"} 
                                disabled={fetchData.prescription.payment_status != "waiting"} 
                                onPressFunction={goToPay}
                            />
    
                            {/* Component */}
                            <PrescriptionDetail treatmentItems={fetchData.treatmentItems}/>
    
                            <Text style={[styles.subTitle, styles.textCenter, styles.mt_10]}>
                                請依照指示及療程服藥。
                            </Text>
                            <Text 
                                onPress={()=>{Linking.openURL(`tel:${fetchData.contact_number}`);} }
                                style={[styles.subTitle, styles.textCenter, styles.mb_10]}
                            >
                                如有疑問，請致電 2951 1988 查詢。 
                            </Text>
                            
                        </View>
                    }
                </ScrollView>
            </SafeAreaView>
        );
    } 
    catch (error:any) {
        console.log(error.message);

        return(
        <SafeAreaView>
        <ScrollView>
            <Text style={[styles.subTitle, styles.textCenter, styles.mt_10]}>
                醫生未建立藥單，請等候👨‍⚕️
            </Text>
        </ScrollView>
        </SafeAreaView>
        )
    }

}