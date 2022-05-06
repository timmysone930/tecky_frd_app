import React from 'react'
import { FlatList, View, Text, TouchableOpacity, StyleSheet, RefreshControl } from 'react-native';
import { ResRecordStatus } from './ResRecordStatus';


export const ReservationRecord = (props: any) => {

  return (
    <FlatList data={props.data} 
    refreshControl={ <RefreshControl refreshing={props.refreshing} onRefresh={props.onRefresh} /> }
      renderItem={
        ({ item }) => (
          <TouchableOpacity style={[styles.box]} onPress={() => { props.props.navigation.navigate("預約詳情界面", { screen: "預約詳情", params: { 'resCode': item.res_code, 'docCode':item.doc_code, 'data':{item} } }) }} >
            <View>
              <Text style={[styles.resCode]}>{item.res_code}</Text>
              {/* <Text style={[styles.resDoctor]}>醫生: {item.doc_code}</Text> */}
              <Text style={[styles.contentFont]}>預約日期: {item.res_date}</Text>
              <Text style={[styles.contentFont]}>預約時間: {item.res_time.substring(0,5)}</Text>
            </View>
            <View>
              <ResRecordStatus resStatus={item.status} />
            </View>
          </TouchableOpacity>
        )
      }
      keyExtractor={item => item.res_code}
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
    marginTop: 8,
  },
  resCode: {
    fontSize: 21,
    fontWeight: "800",
    marginBottom: 8,
    color: '#357899',
  },
  resDoctor: {
    fontSize: 17,
    fontWeight: "700",
    marginBottom: 10,
    color: '#4F527E',
  },
  contentFont: {
    fontSize: 15,
    fontWeight: '500',
    color: '#626262',
    marginBottom: 5,
  },
})