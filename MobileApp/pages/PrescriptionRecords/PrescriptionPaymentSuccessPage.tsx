import React, { useState, useEffect } from 'react';
import { View, Text, SafeAreaView, StyleSheet, TouchableOpacity, Dimensions, } from 'react-native';
// import icon
import Icon from 'react-native-vector-icons/FontAwesome';

// Native Base
import { HStack, Spinner, useToast } from 'native-base';

// Redux
import { useSelector } from 'react-redux';

//env
import Config from 'react-native-config';

const windowHeight = Dimensions.get('window').height;

export const PrescriptionPaymentSuccessPage = (props: any) => {
    // white background
    const backgroundStyle = {
        backgroundColor: 'white',
    };

    //Toast
    const toast = useToast()

    const [fetchData, setFetchData] = useState(null as any)

    let storeData:any = null
    storeData = useSelector((state:any)=>state.getPrescriptionCode).prescriptionDetail;

    const dataFetching = async () => {

        const paymentResp = await fetch(`${Config.REACT_APP_API_SERVER}/payment/search?column=id&where=${storeData.prescription.payment}`)
        const paymentResult = (await paymentResp.json())[0]

        setFetchData(paymentResult)
        console.log(storeData);
        if (paymentResult.payment_status ) {
            const editPrescription = await fetch(`${Config.REACT_APP_API_SERVER}/prescription/edit`, {
                method: "PUT",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    pres_code: storeData.prescription.pres_code, 
                    address: storeData.prescription.address, 
                    area: storeData.prescription.area, 
                    courier_code: storeData.prescription.courier_code, 
                    delivery_contact: storeData.prescription.delivery_contact, 
                    delivery_phone: storeData.prescription.delivery_phone, 
                    district: storeData.prescription.district, 
                    is_delivery: storeData.prescription.is_delivery, 
                    payment: storeData.prescription.payment, 
                    pick_up_store: storeData.prescription.pick_up_store, 
                    pres_details: storeData.prescription.pres_details,
                    order_status: "paied",
                })
                // {...storeData.prescription, order_status: "paied"}
            })
            const editResult = await editPrescription.json()
            if (editPrescription.status == 200) {
                toast.show({
                    description: "付款成功"
                })
            }
        }
    }

    const [fetched, setFetched] = useState(false)
  
    useEffect(()=>{
          if (!fetched) {
              dataFetching()
              setFetched(true)
          }
      },[])
    return (
        <SafeAreaView style={[backgroundStyle, { flex: 1 }]}>
            <View style={{ paddingTop: windowHeight * (1 / 7) }}>
                {fetchData == null ?
                    // Loading Spinner
                    <HStack space={2} justifyContent="center" alignItems={'center'}>
                        <Spinner color="#225D66" accessibilityLabel="Loading posts" />
                    </HStack>
                    :
                    ( fetchData.payment_status ?
                        <>
                            <View style={{ marginTop: 20 }}>
                                <Icon name="check-circle" size={100} color="#325C80" style={{ textAlign: 'center', marginBottom: 18 }} />
                                <Text style={[styles.subTitle]}>付款完成</Text>
                            </View>
                            <View style={{ marginTop: 20, }}>
                                <Text style={[styles.contentText]}>藥單編號：{fetchData.pres_code}</Text>
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