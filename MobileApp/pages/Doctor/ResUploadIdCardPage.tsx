import { useToast } from 'native-base';
import React, { useState } from 'react'
import { Controller, useForm } from 'react-hook-form';
import { View, Text, SafeAreaView, ScrollView, StyleSheet, TouchableOpacity, Image, Button, Modal, TouchableWithoutFeedback, Platform, TextInput } from 'react-native'
import Config from 'react-native-config';
// react-native-image-picker
import { CameraModalComponent } from '../../components/ModalComponent';
import { DatePickerComponent } from '../../components/PickerComponent';
import { setAdditionalInfo, setIDImage } from '../../redux/slice';
import { store } from '../../redux/store';

export const ReserveIDCardPage: React.FC = (props: any) => {
    const toast = useToast()
    // white background
    const backgroundStyle = {
        backgroundColor: 'white',
    };
    // upload image
    const [response, setResponse] = useState<any>(null);
    const onSetResponse = (item: any) => {
        setResponse(item);
    };
    // set the modal
    const [modalVisible, setModalVisible] = useState(false);
    const onSetModalVisible = (status: any) => {
        setModalVisible(status);
    };
    // Form element
    const { control, handleSubmit, formState: { errors }, setValue, getValues } = useForm({
        defaultValues: { phone: '', bDay: '', email: '', EmergencyContactName: '', EmergencyContactPhone: '' }
    });
    // Date value change function
    const onDateChange = (itemValue: any) => { setValue("bDay", itemValue) };
    // Next page
    const isUploaded = async (data: any) => {
        if (response === null) {
            toast.show({
                description: "請上傳身份證明文件！"
            })
        } else {
            store.dispatch(setIDImage(response))
            store.dispatch(setAdditionalInfo(data))
            props.navigation.navigate({ name: '健康申報表' })
        }
    }

    return (
        <SafeAreaView style={[backgroundStyle, { flex: 1 }]}>
            <ScrollView contentInsetAdjustmentBehavior="automatic" style={{ backgroundColor: 'white', padding: 15, paddingTop: 25, marginBottom: 2, }}>
                <View style={[backgroundStyle, { flex: 1 }]}>
                    <Text style={styles.subTitle}>生日日期</Text>
                    <Controller control={control} rules={{ required: true, }}
                        render={({ field: { value } }) => (
                            <DatePickerComponent setDateTitle={onDateChange} DateTitle={getValues('bDay')} />
                        )}
                        name="bDay"
                    />
                    {/* 必須填寫提示 */}
                    {errors.bDay && <Text style={styles.warning}>* 此項必須填寫</Text>}
                    <Text style={styles.subTitle}>電郵地址</Text>
                    <Controller control={control} rules={{ required: true, }}
                        render={({ field: { onChange, onBlur, value } }) => (
                            <TextInput style={styles.input} onBlur={onBlur} onChangeText={onChange} value={value} placeholder="請填寫收發通知用的電郵地址" placeholderTextColor="#737474" />
                        )}
                        name="email"
                    />
                    {/* 必須填寫提示 */}
                    {errors.email && <Text style={styles.warning}>* 此項必須填寫</Text>}

                    <Text style={styles.subTitle}>流動電話號碼</Text>
                    <Controller control={control} rules={{ required: true, }}
                        render={({ field: { onChange, onBlur, value } }) => (
                            <TextInput textContentType={'telephoneNumber'} keyboardType={'numeric'} style={[styles.input]} onBlur={onBlur} onChangeText={onChange} value={value} placeholder="e.g 85212345678" placeholderTextColor="#737474" />
                        )}
                        name="phone"
                    />

                    {/* 必須填寫提示 */}
                    {errors.phone && <Text style={styles.warning}>* 此項必須填寫</Text>}
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
                            <TextInput keyboardType={'numeric'} style={styles.input} onBlur={onBlur} onChangeText={onChange} value={value} placeholder="緊急聯絡人電話 (e.g 85212345678)" placeholderTextColor="#737474" />
                        )}
                        name="EmergencyContactPhone"
                    />
                    {/* 必須填寫提示 */}
                    {errors.EmergencyContactPhone && <Text style={styles.warning}>* 此項必須填寫</Text>}
                    <Text style={styles.subTitle}>請上傳你的身份證照片正面</Text>
                    {/* Modal for camera */}
                    <TouchableOpacity onPress={() => setModalVisible(true)} style={styles.uploadBtn}>
                        <Image source={{ uri: `${Config.REACT_APP_API_SERVER}/btn_IDCard.jpg`, }} style={{ width: 380, height: 200 }} resizeMode="contain" resizeMethod="scale" />
                        {/* <Text style={styles.uploadBtnText}>上傳照片</Text> */}
                    </TouchableOpacity>
                    <CameraModalComponent modalVisible={modalVisible} setModalVisible={onSetModalVisible} setResponse={onSetResponse} />

                    {/* Show the uploaded photo */}
                    {response?.assets &&
                        response?.assets.map(({ uri }: any) => (
                            <View key={uri}>
                                <Text style={styles.subTitle}>上傳的身份證照片:</Text>
                                <Image resizeMode="contain" resizeMethod="scale" style={{ width: 380, height: 240, marginBottom: 50, }} source={{ uri: uri }} />
                            </View>
                        ))}
                    {response?.assets && response?.assets.map(({ uri }: any) => (console.log(uri)))}
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

const styles = StyleSheet.create({
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
    },
    uploadBtn: {
        marginVertical: 20,
        alignContent: 'center',
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
});
