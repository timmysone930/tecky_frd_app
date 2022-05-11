import { QueryReturnValue } from '@reduxjs/toolkit/dist/query/baseQueryTypes';
import { Checkbox, useToast } from 'native-base';
import React from 'react'
import { Controller, useForm } from 'react-hook-form';
import { View, Text, SafeAreaView, StyleSheet, TouchableOpacity, Image, TextInput, ScrollView } from 'react-native';
import { useGetLoginSMSMutation, usePostRegisterInfoMutation } from '../../API/AuthAPI';
import { BaseSelectComponent } from '../../components/NativeBase/BaseSelectComponent';
import { DatePickerComponent } from '../../components/PickerComponent';
import { BottomLineComponent } from '../../components/utils/BottomLineComponent';
import { checkStatus } from '../../redux/AuthSlice';
import { store } from '../../redux/store';

export const RegisterPage = (props: any) => {
    const toast = useToast()
    // white background
    const backgroundStyle = {
        backgroundColor: 'white',
    };
    // Form element
    const { control, handleSubmit, formState: { errors }, setValue, getValues } = useForm({
        defaultValues: {
            regTitle: '', regName: '', regName_en: '', regIDType: '', regIDNumber: '', regBDay: '', regEmail: '', phoneCode: '', regPhone: '', regSMS: '',
            regPolicyOne: [], regPolicyTwo: []
        }
    });
    // 稱謂
    const titleArr = ['先生', '小姐', '女士']
    // 稱謂
    const phoneCodeArr = ['852', '853', '86']
    // 身份證明文件
    const idTypeArr = ['香港身份證', '香港出生證明書（非香港身份證持有人）', '領事團身份證', '持有申請香港身份證收據', '豁免登記證明書']
    // id value change function
    const onIDValueChange = (itemValue: any) => {setValue("regIDType", itemValue)};
    // Date value change function
    const onDateChange = (itemValue: any) => {setValue("regBDay", itemValue)};
    // Title value change function
    const onTitleChange = (itemValue: any) => {setValue("regTitle", itemValue)};
    // Title value change function
    const onPhoneCodeChange = (itemValue: any) => {setValue("phoneCode", itemValue)};
    // Multi Box     
    const [groupValues, setGroupValues] = React.useState([]);
    const [groupValues2, setGroupValues2] = React.useState([]);
    // SMS function
    const [getLoginSMS] = useGetLoginSMSMutation();
    const onSMSPress = async()=>{
        try {
            let phoneString = getValues('phoneCode') + getValues('regPhone')
            const res: QueryReturnValue = await getLoginSMS({ 'phone': parseInt(phoneString) })
        } catch (e) {
            console.log(e)
        }
    }
    // Register
    const [postRegisterInfo] = usePostRegisterInfoMutation();
    const onSubmit = async (data: any) => {
        let registerData = {
            "id_type": data.regIDType, "id_number": data.regIDNumber, "name": data.regName, "name_en": data.regName_en, "gender": data.regTitle, "birthday": data.regBDay,
            "email": data.regEmail, "phone": data.phoneCode + data.regPhone, 'smsCode':data.regSMS
        }
        const res: any = await postRegisterInfo(registerData)
        // check the login status
        if (res['error']) {
            if (res['error']['data']['message'] === 'Repeat ID') {
                toast.show({
                    description: "輸入的身份證明文件號碼已被使用！"
                })
            }else if(res['error']['status'] === 400){
                toast.show({
                    description: "請檢查輸入的資料正確！"
                })
            }
        }else{
        toast.show({ description: "成功注冊" })
        store.dispatch(checkStatus({ status: true }))
        props.navigation.navigate({ name: '注冊成功' })
        }
    }

    return (
        <SafeAreaView style={[backgroundStyle, { flex: 1 }]}>
            <ScrollView contentInsetAdjustmentBehavior="automatic" style={{ backgroundColor: 'white' }}>
                <View style={styles.pageMargin}>
                    <Text style={styles.subTitle}>稱謂<Text style={{ color: 'red', fontSize: 12 }}> *</Text></Text>
                    <Controller control={control} rules={{ required: true, }}
                        render={({ field: { value } }) => (
                            <BaseSelectComponent placeholder={'請選擇稱謂'} data={titleArr} onChange={onTitleChange} mode='other'
                                selectedValue={getValues('regTitle')} dateValue={''}
                            />
                        )}
                        name="regTitle"
                    />
                    {/* 必須填寫提示 */}
                    {errors.regTitle && <Text style={styles.warning}>* 此項必須選擇</Text>}

                    <Text style={styles.subTitle}>姓名<Text style={{ color: 'red', fontSize: 12 }}> *</Text></Text>
                    <Controller control={control} rules={{ required: true, }}
                        render={({ field: { onChange, onBlur, value } }) => (
                            <TextInput style={styles.input} onBlur={onBlur} onChangeText={onChange} value={value} placeholder="姓名（須與身份證明文件相符）" placeholderTextColor="#737474" />
                        )}
                        name="regName"
                    />
                    {/* 必須填寫提示 */}
                    {errors.regName && <Text style={styles.warning}>* 此項必須填寫</Text>}
                    <Text style={styles.subTitle}>英文姓名<Text style={{ color: 'red', fontSize: 12 }}> *</Text></Text>
                    <Controller control={control} rules={{ required: true, }}
                        render={({ field: { onChange, onBlur, value } }) => (
                            <TextInput style={styles.input} onBlur={onBlur} onChangeText={onChange} value={value} placeholder="姓名（須與身份證明文件相符）" placeholderTextColor="#737474" />
                        )}
                        name="regName_en"
                    />
                    {/* 必須填寫提示 */}
                    {errors.regName_en && <Text style={styles.warning}>* 此項必須填寫</Text>}

                    <Text style={styles.subTitle}>身份證明文件類別<Text style={{ color: 'red', fontSize: 12 }}> *</Text></Text>
                    <Controller control={control} rules={{ required: true, }}
                        render={({ field: { value } }) => (
                            <BaseSelectComponent placeholder={'請選擇身份證明文件類別'} data={idTypeArr} onChange={onIDValueChange} mode='id'
                                selectedValue={getValues('regIDType')} dateValue={''}
                            />
                        )}
                        name="regIDType"
                    />
                    {errors.regIDType && <Text style={styles.warning}>* 此項必須選擇</Text>}
                    <Text style={styles.subTitle}>身份證明文件號碼<Text style={{ color: 'red', fontSize: 12 }}> *</Text></Text>
                    <Controller control={control} rules={{ required: true, }}
                        render={({ field: { onChange, onBlur, value } }) => (
                            <TextInput style={styles.input} onBlur={onBlur} onChangeText={onChange} value={value} placeholder="身份證明文件號碼" placeholderTextColor="#737474" />
                        )}
                        name="regIDNumber"
                    />
                    {/* 必須填寫提示 */}
                    {errors.regIDNumber && <Text style={styles.warning}>* 此項必須填寫</Text>}

                    <Text style={styles.subTitle}>生日日期<Text style={{ color: 'red', fontSize: 12 }}> *</Text></Text>
                    <Controller control={control} rules={{ required: true, }}
                        render={({ field: { value } }) => (
                            <DatePickerComponent setDateTitle={onDateChange} DateTitle={getValues('regBDay')} />
                        )}
                        name="regBDay"
                    />
                    {/* 必須填寫提示 */}
                    {errors.regBDay && <Text style={styles.warning}>* 此項必須填寫</Text>}
                    <Text style={styles.subTitle}>電郵地址<Text style={{ color: 'red', fontSize: 12 }}> *</Text></Text>
                    <Controller control={control} rules={{ required: true, }}
                        render={({ field: { onChange, onBlur, value } }) => (
                            <TextInput style={styles.input} onBlur={onBlur} onChangeText={onChange} value={value} placeholder="請填寫收發通知用的電郵地址" placeholderTextColor="#737474" />
                        )}
                        name="regEmail"
                    />
                    {/* 必須填寫提示 */}
                    {errors.regEmail && <Text style={styles.warning}>* 此項必須填寫</Text>}

                    <Text style={styles.subTitle}>流動電話號碼<Text style={{ color: 'red', fontSize: 12, }}> *</Text></Text>
                    <View style={{ flexDirection: 'row', }}>
                        <Controller control={control} rules={{ required: true, }}
                            render={({ field: { value } }) => (
                                <BaseSelectComponent placeholder={'電話區號 '} data={phoneCodeArr} onChange={onPhoneCodeChange} mode='other'
                                    selectedValue={getValues('phoneCode')} dateValue={''}
                                />
                            )}
                            name="phoneCode"
                        />
                        <Controller control={control} rules={{ required: true, }}
                            render={({ field: { onChange, onBlur, value } }) => (
                                <TextInput textContentType={'telephoneNumber'} keyboardType={'numeric'} style={[styles.input, { marginLeft: 10, flex: 1.5 }]} onBlur={onBlur} onChangeText={onChange} value={value} placeholder="請填寫電話號碼" placeholderTextColor="#737474" />
                            )}
                            name="regPhone"
                        />

                    </View>
                    {/* 必須填寫提示 */}
                    {errors.regPhone && <Text style={styles.warning}>* 此項必須填寫</Text>}

                    <Text style={styles.subTitle}>輸入驗證碼<Text style={{ color: 'red', fontSize: 12 }}> *</Text></Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>

                        <Controller control={control} rules={{ required: true, }}
                            render={({ field: { onChange, onBlur, value } }) => (
                                <TextInput keyboardType={'numeric'} style={[styles.input, { width: '74%', flex: 1 }]} onBlur={onBlur} onChangeText={onChange} value={value} placeholder="請輸入短訊驗證碼" placeholderTextColor="#737474" />
                            )}
                            name="regSMS"
                        />
                        <TouchableOpacity style={styles.btnPhone} onPress={onSMSPress}>
                            <Text style={styles.btnPhoneText}>驗證碼</Text>
                        </TouchableOpacity>
                    </View>
                    {errors.regSMS && <Text style={styles.warning}>* 此項必須填寫</Text>}

                    <Controller control={control} rules={{ required: true, }}
                        render={({ field: { value } }) => (
                            <Checkbox.Group onChange={values => {
                                setGroupValues(values || []);
                                setValue('regPolicyOne', values || [])
                            }} value={groupValues} accessibilityLabel="agree policy" mt={1}>
                                <Checkbox value='policyOne' mt={4} mb={3} mr={12} >
                                    <Text style={styles.policyText}>本人確認已經閲讀、明白及接納《個人私隱政策聲明》，並且同意德信醫療按照《個人資料收集聲明》
                                        所述的方式和用途使用閣下的個人資料。</Text></Checkbox>
                            </Checkbox.Group>
                        )}
                        name="regPolicyOne"
                    />
                    {errors.regPolicyOne && <Text style={styles.warning}>* 此項必須選擇</Text>}
                    <Controller control={control} rules={{ required: true, }}
                        render={({ field: { value } }) => (
                            <Checkbox.Group onChange={values => {
                                setGroupValues2(values || []);
                                setValue('regPolicyTwo', values || [])
                            }} value={groupValues2} accessibilityLabel="agree policy" mt={1}>
                                <Checkbox value='policyTwo' mt={4} mb={3} mr={12}>
                                    <Text style={styles.policyText}>
                                        本人同意德信醫療就《個人資料收集聲明》所述的通訊、推廣及市場促銷活動使用及轉移本人的個人資料。
                                    </Text>
                                </Checkbox>
                            </Checkbox.Group>
                        )}
                        name="regPolicyTwo"
                    />
                    {errors.regPolicyTwo && <Text style={styles.warning}>* 此項必須選擇</Text>}


                </View>
                <BottomLineComponent />
                {/* Button to go back and next page */}

                <TouchableOpacity style={[styles.button, { backgroundColor: '#325C80' }]}
                    onPress={handleSubmit(onSubmit)}
                >
                    <Text style={styles.buttonText}>繼續</Text></TouchableOpacity>
            </ScrollView>
        </SafeAreaView >
    )
}


const styles = StyleSheet.create({
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
        marginBottom: 5,
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
        // width: '50%',
        backgroundColor: '#6d7f99',
        paddingVertical: 16,
        marginHorizontal: 20,
        marginBottom: 100,
        borderRadius: 4,
    },
    buttonText: {
        color: 'white',
        textAlign: 'center',
        fontSize: 16,
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
    policyText: {
        fontSize: 12,
        marginRight: 12,
        color: '#2E2E2E',
    },

});