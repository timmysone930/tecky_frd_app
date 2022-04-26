import React from 'react'
import { View, Text, SafeAreaView, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { DrListCard } from '../../components/doctor/DrListCard';
import { BottomLineComponent } from '../../components/SearchComponent';
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
    const formData = useSelector((state:any)=>state.getFormData);

    // Need to be removed; only for testing(will be replaced by fetch)
    let userData: any = {}
    FakeDrDATA.map((item) => {
        if (item['id'] === id) {
            userData = item
        }
    })

    return (
        <SafeAreaView style={[backgroundStyle, { flex: 1 }]}>
            <ScrollView contentInsetAdjustmentBehavior="automatic" style={{ backgroundColor: 'white', marginBottom: 2,marginLeft:5 }}>
                {/* Doctor Info */}
                <Text style={[styles.subTitle, { paddingHorizontal: 15, paddingTop: 15,}]}>醫生資料</Text>
                <View style={styles.drListCard}>
                    <DrListCard props={userData} />
                </View>
                <View style={[backgroundStyle, { flex: 1, marginBottom: 15, padding: 15, paddingTop: 25, flexDirection:'row', }]}>
                    <View>
                    <Text style={styles.contentText}>問診費用：</Text>
                        <Text style={styles.contentText}>選擇日期：</Text>
                        <Text style={styles.contentText}>選擇時間：</Text>
                        <Text style={styles.contentText}>應診者姓名：</Text>
                    <Text style={styles.contentText}>身份證類型：</Text>
                    <Text style={styles.contentText}>身份證編號：</Text> 
                    </View>
                    <View style={{marginLeft:10,}}>
                    <Text style={styles.subTitle}>$100.00</Text>
                        <Text style={styles.subTitle}>{formData.reservedDate}</Text>
                        <Text style={styles.subTitle}>{formData.reservedTime}</Text>
                        <Text style={styles.subTitle}>{formData.name}</Text>
                    <Text style={styles.subTitle}>{formData.idType}</Text>
                    <Text style={styles.subTitle}>{formData.idNumber}</Text>
                    </View>
                    <BottomLineComponent />
                </View>
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
    subTitle: {
        color: '#225D66',
        fontSize: 17,
        fontWeight: '600',
        marginTop: 8,
        marginBottom: 15,
    },
    button: {
        width: '50%',
        backgroundColor: '#6d7f99',
        paddingVertical: 16,
        borderRadius: 4,
    },
    buttonText: {
        color: 'white',
        textAlign: 'center',
        fontSize: 16,
    },
    contentText: {
        color: '#3B3B3B',
        marginVertical: 10,
        fontSize: 17,
        fontWeight: '500',
        marginTop: 8,
        marginBottom: 15,
    }
});