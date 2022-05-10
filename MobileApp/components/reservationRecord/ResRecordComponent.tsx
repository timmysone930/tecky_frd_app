import React from 'react'
import { FlatList, View, Text, TouchableOpacity, StyleSheet, RefreshControl } from 'react-native';
import { ResRecordStatus } from './ResRecordStatus';
import { styles } from '../../styles/RecordListStyle';

interface Props {
  data:readonly any[] | null | undefined,
  props:any,
  refreshing: boolean,
  onRefresh:() => void,
}

export const ResRecordComponent = (props: Props) => {
  return (
    <FlatList data={props.data} 
    refreshControl={ <RefreshControl refreshing={props.refreshing} onRefresh={props.onRefresh} /> }
      renderItem={
        ({ item }) => (
          <TouchableOpacity style={[styles.box]} onPress={() => { props.props.navigation.navigate("預約詳情界面", { screen: "預約詳情", params: { 'resCode': item.res_code, 'docCode':item.doc_code, 'data':{item} } }) }} >
            <View>
              <Text style={[styles.resCode]}>{item.res_code}</Text>
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