import React from 'react'
import { View, Text, SafeAreaView, ScrollView, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import { useForm, Controller } from "react-hook-form";
import { DatePickerComponent } from '../../components/PickerComponent';
import { RadioButton } from 'react-native-paper';
import { BottomLineComponent } from '../../components/SearchComponent';
import { MultiCheckBoxComponent } from '../../components/MultiCheckBoxComponent';

export const PolicyPage: React.FC = (props: any) => {
    // white background
    const backgroundStyle = {
        backgroundColor: 'white',
    };
    // Radio Button
    const [radioValue, setRadioValue] = React.useState('');
    // Form element
    const { control, handleSubmit, formState: { errors }, setValue } = useForm({
        defaultValues: { Countries: '' }
    });
    return (
        <SafeAreaView style={[backgroundStyle, { flex: 1 }]}>
            <ScrollView contentInsetAdjustmentBehavior="automatic" style={{ backgroundColor: 'white', padding: 15, paddingTop: 25, marginBottom: 2, }}>
                <View style={[backgroundStyle, { flex: 1 }]}>
                    <Text style={styles.subTitle}>過去14日內曾否離開過香港？</Text>
                    <RadioButton.Group onValueChange={value => setRadioValue(value)} value={radioValue}>
                        <RadioButton.Item label="是" value="yes" mode='android' color='#6d7f99' />
                        <RadioButton.Item label="否" value="no" mode='android' color='#6d7f99' />
                    </RadioButton.Group>
                    <BottomLineComponent />
                    <Text style={styles.subTitle}>過去14日內曾離開香港到過的國家和城市？</Text>
                    <Controller control={control} render={({ field: { onChange, onBlur, value } }) => (
                        <TextInput style={styles.input} onBlur={onBlur} onChangeText={onChange} value={value} placeholder="如有，請填寫相關國家及城市名稱" placeholderTextColor="#737474" />
                    )}
                        name="Countries" />
                    <Text style={styles.subTitle}>你回到香港的日期？</Text>
                    <DatePickerComponent />
                    <Text style={styles.subTitle}>你是否有以下的病徵？</Text>
                    <MultiCheckBoxComponent />
                    <BottomLineComponent />

                </View>
            </ScrollView>
            {/* Button to go back and next page */}
            <View style={{ flexDirection: 'row' }}>
                <TouchableOpacity style={styles.button} onPress={() => props.navigation.navigate({ name: '主頁' })}>
                    <Text style={styles.buttonText}>返回主頁</Text></TouchableOpacity>
                <TouchableOpacity style={[styles.button, { backgroundColor: '#325C80' }]}
                    onPress={() => props.navigation.navigate({ name: '健康申報表' })}>
                    <Text style={styles.buttonText}>我已了解</Text></TouchableOpacity>
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