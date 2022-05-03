import React, { useEffect, useState } from 'react'
import { View, Text, SafeAreaView, ScrollView, StyleSheet, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native'
import { DrListCard } from '../../components/doctor/DrListCard';
import { useForm, Controller } from "react-hook-form";
import { store } from '../../redux/store';
import { setFormData, setMemberCode } from '../../redux/slice';
import { BaseSelectComponent } from '../../components/NativeBase/BaseSelectComponent';
import { useGetRosterListByDocCodeQuery } from '../../API/DoctorAPI';
import { SpinnerComponent } from '../../components/NativeBase/SpinnerComponent';
import { ResDateComponent } from '../../components/doctor/ResDateComponent';
// fetch to check patient status
const checkPatient = async (id: any) => {
  try {
    const response = await fetch(
      `http://192.168.0.113:3001/patient/search?column=hkid&where=${id}`
    );
    const json = await response.json();
    if (json.message && json.message === 'Not Found') {
      return { message: 'Not Found' }
    } else {
      console.log(json[0].member_code)
      return { message: 'Found', memberCode: json[0].member_code }
    }
  } catch (error) {
    console.error(error);
  }
};

export const ReservationPage = (props: any) => {
  // To get the param passing from the previous screen
  const { id, docData } = props.route.params;
  // Form element
  const { control, handleSubmit, formState: { errors }, setValue, getValues } = useForm({
    defaultValues: { name: '', reservedDate: '', reservedTime: '', reservedSession: '', idType: '香港身份證', idNumber: '', title: '' }
  });
  // 稱謂
  const titleArr = ['先生', '小姐', '女士']
  // Title value change function
  const onTitleChange = (itemValue: any) => { setValue("title", itemValue) };
  // Roster ID Selector
  const [selectedRoster, setSelectedRoster] = useState('');
  // Date value change function
  const onValueChange = (itemValue: any) => {
    setSelectedRoster(itemValue);
    setValue("reservedDate", itemValue)
    setValue("reservedTime", '')
    // setValue("reservedSession", '')
  };
  // Time value change function
  const onTimeValueChange = (itemValue: any) => {
    setSelectedRoster(itemValue);
    setValue("reservedTime", itemValue)
  };
  // Session value change
  const onSessionChange = (itemValue: any) => {
    setValue("reservedSession", itemValue)
  };

  // 身份證明文件
  const idTypeArr = ['香港身份證', '香港出生證明書（非香港身份證持有人）', '領事團身份證', '持有申請香港身份證收據', '豁免登記證明書']
  // id value change function
  const onIDValueChange = (itemValue: any, itemIndex: any) => {
    setValue("idType", itemValue)
  };

  const rosterData = useGetRosterListByDocCodeQuery(id)

  // Form data submit and navigate
  const onSubmit = async (data: any) => {
    let patientStatus: any = await checkPatient(data.idNumber)
    if (patientStatus.message === 'Not Found') {
      props.navigation.navigate({ name: '上傳身份證明文件' })
      store.dispatch(setFormData(data))
    } else if (patientStatus.message === 'Found') {
      props.navigation.navigate({ name: '健康申報表' })
      store.dispatch(setFormData(data))
      store.dispatch(setMemberCode({ memberCode: patientStatus.memberCode }))
    }
  }

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
          {rosterData.isSuccess &&

            <View style={styles.pageMargin}>
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
                  // <ResSessionComponent data={rosterData.currentData} placeholder={'請選擇應診時間'} onChange={onSessionChange} />
                  <ResDateComponent onChange={onSessionChange} data={rosterData.currentData} mode='session' placeholder={'請選擇應診時間'}
                    dateValue={getValues('reservedDate')} timeValue={getValues('reservedTime')}
                  />

                )}
                name="reservedSession"
              />
              {errors.reservedSession && <Text style={styles.warning}>* 此項必須選擇</Text>}

              <View style={{ borderBottomColor: '#B5B5B5', borderBottomWidth: 0.8, marginTop: 5, marginBottom: 10, }}>
                <Text style={styles.subTitle}>問診費用： ${docData.video_diag_fee}</Text>
                <Text style={styles.infoText}>（此費用不包括醫生處方藥物）</Text>
              </View>

              <Text style={styles.subTitle}>稱謂</Text>
              <Controller control={control} rules={{ required: true, }}
                render={({ field: { value } }) => (
                  <BaseSelectComponent placeholder={'請選擇稱謂'} data={titleArr} onChange={onTitleChange} mode='other'
                    selectedValue={getValues('title')} dateValue={''}
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
            </View>
          }
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