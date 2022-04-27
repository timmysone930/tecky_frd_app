import React from 'react'
import { View, Text, SafeAreaView, ScrollView, TouchableOpacity, StyleSheet, Dimensions } from 'react-native'

// import icon
import Icon from 'react-native-vector-icons/FontAwesome';
import { useSelector } from 'react-redux';

const windowHeight = Dimensions.get('window').height;

export const ResSuccessPage = (props: any) => {
    // white background
    const backgroundStyle = {
        backgroundColor: 'white',
    };

    // GET previous page 
    const previousPage = useSelector((state: any) => state.setDoctorID.currentPage);

    const onPressNavigate = ()=>{
        if(previousPage === ''){
            props.navigation.navigate({ name: '預約Tab',})
        }else{
            props.navigation.navigate({ name: '相關醫生', })
        }
    }

    return (
        <SafeAreaView style={[backgroundStyle, { flex: 1 }]}>
            <View style={{ paddingTop: windowHeight * (1 / 7) }}>
                <View style={{ marginTop: 20 }}>
                    <Icon name="check-circle" size={100} color="#325C80" style={{ textAlign: 'center', marginBottom: 18 }} />
                    <Text style={[styles.subTitle]}>注冊成功</Text>
                </View>
                <View style={{ marginTop: 30, }}>
                    <TouchableOpacity style={[styles.button, { backgroundColor: '#325C80' }]}
                        onPress={onPressNavigate}
                    >
                        <Text style={styles.buttonText}>前往預約</Text></TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={() => props.navigation.navigate({ name: '主頁' })}>
                        <Text style={styles.buttonText}>會員資料</Text></TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    )
}


const styles = StyleSheet.create({
    subTitle: {
        color: '#225D66',
        fontSize: 26,
        fontWeight: '900',
        marginTop: 10,
        marginBottom: 15,
        textAlign: 'center',
    },
    button: {
        backgroundColor: '#6d7f99',
        paddingVertical: 16,
        marginHorizontal: 40,
        marginTop: 20,
        borderRadius: 4,
    },
    buttonText: {
        color: 'white',
        textAlign: 'center',
        fontSize: 16,
    },

});