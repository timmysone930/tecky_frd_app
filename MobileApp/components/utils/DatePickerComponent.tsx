import React, { useState } from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import DateTimePickerModal from "react-native-modal-datetime-picker";

interface datePickerProps{
  setDateTitle:(item:string)=>void,
  DateTitle:string,
}

// Date
export const DatePickerComponent = (props: datePickerProps) => {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const showDatePicker = () => { setDatePickerVisibility(true); };
  const hideDatePicker = () => { setDatePickerVisibility(false); };
  const handleConfirm = (date: Date) => {
    const selectedDate = `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日`
    props.setDateTitle(selectedDate)
    hideDatePicker();
  };
  return (
    <View>
      <TouchableOpacity style={styles.input} onPress={showDatePicker} >
        <Text>{props.DateTitle === '' ? '請選擇你的生日日期' : props.DateTitle}</Text>
      </TouchableOpacity>
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  input: {
    borderColor: '#737474',
    padding: 10,
    borderWidth: 0.7,
    marginVertical: 12,
  }
});