import React from 'react'
import { SafeAreaView, Text } from 'react-native';
import { useGetReservationListQuery } from '../API/PatientAPI';
import { SpinnerComponent } from '../components/NativeBase/SpinnerComponent';
// Components
import { ReservationRecord } from '../components/reservation/ReservationRecord';

// Fake Data for development
export const FakeRecordData = [
    {
        id:1,
        record_code: "RM220319001",
        doctor: "陳大文 Chan Tai Man",
        res_date: "2022年3月19日",
        res_time: '10:30 - 11:00',
        res_status: "已完成",
    },
    {
        id:2,
        record_code: "RM222329012",
        doctor: "陳大文 Chan Tai Man",
        res_date: "2022年3月12日",
        res_time: '10:30 - 11:00',
        res_status: "待診中"
    },
    {
        id:3,
        record_code: "RM220315012",
        doctor: "陳大文 Chan Tai Man",
        res_date: "2022年3月6日",
        res_time: '10:30 - 11:00',
        res_status: "已取消"
    },
]

export const ResRecordPage = (props: any) => {
    // white background
    const backgroundStyle = {
        backgroundColor: 'white',
    };
    // fetch the resRecord
    const recordData = useGetReservationListQuery();
    console.log(recordData)
    return (
        <SafeAreaView style={[backgroundStyle, { flex: 1 }]}>
            {recordData.isLoading&& <SpinnerComponent />}
            {recordData.isSuccess && 
            <ReservationRecord data={FakeRecordData}  props={props} />
            }
            {recordData.isError && <Text style={{textAlign:'center', fontSize:17, margin:20}}>沒有預約記錄</Text>}
        </SafeAreaView>
    )
}


