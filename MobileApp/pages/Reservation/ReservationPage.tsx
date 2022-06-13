import React, { useEffect, useState } from 'react'
import { View, Text, SafeAreaView, ScrollView, StyleSheet, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, RefreshControl } from 'react-native'
import { DocListComponent } from '../../components/doctor/DocListComponent';
import { useForm, Controller } from "react-hook-form";
import { store } from '../../redux/store';
import { setFormData, setMemberCode } from '../../redux/slice';
import { DropdownSelectComponent } from '../../components/utils/DropdownSelectComponent';
import { useGetRosterListByDocCodeQuery } from '../../API/DoctorAPI';
import { SpinnerComponent } from '../../components/utils/SpinnerComponent';
import { ResDateComponent } from '../../components/reservation/ResDateComponent';
import { ResSessionComponent } from '../../components/reservation/ResSessionComponent';
import { useGetUserInfoQuery } from '../../API/UserInfoAPI';
import Config from "react-native-config";
import { ReservationSubmitType1, ReservationSubmitType2, ReservationType } from './ResType';
import { styles } from '../../styles/GeneralStyles'
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { wait } from '../ResRecordPage';
// fetch to check patient status
const checkPatient = async (id: string, token: string) => {
  try {
    const response = await fetch(`${Config.REACT_APP_API_SERVER}/patient/${id}`,
      {
        headers: {
          "Authorization": `Bearer ${token}`,
        },
      }
    );
    if(response.status === 200){
      const json = await response.json();
      console.log('json', json)
      return { message: 'Found', memberCode: json.member_code }
    }else{
      return { message: 'Not Found' }
    }
  } catch (error) {
    console.error(error);
  }
};
// 稱謂
const titleArr = ['先生', '小姐', '女士']
// 身份證明文件
const idTypeArr = ['香港身份證', '香港出生證明書（非香港身份證持有人）', '領事團身份證', '持有申請香港身份證收據', '豁免登記證明書']

