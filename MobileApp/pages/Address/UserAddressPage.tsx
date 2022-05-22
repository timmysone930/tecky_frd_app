import React, { useState, useEffect } from 'react';
import { SafeAreaView, RefreshControl } from 'react-native';
import { Text as RNtext } from 'react-native';
import { styles } from '../../styles/GeneralStyles';

// Redux
import { useSelector } from 'react-redux';

// Native-base
import { Radio, Text, View, Button, ScrollView, AlertDialog, useToast, Spinner, HStack, Heading } from 'native-base';

// Redux
import { store } from '../../redux/store';
import { setAddressEditContent } from '../../redux/slice';

// .env
import Config from 'react-native-config';


const wait = (timeout:any) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
}

export function UserAddressPage({navigation}:any) {

    const userToken = useSelector((state: any) => state.getUserStatus.token);

    const [fetchData, setFetchData] = useState(null as any)
    const [defaultAddressID, setDefaultAddressID] = useState(null as any);
    
    const toast = useToast()
    
    const infoFetching = async () => {
        const resp = await fetch (`${Config.REACT_APP_API_SERVER}/client/addr-book`, {
            headers:{
                "Authorization":`Bearer ${userToken}`,
            }
        })
        const data = await resp.json()
        data.length > 0 ? setFetchData(data) : setFetchData("")
        let findDefaultAddressID:any;
        try {
            findDefaultAddressID = data.filter((obj:any) => obj.is_default == true)[0].id
        } catch (e) {
            findDefaultAddressID = ""
        }
        setDefaultAddressID(findDefaultAddressID)
        
    }

    const [fetched, setFetched] = useState(false)

    useEffect(()=>{
        const unsubscribe = navigation.addListener('focus', () => {
            if (!fetched) {
                infoFetching() 
                setFetched(true)
            }
        });

        return () => {unsubscribe}
    },[navigation])

    // Each Button Handler

    // [ + 新增送貨地址 ] button Handler
    const addButtonHandler = () => {
        store.dispatch(setAddressEditContent({addressEditContent: null}))
        setFetched(false)
        navigation.navigate("編輯地址")
    }

    // Confirm Delete AlertDialog
    const [isOpen, setIsOpen] = useState(false);
    const onClose = () => {
        setIsOpen(false)
    };

    const cancelRef = React.useRef(null);

    // For storing the address id to delete
    const [addressToDeleteID, setAddressToDeleteID] = useState()

    // [ 刪除 ] button Handler
    const deleteButtonHandler = (addressID:any) => () => {
        
        setAddressToDeleteID(addressID)
        // To decide which Dialog to show
        setResetDefaultDialog(false)
        setIsOpen(!isOpen)
    }

    // Confirm to delete
    const confirmDeleteButtonHandler = async () => {
        // store.dispatch(setAddressWannaDeleteID({addressWannaDeleteID: addressToDeleteID}))
        onClose()
        // Fetch to delete address
        const resp = await fetch(`${Config.REACT_APP_API_SERVER}/client/addr-book/delete/${addressToDeleteID}`, {
            headers: {
                "Authorization":`Bearer ${userToken}`,
                'Content-Type': 'application/json'
            },
            method: "DELETE",

        })

        resp.status == 200 && infoFetching() 
        
        toast.show({
            title: resp.status == 200 ? "刪除成功" : "系統錯誤，請稍後再試。",
            placement: "bottom"
        })
    }

    // [ 編輯 ] button Handler
    const editButtonHandler = (addressContent: any) => () => {
        store.dispatch(setAddressEditContent({addressEditContent: addressContent}))
        setFetched(false)
        navigation.navigate("編輯地址")
    }

    // Set Default Address Radio Handler
    const [resetDefaultDialog, setResetDefaultDialog] = useState(false)
    const [addrToSetDefault, setAddrToSetDefault] = useState("")


    const setDefault = async () => {
        onClose()

        const secondResp = await fetch(`${Config.REACT_APP_API_SERVER}/client/edit-addr-book`, {
            headers: {
                "Authorization":`Bearer ${userToken}`,
                'Content-Type': 'application/json'
            },
            method: "POST",
            body: JSON.stringify({id: addrToSetDefault, is_default: 1})
        })

        if (secondResp.status == 201) {
            setDefaultAddressID(addrToSetDefault)
            toast.show({
                title: "設定成功",
                placement: "bottom"
            })
        } else {
            toast.show({
                title: "系統錯誤，請稍後再試。",
                placement: "bottom"
            })
        }
        infoFetching()
    }

    const [refreshing, setRefreshing] = useState(false);

    const onRefresh = React.useCallback(() => {
      infoFetching() 
      setRefreshing(true);
      wait(1200).then(() => setRefreshing(false));
    }, []);

    return (
        <SafeAreaView>
            <View >
                <ScrollView style={[styles.viewContainer]} height={"80%"} 
                    refreshControl={
                        <RefreshControl
                          refreshing={refreshing}
                          onRefresh={
                              onRefresh
                            }
                        />
                    }
                >

                    {
                        fetchData != null ?
                        (
                            defaultAddressID != null && fetchData != "" ?
                            <Radio.Group 
                                    name="myRadioGroup" 
                                    accessibilityLabel="favorite number" 
                                    value={defaultAddressID} 
                                    onChange={nextValue => {
                                        // To decide which Dialog to show
                                        setResetDefaultDialog(true)
                                        setIsOpen(!isOpen)
                                        setAddrToSetDefault(nextValue)
                                    }}
                            >
                                {
                                    fetchData.map((address:any) => 
                                        <View 
                                            key={address.id} 
                                            width={"100%"}
                                            marginBottom={10} 
                                            borderBottomColor={'gray.600'} 
                                            borderBottomWidth={'0.5'} 
                                            paddingBottom={'5'}
                                        >
                                            <Radio value={address.id} my={1} >
                                                <View width={"100%"} alignItems={'flex-start'} >
                                                    {/* <Text style={[styles.subTitle]} marginLeft={2}>
                                                        聯絡人: {address.name}
                                                    </Text> */}
                                                    <Text style={[styles.subTitle]} marginY={1} marginX={5} textAlign={"left"}>
                                                        聯絡人: {address.name}
                                                    </Text>
                                                    <Text style={[styles.subTitle]} marginY={1} marginX={5} textAlign={"left"}>
                                                        聯絡電話: {address.phone}
                                                    </Text>
                                                    <Text style={[styles.contentText]} marginY={1} marginX={5} textAlign={"left"}>
                                                        {address.area}&nbsp;{address.district}
                                                    </Text>
                                                    <Text style={[styles.contentText]} marginY={1} marginX={5} textAlign={"left"}>
                                                        {address.address.split("/nl/")[0]}
                                                    </Text>
                                                    <Text style={[styles.contentText]} marginY={1} marginX={5} textAlign={"left"}>
                                                        {address.address.split("/nl/")[1]}
                                                    </Text>
                                                </View>
                                            </Radio>

                                            {/* [ 編輯, 刪除 ] button */}
                                            <View flexDirection={'row'} justifyContent={'flex-end'} alignItems={'center'} marginTop={3}>
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
                            :
                            <RNtext style={{textAlign:'center', fontSize:17, margin:20}}>沒有地址記錄</RNtext>
                        )
                        :
                        // Loading Spinner
                        <HStack space={2} justifyContent="center" alignItems={'center'}>
                            <Spinner color="#225D66" accessibilityLabel="Loading posts" />
                        </HStack>
                    }

                </ScrollView>


                <View borderTopColor={'gray.600'} borderTopWidth={'0.5'}>
                    {/* 為預設送藥地址 - 說明 */}
                    <View alignItems={'center'} marginY={3} marginBottom={6}>
                        <Radio.Group name="demo" defaultValue='demo'><Radio value="demo" my={1}>
                            <Text style={[styles.subTitle]} marginRight={2}>
                                為預設送藥地址
                            </Text>
                        </Radio></Radio.Group>
                    </View>

                    {/* [ + 新增送貨地址 ] button */}
                    <Button 
                        alignSelf={'center'} 
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
