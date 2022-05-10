import React from 'react'
import { View, SafeAreaView, ScrollView, } from 'react-native';
import { Button } from 'react-native-paper';
import { useGetRosterListByDocCodeQuery } from '../../API/DoctorAPI';
import { DrListCard } from '../../components/doctor/DrListCard';
import { InfoCardComponent } from '../../components/doctor/InfoCardComponent';
import { setDoctorData, setDoctorID } from '../../redux/slice';
import { store } from '../../redux/store';
import {styles} from '../../styles/DoctorStyle';
// Set background to white
const backgroundStyle = { backgroundColor: 'white', };

export const DocDetailPage: React.FC = (props: any) => {
    // To get the param passing from the previous screen
    const { id, docData } = props.route.params;
    let doctorDes = docData.doctor_des.split(',')
    // Check dr roaster time
    const rosterData = useGetRosterListByDocCodeQuery(id)
    return (
        <SafeAreaView style={[backgroundStyle, { flex: 1 }]}>
            <ScrollView contentInsetAdjustmentBehavior="automatic" style={{ backgroundColor: 'white' }}>
                <>
                    <View style={styles.docDetailCard}>
                        <DrListCard props={docData} />
                    </View>
                    <InfoCardComponent title={'醫療服務包括'} array={docData.spec_name ? docData.spec_name : []} />
                    <InfoCardComponent title={'專業資格'} array={doctorDes} />
                    <Button mode="contained" color='#325C80' onPress={() => {
                        props.navigation.navigate({ name: '預約醫生', params: { docData: docData, id: id }
                        }),
                            store.dispatch(setDoctorID({ id: id, currentPage: '預約醫生' }) )
                        store.dispatch(setDoctorData({ docData: docData }))
                    }} style={styles.videoButton} disabled={rosterData.isError || rosterData.isLoading ? true : false}>
                        線上視像諮詢
                    </Button>
                </>
            </ScrollView>
        </SafeAreaView >
    )
}
