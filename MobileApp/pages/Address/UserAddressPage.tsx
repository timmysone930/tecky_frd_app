import React, { useState } from 'react';
import { SafeAreaView } from 'react-native';
import { styles } from '../../styles/GeneralStyles';

// Native-base
import { Radio, Text, View, Button, ScrollView, AlertDialog, useToast } from 'native-base';

// Redux
import { store } from '../../redux/store';
import { setAddressWannaDeleteID } from '../../redux/slice';
import { setAddressEditContent } from '../../redux/slice';

const FakeAddr = [
    {
        id: "123",
        hkid: "A123456(7)",
        name: "張中和",
        phone: "12345678",
        area: "新界",
        district: "沙田區大圍",
        addr: {
            street: "XXX街", 
            estate: "XXX屋苑", 
            flat: "3", 
            floor: "20", 
            block: "A"
        },
        is_default: true,
    },
    {
        id: "345",
        hkid: "A123456(7)",
        name: "張中和",
        phone: "12345678",
        area: "九龍",
        district: "油尖旺區大南",
        addr: {
            street: "XXX街", 
            estate: "XXX屋苑", 
            flat: "5", 
            floor: "10", 
            block: "B"
        },
        is_default: false,
    },
    {
        id: "752",
        hkid: "A123456(7)",
        name: "張中和",
        phone: "12345678",
        area: "九龍",
        district: "油尖旺區大南",
        addr: {
            street: "XXX街", 
            estate: "XXX屋苑", 
            flat: "5", 
            floor: "10", 
            block: "B"
        },
        is_default: false,
    },
    {
        id: "422",
        hkid: "A123456(7)",
        name: "張中和",
        phone: "12345678",
        area: "九龍",
        district: "油尖旺區大南",
        addr: {
            street: "XXX街", 
            estate: "XXX屋苑", 
            flat: "5", 
            floor: "10", 
            block: "B"
        },
        is_default: false,
    },
]

