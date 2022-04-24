import React from "react"
import { View, Text } from "react-native"
import { styles } from "../../pages/PrescriptionRecords/css/prescriptionPageCSS"

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
          <View style={[styles.orderStatus, {backgroundColor: statusColor[key]}]}>
            <Text style={[styles.orderStatusFont]}>{key}</Text>
          </View>
        ))}
      </>
    )
}