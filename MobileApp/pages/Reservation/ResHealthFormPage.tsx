import React from 'react'
import { View, Text, SafeAreaView, ScrollView, TouchableOpacity, TextInput} from 'react-native';
import { useForm, Controller } from "react-hook-form";
import { RadioButton } from 'react-native-paper';
import { store } from '../../redux/store';
import { setHealthFormInfo, setHealthFormMultiBox } from '../../redux/slice';
import { ResCheckBoxComponent } from '../../components/reservation/ResCheckBoxComponent';
import { BottomLineComponent } from '../../components/utils/BottomLineComponent';
import { DatePickerComponent } from '../../components/utils/DatePickerComponent';
import { HealthSubmitType } from './ResType';
import {styles} from '../../styles/GeneralStyles'
// white background
const backgroundStyle = { backgroundColor: 'white', };

export const ResHealthFormPage: React.FC = (props: any) => {
    // Check Box Value
    const [groupValues, setGroupValues] = React.useState([]);
    // checkbox Onchange
    const onCheckBoxChange = (values: []) => {
        setGroupValues(values || []);
        store.dispatch(setHealthFormMultiBox({ symptoms: values }))
    }
    // Date value change function
    const onDateChange = (itemValue: string) => { setValue("backDate", itemValue) };
    // Form element
    const { control, handleSubmit, formState: { errors }, setValue, getValues } = useForm({
        defaultValues: { Countries: '', leaveHKRadio: '', backDate: '選擇日期' }
    });
    const onSubmit = (data: HealthSubmitType) => {
        props.navigation.navigate({ name: '預約須知' })
        store.dispatch(setHealthFormInfo(data))
    }
    return (
        <SafeAreaView style={[backgroundStyle, { flex: 1 }]}>
            <ScrollView contentInsetAdjustmentBehavior="automatic" style={{ backgroundColor: 'white', padding: 15, paddingTop: 25, marginBottom: 2, }}>
                <View style={[backgroundStyle, { flex: 1 }]}>
                    <Text style={[styles.subTitle,styles.mt_10]}>過去14日內曾否離開過香港？</Text>
                    <Controller control={control} rules={{ required: true, }}
                        render={({ field: { value } }) => (
                            <RadioButton.Group onValueChange={value => { setValue("leaveHKRadio", value) }} value={getValues('leaveHKRadio')}>
                                <RadioButton.Item label="是" value="true" mode='android' color='#6d7f99' />
                                <RadioButton.Item label="否" value="false" mode='android' color='#6d7f99' />
                            </RadioButton.Group>
                        )}
                        name="leaveHKRadio"
                    />
                    {/* 必須填寫提示 */}
                    {errors.leaveHKRadio && <Text style={styles.warning}>* 此項必須選擇</Text>}
                    <BottomLineComponent />
                    <Text style={[styles.subTitle,styles.mt_10]}>過去14日內曾離開香港到過的國家和城市？</Text>
                    <Controller control={control} render={({ field: { onChange, onBlur, value } }) => (
                        <TextInput style={styles.input} onBlur={onBlur} onChangeText={onChange} value={value} placeholder="如有，請填寫相關國家及城市名稱" placeholderTextColor="#737474" />
                    )}
                        name="Countries" />
                    <Text style={[styles.subTitle,styles.mt_10]}>你回到香港的日期？</Text>
                    <Controller control={control}
                        render={({ field: { value } }) => (
                            <DatePickerComponent setDateTitle={onDateChange} DateTitle={getValues('backDate')} />
                        )}
                        name="backDate"
                    />
                    <View style={{ marginTop: 10 }}><BottomLineComponent /></View>
                    <Text style={[styles.subTitle,styles.mt_10]}>你是否有以下的病徵？</Text>
                    <ResCheckBoxComponent groupValues={groupValues} onChange={onCheckBoxChange} />
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