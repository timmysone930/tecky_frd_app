import React, { useEffect, useState } from 'react'
import { View, Text, SafeAreaView, ScrollView, StyleSheet, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native'
import { DrListCard } from '../../components/doctor/DrListCard';
import { useForm, Controller } from "react-hook-form";
import { useSelector } from 'react-redux';
import { store } from '../../redux/store';
import { setFormData } from '../../redux/slice';
import { BaseSelectComponent } from '../../components/NativeBase/BaseSelectComponent';
import { useGetRosterListByDocCodeQuery } from '../../API/DoctorAPI';
import { SpinnerComponent } from '../../components/NativeBase/SpinnerComponent';

export const ReservationPage = (props: any) => {
  // To get the param passing from the previous screen
  const { id, docData } = props.route.params;
  // Form element
  const { control, handleSubmit, formState: { errors }, setValue, getValues } = useForm({
    defaultValues: { name: '', reservedDate: '請選擇應診日期', reservedTime: '請選擇應診時間', idType: '香港身份證', idNumber: '', EmergencyContactName: '', EmergencyContactPhone: '' }
  });
  // Form data submit and navigate
  const onSubmit = (data: any) => {
    props.navigation.navigate({ name: '上傳身份證明文件' })
    store.dispatch(setFormData(data))
  }
  // Date Selector
  const [selectedValue, setSelectedValue] = useState('請選擇應診日期');

  // Date value change function
  const onValueChange = (itemValue: any, itemIndex: any) => {
    setSelectedValue(itemValue);
    setValue("reservedDate", itemValue)
    setValue("reservedTime", '請選擇應診時間')
  };

  // Time value change function
  const onTimeValueChange = (itemValue: any, itemIndex: any) => {
    setValue("reservedTime", itemValue)
  };

  // 身份證明文件
  const idTypeArr = ['香港身份證', '香港出生證明書（非香港身份證持有人）', '領事團身份證', '持有申請香港身份證收據', '豁免登記證明書']
  // id value change function
  const onIDValueChange = (itemValue: any, itemIndex: any) => {
    setValue("idType", itemValue)
  };

  const rosterData = useGetRosterListByDocCodeQuery(id)
  // let availableDate = [{ id: 1, date: '2022-05-03', time: ['10:00 - 10:30', '10:30 - 11:00', '11:00 - 11:30'] },
  // { id: 2, date: '2022-05-05', time: ['10:00 - 10:30', '10:30 - 11:00', '11:00 - 11:30'] },
  // { id: 3, date: '2022-05-07', time: ['10:00 - 10:30', '10:30 - 11:00', '11:00 - 11:30'] },
  // ]


  console.log(rosterData)
  // { rosterData.isSuccess && console.log(rosterData) }

  return (
    <SafeAreaView style={{ backgroundColor: 'white', flex: 1 }}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
      >
        <ScrollView contentInsetAdjustmentBehavior="automatic" style={{ backgroundColor: 'white' }}>
          {/* Doctor Info */}
          <View style={styles.drListCard}>
            <DrListCard props={docData} />
          </View>
          {rosterData.isLoading && <SpinnerComponent />}

          <View style={styles.pageMargin}>
            <Text style={styles.subTitle}>應診日期</Text>

            {/* <Controller control={control} rules={{ required: true, }}
            render={({ field: { value } }) => (
                <BaseSelectComponent placeholder={'請選擇應診日期'} data={userData.availableDate} onChange={onValueChange} mode='date'
                  selectedValue={getValues('reservedDate')} dateValue={getValues('reservedDate')}
                />
            )}
            name="reservedDate"
          /> */}
            {/* 必須填寫提示 */}
            {errors.reservedDate && <Text style={styles.warning}>* 此項必須選擇</Text>}

            <Text style={styles.subTitle}>應診時間</Text>

            {/* <Controller control={control} rules={{ required: true, }}
            render={({ field: { value } }) => (
                <BaseSelectComponent placeholder={'請選擇應診時間'} data={userData.availableDate} onChange={onTimeValueChange} mode='time'
                selectedValue={getValues('reservedTime')} dateValue={getValues('reservedDate')}
              />
            )}
            name="reservedTime"
          /> */}
            {/* 必須填寫提示 */}
            {errors.reservedTime && <Text style={styles.warning}>* 此項必須選擇</Text>}

            <View style={{ borderBottomColor: '#B5B5B5', borderBottomWidth: 0.8, marginTop: 5, marginBottom: 10, }}>
              <Text style={styles.subTitle}>問診費用： $100.00</Text>
              <Text style={styles.infoText}>（此費用不包括醫生處方藥物）</Text>
            </View>

            <Text style={styles.subTitle}>應診者姓名</Text>
            <Controller control={control} rules={{ required: true, }}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput style={styles.input} onBlur={onBlur} onChangeText={onChange} value={value} placeholder="姓名（須與身份證明文件相符）" placeholderTextColor="#737474" />
              )}
              name="name"
            />
            {/* 必須填寫提示 */}
            {errors.name && <Text style={styles.warning}>* 此項必須填寫</Text>}
            <Text style={styles.subTitle}>身份證明文件</Text>
            <Controller control={control}
              render={({ field: { value } }) => (
                <BaseSelectComponent placeholder={'請選擇身份證明文件類別'} data={idTypeArr} onChange={onIDValueChange} mode='id'
                  selectedValue={getValues('idType')} dateValue={''}
                />
              )}
              name="idType"
            />
            <Controller control={control} rules={{ required: true, }}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput style={styles.input} onBlur={onBlur} onChangeText={onChange} value={value} placeholder="身份證明文件號碼" placeholderTextColor="#737474" />
              )}
              name="idNumber"
            />
            {/* 必須填寫提示 */}
            {errors.idNumber && <Text style={styles.warning}>* 此項必須填寫</Text>}
            <Text style={styles.subTitle}>緊急聯絡人</Text>
            <Controller control={control} rules={{ required: true, }}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput style={styles.input} onBlur={onBlur} onChangeText={onChange} value={value} placeholder="緊急聯絡人姓名" placeholderTextColor="#737474" />
              )}
              name="EmergencyContactName"
            />
            {/* 必須填寫提示 */}
            {errors.EmergencyContactName && <Text style={styles.warning}>* 此項必須填寫</Text>}
            <Controller control={control} rules={{ required: true, }}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput keyboardType={'numeric'} style={[styles.input, { marginBottom: 45 }]} onBlur={onBlur} onChangeText={onChange} value={value} placeholder="緊急聯絡人電話" placeholderTextColor="#737474" />
              )}
              name="EmergencyContactPhone"
            />
            {/* 必須填寫提示 */}
            {errors.EmergencyContactPhone && <Text style={styles.warning}>* 此項必須填寫</Text>}
          </View>

        </ScrollView>
      </KeyboardAvoidingView>
      {/* Button to go back and next page */}
      <View style={{ flexDirection: 'row' }}>
        <TouchableOpacity style={styles.button} onPress={() => props.navigation.navigate({ name: '主頁' })}>
          <Text style={styles.buttonText}>返回主頁</Text></TouchableOpacity>
        <TouchableOpacity style={[styles.button, { backgroundColor: '#325C80' }]}
          onPress={handleSubmit(onSubmit)}
        >
          <Text style={styles.buttonText}>下一步</Text></TouchableOpacity>
      </View>
    </SafeAreaView >
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
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
    marginTop: 8,
  },
  infoText: {
    color: '#C32D3A',
    fontSize: 12,
    fontWeight: '400',
    marginTop: 5,
    marginBottom: 15,
  },
  button: {
    width: '50%',
    backgroundColor: '#6d7f99',
    paddingVertical: 16,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 16,
  }

});