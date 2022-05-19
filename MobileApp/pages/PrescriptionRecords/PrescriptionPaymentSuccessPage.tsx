import React, { useState, useEffect } from 'react';
import { View, Text, SafeAreaView, StyleSheet, TouchableOpacity, Dimensions, } from 'react-native';
// import icon
import Icon from 'react-native-vector-icons/FontAwesome';

// Native Base
import { HStack, Spinner, useToast } from 'native-base';

// Redux
import { store } from '../../redux/store';
import { setPrescriptionCode } from '../../redux/slice';
import { useSelector } from 'react-redux';

const windowHeight = Dimensions.get('window').height;

export const PrescriptionPaymentSuccessPage = (props: any) => {

    const userToken = useSelector((state: any) => state.getUserStatus.token);
    const init = {
        headers:{
            "Authorization":`Bearer ${userToken}`,
        }
    };
    // white background
    const backgroundStyle = {
        backgroundColor: 'white',
    };

    //Toast
    const toast = useToast()

    const [result, setResult] = useState(null as any)
    const [pres_code, setPres_code] = useState(null as any)

    const redux = useSelector((state:any)=> state.getPrescriptionCode);
    const prescriptionDetail = redux.prescriptionDetail
    console.log(redux);
    
    
    const [fetched, setFetched] = useState(false)
    
    useEffect(()=>{
        if (redux != null) {
            const pres_code = redux.prescriptionDetail.prescription.pres_code
            const payment_status = redux.payment_status
            setResult(payment_status)
            setPres_code(pres_code)
            setFetched(true)
        }
        return ()=>{store.dispatch(setPrescriptionCode({payment_status: null}))}
      },[])
    return (
        <SafeAreaView style={[backgroundStyle, { flex: 1 }]}>
            <View style={{ paddingTop: windowHeight * (1 / 7) }}>
                {result == null || pres_code == null ?
                    // Loading Spinner
                    <HStack space={2} justifyContent="center" alignItems={'center'}>
                        <Spinner color="#225D66" accessibilityLabel="Loading posts" />
                    </HStack>
                    :
                    (result ?
                        <>
                            <View style={{ marginTop: 20 }}>
                                <Icon name="check-circle" size={100} color="#325C80" style={{ textAlign: 'center', marginBottom: 18 }} />
                                <Text style={[styles.subTitle]}>付款完成</Text>
                            </View>
                            <View style={{ marginTop: 20, }}>
                                <Text style={[styles.contentText]}>藥單編號：{pres_code}</Text>
                                <Text style={[styles.contentText]}>收據已發送到你的電郵</Text>
                                <TouchableOpacity style={styles.button} onPress={() => props.navigation.navigate({ name: '藥單記錄表' })}>
                                    <Text style={styles.buttonText}>返回</Text></TouchableOpacity>
                            </View>
                        </>
                        :
                        <>
                            <View style={{ marginTop: 20 }}>
                                <Icon name="info-circle" size={100} color="red" style={{ textAlign: 'center', marginBottom: 18 }} />
                                <Text style={[styles.subTitle]}>付款失敗</Text>
                            </View>
                            <View style={{ marginTop: 20, }}>
                                <Text style={[styles.contentText]}>請重新付款</Text>
                                <TouchableOpacity style={styles.button} onPress={() => props.navigation.navigate({ name: '藥單記錄表' })}>
                                    <Text style={styles.buttonText}>返回</Text></TouchableOpacity>
                            </View>
                        </>
                    )
                }
            </View>
        </SafeAreaView>
    )
}


const styles = StyleSheet.create({
    subTitle: {
        color: '#225D66',
        fontSize: 26,
        fontWeight: '900',
        marginTop: 10,
        marginBottom: 15,
        textAlign: 'center',
    },
    contentText: {
        color: '#3B3B3B',
        marginVertical: 10,
        fontSize: 20,
        fontWeight: '500',
        marginTop: 8,
        marginBottom: 15,
        textAlign: 'center',
    },
    button: {
        backgroundColor: '#6d7f99',
        paddingVertical: 16,
        marginHorizontal: 40,
        marginTop: 20,
        borderRadius: 4,
    },
    buttonText: {
        color: 'white',
        textAlign: 'center',
        fontSize: 16,
    },

});