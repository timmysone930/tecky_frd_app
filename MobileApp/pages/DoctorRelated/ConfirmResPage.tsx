import React from 'react'
import { View, Text, SafeAreaView, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { DrListCard } from '../../components/doctor/DrListCard';
import { FakeDrDATA } from './DrListPage';
import { useSelector } from 'react-redux';

export const ConfirmResPage: React.FC = (props: any) => {
    // white background
    const backgroundStyle = {
        backgroundColor: 'white',
    };
    // selected doctor id
    const id = useSelector((state: any) => state.setDoctorID.id);
    // get form data
    const formData = useSelector((state: any) => state.getFormData);

    // Need to be removed; only for testing(will be replaced by fetch)
    let userData: any = {}
    FakeDrDATA.map((item) => {
        if (item['id'] === id) {
            userData = item
        }
    })

    const rowTitleArr = ['問診費用：', '選擇日期：', '選擇時間：', '應診者姓名：', '身份證類型：', '身份證編號：']
    const rowCellArr = ['$100.00', formData.reservedDate, formData.reservedTime, formData.name, formData.idType, formData.idNumber]
    return (
        <SafeAreaView style={[backgroundStyle, { flex: 1 }]}>
            <ScrollView contentInsetAdjustmentBehavior="automatic" style={{ backgroundColor: 'white', marginBottom: 2, marginLeft: 5 }}>
                {/* Doctor Info */}
                <Text style={[styles.rowCellText, { paddingHorizontal: 15, paddingTop: 15,  }]}>醫生資料</Text>
                <View style={styles.drListCard}>
                    <DrListCard props={userData} />
                </View>

                {rowTitleArr.map((item, idx) => (
                        <View style={[backgroundStyle,{flexDirection:'row', marginBottom: 1, marginHorizontal:15,}]} key={`confirm_row_${idx}`}>
                            <View style={{flex:1.3}}><Text style={styles.rowTitle}>{item}</Text></View>
                            <View style={{flex:3}}><Text style={styles.rowCellText}>{rowCellArr[idx]}</Text></View>
                        </View>
                        ))}

            </ScrollView>
            {/* Button to go back and next page */}
            <View style={{ flexDirection: 'row' }}>
                <TouchableOpacity style={styles.button} onPress={() => props.navigation.navigate({ name: '主頁' })}>
                    <Text style={styles.buttonText}>返回主頁</Text></TouchableOpacity>
                <TouchableOpacity style={[styles.button, { backgroundColor: '#325C80' }]}
                    onPress={() => props.navigation.navigate({ name: '付款' })}>
                    <Text style={styles.buttonText}>前往付款</Text></TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    drListCard: {
        padding: 15,
        paddingTop: 10,
        marginBottom: 2,
        flexDirection: 'row',
        backgroundColor: 'white',
        shadowColor: '#E4E4E4',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.5,
        shadowRadius: 10,
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
    rowTitle: {
        color: '#3B3B3B',
        marginVertical: 10,
        fontSize: 17,
        fontWeight: '500',
        marginTop: 12,
        marginBottom: 15,
    },
    rowCellText: {
        color: '#225D66',
        fontSize: 17,
        fontWeight: '600',
        marginTop: 12,
        marginBottom: 15,
    },
});