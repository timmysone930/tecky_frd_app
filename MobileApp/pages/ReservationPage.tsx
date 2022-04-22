import React, { useState } from 'react'
import { View, Text, SafeAreaView, ScrollView, StyleSheet, TextInput, Button, Alert } from 'react-native'
import { DrListCard } from '../components/doctor/DrListCard';
import { useForm, Controller } from "react-hook-form";
import { OnlyPickerComponent, PickerComponent, TimePickerComponent } from '../components/PickerComponent';

// Need to be removed; only for testing
import { FakeDrDATA } from './DrListPage';

export const ReservationPage = (props: any) => {
  // Form element
  const { control, handleSubmit, formState: { errors }, setValue } = useForm({
    defaultValues: { Name: '', reservedDate: '', reservedTime: '' }
  });
  const onSubmit = (data: any) => Alert.alert(JSON.stringify(data));
  // Date Selector
  const [selectedValue, setSelectedValue] = useState('請選擇應診日期');
  // Time Selector
  const [selectTimeValue, setSelectTimeValue] = useState('請選擇應診時間');
  // Date value change function
  const onValueChange = (itemValue: any, itemIndex: any) => {
    setSelectedValue(itemValue);
    setSelectTimeValue('請選擇應診時間');
    setValue("reservedDate", itemValue)
  };
// Time value change function
  const onTimeValueChange = (itemValue: any, itemIndex: any) => {
    setSelectTimeValue(itemValue);
    setValue("reservedTime", itemValue)
  };

  // To get the param passing from the previous screen
  const { id } = props.route.params;
  // Need to be removed; only for testing(will be replaced by fetch)
  let userData: any = {}
  FakeDrDATA.map((item) => {
    if (item['id'] === id) {
      userData = item
    }
  })

  return (
    <SafeAreaView style={{ backgroundColor: 'white', flex: 1 }}>
      <ScrollView contentInsetAdjustmentBehavior="automatic" style={{ backgroundColor: 'white' }}>
        {/* Doctor Info */}
        <View style={styles.drListCard}>
          <DrListCard props={userData} />
        </View>
        {/* Booking */}
        <View style={styles.pageMargin}>
          <Text style={styles.subTitle}>應診日期</Text>
          <Controller control={control}
            render={({ field: { value } }) => (
              <PickerComponent data={userData.availableDate} mode='date' onChange={onValueChange} selectedValue={selectedValue}
                dateValue={selectedValue} placeholder={'請選擇應診日期'} />
            )}
            name="reservedDate"
          />

          <Text style={styles.subTitle}>應診時間</Text>
          <Controller control={control}
            render={({ field: { value } }) => (
              <PickerComponent data={userData.availableDate} mode='time' onChange={onTimeValueChange} selectedValue={selectTimeValue}
                dateValue={selectedValue} placeholder={'請選擇應診時間'} />
            )}
            name="reservedTime"
          />

          <Text style={styles.subTitle}>應診者姓名</Text>
          <Controller control={control} rules={{ required: true, }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput style={styles.input} onBlur={onBlur} onChangeText={onChange} value={value} placeholder="姓名（須與身份證明文件相符）" placeholderTextColor="#737474" />
            )}
            name="Name"
          />
          {/* 必須填寫提示 */}
          {errors.Name && <Text style={styles.warning}>* 此項必須填寫</Text>}
          <Button title='Submit' onPress={handleSubmit(onSubmit)} />

        </View>
      </ScrollView>
    </SafeAreaView >
  )
}

const styles = StyleSheet.create({
  drListCard: {
    padding: 15,
    paddingTop: 25,
    marginBottom: 2,
    flexDirection: 'row',
    backgroundColor: 'white',
    shadowColor: '#E4E4E4',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    borderBottomColor: '#B5B5B5',
    borderBottomWidth: 0.8,
  },
  pageMargin: {
    padding: 15,
  },
  input: {
    borderColor: '#737474',
    padding: 10,
    borderWidth: 0.7,
    marginVertical: 8,
  },
  warning: {
    fontSize: 12,
    color: 'red',
    marginLeft: 5,
  },
  subTitle: {
    color: '#225D66',
    fontSize: 17,
    fontWeight: '600',
    marginTop: 5,
  }

});