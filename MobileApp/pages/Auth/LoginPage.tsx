import { QueryReturnValue } from '@reduxjs/toolkit/dist/query/baseQueryTypes';
import React, { useEffect, useState, useRef } from 'react'
import { Controller, useForm } from 'react-hook-form';
import { View, Text, SafeAreaView, StyleSheet, TouchableOpacity, Image, TextInput, ScrollView } from 'react-native';
import Config from 'react-native-config';
import { useSelector } from 'react-redux';
import { useGetLoginSMSMutation, useLoginByPhoneMutation } from '../../API/AuthAPI';
import { checkStatus, setUserInfo } from '../../redux/AuthSlice';
import { store } from '../../redux/store';
// Native-base
import { useToast, Button } from 'native-base';
import OneSignal from 'react-native-onesignal';

export const LoginPage = (props: any) => {
    // white background
    const backgroundStyle = {
        backgroundColor: 'white',
    };
    // Form element
    const { control, handleSubmit, formState: { errors }, setValue, getValues } = useForm({
        defaultValues: { phoneNo: '', loginSMS: '' }
    });
    // GET previous page 
    const previousPage = useSelector((state: any) => state.setDoctorID.currentPage);


    const [getLoginSMS] = useGetLoginSMSMutation();
    // Get login SMS (sample:85255332211)

    const countTime = 60
    const [counter, setCounter] = useState(countTime);
    const [sendCodeBtn, setSendCodeBtn] = useState({
        isDisable: false,
    })
    const intervalId = useRef(0 as any)
    const onSMSPress = async (inputData: any) => {
        // Reset counter to 60s
        setCounter(countTime)
        // Activate 60s count down and Disable the button
        setSendCodeBtn({
            isDisable: true,
        });

        let t = countTime
        intervalId.current = setInterval(() => {
            t = t - 1
            setCounter(t)
            if (t < 0) {
                clearInterval(intervalId.current)
                setSendCodeBtn({
                    isDisable: false,
                });
            }
        }, 1000)
        // Fetching
        try {
            const res: QueryReturnValue = await getLoginSMS({ 'phone': inputData.phoneNo })
            console.log(res)
            toast.show({
                description: "已送出驗證碼"
            })
            toast.show({
                description: `SMS Code: ${JSON.stringify(res.data)}`
            })
        } catch (e) {
            console.log(e)
        }
    }


    const [loginByPhone] = useLoginByPhoneMutation();
    // login
    const toast = useToast()
    const onLoginPress = async (inputData: any) => {

        const data: { 'phone': number, 'smsCode': string } = {
            "phone": inputData.phoneNo,
            "smsCode": inputData.loginSMS
        }
        const res: any = await loginByPhone(data)
        // check the login status
        if (res['error']) {
            if (res['error']['status'] === 400) {
                toast.show({
                    description: "請確認輸入電話號碼及驗證碼正確！"
                })
            }
        } else {
            store.dispatch(checkStatus({ status: true, phone: inputData.phoneNo }))
            clearInterval(intervalId.current)
            let externalUserId = res.data.member_code.toString()
            store.dispatch(setUserInfo({ member_code: externalUserId, token: res.data.access_token }))
            // setExternalUserId
            OneSignal.setExternalUserId(externalUserId, (results) => {
                // The results will contain push and email success statuses
                console.log('Results of setting external user id', results);
            });
            if (previousPage === '') {
                props.navigation.navigate({ name: '預約Tab', })
            } else {
                props.navigation.navigate({ name: '相關醫生', })
            }
            toast.show({
                description: "成功登入"
            })
        }
    }


    return (
        <SafeAreaView style={[backgroundStyle, { flex: 1 }]}>
            <ScrollView>
                <View style={styles.logoStyle}>
                    <Image style={{ width: 200, height: 120 }} resizeMode="contain" resizeMethod="scale" source={{ uri: `${Config.REACT_APP_API_SERVER}/logo.png`, }} />
                </View>
                <View style={styles.pageMargin}>
                    <Text style={styles.subTitle}>電話號碼:</Text>
                    <Controller control={control} rules={{ required: true, }}
                        render={({ field: { onChange, onBlur, value } }) => (
                            <TextInput keyboardType={'numeric'} textContentType={'telephoneNumber'} style={styles.input} onBlur={onBlur} onChangeText={onChange} value={value} placeholder="e.g: 85212345678" placeholderTextColor="#737474" />
                        )}
                        name="phoneNo"
                    />
                    {/* 必須填寫提示 */}
                    {errors.phoneNo && <Text style={styles.warning}>* 此項必須填寫</Text>}
                    <Text style={styles.subTitle}>獲取一次性短訊驗證碼</Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>

                        <Controller control={control}
                            render={({ field: { onChange, onBlur, value } }) => (
                                <TextInput keyboardType={'numeric'} style={[styles.input, { width: '74%', flex: 1 }]} onBlur={onBlur} onChangeText={onChange} value={value} placeholder="請輸入短訊驗證碼" placeholderTextColor="#737474" />
                            )}
                            name="loginSMS"
                        />
                        <Button
                            isDisabled={sendCodeBtn.isDisable}
                            colorScheme={"danger"}
                            alignSelf={'center'}
                            padding={1}
                            height={12}
                            marginLeft={2}
                            flex={0.4}
                            size={"md"}
                            onPress={handleSubmit(onSMSPress)}
                        >
                            <Text style={{ color: "white", fontSize: 15 }}>
                                驗證碼 {sendCodeBtn.isDisable && `(${counter})`}
                            </Text>
                        </Button>
                        {/* <TouchableOpacity style={styles.btnPhone} onPress={handleSubmit(onSMSPress)}>
                            <Text style={styles.btnPhoneText}>驗證碼</Text>
                        </TouchableOpacity> */}


                    </View>
                    <TouchableOpacity style={[styles.button, { backgroundColor: '#325C80' }]} onPress={handleSubmit(onLoginPress)}>
                        <Text style={styles.buttonText}>登入</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={() => { props.navigation.navigate({ name: '注冊界面' }) }}>
                        <Text style={styles.buttonText}>立即注冊</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    logoStyle: {
        marginVertical: 20,
        paddingLeft: '25%',
    },
    pageMargin: {
        padding: 15,
    },
    subTitle: {
        color: '#225D66',
        fontSize: 15,
        fontWeight: '600',
        marginTop: 20,
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
    btnPhone: {
        backgroundColor: 'red',
        padding: 10,
        marginVertical: 8,
        marginLeft: 10,
        borderRadius: 4,
    },
    btnPhoneText: {
        color: 'white',
        textAlign: 'center',
        fontSize: 13,
    },
    button: {
        backgroundColor: '#6d7f99',
        paddingVertical: 12,
        marginTop: 20,
        marginBottom: 2,
        borderRadius: 4,
    },
    buttonText: {
        color: 'white',
        textAlign: 'center',
        fontSize: 16,
    },
})
