import React from 'react'
import { Modal, PermissionsAndroid, Platform, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';

interface modalProps{
    modalVisible:boolean,
    setModalVisible:(status: boolean) => void, 
    setResponse: (item:any) => void ,
}

export const CameraModalComponent = (props: modalProps) => {

    // Permission for open camera (Android version)
    const requestCameraPermission = async () => {
        
        const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.CAMERA,
            {
                title: "App Camera Permission",
                message:
                    "This App needs to access to your camera for you to upload the id card",
                buttonNeutral: "Ask Me Later",
                buttonNegative: "Cancel",
                buttonPositive: "OK"
            }
        );

        console.log(granted)

        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            console.log("You can use the camera");
            launchCamera({ 
                saveToPhotos: true,
                mediaType: 'photo',
                includeBase64: false,
                cameraType: 'back',
            }, props.setResponse);
        } 
        else {
            console.log("Camera permission denied");
        }
    };

    const iosButton = () => {
        launchCamera({ 
            saveToPhotos: true,
            mediaType: 'photo',
            includeBase64: false,
            cameraType: 'back',
        }, props.setResponse)
    }
    return (
        <View>
            <Modal
                animationType="slide"
                transparent={true}
                visible={props.modalVisible}
                onRequestClose={() => {
                    props.setModalVisible(!props.modalVisible);
                }}
            >
                {/* Click outside will close the modal */}
                <TouchableWithoutFeedback onPressOut={() => (props.setModalVisible(false))}>
                    <View style={styles.centeredView}  >

                        {/* Click inside will not close the modal */}
                        <TouchableWithoutFeedback onPressOut={() => (props.setModalVisible(true))}>
                            <View style={styles.modalView} >

                                {/* Take Photo */}
                                <TouchableOpacity onPress={Platform.OS === 'ios' ? iosButton : requestCameraPermission}>
                                    <Text style={styles.textStyle}>拍照</Text>
                                </TouchableOpacity>

                                {/* Upload image*/}
                                <TouchableOpacity onPress={() => { launchImageLibrary({ selectionLimit: 1, mediaType: 'photo', includeBase64: false, }, props.setResponse) }}>
                                    <Text style={styles.textStyle}>從相冊上傳照片</Text>
                                </TouchableOpacity>

                                {/* Close the modal*/}
                                <TouchableOpacity onPressOut={() => props.setModalVisible(!props.modalVisible)} style={styles.modalButton}>
                                    <Text style={styles.textStyle}>取消</Text>
                                </TouchableOpacity>

                            </View>
                        </TouchableWithoutFeedback>
                    </View>
                </TouchableWithoutFeedback>

            </Modal>
        </View>
    )
}

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    textStyle: {
        color: "#3482F1",
        fontWeight: "500",
        textAlign: "center",
        fontSize: 18,
        margin: 10,
        paddingHorizontal: 100,
        paddingVertical: 4,
    },
    modalButton: {
        borderTopColor: '#EEEEEE',
        borderTopWidth: 1,
    }
});
