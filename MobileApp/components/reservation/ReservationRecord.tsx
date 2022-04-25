import React from 'react'
import { FlatList, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { ResRecordStatus } from './ResRecordStatus';



export const ReservationRecord = (props: any) => {
  return (
      <FlatList data={props.data}
        renderItem={
          ({item})=> (
              <TouchableOpacity  style={[styles.box]} onPress={props.changePage} >
                <View>
                  <Text style={[styles.resCode]}>{item.record_code}</Text>
                  <Text style={[styles.resDoctor]}>醫生: {item.doctor}</Text>                   
                  <Text style={[styles.contentFont]}>預約日期: {item.res_date}</Text>        
                  <Text style={[styles.contentFont]}>預約時間: {item.res_time}</Text>               
                </View>
                <View>
                  <ResRecordStatus resStatus={item.res_status}/>
                </View>
              </TouchableOpacity>
          )
        }
        keyExtractor={item => item.record_code}
      />
  )
}

const styles = StyleSheet.create({
  box: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomColor: 'rgba(0, 0, 0, 0.4)',
    borderBottomWidth: 1,
    padding: 12,
    marginHorizontal: 10,
    marginTop:8,
  },
  resCode: {
    fontSize: 21, 
    fontWeight: "800",
    marginBottom:8,
    color:'#357899',
  },
  resDoctor:{
    fontSize: 17, 
    fontWeight: "700",
    marginBottom:10,
    color:'#4F527E',
  },
  contentFont: {
    fontSize: 15,
    fontWeight:'500',
    color:'#626262',
    marginBottom:5,
  },
})