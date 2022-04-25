import React from 'react'
import { View, Text, SafeAreaView, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { BottomLineComponent } from '../../components/SearchComponent';
// Need to be removed; only for development (will be replaced by fetch)
import { FakeRecordData } from '../ResRecordPage';


export const ResRecordDeail = (props: any) => {
    // To get the param passing from the previous screen
    const { id } = props.route.params;
    // white background
    const backgroundStyle = {
        backgroundColor: 'white',
    };
    // Need to be removed; only for testing(will be replaced by fetch)
    let userData: any = {}
    FakeRecordData.map((item) => {
        if (item['id'] === id) {
            userData = item
        }
    })

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
                <View style={[backgroundStyle, { flex: 1, marginBottom: 15, padding: 15, paddingTop: 25, flexDirection: 'row', }]}>
                    <View>
                        <Text style={styles.contentText}>預約編號：</Text>
                        <Text style={styles.contentText}>預約醫生：</Text>
                        <Text style={styles.contentText}>預約日期：</Text>
                        <Text style={styles.contentText}>預約時間：</Text>
                    </View>
                    <View style={{ marginLeft: 10, }}>
                        <Text style={styles.subTitle}>{userData.record_code}</Text>
                        <Text style={styles.subTitle}>{userData.doctor}</Text>
                        <Text style={styles.subTitle}>{userData.res_date}</Text>
                        <Text style={styles.subTitle}>{userData.res_time}</Text>
                    </View>
                </View>
                {userData.res_status !== '已完成' ?
                    <TouchableOpacity disabled={userData.res_status === '待診中' ? false : true} style={userData.res_status === '待診中' ? styles.button : styles.disableButton} onPress={() => props.navigation.navigate({ name: '主頁' })}>
                        <Text style={styles.buttonText}>開始診症</Text></TouchableOpacity> :
                    null}
                {userData.res_status === '已取消'? <Text style={styles.warning}>* 請聯絡客服了解預約詳情</Text>:null}
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
    contentText: {
        color: '#3B3B3B',
        marginVertical: 10,
        fontSize: 17,
        fontWeight: '500',
        marginTop: 8,
        marginBottom: 15,
    },
    warning: {
        fontSize: 14,
        color: 'red',
        textAlign:'center',
        marginVertical: 20,
      },
});