export function UserAddressPage({navigation}:any) {

    const fetchAddressArr = FakeAddr

    const defaultAddressObj = fetchAddressArr.filter((obj:any) => obj.is_default == true)[0]
    const [defaultAddressID, setDefaultAddressID] = useState(defaultAddressObj.id);
    
    const toast = useToast()

    // Each Button Handler

    // [ + 新增送貨地址 ] button Handler
    const addButtonHandler = () => {
        store.dispatch(setAddressEditContent({addressEditContent: null}))
        navigation.navigate("編輯地址")
    }

    // [ 編輯 ] button Handler
    const editButtonHandler = (addressContent: any) => () => {
        store.dispatch(setAddressEditContent({addressEditContent: addressContent}))
        navigation.navigate("編輯地址")
    }

    

    // Confirm Delete AlertDialog
    const [isOpen, setIsOpen] = React.useState(false);
    const onClose = () => {
        setIsOpen(false)
        
        // To decide which Dialog to show
        setResetDefaultDialog(false)
    };

    const cancelRef = React.useRef(null);

    // For storing the address id to delete
    let addressToDeleteID: any;

    // [ 刪除 ] button Handler
    const deleteButtonHandler = (addressID:any) => () => {
        addressToDeleteID = addressID
        setIsOpen(!isOpen)
    }

    // Confirm to delete
    const confirmDeleteButtonHandler = () => {
        store.dispatch(setAddressWannaDeleteID({addressWannaDeleteID: addressToDeleteID}))
        onClose()

        toast.show({
            title: "刪除成功",
            placement: "bottom"
        })
    }

    // Set Default Address Radio Handler
    const [resetDefaultDialog, setResetDefaultDialog] = useState(false)
    const [addrToSetDefault, setAddrToSetDefault] = useState("")

    // Handle deletion with Database

    const setDefault = () => {
        setDefaultAddressID(addrToSetDefault);
        onClose()
        
        toast.show({
            title: "設定成功",
            placement: "bottom"
        })
    }




    return (
        <SafeAreaView>
            <View >
                <ScrollView style={[styles.viewContainer]} height={"80%"} >
                    <Radio.Group 
                            name="myRadioGroup" 
                            accessibilityLabel="favorite number" 
                            value={defaultAddressID} 
                            onChange={nextValue => {
                                setResetDefaultDialog(true)
                                setIsOpen(!isOpen)
                                setAddrToSetDefault(nextValue)
                            }}
                    >
                        {
                            fetchAddressArr.map((address) => 
                                <View key={address.id} marginBottom={10}>
                                    <Radio value={address.id} my={1}>
                                        <View>
                                            <Text style={[styles.subTitle]} marginX={10} textAlign={"right"}>
                                                聯絡人: {address.name}&nbsp; 聯絡電話:{address.phone}
                                            </Text>
                                        </View>
                                    </Radio>
                                    <Text style={[styles.contentText]} marginY={3} marginX={10} textAlign={"right"}>
                                        {address.area}&nbsp;{address.district}
                                    </Text>
                                    <Text style={[styles.contentText]} marginY={3} marginX={10} textAlign={"right"}>
                                        {address.addr.street}&nbsp;
                                        {address.addr.estate}&nbsp;
                                        {address.addr.floor}樓&nbsp;
                                        {address.addr.flat}室
                                    </Text>

                                    {/* [ 編輯, 刪除 ] button */}
                                    <View flexDirection={'row'} justifyContent={'flex-end'} alignItems={'center'}>
                                        <Button padding={1} height={10} width={100} marginX={5} size={"lg"} onPress={editButtonHandler(address)}>
                                            編輯
                                        </Button>

                                        <Button colorScheme="danger" padding={1} height={10} width={100} marginX={10} size={"lg"} onPress={deleteButtonHandler(address.id)}>
                                            刪除
                                        </Button>
                                    </View>


                                </View>
                            )
                        }
                    </Radio.Group>
                </ScrollView>


                <View>
                    {/* 為預設送藥地址 - 說明 */}
                    <View alignItems={'flex-end'} marginY={3} marginBottom={6}>
                        <Radio.Group name="demo" defaultValue='demo'><Radio value="demo" my={1}>
                            <Text style={[styles.subTitle]} marginRight={2}>
                                為預設送藥地址
                            </Text>
                        </Radio></Radio.Group>
                    </View>

                    {/* [ + 新增送貨地址 ] button */}
                    <Button 
                        backgroundColor={"#245c84"}
                        alignSelf={'flex-end'} 
                        marginX={2}
                        padding={1} 
                        height={10} 
                        width={200} 
                        size={"lg"} 
                        onPress={addButtonHandler}
                        >
                        + 新增送貨地址
                    </Button>
                </View>


                <AlertDialog leastDestructiveRef={cancelRef} isOpen={isOpen} onClose={onClose}>
                    <AlertDialog.Content>
                    <AlertDialog.CloseButton />
                    <AlertDialog.Header>{resetDefaultDialog ? "設定送藥地址" : "地址刪除"}</AlertDialog.Header>
                    <AlertDialog.Body>
                        {resetDefaultDialog? "請問確定要設定該地址為預設送藥地址嗎?" : "請問確定要刪除該地址嗎?"}
                    </AlertDialog.Body>
                    <AlertDialog.Footer>
                        <Button.Group space={2}>
                        <Button variant="unstyled" colorScheme="coolGray" onPress={onClose} ref={cancelRef}>
                            取消
                        </Button>
                        <Button colorScheme={resetDefaultDialog? "primary": "danger"} onPress={resetDefaultDialog? setDefault : confirmDeleteButtonHandler}>
                            {resetDefaultDialog? "確定" :"刪除"}
                        </Button>
                        </Button.Group>
                    </AlertDialog.Footer>
                    </AlertDialog.Content>
                </AlertDialog>

            </View>
        </SafeAreaView>
    );
}
