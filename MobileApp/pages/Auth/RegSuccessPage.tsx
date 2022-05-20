import React from 'react'
import { View, Text, SafeAreaView, TouchableOpacity, StyleSheet, Dimensions } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome';
import { useSelector } from 'react-redux';
import { styles } from '../../styles/AuthStyle'
const windowHeight = Dimensions.get('window').height;
// white background
const backgroundStyle = { backgroundColor: 'white', };
export const RegSuccessPage = (props: any) => {
    // GET previous page 
    const previousPage = useSelector((state: any) => state.setDoctorID.currentPage);
    const onPressNavigate = () => {
        if (previousPage === '') {
            props.navigation.navigate({ name: '預約Tab', })
        } else {
            props.navigation.navigate({ name: '相關醫生', })
        }
    }
    return (
        <SafeAreaView style={[backgroundStyle, { flex: 1 }]}>
            <View style={{ paddingTop: windowHeight * (1 / 7) }}>
                <View style={{ marginTop: 20 }}>
                    <Icon name="check-circle" size={100} color="#325C80" style={{ textAlign: 'center', marginBottom: 18 }} />
                    <Text style={[styles.RegSuccessTitle]}>註冊成功</Text>
                </View>
                <View style={{ marginTop: 30, }}>
                    <TouchableOpacity style={[styles.RegSuccessBtn, { backgroundColor: '#325C80' }]}
                        onPress={onPressNavigate}
                    >
                        <Text style={styles.RegSuccessBtnText}>前往預約</Text></TouchableOpacity>
                    <TouchableOpacity style={styles.RegSuccessBtn} onPress={() => props.navigation.navigate({ name: '我的資料' })}>
                        <Text style={styles.RegSuccessBtnText}>會員資料</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    )
}