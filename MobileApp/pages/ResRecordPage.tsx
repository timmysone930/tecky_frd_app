import React from 'react'
import { RefreshControl, SafeAreaView, Text } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { useGetReservationListQuery } from '../API/PatientAPI';
import { SpinnerComponent } from '../components/NativeBase/SpinnerComponent';
// Components
import { ReservationRecord } from '../components/reservation/ReservationRecord';

const wait = (timeout: number) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
}

const getResData = async () => {
    try {
        const response = await fetch(
            'http://192.168.0.113:3001/doctors/allInfo'
        );
        const json = await response.json();
        //   console.log(json) ;
    } catch (error) {
        console.error(error);
    }
};

export const ResRecordPage = (props: any) => {
    const [refreshing, setRefreshing] = React.useState(false);
    const onRefresh = React.useCallback(() => {
        setRefreshing(true);

        wait(2000).then(() => setRefreshing(false));
    }, []);
    // white background
    const backgroundStyle = {
        backgroundColor: 'white',
    };
    // fetch the resRecord
    let recordData = useGetReservationListQuery();
    console.log('resRecord', recordData.data)
    return (
        <SafeAreaView style={[backgroundStyle, { flex: 1 }]}>
            {recordData.isLoading && <SpinnerComponent />}
            {recordData.isSuccess &&
                <ReservationRecord data={recordData.data} props={props} refreshing={refreshing} onRefresh={onRefresh} />
            }
            {recordData.isError && <Text style={{ textAlign: 'center', fontSize: 17, margin: 20 }}>沒有預約記錄</Text>}
        </SafeAreaView>
    )
}


