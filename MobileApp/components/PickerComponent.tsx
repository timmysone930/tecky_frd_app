import React, { useState } from 'react'
import { Alert, Button, StyleSheet, Text, Modal, View, TouchableWithoutFeedback, TouchableOpacity, TouchableHighlight } from 'react-native';
import DateTimePickerModal from "react-native-modal-datetime-picker";
// normal picker
import { Picker } from '@react-native-picker/picker';
// Modal picker
import ModalSelector from 'react-native-modal-selector'

// Time
export const TimePickerComponent = () => {
    const [isTimePickerVisible, setTimePickerVisibility] = useState(false);

    const showDatePicker = () => {
        setTimePickerVisibility(true);
    };

    const hideDatePicker = () => {
        setTimePickerVisibility(false);
    };

    const handleConfirm = (date: any) => {
        console.warn("A time has been picked: ", date);
        hideDatePicker();
    };
    return (
        <View>
            <Button title="Show Time Picker" onPress={showDatePicker} />
            <DateTimePickerModal
                isVisible={isTimePickerVisible}
                mode="time"
                onConfirm={handleConfirm}
                onCancel={hideDatePicker}
            />
        </View>
    )
}

// Modal picker
export const ModalPickerComponent = () => {
    // const [textInputValue, setTextInputValue] = useState('');
    let index = 0;

    const data = [
        { key: index++, section: true, label: 'Fruits' },
        { key: index++, label: 'Red Apples' },
        { key: index++, label: 'Cherries' },
        { key: index++, label: 'Cranberries', accessibilityLabel: 'Tap here for cranberries' },
        // etc...
        // Can also add additional custom keys which are passed to the onChange callback
        { key: index++, label: 'Vegetable', customKey: 'Not a fruit' }
    ];

    return (
        <View style={{ flex: 1, justifyContent: 'space-around', padding: 50 }}>

            <ModalSelector
                data={data}
                initValue="Select something yummy!"
                onChange={(option) => { Alert.alert(`${option.label} (${option.key}) nom nom nom`) }} />

        </View>
    );
};

// Picker with fake modal
export const PickerComponent = (props: any) => {
    const [modalVisible, setModalVisible] = useState(false);
    // const [selectedValue, setSelectedValue] = useState(props.placeholder);
    const data = props.data;
    let pickerFunction;
    let pickerPlaceholder;
    // Check the picker mode
    if (props.mode === 'date') {
        pickerPlaceholder = <Picker.Item label={`${props.placeholder}`} value={`${props.placeholder}`} />
        pickerFunction = data.map((item: any, idx: Number) => (
            <Picker.Item label={`${item['date']}`} value={`${item['date']}`} key={`picker_date_${item['id']}`} />
        ))
    } 
    else if (props.mode === 'time') {
        if (props.dateValue !== '請選擇應診日期') {

            pickerPlaceholder =<Picker.Item label={`${props.placeholder}`} value={`${props.placeholder}`} />
            data.map((item: any) => {
                if (item['date'] === props.dateValue) {
                    pickerFunction = item['time'].map((item: any, idx: Number) => (
                        <Picker.Item label={`${item}`} value={`${item}`} key={`picker_time+${item['id']}`} />
                    ))
                }
            })

        }
        else{
            pickerPlaceholder = <Picker.Item label={`請先選擇應診日期`} value="請先選擇應診日期" />
        }
    }
    else if(props.mode === 'id'){
        pickerFunction = data.map((item: any, idx: Number) => (
            <Picker.Item label={`${item}`} value={`${item}`} key={`picker_date_${idx}`} />
        ))

    }

    return (
        <View>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    Alert.alert("Modal has been closed.");
                    setModalVisible(!modalVisible);
                }}
            >
                {/* Click outside will close the modal */}
                <TouchableWithoutFeedback onPressOut={() => (setModalVisible(false))}>
                    <View style={styles.centeredView}  >
                        {/* Click inside will not close the modal */}
                        <TouchableWithoutFeedback onPressOut={() => (setModalVisible(true))}>
                            <View style={styles.modalView} >
                                {/* the picker */}
                                <Picker
                                    selectedValue={props.selectedValue}
                                    mode={'dropdown'}
                                    style={[styles.picker, { width: 350, height: 200 }]}
                                    onValueChange={props.onChange}>
                                    {pickerPlaceholder}
                                    {pickerFunction}
                                </Picker>
                                {/* Submit the picker */}
                                <TouchableOpacity onPressOut={() => setModalVisible(!modalVisible)} style={styles.modalButton}>
                                    <Text style={styles.textStyle}>Submit</Text>
                                </TouchableOpacity>
                            </View>
                        </TouchableWithoutFeedback>
                    </View>
                </TouchableWithoutFeedback>

            </Modal>
            {/* Open the picker */}
            <TouchableOpacity onPress={() => setModalVisible(true)} >
                <Text style={styles.input}>{props.selectedValue}</Text>
            </TouchableOpacity>
        </View>
    )
}

export const OnlyPickerComponent = (props: any) => {
    // const [selectedValue, setSelectedValue] = useState('');
    const data = props.data;

    return (
        <Picker
            selectedValue={props.selectedValue}
            mode={'dropdown'}
            style={styles.picker}
            onValueChange={props.onChange}
        >
            <Picker.Item label={`${props.placeholder}`} value="Unknown" />
            {data.map((item: any, idx: Number) => (<Picker.Item label={`${item}`} value={`${item}`} key={`picker_${idx}`} />))}
        </Picker>

    )
}

const styles = StyleSheet.create({
    input: {
        borderColor: '#737474',
        padding: 10,
        borderWidth: 0.7,
        marginVertical: 12,
        color:'black',
    },
    picker: {
        marginVertical: 8,
        // borderWidth: 0.7,
        // borderColor: "#737474",
    },
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
        fontSize: 19,
        margin: 10,
        paddingHorizontal: 100,
        paddingVertical: 4,
    },
    modalButton: {
        borderTopColor: '#EEEEEE',
        borderTopWidth: 1,
    }

});