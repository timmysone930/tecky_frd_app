import React from 'react';
import { SafeAreaView, ScrollView, Text, View } from 'react-native';
import { styles } from '../../styles/GeneralStyles';

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
    return (
        <SafeAreaView>
            <ScrollView>
                <View style={[styles.pageMargin]}>
                    {/* Component */}
                    <PrescriptionBasicInfo 
                        doctor={FakeData.doctor}
                        profession={FakeData.profession}
                        created_at={FakeData.created_at}
                        course_of_treatment={FakeData.course_of_treatment}
                        patient_name={FakeData.patient_name}
                        patient_id={FakeData.patient_id}
                        orderStatusShow={false}
                        pres_code={FakeData.pres_code}
                        order_status={FakeData.order_status}
                    />
                    {/* Component */}
                    <PrescriptionDetail prescription_details={FakeData.prescription_details}/>
                    <View style={[styles.flexEnd, styles.mb_30, styles.bottomLine]}>
                        {/* Component */}
                        <CostDisplay cost={FakeData.cost}/>
                    </View>
                    <View style={[styles.flexRow]}>
                        <Text style={[{width: 95}, styles.contentText]}>
                            取藥方式: 
                        </Text>
                        <Text style={[styles.subTitle]}>
                            {deliveryOption === 'pick-up'? "分店自取": "上門送藥"}
                        </Text>
                    </View>
                    <View style={[styles.flexRow, styles.mb_30]}>
                        <Text style={[{width: 95}, styles.contentText, styles.mt_30]}>
                            送藥地址: 
                        </Text>
                        <View>
                            <Text style={[styles.subTitle, styles.mt_30]}>
                                {FakeAddr[0].name}&nbsp;
                                {FakeAddr[0].phone}
                            </Text>
                            <Text style={[styles.subTitle]}>
                                {FakeAddr[0].area}&nbsp;
                                {FakeAddr[0].district}&nbsp;
                                {FakeAddr[0].addr.street}
                            </Text>
                            <Text style={[styles.subTitle]}>
                                {FakeAddr[0].addr.estate}&nbsp;
                                {FakeAddr[0].addr.block}座&nbsp;
                                {FakeAddr[0].addr.floor}樓&nbsp;
                                {FakeAddr[0].addr.flat}室&nbsp;
                            </Text>
                        </View>
                    </View>
                    <PayButton title={"確定並付款"} disabled={false} onPressFunction={()=>console.log("pay")}/>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}
