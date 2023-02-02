import {QueryReturnValue} from '@reduxjs/toolkit/dist/query/baseQueryTypes';
import {Checkbox, useToast} from 'native-base';
import React, {useEffect, useRef, useState} from 'react';
import {Controller, useForm} from 'react-hook-form';
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Image,
  TextInput,
  ScrollView,
} from 'react-native';
import {
  useGetLoginSMSMutation,
  useGetNotUserSMSMutation,
  usePostRegisterInfoMutation,
} from '../../API/AuthAPI';
import {DropdownSelectComponent} from '../../components/utils/DropdownSelectComponent';
import {BottomLineComponent} from '../../components/utils/BottomLineComponent';
import {DatePickerComponent} from '../../components/utils/DatePickerComponent';
import {checkStatus, setUserInfo} from '../../redux/AuthSlice';
import {store} from '../../redux/store';
import {RegisterSubmitProp} from './AuthType';
import {styles} from '../../styles/AuthStyle';
import OneSignal from 'react-native-onesignal';
// white background
const backgroundStyle = {backgroundColor: 'white'};
// 稱謂
const titleArr = ['先生', '小姐', '女士'];
// 電話Code
const phoneCodeArr = ['852', '853', '86'];
// 身份證明文件
const idTypeArr = [
  '香港身份證',
  '香港出生證明書（非香港身份證持有人）',
  '領事團身份證',
  '持有申請香港身份證收據',
  '豁免登記證明書',
];
const countTime = 30;

