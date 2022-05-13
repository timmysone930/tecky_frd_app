import React, { useEffect, useState, useRef } from 'react';
import { View, Text, SafeAreaView, ScrollView, TouchableOpacity, Linking } from 'react-native';
import { useGetOneDoctorQuery } from '../../API/DoctorAPI';
import { SpinnerComponent } from '../../components/utils/SpinnerComponent';
import { BottomLineComponent } from '../../components/utils/BottomLineComponent';
import { styles } from '../../styles/GeneralStyles';

// API
import { useGetReservationListQuery } from '../../API/PatientAPI';

const rowTitleArr = ['預約編號：', '預約醫生：', '預約日期：', '預約時間：']
enum ButtonText {
    start= "開始診症",
    finish= "診症完成",
    cancel= "已取消",
    outOfTime= "現時不在預約時間段"
}
// white background
const backgroundStyle = { backgroundColor: 'white', };

export const ResRecordDetail = (props: any, {navigation}: any) => {

    // To get the param passing from the previous screen
    const { resCode, docCode, data } = props.route.params;

    const [reservationData, setReservationData] = useState(data.item)

    let recordData = useGetReservationListQuery();
    // get doctor name
    const docData = useGetOneDoctorQuery(docCode);
    let rowCellArr: [string, string, string, string];
    if (docData.isSuccess) {
        rowCellArr = [resCode, docData.data[0].name, data.item.res_date, data.item.res_time.substring(0, 5)]
    }
    
    const isInRange = (value:any, range:any) => {
        return value >= range[0] && value <= range[1];
    }  

    const intervalId = useRef(null as any)

    const [buttonText, setButtonText] = useState(ButtonText.outOfTime)

    useEffect(()=>{
        let currentTime:any = new Date()
        currentTime.setUTCHours(currentTime.getUTCHours() + 8)
        // current date
        const year = currentTime.getFullYear()
        const month = currentTime.getMonth() + 1
        const date = currentTime.getDate()
        // current time 
        const fullDate = `${year}-${month}-${date}`

        let hours = currentTime.getHours()
        let mins = currentTime.getMinutes()
        // current fulltime 
        let currentFullTime = `${hours<10?"0"+hours:hours}:${mins<10?"0"+mins:mins}`

        // reservation time
        const resFullDate = data.item.res_date
        const resHours = parseInt(data.item.res_time.split(":")[0])
        const resMins = parseInt(data.item.res_time.split(":")[1]) - 5

        // reservation end time
        let resEndHours:number = resHours
        let resEndMins:number = resMins + 30
        if (resEndMins >= 60) {
            resEndHours += 1
            resEndMins -= 60
        }
        // reservation time range
        const resStart = `${resHours}:${resMins}`
        const resEnd = `${resEndHours}:${resEndMins}`

        // Check if current time in the time range
        const range = [resStart,resEnd];

        if (reservationData.status == 'booked' && 
            reservationData.video_url !== null && 
            fullDate == resFullDate && 
            isInRange(currentFullTime, range)) {
            // enable the button
            setButtonText(ButtonText.start)
            // Start Fetching every mins
            intervalId.current = setInterval(()=>{
                // refetching
                recordData.refetch()
                setReservationData(recordData.data[0])
                // Get current time
                currentTime = new Date()
                currentTime.setUTCHours(currentTime.getUTCHours() + 8)
                hours = currentTime.getHours()
                mins = currentTime.getMinutes()
                // current fulltime 
                currentFullTime = `${hours<10?"0"+hours:hours}:${mins<10?"0"+mins:mins}`
                if (!isInRange(currentFullTime, range)) {
                    clearInterval(intervalId.current)
                }
            },60000)
        } else if (reservationData.status == 'cancel') {
            setButtonText(ButtonText.cancel)
        } else if (reservationData.status == 'finish') {
            setButtonText(ButtonText.finish)
        } else {
            setButtonText(ButtonText.outOfTime)
        }
        return () => clearInterval(intervalId.current)
    },[navigation])

    return (
        <SafeAreaView style={[backgroundStyle, { flex: 1 }]}>
            <ScrollView 
                contentInsetAdjustmentBehavior="automatic" 
                style={{ backgroundColor: 'white', marginBottom: 2, marginLeft: 5 }}
            >
                {/* Info */}
                <Text style={[styles.subTitle, styles.mv_10, { paddingTop: 25, paddingHorizontal: 15 }]}>應診提示</Text>
                <Text style={styles.greyInfoText}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce sit amet est ipsum. Nullam sagittis eu elit nec porta. Nulla sollicitudin magna non
                    purus auctor malesuada.
                </Text>
                <BottomLineComponent />
                {docData.isLoading && <SpinnerComponent />}
                {docData.isSuccess &&
                    rowTitleArr.map((item, idx) => (
                        <View style={[backgroundStyle, styles.flexRow, { marginBottom: 1, marginHorizontal: 15 }]} key={`confirm_row_${idx}`}>
                            <View style={{ flex: 1.3 }}><Text style={styles.rowTitle}>{item}</Text></View>
                            <View style={{ flex: 3 }}><Text style={styles.rowCellText}>{rowCellArr[idx]}</Text></View>
                        </View>
                    ))
                }
                {reservationData.status !== 'finish' ?
                    <TouchableOpacity 
                        disabled={buttonText == ButtonText.start ? false : true} 
                        style={buttonText == ButtonText.start ? styles.fullButton : styles.disableButton} 
                        onPress={() => Linking.openURL(reservationData.video_url)}
                    >
                        <Text style={styles.buttonText}>{buttonText}</Text></TouchableOpacity> :
                    null}
                {reservationData.status === 'cancel' ? <Text style={[styles.warning, styles.textCenter, { marginVertical: 20, }]}>* 請聯絡客服了解預約詳情</Text> : null}
            </ScrollView>
        </SafeAreaView>
    )
}