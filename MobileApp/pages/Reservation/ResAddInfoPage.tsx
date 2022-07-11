import { useToast } from 'native-base';
import React, { useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form';
import { View, Text, SafeAreaView, ScrollView, TouchableOpacity, Image, TextInput, Platform } from 'react-native'
import { CameraModalComponent } from '../../components/reservation/CameraModalComponent'; // react-native-image-picker
import { DatePickerComponent } from '../../components/utils/DatePickerComponent';
import { setAdditionalInfo, setIDImage } from '../../redux/slice';
import { store } from '../../redux/store';
import { AddInfoSubmitType } from './ResType';
import Config from 'react-native-config';
import { styles } from '../../styles/GeneralStyles'
import { useGetUserInfoQuery } from '../../API/UserInfoAPI';
import { useSelector } from 'react-redux';
// white background
const backgroundStyle = { backgroundColor: 'white', };

export const ResAddInfoPage: React.FC = (props: any) => {
    const toast = useToast()

    // upload image
    const [response, setResponse] = useState<any>(null);
    const onSetResponse = (item: any) => { setResponse(item); };

    // set the modal
    const [modalVisible, setModalVisible] = useState(false);
    const onSetModalVisible = (status: boolean) => { setModalVisible(status); };

    // to get the JWT token
    const userToken = useSelector((state: any) => state.getUserStatus.token);

    // get current users profile
    const userData = useGetUserInfoQuery(userToken)

    // Form element
    const { control, handleSubmit, formState: { errors }, setValue, getValues } = useForm({
        defaultValues: { phone: '', bDay: '', email: '', EmergencyContactName: '', EmergencyContactPhone: '', name_en: '' }
    });

    // Date value change function
    const onDateChange = (itemValue: string) => { setValue("bDay", itemValue) };

    // Next page
    const isUploaded = async (data: AddInfoSubmitType) => {
        if (response === null) {
            toast.show({
                description: "請上傳身份證明文件！"
            })
        } else {
            let image = {
                name: response.assets[0].fileName, 
                type: response.assets[0].type, 
                uri: Platform.OS === 'android' ? response.assets[0].uri : response.assets[0].uri.replace('file://', ''),
            }

            store.dispatch(setIDImage(image))
            store.dispatch(setAdditionalInfo(data))
            props.navigation.navigate({ name: '健康申報表' })
        }
    }

    // auto input login users info once
    useEffect(() => {
        
        console.log(userData.data)
        const updateUserInfo = async () => {
            if (userData.isSuccess) {
                await setValue('phone', userData.data.phone)
                await setValue('bDay', userData.data.birthday)
                await setValue('email', userData.data.email)
                await setValue('name_en', userData.data.name_en)
            }
        }

        updateUserInfo();

    }, [userData.isSuccess]);

    return (
        <SafeAreaView style={[backgroundStyle, { flex: 1 }]}>
            <ScrollView contentInsetAdjustmentBehavior="automatic" style={{ backgroundColor: 'white', padding: 15, paddingTop: 25, marginBottom: 2, }}>
                <View style={[backgroundStyle, { flex: 1 }]}>
                    <Text style={styles.subTitle}>英文姓名</Text>
                    <Controller control={control} rules={{ required: true, }}
                        render={({ field: { onChange, onBlur, value } }) => (
                            <TextInput style={styles.input} onBlur={onBlur} onChangeText={onChange} value={value} placeholder="英文姓名（須與身份證明文件相符）" placeholderTextColor="#737474" />
                        )}
                        name="name_en"
                    />
                    {errors.name_en && <Text style={styles.warning}>* 此項必須填寫</Text>}

                    <Text style={[styles.subTitle, styles.mt_10]}>生日日期</Text>
                    <Controller 
                        control={control} 
                        rules={{ 
                            required: true, 
                            validate: value => { 
                                let today = new Date();

                                let dateSplit:string[] = value.split("-")
                                let inputDay = new Date(+dateSplit[0], +dateSplit[1] - 1, +dateSplit[2] + 1);

                                return inputDay < today 
                            } 
                        }}
                        render={({ field: { value } }) => (
                            <DatePickerComponent setDateTitle={onDateChange} DateTitle={getValues('bDay')} />
                        )}
                        name="bDay"
                    />
                    {/* 必須填寫提示 */}
                    {errors.bDay && <Text style={styles.warning}>* 請檢查生日日期是否填寫或正確</Text>}
                    <Text style={[styles.subTitle, styles.mt_10]}>電郵地址</Text>
                    <Controller control={control} rules={{ required: true, pattern: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/ }}
                        render={({ field: { onChange, onBlur, value } }) => (
                            <TextInput style={styles.input} onBlur={onBlur} onChangeText={onChange} value={value} placeholder="請填寫收發通知用的電郵地址" placeholderTextColor="#737474" />
                        )}
                        name="email"
                    />
                    {errors.email && <Text style={styles.warning}>* 請檢查電郵地址是否填寫或正確</Text>}

                    <Text style={[styles.subTitle, styles.mt_10]}>流動電話號碼</Text>
                    <Controller control={control} rules={{ required: true, pattern: /^(0|[1-9]\d*)(\.\d+)?$/ }}
                        render={({ field: { onChange, onBlur, value } }) => (
                            <TextInput textContentType={'telephoneNumber'} keyboardType={'numeric'} style={[styles.input]} onBlur={onBlur} onChangeText={onChange} value={value} placeholder="e.g 85212345678" placeholderTextColor="#737474" />
                        )}
                        name="phone"
                    />
                    {errors.phone && <Text style={styles.warning}>* 請檢查電話號碼是否填寫或正確</Text>}
                    <Text style={[styles.subTitle, styles.mt_10]}>緊急聯絡人</Text>
                    <Controller control={control} rules={{ required: true, }}
                        render={({ field: { onChange, onBlur, value } }) => (
                            <TextInput style={styles.input} onBlur={onBlur} onChangeText={onChange} value={value} placeholder="緊急聯絡人姓名" placeholderTextColor="#737474" />
                        )}
                        name="EmergencyContactName"
                    />

                    {errors.EmergencyContactName && <Text style={styles.warning}>* 此項必須填寫</Text>}
                    <Controller control={control} rules={{ required: true, pattern: /^(0|[1-9]\d*)(\.\d+)?$/ }}
                        render={({ field: { onChange, onBlur, value } }) => (
                            <TextInput
                                keyboardType={'numeric'}
                                style={styles.input}
                                onBlur={onBlur}
                                onChangeText={onChange}
                                value={value}
                                placeholder="緊急聯絡人電話 (e.g 85212345678)"
                                placeholderTextColor="#737474"
                            />
                        )}
                        name="EmergencyContactPhone"
                    />

                    {errors.EmergencyContactPhone && 
                        <Text style={styles.warning}>
                            * 請檢查電話號碼是否填寫或正確
                        </Text>
                    }

                    <Text style={[styles.subTitle, styles.mt_10]}>
                        請上傳你的身份證照片正面
                    </Text>
                    <Text style={[styles.warning, { marginTop: 10 }]}>
                        * 請提供小於4MB的照片
                    </Text>

                    {/* Modal for camera */}
                    <TouchableOpacity onPress={() => setModalVisible(true)} style={styles.uploadBtn}>
                        <Image 
                            source={{ uri: `${Config.REACT_APP_API_SERVER}/btn_IDCard.jpg`, }}
                            style={{ width: 380, height: 200 }}
                            resizeMode="contain"
                            resizeMethod="scale"
                        />
                    </TouchableOpacity>

                    <CameraModalComponent 
                        modalVisible={modalVisible}
                        setModalVisible={onSetModalVisible}
                        setResponse={onSetResponse}
                    />

                    {/* Show the uploaded photo */}                  
                    {response?.assets &&
                        response?.assets.map(({ uri }: any) => (
                            <View key={uri}>
                                <Text style={[styles.subTitle, styles.mt_10]}>上傳的身份證照片:</Text>
                                <Image 
                                    resizeMode="contain"
                                    resizeMethod="scale"
                                    style={{ width: 380, height: 240, marginBottom: 50, }}
                                    source={{ uri: uri }}
                                />
                            </View>
                        ))
                    }
                    {/* {response?.assets && response?.assets.map(({ uri }: any) => (console.log(uri)))} */}
                </View>
            </ScrollView>
            {/* Button to go back and next page */}
            <View style={{ flexDirection: 'row' }}>
                <TouchableOpacity style={styles.button} onPress={() => props.navigation.navigate({ name: '醫生' })}>
                    <Text style={styles.buttonText}>返回主頁</Text></TouchableOpacity>
                <TouchableOpacity style={[styles.button, { backgroundColor: '#325C80' }]}
                    onPress={handleSubmit(isUploaded)}>
                    <Text style={styles.buttonText}>下一步</Text></TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