export const RegisterPage = (props: any) => {
  const toast = useToast();
  // Form element
  const {
    control,
    handleSubmit,
    formState: {dirtyFields, errors},
    setValue,
    getValues,
  } = useForm({
    defaultValues: {
      regTitle: '',
      regName: '',
      regName_en: '',
      regIDType: '',
      regIDNumber: '',
      regBDay: '',
      regEmail: '',
      phoneCode: '852',
      regPhone: '',
      regSMS: '',
      regPolicyOne: [],
      regPolicyTwo: [],
    },
  });

  // id value change function
  const onIDValueChange = (itemValue: string) => {
    setValue('regIDType', itemValue);
  };
  // Date value change function
  const onDateChange = (itemValue: string) => {
    setValue('regBDay', itemValue);
  };
  // Title value change function
  const onTitleChange = (itemValue: string) => {
    setValue('regTitle', itemValue);
  };
  // Phone value change function
  const onPhoneCodeChange = (itemValue: string) => {
    setValue('phoneCode', itemValue);
  };

  // Multi Box
  const [groupValues, setGroupValues] = React.useState([]);
  const [groupValues2, setGroupValues2] = React.useState([]);
  // SMS function
  const [getLoginSMS] = useGetLoginSMSMutation();
  const [getNotUserSMS] = useGetNotUserSMSMutation();
  const [counter, setCounter] = useState(countTime);
  const [sendCodeBtn, setSendCodeBtn] = useState({
    isDisable: false,
  });

  useEffect(() => {
    console.log(groupValues2);
  }, [groupValues2]);

  const intervalId = useRef(0 as any);
  const onSMSPress = async (inputData: any) => {
    // Reset counter to 60s
    setCounter(countTime);
    // Activate 60s count down and Disable the button
    setSendCodeBtn({
      isDisable: true,
    });
    let t = countTime;
    intervalId.current = setInterval(() => {
      t = t - 1;
      setCounter(t);
      if (t < 0) {
        clearInterval(intervalId.current);
        setSendCodeBtn({
          isDisable: false,
        });
      }
    }, 1000);
    // Fetching
    try {
      let phoneString = getValues('phoneCode') + getValues('regPhone');
      const res: QueryReturnValue = await getNotUserSMS({
        phone: parseInt(phoneString),
      });
      console.log('SMSres', res);
      toast.show({
        description: '已送出驗證碼，請查閱短訊',
      });
      toast.show({
        description: `已送出驗證碼，請查閱短訊`,
        duration: 12000,
      });
    } catch (e) {
      console.log(e);
    }
  };
  // const onSMSPress = async () => {
  //     try {
  //         let phoneString = getValues('phoneCode') + getValues('regPhone')
  //         const res: QueryReturnValue = await getLoginSMS({ 'phone': parseInt(phoneString) })
  //     } catch (e) {
  //         console.log(e)
  //     }
  // }
  // Register
  const [postRegisterInfo] = usePostRegisterInfoMutation();
  const onSubmit = async (data: RegisterSubmitProp) => {
    console.log('submitting...');

    let registerData = {
      id_type: data.regIDType,
      id_number: data.regIDNumber,
      name: data.regName,
      name_en: data.regName_en,
      gender: data.regTitle,
      birthday: data.regBDay,
      email: data.regEmail,
      phone: data.phoneCode + data.regPhone,
      smsCode: data.regSMS,
    };

    const res: any = await postRegisterInfo(registerData);
    // check the login status
    if (res['error']) {
      if (res['error']['data']['message'] === 'Repeated ID') {
        toast.show({
          description: '輸入的身份證明文件號碼已被使用！',
        });
      } else if (res['error']['data']['message'] === 'Repeated Phone') {
        toast.show({
          description: '輸入的電話已被使用！',
        });
      } else if (res['error']['status'] === 400) {
        toast.show({
          description: '請檢查輸入的資料正確！',
        });
      }
    } else {
      console.log('register', res);
      toast.show({description: '成功註冊'});
      store.dispatch(
        checkStatus({status: true, phone: data.phoneCode + data.regPhone}),
      );
      let externalUserId = res.data.member_code.toString();
      store.dispatch(
        setUserInfo({
          member_code: externalUserId,
          token: res.data.access_token,
        }),
      );
      props.navigation.navigate({name: '註冊成功'});
      OneSignal.setExternalUserId(externalUserId, results => {
        // The results will contain push and email success statuses
        console.log('Results of setting external user id', results);
      });
    }
  };

  return (
    <SafeAreaView style={[backgroundStyle, {flex: 1}]}>
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={{backgroundColor: 'white'}}>
        <View style={styles.pageMargin}>
          <Text style={styles.subTitle}>
            稱謂<Text style={{color: 'red', fontSize: 12}}> *</Text>
          </Text>
          <Controller
            control={control}
            rules={{required: true}}
            render={({field: {value}}) => (
              <DropdownSelectComponent
                placeholder={'請選擇稱謂'}
                data={titleArr}
                onChange={onTitleChange}
                mode="other"
                selectedValue={getValues('regTitle')}
              />
            )}
            name="regTitle"
          />
          {/* 必須填寫提示 */}
          {errors.regTitle && (
            <Text style={styles.warning}>* 此項必須選擇</Text>
          )}

          <Text style={styles.subTitle}>
            姓名<Text style={{color: 'red', fontSize: 12}}> *</Text>
          </Text>
          <Controller
            control={control}
            rules={{required: true}}
            render={({field: {onChange, onBlur, value}}) => (
              <TextInput
                style={styles.input}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                placeholder="姓名（須與身份證明文件相符）"
                placeholderTextColor="#737474"
              />
            )}
            name="regName"
          />
          {errors.regName && <Text style={styles.warning}>* 此項必須填寫</Text>}

          <Text style={styles.subTitle}>
            英文姓名
            <Text style={{color: 'red', fontSize: 12}}>*</Text>
          </Text>

          <Controller
            control={control}
            rules={{required: true}}
            render={({field: {onChange, onBlur, value}}) => (
              <TextInput
                style={styles.input}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                placeholder="姓名（須與身份證明文件相符）"
                placeholderTextColor="#737474"
              />
            )}
            name="regName_en"
          />
          {errors.regName_en && (
            <Text style={styles.warning}>* 此項必須填寫</Text>
          )}

          <Text style={styles.subTitle}>
            身份證明文件類別<Text style={{color: 'red', fontSize: 12}}> *</Text>
          </Text>
          <Controller
            control={control}
            rules={{required: true}}
            render={({field: {value}}) => (
              <DropdownSelectComponent
                placeholder={'請選擇身份證明文件類別'}
                data={idTypeArr}
                onChange={onIDValueChange}
                mode="id"
                selectedValue={getValues('regIDType')}
              />
            )}
            name="regIDType"
          />
          {errors.regIDType && (
            <Text style={styles.warning}>* 此項必須選擇</Text>
          )}
          <Text style={styles.subTitle}>
            身份證明文件號碼
            <Text style={{color: 'red', fontSize: 12}}> *</Text>
          </Text>
          <Controller
            control={control}
            rules={{required: true, pattern: /^[A-Za-z0-9]*$/}}
            render={({field: {onChange, onBlur, value}}) => (
              <TextInput
                style={styles.input}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                placeholder="e.g P1234567"
                placeholderTextColor="#737474"
              />
            )}
            name="regIDNumber"
          />
          {errors.regIDNumber && (
            <Text style={styles.warning}>
              * 此項必須正確填寫（應為英文字母及數字組成）
            </Text>
          )}

          <Text style={styles.subTitle}>
            生日日期<Text style={{color: 'red', fontSize: 12}}> *</Text>
          </Text>
          <Controller
            control={control}
            rules={{
              required: true,
              validate: value => {
                // console.log("Date", value)
                let today = new Date();

                let dateSplit: string[] = value.split('-');
                let inputDay = new Date(
                  +dateSplit[0],
                  +dateSplit[1] - 1,
                  +dateSplit[2] + 1,
                );

                return inputDay < today;
              },
            }}
            render={({field: {value}}) => (
              <DatePickerComponent
                setDateTitle={onDateChange}
                DateTitle={getValues('regBDay')}
              />
            )}
            name="regBDay"
          />
          {errors.regBDay && (
            <Text style={styles.warning}>* 請檢查生日日期是否填寫或正確</Text>
          )}
          <Text style={styles.subTitle}>
            電郵地址<Text style={{color: 'red', fontSize: 12}}> *</Text>
          </Text>
          <Controller
            control={control}
            rules={{
              required: true,
              pattern:
                /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            }}
            render={({field: {onChange, onBlur, value}}) => (
              <TextInput
                style={styles.input}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                placeholder="請填寫收發通知用的電郵地址"
                placeholderTextColor="#737474"
              />
            )}
            name="regEmail"
          />
          {errors.regEmail && (
            <Text style={styles.warning}>* 請檢查電郵地址是否填寫或正確</Text>
          )}

          <Text style={styles.subTitle}>
            流動電話號碼<Text style={{color: 'red', fontSize: 12}}> *</Text>
          </Text>
          <View style={{flexDirection: 'row'}}>
            <Controller
              control={control}
              rules={{required: true}}
              render={({field: {value}}) => (
                <DropdownSelectComponent
                  placeholder={'電話區號 '}
                  data={phoneCodeArr}
                  onChange={onPhoneCodeChange}
                  mode="other"
                  selectedValue={getValues('phoneCode')}
                />
              )}
              name="phoneCode"
            />
            <Controller
              control={control}
              rules={{required: true, pattern: /^(0|[1-9]\d*)(\.\d+)?$/}}
              render={({field: {onChange, onBlur, value}}) => (
                <TextInput
                  textContentType={'telephoneNumber'}
                  keyboardType={'numeric'}
                  style={[styles.input, {marginLeft: 10, flex: 1.5}]}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  placeholder="請填寫電話號碼"
                  placeholderTextColor="#737474"
                />
              )}
              name="regPhone"
            />
          </View>
          {errors.regPhone && (
            <Text style={styles.warning}>* 請檢查電話號碼是否填寫或正確</Text>
          )}

          <Text style={styles.subTitle}>
            輸入驗證碼<Text style={{color: 'red', fontSize: 12}}> *</Text>
          </Text>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Controller
              control={control}
              rules={{required: true}}
              render={({field: {onChange, onBlur, value}}) => (
                <TextInput
                  keyboardType={'numeric'}
                  style={[styles.input, {width: '74%', flex: 1}]}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  placeholder="請輸入短訊驗證碼"
                  placeholderTextColor="#737474"
                />
              )}
              name="regSMS"
            />
            <TouchableOpacity
              style={
                sendCodeBtn.isDisable
                  ? [styles.btnPhone, {backgroundColor: 'grey'}]
                  : styles.btnPhone
              }
              onPress={onSMSPress}
              disabled={sendCodeBtn.isDisable}>
              <Text style={styles.btnPhoneText}>
                驗證碼{sendCodeBtn.isDisable && `(${counter})`}
              </Text>
            </TouchableOpacity>
          </View>
          {errors.regSMS && <Text style={styles.warning}>* 此項必須填寫</Text>}

          <Controller
            control={control}
            rules={{required: true}}
            render={({field: {value}}) => (
              <Checkbox.Group
                onChange={values => {
                  console.log(values);
                  setGroupValues(values || []);
                  setValue('regPolicyOne', values || []);
                  if (groupValues2.length < 0) {
                    setGroupValues2(values || []);
                    setValue('regPolicyTwo', values || []);
                  }
                }}
                value={groupValues}
                accessibilityLabel="agree policy"
                mt={1}>
                <Checkbox value="policyOne" mt={4} mb={3} mr={12}>
                  <Text style={styles.policyText}>
                    本人確認已經閲讀、明白及接納《個人私隱政策聲明》，並且同意德信醫療按照《個人資料收集聲明》
                    所述的方式和用途使用閣下的個人資料。
                  </Text>
                </Checkbox>
              </Checkbox.Group>
            )}
            name="regPolicyOne"
          />
          {errors.regPolicyOne && (
            <Text style={styles.warning}>* 此項必須選擇</Text>
          )}
          <Controller
            control={control}
            rules={{required: true}}
            render={({field: {value}}) => (
              <Checkbox.Group
                onChange={values => {
                  console.log('this field is useless');
                  setGroupValues2(values || []);
                  setValue('regPolicyTwo', values || []);
                }}
                value={groupValues2}
                accessibilityLabel="agree policy"
                mt={1}>
                <Checkbox value="policyTwo" mt={4} mb={3} mr={12}>
                  <Text style={styles.policyText}>
                    本人同意德信醫療就《個人資料收集聲明》所述的通訊、推廣及市場促銷活動使用及轉移本人的個人資料。
                  </Text>
                </Checkbox>
              </Checkbox.Group>
            )}
            name="regPolicyTwo"
          />
          {/* {errors.regPolicyTwo && (
            <Text style={styles.warning}>* 此項必須選擇</Text>
          )} */}
        </View>
        <BottomLineComponent />
        {/* Button to go back and next page */}
        <TouchableOpacity
          style={[
            styles.button,
            {
              backgroundColor:
                Object.keys(dirtyFields).length < 6 ||
                getValues('regPolicyOne').length === 0
                  ? '#93999e'
                  : '#325C80',
            },
          ]}
          onPress={handleSubmit(onSubmit)}
          disabled={
            Object.keys(dirtyFields).length < 6 ||
            getValues('regPolicyOne').length === 0
          }>
          <Text style={styles.buttonText}>繼續</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};
