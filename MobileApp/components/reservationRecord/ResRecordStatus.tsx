import React from 'react'
import { View, Text } from 'react-native';
import { styles } from '../../styles/RecordListStyle';
interface statusType {
  finish: string; cancel: string; booked: string;
}

interface Props {
  resStatus: string
  approval_status: string
}

const statusColor: statusType = {
  "finish":"#ff8000",
  "cancel": "#ff3333",
  "booked":"#00cc00",
}

const statusText:statusType = {
  "finish":"已完成",
  "cancel": "已取消",
  "booked":"待診中",
}

export const ResRecordStatus = (props: Props) => {
  return (
    <>    
      { props.approval_status=="cancel"? 
      <View 
      style={[styles.resStatus, {backgroundColor: "#ff3333"}]} 
    >
      <Text style={[styles.resStatusFont]}>已取消</Text>
      </View>

      :
      Object.keys(statusColor).map((key , idx)=> (
        props.resStatus == key && 
        <View 
          style={[styles.resStatus, {backgroundColor: statusColor[key as keyof statusType]}]} 
          key={`resRecordStatus_${idx}`}
        >
          <Text style={[styles.resStatusFont]}>{statusText[key as keyof statusType]}</Text>
        </View>
      ))}
    </>
  )
}
