import React from 'react';
import { SafeAreaView, ScrollView, Text, View } from 'react-native';
import { styles } from '../../styles/GeneralStyles';
//Redux
import { useSelector } from 'react-redux';

// Component
import { PrescriptionBasicInfo } from '../../components/prescription/PrescriptionBasicInfo';
import { PrescriptionDetail } from '../../components/prescription/PrescriptionDetail';
import { CostDisplay } from '../../components/prescription/CostDisplay';
import { PayButton } from '../../components/prescription/PayButton';


export const PrescriptionPaymentConfirm = ({navigation}:any) => {
    let fetchData = null
    fetchData = useSelector((state:any)=>state.getPrescriptionCode).prescriptionDetail;

    let deliveryMethod = null
    deliveryMethod = useSelector((state:any)=>state.getPrescriptionPaymentPreset).deliveryMethod

    let pickUpStore = null
    pickUpStore = useSelector((state:any)=>state.getPrescriptionPaymentPreset).pickUpStore

    let deliverAddress = null
    deliverAddress = useSelector((state:any)=>state.getPrescriptionPaymentPreset).deliverAddress
    
    return (
        <SafeAreaView>
            <ScrollView>
                {fetchData != null && deliveryMethod != null && pickUpStore != null && deliverAddress != null &&
                    <View style={[styles.pageMargin]}>
                        {/* Component */}
                        <PrescriptionBasicInfo 
                            doctor={fetchData.doctor_name}
                            profession={fetchData.spec[0].spec_name}
                            created_at={fetchData.prescription.created_at}
                            course_of_treatment="{fetchData.course_of_treatment}"
                            patient_name={fetchData.name}
                            patient_id={fetchData.hkid}
                            orderStatusShow={false}
                            pres_code={fetchData.prescription.pres_code}
                            order_status={fetchData.prescription.order_status}
                        />
                        {/* Component */}
                        <PrescriptionDetail prescription_details={fetchData.prescription.pres_details}/>
                        <View style={[styles.flexEnd, styles.mb_30, styles.bottomLine]}>
                            {/* Component */}
                            <CostDisplay cost={fetchData.payment_amount}/>
                        </View>
                        <View style={[styles.flexRow]}>
                            <Text style={[{width: 95}, styles.contentText]}>
                                取藥方式: 
                            </Text>
                            <Text style={[styles.subTitle]}>
                                {deliveryMethod === 'pick-up'? "分店自取": "上門送藥"}
                            </Text>
                        </View>
                        <View style={[styles.flexRow, styles.mb_30]}>
                            <Text style={[{width: 95}, styles.contentText, styles.mt_30]}>
                                {deliveryMethod === "pick-up"? "自取" : "送藥"}地址:
                            </Text>
                            <View>
                                {
                                    deliveryMethod === "pick-up" &&
                                    <>
                                        <Text style={[styles.subTitle, styles.mt_30]}>
                                            {pickUpStore.area} {pickUpStore.district} 
                                        </Text>
                                        <Text style={[styles.subTitle]}>
                                            {pickUpStore.addr}
                                        </Text>
                                    </>
                                }
                                {
                                    deliveryMethod === "deliver" &&
                                    <>
                                        <Text style={[styles.subTitle, styles.mt_30]}>
                                            {deliverAddress.name}&nbsp;
                                            {deliverAddress.phone}
                                        </Text>
                                        <Text style={[styles.subTitle]}>
                                            {deliverAddress.area}&nbsp;
                                            {deliverAddress.district}&nbsp;
                                        </Text>
                                        <Text style={[styles.subTitle]}>
                                            {deliverAddress.address.split("/nl/")[0]}
                                        </Text>
                                        <Text style={[styles.subTitle]}>
                                            {deliverAddress.address.split("/nl/")[1]}
                                        </Text>
                                    </>
                                }
                            </View>
                        </View>
                        <PayButton title={"確定並付款"} disabled={false} onPressFunction={()=> navigation.navigate("藥單付款")}/>
                    </View>
                }
            </ScrollView>
        </SafeAreaView>
    );
}
