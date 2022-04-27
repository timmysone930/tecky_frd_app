import React from 'react'
import { FlatList, View, Text, TouchableOpacity } from 'react-native';
import { DisplayOrderStatus } from "./DisplayOrderStatus"
import { styles } from "../../styles/RecordListStyle"
//Redux
import { store } from '../../redux/store';
import { setPrescriptionCode } from '../../redux/slice';

interface Props {
  data: Array<{
    pres_code: string,
    doctor: string,
    created_at: string,
    order_status: string
  }>,
  changePage: string,
  navigation: any
}

export const PrescriptionList = (props: Props) => {
  return (
      <FlatList
        data={props.data}
        renderItem={
          ({item})=> (
              <TouchableOpacity 
                style={[styles.box]}
                onPress={()=>{
                  store.dispatch(setPrescriptionCode({prescriptionCode: item.pres_code}))
                  props.navigation.navigate(props.changePage)
                }}
              >
                <View>
                  <Text style={[styles.resCode]}>{item.pres_code}</Text>
                  <Text style={[styles.resDoctor]}>醫生: {item.doctor}</Text>                   
                  <Text style={[styles.contentFont]}>開藥日期: {item.created_at}</Text>                   
                </View>
                <View>
                  <DisplayOrderStatus orderStatus={item.order_status}/>
                </View>
              </TouchableOpacity>
          )
        }
        keyExtractor={item => item.pres_code}
      />
  )
}