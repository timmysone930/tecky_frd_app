import React from 'react'
import { SafeAreaView } from 'react-native';
// Components
import { PrescriptionList } from '../../components/prescription/PrescriptionList';

// Fake Data for development
const FakeData = [
  {
    pres_code: "RM220319001",
    created_at: "2022年3月19日",
    order_status: "已付款",
    doctor: "陳大文 Chan Tai Man",
  },
  {
    pres_code: "RM222329012",
    doctor: "陳大文 Chan Tai Man",
    created_at: "2022年3月12日",
    order_status: "待付款"
  },
  {
    pres_code: "RM220315012",
    doctor: "陳大文 Chan Tai Man",
    created_at: "2022年3月6日",
    order_status: "已取"
  },
  {
    pres_code: "RM221501203",
    doctor: "陳大文 Chan Tai Man",
    created_at: "2022年3月6日",
    order_status: "已取消"
  },
  {
    pres_code: "RM220190132",
    doctor: "陳大文 Chan Tai Man",
    created_at: "2022年3月1日",
    order_status: "已送出"
  },
]


export const PrescriptionListPage = ({navigation}:any) => {
  // white background
  const backgroundStyle = {
    backgroundColor: 'white',
  };

  return (
      <SafeAreaView style={[backgroundStyle, { flex: 1 }]}>
        <PrescriptionList data={FakeData} changePage={()=>{navigation.navigate("藥單詳情")}}/>
      </SafeAreaView>
  )
}
