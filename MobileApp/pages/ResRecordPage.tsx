import React from 'react'
import { SafeAreaView } from 'react-native';
// Components
import { ReservationRecord } from '../components/reservation/ReservationRecord';

// Fake Data for development
const FakeData = [
    {
        record_code: "RM220319001",
        doctor: "陳大文 Chan Tai Man",
        res_date: "2022年3月19日",
        res_time: '10:30 - 11:00',
        res_status: "已完成",
    },
    {
        record_code: "RM222329012",
        doctor: "陳大文 Chan Tai Man",
        res_date: "2022年3月12日",
        res_time: '10:30 - 11:00',
        res_status: "待診中"
    },
    {
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
    return (
        <SafeAreaView style={[backgroundStyle, { flex: 1 }]}>
            <ReservationRecord data={FakeData} changePage={() => { props.navigation.navigate("主頁") }} />
        </SafeAreaView>
    )
}
