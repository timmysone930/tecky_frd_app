import React from 'react'
import { SafeAreaView, Text } from 'react-native';
import { useGetReservationListQuery } from '../API/PatientAPI';
import { SpinnerComponent } from '../components/NativeBase/SpinnerComponent';
// Components
import { ReservationRecord } from '../components/reservation/ReservationRecord';

export const ResRecordPage = (props: any) => {
    // white background
    const backgroundStyle = {
        backgroundColor: 'white',
    };
    // fetch the resRecord
    const recordData = useGetReservationListQuery();
    console.log(recordData.data)
    return (
        <SafeAreaView style={[backgroundStyle, { flex: 1 }]}>
            {recordData.isLoading&& <SpinnerComponent />}
            {recordData.isSuccess && 
            <ReservationRecord data={recordData.data}  props={props} />
            }
            {recordData.isError && <Text style={{textAlign:'center', fontSize:17, margin:20}}>沒有預約記錄</Text>}
        </SafeAreaView>
    )
}


