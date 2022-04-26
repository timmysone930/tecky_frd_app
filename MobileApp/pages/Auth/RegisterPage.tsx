import { Box, Center, CheckIcon, FormControl, Select, WarningOutlineIcon } from 'native-base';
import React from 'react'
import { Controller, useForm } from 'react-hook-form';
import { View, Text, SafeAreaView, StyleSheet, TouchableOpacity, Image, TextInput, ScrollView } from 'react-native';

export const RegisterPage = (props: any) => {
    // white background
    const backgroundStyle = {
        backgroundColor: 'white',
    };

    // Form element
    const { control, handleSubmit, formState: { errors }, setValue } = useForm({
        defaultValues: { phoneNo: '', loginSMS: '' }
    });

    let [service, setService] = React.useState("");

    return (
        <SafeAreaView style={[backgroundStyle, { flex: 1 }]}>
            <ScrollView>

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
                    <TouchableOpacity style={[styles.button, { backgroundColor: '#325C80' }]} onPress={() => { }}>
                        <Text style={styles.buttonText}>登入</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={() => { props.navigation.navigate({ name: '預約須知' }) }}>
                        <Text style={styles.buttonText}>立即注冊</Text>
                    </TouchableOpacity>
                </View>
                <Center>
                    <FormControl w="3/4" maxW="300" isRequired isInvalid>
                        <FormControl.Label>Choose service</FormControl.Label>
                        <Select selectedValue={service} minWidth="200" accessibilityLabel="Choose Service" placeholder="Choose Service" _selectedItem={{
                            bg: "teal.600",
                            endIcon: <CheckIcon size="5" />
                        }} mt={1} onValueChange={itemValue => setService(itemValue)}>
                            <Select.Item label="UX Research" value="ux" />
                            <Select.Item label="Web Development" value="web" />
                            <Select.Item label="Cross Platform Development" value="cross" />
                            <Select.Item label="UI Designing" value="ui" />
                            <Select.Item label="Backend Development" value="backend" />
                        </Select>
                    </FormControl>
                </Center>
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