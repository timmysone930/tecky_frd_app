import React from 'react'
import { Controller, useForm } from 'react-hook-form';
import { View, Text, SafeAreaView, StyleSheet, TouchableOpacity, Image, TextInput, ScrollView } from 'react-native';
import { useSelector } from 'react-redux';
import { checkStatus } from '../../redux/AuthSlice';
import { store } from '../../redux/store';

export const LoginPage = (props: any) => {
    // white background
    const backgroundStyle = {
        backgroundColor: 'white',
    };

    // Form element
    const { control, handleSubmit, formState: { errors }, setValue } = useForm({
        defaultValues: { phoneNo: '', loginSMS: '' }
    });

    // GET previous page 
    const previousPage = useSelector((state: any) => state.setDoctorID.currentPage);

    // login
    const onLoginPress = () => {
        store.dispatch(checkStatus({ status: true }))
        if(previousPage === ''){
            props.navigation.navigate({ name: '預約Tab',})
        }else{
            props.navigation.navigate({ name: '相關醫生', })
        }
    }

    return (
        <SafeAreaView style={[backgroundStyle, { flex: 1 }]}>
            <ScrollView>
                <View style={styles.logoStyle}>
                    <Image style={{ width: 200, height: 120 }} resizeMode="contain" resizeMethod="scale" source={require("../../images/logo.png")} />
                </View>
                <View style={styles.pageMargin}>
                    <Text style={styles.subTitle}>電話號碼:</Text>
                    <Controller control={control} rules={{ required: true, }}
                        render={({ field: { onChange, onBlur, value } }) => (
                            <TextInput keyboardType={'numeric'} textContentType={'telephoneNumber'} style={styles.input} onBlur={onBlur} onChangeText={onChange} value={value} placeholder="請輸入你登記的電話號碼" placeholderTextColor="#737474" />
                        )}
                        name="phoneNo"
                    />
                    {/* 必須填寫提示 */}
                    {errors.phoneNo && <Text style={styles.warning}>* 此項必須填寫</Text>}
                    <Text style={styles.subTitle}>獲取一次性短訊驗證碼</Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>

                        <Controller control={control} rules={{ required: true, }}
                            render={({ field: { onChange, onBlur, value } }) => (
                                <TextInput keyboardType={'numeric'} style={[styles.input, { width: '74%', flex: 1 }]} onBlur={onBlur} onChangeText={onChange} value={value} placeholder="請輸入短訊驗證碼" placeholderTextColor="#737474" />
                            )}
                            name="loginSMS"
                        />
                        <TouchableOpacity style={styles.btnPhone} onPress={() => { }}>
                            <Text style={styles.btnPhoneText}>驗證碼</Text>
                        </TouchableOpacity>

                        {errors.loginSMS && <Text style={styles.warning}>* 此項必須填寫</Text>}
                    </View>
                    <TouchableOpacity style={[styles.button, { backgroundColor: '#325C80' }]} onPress={onLoginPress}>
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