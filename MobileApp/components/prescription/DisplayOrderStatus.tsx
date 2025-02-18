import React from "react"
import { View, Text } from "react-native"
import { styles } from "../../styles/RecordListStyle"

interface Props {
    orderStatus: string
}

export const DisplayOrderStatus = (props: Props) => {
    const statusColor: any = {
      "已付款": "#3333ff",
      "待付款": "#9999ff",
      "已取": "#ff8000",
      "已取消": "#ff3333",
      "已送出": "#00cc00"
    }
    return (
      <>    
        {Object.keys(statusColor).map((key)=> (
          props.orderStatus == key && 
          <View key={key} style={[styles.resStatus, {backgroundColor: statusColor[key]}]}>
            <Text style={[styles.resStatusFont]}>{key}</Text>
          </View>
        ))}
      </>
    )
}