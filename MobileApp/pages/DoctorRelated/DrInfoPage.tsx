import React from 'react'
import { View, SafeAreaView, ScrollView, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { Button } from 'react-native-paper';
import { useGetRosterListByDocCodeQuery } from '../../API/DoctorAPI';
import { DrListCard } from '../../components/doctor/DrListCard';
import { InfoCardComponent } from '../../components/doctor/InfoCardComponent';
import { setDoctorData, setDoctorID } from '../../redux/slice';
import { store } from '../../redux/store';

export const DrInfo: React.FC = (props: any) => {
    // To get the param passing from the previous screen
    const { id, docData } = props.route.params;
    //for doctor doctor_des
    let doctorDes = [];
    doctorDes = docData.doctor_des.split(',')
    // Set background to white
    const backgroundStyle = {
        backgroundColor: 'white',
    };
    // Check dr roaster time
    const rosterData = useGetRosterListByDocCodeQuery(id)

    return (
        <SafeAreaView style={[backgroundStyle, { flex: 1 }]}>
            <ScrollView contentInsetAdjustmentBehavior="automatic" style={{ backgroundColor: 'white' }}>
                <>
                    <View style={styles.drListCard}>
                        <DrListCard props={docData} />
                    </View>
                    <InfoCardComponent title={'醫療服務包括'} array={docData.spec_name ? docData.spec_name : []} />
                    <InfoCardComponent title={'專業資格'} array={doctorDes} />

                    <Button mode="contained" color='#325C80' onPress={() => {
                        props.navigation.navigate({
                            name: '預約醫生',
                            params:{docData:docData, id:id}
                        }),
                            store.dispatch(setDoctorID({ id: id, currentPage: '預約醫生' })
                            )
                            store.dispatch(setDoctorData({docData:docData}))
                    }} style={styles.button} disabled={rosterData.isError||rosterData.isLoading ? true : false}>
                        線上視像諮詢
                    </Button>
                </>
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