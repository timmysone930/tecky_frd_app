import React from 'react'
import {
  View, Text, SafeAreaView, FlatList, StyleSheet, Image
} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
1

const FakeData = [
  {
    pres_code: "RM220319001",
    doctor: "陳大文 Chan Tai Man",
    created_at: "2022年3月19日",
    order_status: "已付款"
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



export const PrescriptionListPage = (props:any) => {
  // white background
  const backgroundStyle = {
    backgroundColor: 'white',
  };
  
  const statusColor: any = {
    "已付款": "#3333ff",
    "待付款": "#9999ff",
    "已取": "#ff8000",
    "已取消": "#ff3333",
    "已送出": "#00cc00"
  }

  return (
      <SafeAreaView style={[backgroundStyle, { flex: 1 }]}>
          <View style={[backgroundStyle, { flex: 1 }]}>
              <FlatList
                  data={FakeData}
                  renderItem={
                    ({item})=> (
                      
                      <View style={{
                        borderBottomColor: 'rgba(0, 0, 0, 0.4)',
                        borderBottomWidth: 1,
                      }}>
                        <TouchableOpacity style={{
                        flexDirection: "row", 
                        justifyContent: "space-between",
                        alignItems: "center",
                        
                        padding: 12}}>
                          <View>
                            <Text style={{fontSize: 20, fontWeight: "bold"}}>{item.pres_code}</Text>
                            <Text>醫生: {item.doctor}</Text>                   
                            <Text>開藥日期: {item.created_at}</Text>                   
                          </View>
                          <View>
                            {
                              Object.keys(statusColor).map((key)=> (
                                item.order_status == key && 
                                <View style={
                                  {backgroundColor: statusColor[key],
                                  height: 40, 
                                  width: 80,
                                  justifyContent: "center",
                                  alignItems: "center"}}>
                                  <Text style={{color: "#fff", fontSize: 20}}>{key}</Text>
                                </View>
                              ))
                            }
                            <View></View>
                          </View>
                        </TouchableOpacity>
                      </View>
                    )
                  }
                  keyExtractor={item => item.pres_code}
              />
          </View>
      </SafeAreaView>
  )
}
