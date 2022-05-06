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
    doctor_name: string,
    created_at: string,
    order_status: string,
    prescription: any
  }>,
  changePage: string,
  navigation: any
}

export const statueDisplay : any = {
  paied: "已付款",
  waiting: "待付款",
  cancel: "已取消",
  sended: "已送出",
  received: "已取"
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
                  store.dispatch(setPrescriptionCode({prescriptionCode: item.prescription.pres_code}))
                  props.navigation.navigate(props.changePage)
                }}
              >
                <View>
                  <Text style={[styles.resCode]}>{item.prescription.pres_code}</Text>
                  <Text style={[styles.resDoctor]}>醫生: {item.doctor_name}</Text>                   
                  <Text style={[styles.contentFont]}>開藥日期: {item.prescription.created_at.split("T")[0]}</Text>                   
                </View>
                <View>
                  <DisplayOrderStatus orderStatus={statueDisplay[item.prescription.order_status]}/>
                </View>
              </TouchableOpacity>
          )
        }
        keyExtractor={item => item.prescription.pres_code}
      />
  )
}