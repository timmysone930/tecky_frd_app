import React from 'react'
import { View, Text, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import { useGetOneDoctorQuery } from '../../API/DoctorAPI';
import { SpinnerComponent } from '../../components/NativeBase/SpinnerComponent';
import { BottomLineComponent } from '../../components/SearchComponent';
import { styles } from '../../styles/GeneralStyles';

const rowTitleArr = ['預約編號：', '預約醫生：', '預約日期：', '預約時間：']

export const ResRecordDetail = (props: any) => {
    // To get the param passing from the previous screen
    const { resCode, docCode, data } = props.route.params;
    // white background
    const backgroundStyle = {backgroundColor: 'white',};
    // get doctor name
    const docData = useGetOneDoctorQuery(docCode);
    let rowCellArr:[string, string, string, string];
    if (docData.isSuccess) {
        rowCellArr = [resCode, docData.data[0].name, data.item.res_date, data.item.res_time.substring(0,5)]
    }
    return (
        <SafeAreaView style={[backgroundStyle, { flex: 1 }]}>
            <ScrollView contentInsetAdjustmentBehavior="automatic" style={{ backgroundColor: 'white', marginBottom: 2, marginLeft: 5 }}>
                {/* Info */}
                <Text style={[styles.subTitle, styles.mv_10, {paddingTop: 25, paddingHorizontal:15}]}>應診提示</Text>
                <Text style={styles.greyInfoText}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce sit amet est ipsum. Nullam sagittis eu elit nec porta. Nulla sollicitudin magna non
                    purus auctor malesuada.
                </Text>
                <BottomLineComponent />
                {docData.isLoading && <SpinnerComponent />}
                {docData.isSuccess &&
                    rowTitleArr.map((item, idx) => (
                        <View style={[backgroundStyle, styles.flexRow, {marginBottom: 1, marginHorizontal: 15}]} key={`confirm_row_${idx}`}>
                            <View style={{ flex: 1.3 }}><Text style={styles.rowTitle}>{item}</Text></View>
                            <View style={{ flex: 3 }}><Text style={styles.rowCellText}>{rowCellArr[idx]}</Text></View>
                        </View>
                    ))
                }
                {data.item.status !== 'finish' ?
                    <TouchableOpacity disabled={data.item.status === 'booked' ? false : true} style={data.item.status === 'booked' ? styles.fullButton : styles.disableButton} onPress={() => props.navigation.navigate({ name: '醫生' })}>
                        <Text style={styles.buttonText}>開始診症</Text></TouchableOpacity> :
                    null}
                {data.item.status === 'cancel' ? <Text style={[styles.warning, styles.textCenter, {marginVertical: 20,}]}>* 請聯絡客服了解預約詳情</Text> : null}
            </ScrollView>
        </SafeAreaView>
    )
}