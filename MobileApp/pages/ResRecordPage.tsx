import React from 'react'
import {SafeAreaView, Text } from 'react-native';
import { useGetReservationListQuery } from '../API/PatientAPI';
import { SpinnerComponent } from '../components/utils/SpinnerComponent';
import { ResRecordComponent } from '../components/reservationRecord/ResRecordComponent';

const wait = (timeout: number) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
}

export const ResRecordPage = (props: any) => {
    // fetch the resRecord
    let recordData = useGetReservationListQuery();
    const [refreshing, setRefreshing] = React.useState(false);
    const onRefresh = React.useCallback(async () => {
        try {
            setRefreshing(true);
            recordData.refetch();
            wait(2000).then(() => setRefreshing(false));

        } catch (e) {
            console.log(e)
        }
    }, []);
    // white background
    const backgroundStyle = {backgroundColor: 'white',};
    return (
        <SafeAreaView style={[backgroundStyle, { flex: 1 }]}>
            {recordData.isLoading && <SpinnerComponent />}
            {recordData.isSuccess &&
                recordData.data.length !==0 ?<ResRecordComponent data={recordData.data} props={props} refreshing={refreshing} onRefresh={onRefresh} /> :
                <Text style={{ textAlign: 'center', fontSize: 17, margin: 20 }}>沒有預約記錄</Text>
            }
            {recordData.isError && <Text style={{ textAlign: 'center', fontSize: 17, margin: 20 }}>沒有預約記錄</Text>}
        </SafeAreaView>
    )
}


