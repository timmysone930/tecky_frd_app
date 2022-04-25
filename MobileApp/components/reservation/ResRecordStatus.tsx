import React from 'react'
import { View, Text, StyleSheet } from 'react-native';

export const ResRecordStatus = (props: any) => {
  const statusColor: any = {
    "已完成":"#ff8000",
    "已取消": "#ff3333",
    "待診中":"#00cc00",
  }

  return (
    <>    
      {Object.keys(statusColor).map((key, idx)=> (
        props.resStatus == key && 
        <View style={[styles.resStatus, {backgroundColor: statusColor[key]}]} key={`resRecordStatus_${idx}`}>
          <Text style={[styles.resStatusFont]}>{key}</Text>
        </View>
      ))}
    </>
  )
}

const styles = StyleSheet.create({
  resStatus: {
    alignItems: "center",
    justifyContent: 'center',
    backgroundColor: '#F3F3F3',
    height: 'auto',
    borderRadius: 4,
    marginRight: 5,

  },
  resStatusFont: {
    color: 'white',
    textAlign: 'center',
    fontWeight: '700',
    fontSize: 15,
    paddingVertical: 6,
    paddingHorizontal: 10,
  },
})