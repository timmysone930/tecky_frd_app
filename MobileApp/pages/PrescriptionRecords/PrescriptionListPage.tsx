import React, { useState, useEffect } from 'react'
import { SafeAreaView, Text } from 'react-native';
// Components
import { PrescriptionList } from '../../components/prescription/PrescriptionList';

// Native-base
import { HStack, Spinner } from 'native-base';

// Redux
import { useSelector } from 'react-redux';

import Config from 'react-native-config';


export const PrescriptionListPage = ({navigation}:any) => {

  try {
    const userToken = useSelector((state: any) => state.getUserStatus.token);
    // white background
    const backgroundStyle = {
      backgroundColor: 'white',
    };
  
    const [fetchData, setFetchData] = useState(null as any)
    const dataFetching = async () => {
      const resp = await fetch (`${Config.REACT_APP_API_SERVER}/client/prescription-list`, {
        headers:{
          "Authorization":`Bearer ${userToken}`,
        }
      })
  
      if (resp.status != 200) {
        setFetchData("")
        return
      }
  
      const data = await resp.json()
      const dataToDisplay = data //.filter((item:any) => typeof item.prescription.payment == "string")
  
      dataToDisplay.length > 0 ? setFetchData(dataToDisplay): setFetchData([]);
    }
    
    useEffect(()=>{
        const unsubscribe = navigation.addListener('focus', () => {
          dataFetching()
        });
  
        return () => {unsubscribe}
    },[navigation])
  
    //console.log(fetchData);
  
    return (
        <SafeAreaView style={[backgroundStyle, { flex: 1 }]}>
          {fetchData != null && fetchData != "" &&
            <PrescriptionList 
              data={fetchData.filter( (v:any) => v.bill && Array.isArray(v.bill) && v.bill.length >= 1)} 
              changePage={"藥單詳情"}
              navigation={navigation}
            />
          }
  
          {fetchData == "" &&
            <Text style={{textAlign:'center', fontSize:17, margin:20}}>沒有藥單記錄</Text>
          }
  
          {
            fetchData == null &&
            // Loading Spinner
            <HStack space={2} justifyContent="center" alignItems={'center'}>
                <Spinner color="#225D66" accessibilityLabel="Loading posts" />
            </HStack>
          }
        </SafeAreaView>
    )
  
  } catch (error) {
    return (
      <>
      {JSON.stringify(error)}</>
    )
  }

}
