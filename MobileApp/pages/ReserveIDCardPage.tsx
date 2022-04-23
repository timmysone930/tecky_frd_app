import React, { useState } from 'react'
import { View, Text, SafeAreaView, ScrollView, StyleSheet, TouchableOpacity, Image, Button, Modal, TouchableWithoutFeedback } from 'react-native'
// react-native-image-picker
import { CameraModalComponent } from '../components/ModalComponent';



export const ReserveIDCardPage: React.FC = (props: any) => {
    // white background
    const backgroundStyle = {
        backgroundColor: 'white',
    };
    // upload image
    const [response, setResponse] = useState<any>(null);
    const onSetResponse = (item: any) => {
        setResponse(item);
    };
    // set the modal
    const [modalVisible, setModalVisible] = useState(false);
    const onSetModalVisible = (status: any) => {
        setModalVisible(status);
    };

    return (
        <SafeAreaView style={[backgroundStyle, { flex: 1 }]}>
            <ScrollView contentInsetAdjustmentBehavior="automatic" style={{ backgroundColor: 'white', padding: 15, paddingTop: 25, marginBottom: 2, }}>
                <View style={[backgroundStyle, { flex: 1 }]}>
                    <Text style={styles.subTitle}>請上傳你的身份證照片正面</Text>
                    {/* Modal for camera */}
                    <TouchableOpacity onPress={() => setModalVisible(true)} style={styles.uploadBtn}>
                        <Image source={require('../images/btn_IDCard.jpg')} style={{ width: 380, height: 200 }} resizeMode="contain" resizeMethod="scale" />
                        {/* <Text style={styles.uploadBtnText}>上傳照片</Text> */}
                    </TouchableOpacity>
                    <CameraModalComponent modalVisible={modalVisible} setModalVisible={onSetModalVisible} setResponse={onSetResponse} />

                    {/* Show the uploaded photo */}
                    {response?.assets &&
                        response?.assets.map(({ uri }: any) => (
                            <View key={uri}>
                                <Text style={styles.subTitle}>上傳的身份證照片:</Text>
                                <Image resizeMode="contain" resizeMethod="scale" style={{ width: 380, height: 240, marginBottom: 50, }} source={{ uri: uri }} />
                            </View>
                        ))}
                    {response?.assets && response?.assets.map(({ uri }: any) => (console.log(uri)))}
                </View>
            </ScrollView>
            {/* Button to go back and next page */}
            <View style={{ flexDirection: 'row' }}>
                <TouchableOpacity style={styles.button} onPress={() => props.navigation.navigate({ name: '主頁' })}>
                    <Text style={styles.buttonText}>返回主頁</Text></TouchableOpacity>
                <TouchableOpacity style={[styles.button, { backgroundColor: '#325C80' }]}
                    onPress={() => props.navigation.navigate({ name: '健康申報表' })}>
                    <Text style={styles.buttonText}>下一步</Text></TouchableOpacity>
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
});
