import React, { useState, useEffect } from 'react'
import { SafeAreaView } from 'react-native';
// Components
import { PrescriptionList } from '../../components/prescription/PrescriptionList';

// Native-base
import { HStack, Spinner, Heading } from 'native-base';

import Config from 'react-native-config';
import { Text } from 'react-native-svg';

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

  const [fetchData, setFetchData] = useState(null as any)
  const dataFetching = async () => {
    const resp = await fetch (`${Config.REACT_APP_API_SERVER}/client/prescription-list`)
    const data = await resp.json()
    setFetchData(data)
    console.log(data);
    console.log(data[0].spec);
  }

  const [fetched, setFetched] = useState(false)

  useEffect(()=>{
      if (!fetched) {
          dataFetching()
          setFetched(true)
      }
  },[])

  return (
      <SafeAreaView style={[backgroundStyle, { flex: 1 }]}>
        {fetched ?
          <PrescriptionList 
            data={fetchData} 
            changePage={"藥單詳情"}
            navigation={navigation}
          />
          :
          // Loading Spinner
          <HStack space={2} justifyContent="center" alignItems={'center'}>
              <Spinner color="#225D66" accessibilityLabel="Loading posts" />
              <Heading color="#225D66" fontSize="md">
                  Loading
              </Heading>
          </HStack>
        }
      </SafeAreaView>
  )
}
