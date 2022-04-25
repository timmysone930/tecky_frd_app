import React from 'react'
import { View, SafeAreaView, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { Button } from 'react-native-paper';
import { DrListCard } from '../../components/doctor/DrListCard';
import { InfoCardComponent } from '../../components/doctor/InfoCardComponent';
import { setDoctorID } from '../../redux/slice';
import { store } from '../../redux/store';
// Need to be removed; only for testing
import { FakeDrDATA } from './DrListPage';

export const DrInfo: React.FC = (props: any) => {
    // To get the param passing from the previous screen
    const { id } = props.route.params;
    // Need to be removed; only for testing(will be replaced by fetch)
    let userData: any = {}
    FakeDrDATA.map((item) => {
        if (item['id'] === id) {
            userData = item
        }
    })

    // Set background to white
    const backgroundStyle = {
        backgroundColor: 'white',
    };
    return (
        <SafeAreaView style={[backgroundStyle, { flex: 1 }]}>
            <ScrollView contentInsetAdjustmentBehavior="automatic" style={{ backgroundColor: 'white' }}>
                <View style={styles.drListCard}>
                    <DrListCard props={userData} />
                </View>
                <InfoCardComponent title={'醫療服務包括'} array={userData.service} />
                <InfoCardComponent title={'專業資格'} array={userData.qualifications} />
                <Button mode="contained" color='#325C80' onPress={() => {props.navigation.navigate({
                    name: '預約醫生',
                }), store.dispatch(setDoctorID({id:id}))}} style={styles.button} disabled={userData.roster ? false : true}> 
                線上視像諮詢
                </Button>
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
});