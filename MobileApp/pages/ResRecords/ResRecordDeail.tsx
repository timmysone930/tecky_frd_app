import React from 'react'
import { View, Text, SafeAreaView, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { useGetOneDoctorQuery } from '../../API/DoctorAPI';
import { SpinnerComponent } from '../../components/NativeBase/SpinnerComponent';
import { BottomLineComponent } from '../../components/SearchComponent';

export const ResRecordDeail = (props: any) => {
    // To get the param passing from the previous screen
    const { resCode, docCode, data } = props.route.params;
    // white background
    const backgroundStyle = {
        backgroundColor: 'white',
    };
    // get doctor name
    const docData = useGetOneDoctorQuery(docCode);
    const rowTitleArr = ['預約編號：', '預約醫生：', '預約日期：', '預約時間：']
    let rowCellArr :any=[];
    if (docData.isSuccess) {
        rowCellArr = [resCode, docData.data[0].name, data.item.res_date, data.item.res_time.substring(0,5)]
    }

    return (
        <SafeAreaView style={[backgroundStyle, { flex: 1 }]}>
            <ScrollView contentInsetAdjustmentBehavior="automatic" style={{ backgroundColor: 'white', marginBottom: 2, marginLeft: 5 }}>
                {/* Info */}
                <Text style={[styles.subTitle, { paddingHorizontal: 15, paddingTop: 25, }]}>應診提示</Text>
                <Text style={styles.remindInfo}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce sit amet est ipsum. Nullam sagittis eu elit nec porta. Nulla sollicitudin magna non
                    purus auctor malesuada.
                </Text>
                <BottomLineComponent />
                {docData.isLoading && <SpinnerComponent />}
                {docData.isSuccess &&
                    rowTitleArr.map((item, idx) => (
                        <View style={[backgroundStyle, { flexDirection: 'row', marginBottom: 1, marginHorizontal: 15, }]} key={`confirm_row_${idx}`}>
                            <View style={{ flex: 1.3 }}><Text style={styles.rowTitle}>{item}</Text></View>
                            <View style={{ flex: 3 }}><Text style={styles.rowCellText}>{rowCellArr[idx]}</Text></View>
                        </View>
                    ))

                }

                {data.item.status !== 'finish' ?
                    <TouchableOpacity disabled={data.item.status === 'booked' ? false : true} style={data.item.status === 'booked' ? styles.button : styles.disableButton} onPress={() => props.navigation.navigate({ name: '主頁' })}>
                        <Text style={styles.buttonText}>開始診症</Text></TouchableOpacity> :
                    null}
                {data.item.status === 'cancel' ? <Text style={styles.warning}>* 請聯絡客服了解預約詳情</Text> : null}
            </ScrollView>
        </SafeAreaView>
    )
}


const styles = StyleSheet.create({
    subTitle: {
        color: '#225D66',
        fontSize: 17,
        fontWeight: '600',
        marginTop: 8,
        marginBottom: 15,
    },
    remindInfo: {
        color: '#848A8A',
        marginBottom: 10,
        paddingHorizontal: 15,
    },
    button: {
        backgroundColor: '#6d7f99',
        paddingVertical: 16,
        marginHorizontal: 40,
        marginTop: 20,
    },
    disableButton: {
        backgroundColor: 'grey',
        paddingVertical: 16,
        marginHorizontal: 40,
        marginTop: 20,
    },
    buttonText: {
        color: 'white',
        textAlign: 'center',
        fontSize: 16,
    },
    warning: {
        fontSize: 14,
        color: 'red',
        textAlign: 'center',
        marginVertical: 20,
    },
    rowTitle: {
        color: '#3B3B3B',
        fontSize: 17,
        fontWeight: '500',
        marginTop: 12,
        marginBottom: 15,
    },
    rowCellText: {
        color: '#225D66',
        fontSize: 17,
        fontWeight: '600',
        marginTop: 10,
        marginBottom: 15,
    },
});