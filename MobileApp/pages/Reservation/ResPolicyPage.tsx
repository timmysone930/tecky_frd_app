import React from 'react'
import { View, Text, SafeAreaView, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { useSelector } from 'react-redux';
import { useGetReservedSessionByIdQuery } from '../../API/DoctorAPI';
import { BottomLineComponent } from '../../components/utils/BottomLineComponent';
import { checkRosterStatus } from '../../redux/PaymentSlice';
import { store } from '../../redux/store';
import {styles} from '../../styles/GeneralStyles'
// white background
const backgroundStyle = { backgroundColor: 'white',};

export const ResPolicyPage: React.FC = (props: any) => {
    // get form data
    const formData = useSelector((state:any) => state.getFormData);
    // get JWT token
    const userToken = useSelector((state: any) => state.getUserStatus.token);
    // roster session
    const rosterSession = useGetReservedSessionByIdQuery({rosterId:formData.reservedSession, token:userToken});
  
    // check Roster Status
    const onPress = async () => {
        props.navigation.navigate({ name: '確認預約資料' })
    }

    return (
        <SafeAreaView style={[backgroundStyle, { flex: 1 }]}>
            <ScrollView contentInsetAdjustmentBehavior="automatic" style={{ backgroundColor: 'white', padding: 15, paddingTop: 25, marginBottom: 2, }}>
                <View style={[backgroundStyle, { flex: 1, marginBottom: 15 }]}>
                    <Text style={[styles.subTitle,styles.mt_10]}>服務條款</Text>
                    <Text style={styles.greyPolicyText}>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce sit amet est ipsum. Nullam sagittis eu elit nec porta. Nulla sollicitudin magna non purus auctor
                        malesuada.
                        Duis scelerisque, turpis non tincidunt hendrerit, orci velit eleifend purus, ut laoreet massa augue vitae sapien. Proin tellus metus, varius et velit sed, ornare
                        efficitur ipsum. Nunc nibh ligula, interdum at tempus sed,
                        rhoncus sit amet ipsum. Fusce mattis lacinia lorem vitae auctor.
                        Mauris posuere metus ut dolor ornare malesuada gravida sit amet nibh. Proin ac tincidunt ipsum, nec facilisis est. Phasellus aliquam ligula eros,
                        ut commodo nunc consequat non.
                        Nullam et ultricies nulla.Donec ultricies vitae lectus id congue. Nam congue libero nec consequat viverra. Donec auctor id sem ut semper.
                        Nam rhoncus velit vel justo varius luctus. Morbi sit amet volutpat diam, et mattis elit. Pellentesque rutrum leo quis placerat cursus. Sed lacinia
                        eleifend bibendum.
                    </Text>
                    <BottomLineComponent />
                    <Text style={[styles.subTitle,styles.mt_10]}>免責聲明</Text>
                    <Text style={styles.greyPolicyText}>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce sit amet est ipsum. Nullam sagittis eu elit nec porta. Nulla sollicitudin magna non purus auctor
                        malesuada.
                        Duis scelerisque, turpis non tincidunt hendrerit, orci velit eleifend purus, ut laoreet massa augue vitae sapien. Proin tellus metus, varius et velit sed, ornare
                        efficitur ipsum. Nunc nibh ligula, interdum at tempus sed,
                        rhoncus sit amet ipsum. Fusce mattis lacinia lorem vitae auctor.
                        Mauris posuere metus ut dolor ornare malesuada gravida sit amet nibh. Proin ac tincidunt ipsum, nec facilisis est. Phasellus aliquam ligula eros,
                        ut commodo nunc consequat non.
                        Nullam et ultricies nulla.Donec ultricies vitae lectus id congue. Nam congue libero nec consequat viverra. Donec auctor id sem ut semper.
                        Nam rhoncus velit vel justo varius luctus. Morbi sit amet volutpat diam, et mattis elit. Pellentesque rutrum leo quis placerat cursus. Sed lacinia
                        eleifend bibendum.
                    </Text>
                    <BottomLineComponent />
                </View>
            </ScrollView>
            {/* Button to go back and next page */}
            <View style={{ flexDirection: 'row' }}>
                <TouchableOpacity style={styles.button} onPress={() => props.navigation.navigate({ name: '醫生' })}>
                    <Text style={styles.buttonText}>返回主頁</Text></TouchableOpacity>
                <TouchableOpacity style={[styles.button, { backgroundColor: '#325C80' }]}
                    onPress={onPress}>
                    <Text style={styles.buttonText}>我已了解</Text></TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}
