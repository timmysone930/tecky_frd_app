import React from 'react'
import { FlatList, View, Text, TouchableOpacity } from 'react-native';
import { DisplayOrderStatus } from "./DisplayOrderStatus"
import { styles } from "../../pages/PrescriptionRecords/styles/prescriptionPageStyles"

interface Props {
  data: Array<{
    pres_code: string,
    doctor: string,
    created_at: string,
    order_status: string
  }>,
  changePage: ()=> void,
}

export const PrescriptionList = (props: Props) => {
  return (
      <FlatList
        data={props.data}
        renderItem={
          ({item})=> (
              <TouchableOpacity 
              style={[styles.box]}
              onPress={props.changePage}
              >
                <View>
                  <Text style={[styles.prescriptionCode]}>{item.pres_code}</Text>
                  <Text style={[styles.contentFont]}>醫生: {item.doctor}</Text>                   
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