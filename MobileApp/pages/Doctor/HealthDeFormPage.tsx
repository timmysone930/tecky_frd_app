import React from 'react'
import { View, Text, SafeAreaView, ScrollView, StyleSheet, TouchableOpacity, TextInput, Alert } from 'react-native';
import { useForm, Controller } from "react-hook-form";
import { RadioButton } from 'react-native-paper';
import { BottomLineComponent } from '../../components/SearchComponent';
import { DatePickerComponent } from '../../components/PickerComponent';
import { store } from '../../redux/store';
import { setHealthFormInfo, setHealthFormMultiBox } from '../../redux/slice';
import { BaseCheckBoxComponent } from '../../components/NativeBase/BaseCheckBoxComponent';

export const HealthDeForm: React.FC = (props: any) => {
    // white background
    const backgroundStyle = {
        backgroundColor: 'white',
    };
    // Check Box Value
    const [groupValues, setGroupValues] = React.useState([]);
    // checkbox Onchange
    const onCheckBoxChange = (values:any)=>{
        setGroupValues(values||[]);
        store.dispatch(setHealthFormMultiBox({symptoms: values})) 
    }
    // Date value change function
    const onDateChange = (itemValue: any, itemIndex: any) => {
        setValue("backDate", itemValue)
    };
    // Form element
    const { control, handleSubmit, formState: { errors }, setValue,getValues } = useForm({
        defaultValues: { Countries: '', leaveHKRadio: '', backDate: '選擇日期' }
    });
    const onSubmit = (data: any) => {
        props.navigation.navigate({ name: '預約須知' })
        store.dispatch(setHealthFormInfo(data))
    }
    return (
        <SafeAreaView style={[backgroundStyle, { flex: 1 }]}>
            <ScrollView contentInsetAdjustmentBehavior="automatic" style={{ backgroundColor: 'white', padding: 15, paddingTop: 25, marginBottom: 2, }}>
                <View style={[backgroundStyle, { flex: 1 }]}>
                    <Text style={styles.subTitle}>過去14日內曾否離開過香港？</Text>
                    <Controller control={control} rules={{ required: true, }}
                        render={({ field: { value } }) => (
                            <RadioButton.Group onValueChange={value => {setValue("leaveHKRadio", value) }} value={getValues('leaveHKRadio')}>
                                <RadioButton.Item label="是" value="true" mode='android' color='#6d7f99' />
                                <RadioButton.Item label="否" value="false" mode='android' color='#6d7f99' />
                            </RadioButton.Group>
                        )}
                        name="leaveHKRadio"
                    />
                    {/* 必須填寫提示 */}
                    {errors.leaveHKRadio && <Text style={styles.warning}>* 此項必須選擇</Text>}
                    <BottomLineComponent />
                    <Text style={styles.subTitle}>過去14日內曾離開香港到過的國家和城市？</Text>
                    <Controller control={control} render={({ field: { onChange, onBlur, value } }) => (
                        <TextInput style={styles.input} onBlur={onBlur} onChangeText={onChange} value={value} placeholder="如有，請填寫相關國家及城市名稱" placeholderTextColor="#737474" />
                    )}
                        name="Countries" />
                    <Text style={styles.subTitle}>你回到香港的日期？</Text>
                    <Controller control={control}
                        render={({ field: { value } }) => (
                            <DatePickerComponent setDateTitle={onDateChange} DateTitle={getValues('backDate')} />
                        )}
                        name="backDate"
                    />

                    <View style={{ marginTop: 10 }}><BottomLineComponent /></View>
                    <Text style={styles.subTitle}>你是否有以下的病徵？</Text>
                    <BaseCheckBoxComponent data={['發燒','咳嗽、呼吸困難或咽喉痛','腹瀉或嘔吐','流感症狀']} groupValues={groupValues} onChange={onCheckBoxChange}/>
                    <BottomLineComponent />

                </View>
            </ScrollView>
            {/* Button to go back and next page */}
            <View style={{ flexDirection: 'row' }}>
                <TouchableOpacity style={styles.button} onPress={() => props.navigation.navigate({ name: '醫生' })}>
                    <Text style={styles.buttonText}>返回主頁</Text></TouchableOpacity>
                <TouchableOpacity style={[styles.button, { backgroundColor: '#325C80' }]}
                    onPress={handleSubmit(onSubmit)}
                    >
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
        marginVertical: 12,
    },
    warning: {
        fontSize: 12,
        color: 'red',
        marginLeft: 5,
    },
});