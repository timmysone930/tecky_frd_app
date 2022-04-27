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

// Fake Data
import { FakeData } from './PrescriptionDetailPage';
import { FakeAddr } from './DeliveryOptionPage';

// Selected from last page --> 'pick-up'||'deliver'
const deliveryOption = 'pick-up'

export const PrescriptionPaymentConfirm = (props:any) => {

    const fetchData = FakeData;
    const inputAddress =  FakeAddr[0]
    const deliveryMethod = useSelector((state:any)=>state.getPrescriptionPaymentPreset).deliveryMethod
    const pickUpStore = useSelector((state:any)=>state.getPrescriptionPaymentPreset).pickUpStore
    const deliverAddress = useSelector((state:any)=>state.getPrescriptionPaymentPreset).deliverAddress
    return (
        <SafeAreaView>
            <ScrollView>
                <View style={[styles.pageMargin]}>
                    {/* Component */}
                    <PrescriptionBasicInfo 
                        doctor={fetchData.doctor}
                        profession={fetchData.profession}
                        created_at={fetchData.created_at}
                        course_of_treatment={fetchData.course_of_treatment}
                        patient_name={fetchData.patient_name}
                        patient_id={fetchData.patient_id}
                        orderStatusShow={false}
                        pres_code={fetchData.pres_code}
                        order_status={fetchData.order_status}
                    />
                    {/* Component */}
                    <PrescriptionDetail prescription_details={fetchData.prescription_details}/>
                    <View style={[styles.flexEnd, styles.mb_30, styles.bottomLine]}>
                        {/* Component */}
                        <CostDisplay cost={fetchData.cost}/>
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
                            送藥地址: 
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
                                        {inputAddress.name}&nbsp;
                                        {inputAddress.phone}
                                    </Text>
                                    <Text style={[styles.subTitle]}>
                                        {deliverAddress.area}&nbsp;
                                        {deliverAddress.district}&nbsp;
                                        {deliverAddress.addr.street}
                                    </Text>
                                    <Text style={[styles.subTitle]}>
                                        {deliverAddress.addr.estate}&nbsp;
                                        {deliverAddress.addr.block}座&nbsp;
                                        {deliverAddress.addr.floor}樓&nbsp;
                                        {deliverAddress.addr.flat}室&nbsp;
                                    </Text>
                                </>
                            }
                        </View>
                    </View>
                    <PayButton title={"確定並付款"} disabled={false} onPressFunction={()=>console.log("pay")}/>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}
