import React from 'react'
import { View, SafeAreaView, ScrollView, StyleSheet, Dimensions } from 'react-native';
import { DrListCard } from '../components/doctor/DrListCard';
import { InfoCardComponent } from '../components/doctor/InfoCardComponent';
import { Button } from 'react-native-paper';
// Need to be removed; only for testing
import { FakeDrDATA } from './DrListPage';

const windowHeight = Dimensions.get('window').height;

export const DrInfo: React.FC = (props: any) => {
    // To get the FlatList data id
    const { id } = props.route.params;
    // Need to be removed; only for testing(will be replaced by fetch)
    let userData: any = {}
    // const id = '1'
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
            </ScrollView>
            <View>
                <Button mode="contained" color='#325C80' onPress={() => props.navigation.navigate('預約')} style={styles.button} disabled={userData.roster ? false : true}>
                    線上視像諮詢
                </Button>
            </View>
        </SafeAreaView>
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