export const ReservationPage = (props: any) => {
  // to get the JWT token
  const userToken = useSelector((state: any) => state.getUserStatus.token);
  // get current users profile
  const userData = useGetUserInfoQuery(userToken)
  // To get the param passing from the previous screen
  const { id, docData } = props.route.params;
  // Form element
  const { control, handleSubmit, formState: { errors }, setValue, getValues, reset } = useForm({
    defaultValues: { name: '', reservedDate: '', reservedTime: '', reservedSession: '', idType: '香港身份證', idNumber: '', title: '' }
  });
  // Title value change function
  const onTitleChange = (itemValue: string) => { setValue("title", itemValue) };
  // Roster ID Selector
  const [selectedRoster, setSelectedRoster] = useState('');
  // Date value change function
  const onValueChange = (itemValue: string) => {
    setSelectedRoster(itemValue);
    setValue("reservedDate", itemValue)
    setValue("reservedTime", '')
  };
  // Time value change function
  const onTimeValueChange = (itemValue: string) => {
    setSelectedRoster(itemValue);
    setValue("reservedTime", itemValue)
  };
  // Session value change
  const onSessionChange = (itemValue: string) => { setValue("reservedSession", itemValue) };
  // id value change function
  const onIDValueChange = (itemValue: string) => { setValue("idType", itemValue) };
  // to get the roster data
  const rosterData = useGetRosterListByDocCodeQuery(id)
  // Form data submit and navigate
  const onSubmit = async (data: ReservationType) => {
    let patientStatus: ReservationSubmitType1 | ReservationSubmitType2 | undefined = await checkPatient(data.idNumber, userToken)
    if (patientStatus?.message === 'Not Found') {
      props.navigation.navigate({ name: '上傳身份證明文件' })
      store.dispatch(setFormData(data))
    } else if (patientStatus?.message === 'Found') {
      props.navigation.navigate({ name: '健康申報表' })
      store.dispatch(setFormData(data))
      store.dispatch(setMemberCode({ memberCode: patientStatus?.memberCode }))
    }
  }
  // refetch
  const [refreshing, setRefreshing] = React.useState(false);
  const onRefresh = React.useCallback(() => {
      try {
          setRefreshing(true);
          rosterData.refetch();
          setValue('reservedDate','');
          setValue('reservedTime','');
          setValue('reservedSession','');
          wait(2000).then(() => setRefreshing(false));

      } catch (e) {
          console.log(e)
      }
  }, []);
  

  // refetch by navigation
  const navigation = useNavigation();
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      rosterData.refetch();
    });

    return () => { unsubscribe }
  }, [navigation])
  // auto input login users info once
  useEffect(() => {
    const updateUserInfo = async () => {
      if (userData.isSuccess) {
        await setValue('name', userData.data.name)
        await setValue('idNumber', userData.data.id_number)
        setSelectedRoster('Updated');
      }
    }
    updateUserInfo();
  }, [userData.isSuccess]);

  return (
    <SafeAreaView style={{ backgroundColor: 'white', flex: 1 }}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.container}
      >
        <ScrollView contentInsetAdjustmentBehavior="automatic" style={{ backgroundColor: 'white'}} 
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        }
        >
          <View style={styles.drListCard}>
            <DocListComponent props={docData} />
          </View>
          {rosterData.isLoading && userData.isLoading && <SpinnerComponent />}
          {rosterData.isSuccess && userData.isSuccess &&

            <View style={[styles.pageMargin,{paddingBottom:'15%'}]}>
              <Text style={styles.subTitle}>應診日期</Text>
              <Controller control={control} rules={{ required: true, }}
                render={({ field: { value } }) => (
                  <ResDateComponent onChange={onValueChange} data={rosterData.currentData} mode='date' placeholder={'請選擇應診日期'}
                    dateValue={getValues('reservedDate')}
                  />
                )}
                name="reservedDate"
              />
              {errors.reservedDate && <Text style={styles.warning}>* 此項必須選擇</Text>}

              <Text style={styles.subTitle}>應診時段</Text>
              <Controller control={control} rules={{ required: true, }}
                render={({ field: { value } }) => (
                  <ResDateComponent onChange={onTimeValueChange} data={rosterData.currentData} mode='time' placeholder={'請選擇應診時段'}
                    dateValue={getValues('reservedDate')}
                  />
                )}
                name="reservedTime"
              />
              {errors.reservedTime && <Text style={styles.warning}>* 此項必須選擇</Text>}

              <Text style={styles.subTitle}>應診時間</Text>
              <Controller control={control} rules={{ required: true, }}
                render={({ field: { value } }) => (
                  <ResSessionComponent onChange={onSessionChange} placeholder={'請選擇應診時間'} timeValue={getValues('reservedTime')} userToken={userToken}
                  />
                )}
                name="reservedSession"
              />
              {errors.reservedSession && <Text style={styles.warning}>* 此項必須選擇</Text>}

              <View style={{ borderBottomColor: '#B5B5B5', borderBottomWidth: 0.8, marginTop: 5, marginBottom: 10, }}>
                <Text style={styles.subTitle}>問診費用： ${Config.Res_code}</Text>
                <Text style={styles.infoText}>（此費用不包括醫生處方藥物）</Text>
              </View>

              <Text style={styles.subTitle}>稱謂</Text>
              <Controller control={control} rules={{ required: true, }}
                render={({ field: { value } }) => (
                  <DropdownSelectComponent placeholder={'請選擇稱謂'} data={titleArr} onChange={onTitleChange} mode='other'
                    selectedValue={getValues('title')}
                  />
                )}
                name="title"
              />
              {/* 必須填寫提示 */}
              {errors.title && <Text style={styles.warning}>* 此項必須選擇</Text>}

              <Text style={styles.subTitle}>應診者姓名</Text>
              <Controller control={control} rules={{ required: true, }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput style={styles.input} onBlur={onBlur} onChangeText={onChange} value={value} placeholder="姓名（須與身份證明文件相符）" placeholderTextColor="#737474" />
                )}
                name="name"
              />
              {errors.name && <Text style={styles.warning}>* 此項必須填寫</Text>}
              <Text style={styles.subTitle}>身份證明文件</Text>
              <Controller control={control}
                render={({ field: { value } }) => (
                  <DropdownSelectComponent placeholder={'請選擇身份證明文件類別'} data={idTypeArr} onChange={onIDValueChange} mode='id'
                    selectedValue={getValues('idType')}
                  />
                )}
                name="idType"
              />
              <Controller control={control} rules={{ required: true, pattern:/^[A-Za-z0-9_-]*$/}}
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput style={styles.input} onBlur={onBlur} onChangeText={onChange} value={value} placeholder="身份證明文件號碼" placeholderTextColor="#737474" />
                )}
                name="idNumber"
              />
              {errors.idNumber && <Text style={styles.warning}>* 此項必須正確填寫（應為英文字母及數字組成）</Text>}
            </View>
          }
        </ScrollView>
      </KeyboardAvoidingView>
      {/* Button to go back and next page */}
      <View style={{ flexDirection: 'row' }}>
        <TouchableOpacity style={styles.button} onPress={() => props.navigation.navigate({ name: '醫生' })}>
          <Text style={styles.buttonText}>返回主頁</Text></TouchableOpacity>
        <TouchableOpacity style={[styles.button, { backgroundColor: '#325C80' }]}
          onPress={handleSubmit(onSubmit)}
        >
          <Text style={styles.buttonText}>下一步</Text></TouchableOpacity>
      </View>
    </SafeAreaView >
  )
}