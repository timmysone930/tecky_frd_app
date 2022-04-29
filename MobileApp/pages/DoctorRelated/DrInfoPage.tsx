import React, { useEffect } from 'react'
import { View, SafeAreaView, ScrollView, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { Button } from 'react-native-paper';
import { useGetSelectedDoctorQuery } from '../../API/DoctorAPI';
import { DrListCard } from '../../components/doctor/DrListCard';
import { InfoCardComponent } from '../../components/doctor/InfoCardComponent';
import { SpinnerComponent } from '../../components/NativeBase/SpinnerComponent';
import { setDoctorID } from '../../redux/slice';
import { store } from '../../redux/store';

export const DrInfo: React.FC = (props: any) => {
    // To get the param passing from the previous screen
    const { id, docData } = props.route.params;
    console.log(docData)

    // const { data, isLoading, isSuccess, isError, error } = useGetSelectedDoctorQuery(id)
    // let userData: any = {}
    // let doctorDes = []

    // if(isSuccess){
    //     userData = data[0];
    //     doctorDes = userData.doctor_des.split(',')
    // }

    // Set background to white
    const backgroundStyle = {
        backgroundColor: 'white',
    };

    return (
        <SafeAreaView style={[backgroundStyle, { flex: 1 }]}>
            <ScrollView contentInsetAdjustmentBehavior="automatic" style={{ backgroundColor: 'white' }}>
                {/* {isLoading && <SpinnerComponent />}
                {isError && <Text style={styles.title}>Somethings gone wrong...</Text>} */}
                {/* {isSuccess && */}
                    <>
                        <View style={styles.drListCard}>
                            <DrListCard props={docData} />
                        </View>
                        {/* <InfoCardComponent title={'醫療服務包括'} array={docData.spec_name?docData.spec_name:[]} /> */}
                        {/* <InfoCardComponent title={'專業資格'} array={docData.doctor_des} />  */}
{/* 
                        <Button mode="contained" color='#325C80' onPress={() => {
                            props.navigation.navigate({
                                name: '預約醫生',
                            }),
                                store.dispatch(setDoctorID({ id: id, currentPage: '預約醫生' }),
                                )
                        }} style={styles.button} disabled={docData.name ? false : true}>
                            線上視像諮詢
                        </Button> */}
                    </>
                {/* } */}
            </ScrollView>
        </SafeAreaView >
    )
}

const styles = StyleSheet.create({
    drListCard: {
        padding: 15,
        paddingTop: 25,
        marginBottom: 2,
        flexDirection: 'row',
        backgroundColor: 'white',
        shadowColor: '#E4E4E4',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.5,
        shadowRadius: 10,
        borderBottomColor: '#B5B5B5',
        borderBottomWidth: 0.8,
    },
    button: {
        marginTop: 15,
        marginHorizontal: 15,
        marginBottom: '11%',
    },
    title: {
        fontSize: 16,
        color: '#545454',
        marginBottom: 8,
    },
});