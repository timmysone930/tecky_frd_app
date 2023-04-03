import React from "react"
import { View, Text } from "react-native"
import { styles } from "../../styles/RecordListStyle"

interface Props {
    paymentStatus: string
}

export const DisplayPaymentStatus = (props: Props) => {
    //console.log(props);
    
    const statusColor: any = {
        "已付款": "#3333ff",
        "待付款": "#9999ff",
        "待發貨": "#92d66f",
        "已取": "#ff8000",
        "已取消": "#ff3333",
        "已送出": "#00cc00"
    }
    return (
        <>
        {Object.keys(statusColor).map((key) => (
            props.paymentStatus == key &&
            <View key={key} style={[styles.resStatus, { backgroundColor: statusColor[key] }]}>
                <Text style={[styles.resStatusFont]}>{key}</Text>
            </View>
        ))}
        </>
    )
}