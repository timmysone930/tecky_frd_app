import React, { useEffect, useState, useRef } from 'react';
import { SafeAreaView, ScrollView, Image, Text } from 'react-native';
import { styles } from '../../styles/GeneralStyles';

// Native-base
import { View, Button, useToast, Input, FormControl, WarningOutlineIcon, HStack, Spinner} from 'native-base';

// API
import { useGetUserInfoQuery, usePutEditInfoMutation } from '../../API/UserInfoAPI';
import Config from "react-native-config";


export function InfoEditPage({navigation}:any) {

    // Toast
    const toast = useToast()
    
    // Data fetching
    const [fetchData, setFetchData] = useState(null as any)

    // Assign the original phone number (8 digits) for comparison with the new input phone number
    const [originalPhone, setOriginalPhone] = useState("")

    // New input
    const [input, setInput] = useState({
        email: "",
        areaCode: "",
        phone: "",
        validCode: "",
    })

    const infoFetching = async () => {
        const resp = await fetch (`${Config.REACT_APP_API_SERVER}/client/profile`)
        const result = await resp.json()
        setFetchData(result)
        setInput({
            ...input,
            email: result.email,
            areaCode: result.phone.slice(0, 3),
            phone: result.phone.slice(3, 12)
        })
        setOriginalPhone(result.phone.slice(3, 12))
    }
    
    const [fetched, setFetched] = useState(false)

    useEffect(()=>{
        if (!fetched) {
            infoFetching() 
            setFetched(true)
        }
        return ()=> clearInterval(intervalId.current)
    },[])

    // Determine The inputs are enable or not
    const [isDisable, setIsDisable] = useState({
        button: true,
        input: true,
        warning: false,
        phoneInput: false,
    })
    
    // 電話輸入欄
    const phoneInputHandler = (phone: any) => {
        setInput({...input, phone: phone})

        if (originalPhone != phone && phone.length == 8) {
            setIsDisable({...isDisable, button: false})
        } else {
            setIsDisable({...isDisable, button: true})
        }
    }

    const countTime = 60
    const [counter, setCounter] = useState(countTime);
    const [isActive, setIsActive] = useState(false)
    const intervalId = useRef(0 as any)
    // 驗證碼掣
    const verifyButtonHandler = async () => {
        // Fetching
        const phoneNum = input.areaCode + input.phone
        const resp = await fetch (`${Config.REACT_APP_API_SERVER}/auth/send-sms-for-change/`, {
            method: "POST",
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({phone: phoneNum})
        })

        if (resp.status == 201) {
            toast.show({
                description: "已送出驗證碼"
            })
        } else {
            toast.show({
                description: "驗證碼發送故障，請再嘗試。"
            })
            return
        }
        // Reset counter to 60s
        setCounter(countTime)
        // Activate 60s count down and Disable the button
        setIsActive(true)

        let t = countTime
        intervalId.current = setInterval(()=>{
            t = t - 1
            setCounter(t)
            if (t < 0) {
                clearInterval(intervalId.current)
                setIsActive(false)
                setIsDisable({...isDisable, input: false, phoneInput: true, button: false})
            }
        },1000)
        setIsDisable({...isDisable, input: false, phoneInput: true, button: true})

    }
    
    // 驗證碼輸入欄
    const verifyCodeInputHandler = (value: any) => {
        setInput({...input, validCode: value})
    }


    // Save all
    const [putEditInfo] = usePutEditInfoMutation();
    const save = async () => {
        if (input.email == fetchData.email && input.phone == fetchData.phone) {
            toast.show({
                description: "帳戶資料未有變更，請輸入新的帳戶資料並儲存。"
            })
            return
        }
        // If the input of email and phone are empty, not save
        if (input.email.length == 0 || input.phone.length == 0) {
            toast.show({
                description: "請輸入新的帳戶資料並儲存。"
            })
            return
        }
        if (originalPhone != input.phone) {
            if (input.validCode.length == 0) {
                setIsDisable({...isDisable, warning: true})
                return
            } else {
                const phoneNum = input.areaCode + input.phone
                const resp = await fetch (`${Config.REACT_APP_API_SERVER}/auth/client/confirm-change-info/`, {
                    method: "POST",
                    headers: {
                        'content-type': 'application/json'
                    },
                    body: JSON.stringify({phone: phoneNum, smsCode: input.validCode})
                })
                if (resp.status == 400) {
                    toast.show({
                        description: "請確認輸入正確電話號碼及驗證碼"
                    })
                    return
                }
            }
        }
        
        const newInfo = {
            ...fetchData,
            email: input.email,
            phone: input.areaCode + input.phone,
        }

        const resp = await putEditInfo(newInfo)
        
        navigation.navigate("查看")
        toast.show({
            description: "成功儲存帳戶資料"
        })
    }

    return (
        <SafeAreaView style={{ backgroundColor: 'white'}}>
            <ScrollView>
                <View style={[styles.viewContainer]}>
                    { fetched && fetchData != null ?
                        <>
                            <View justifyContent={"space-between"} height={400} marginY={5}>
                                <View flexDirection={'row'}>
                                    <Text style={[{width: 130}, styles.contentText]}>
                                        會員編號: 
                                    </Text>
                                    <Text style={[styles.subTitle]}>
                                        {fetchData.member_code}
                                    </Text>
                                </View>
                                <View flexDirection={'row'}>
                                    <Text style={[{width: 130}, styles.contentText]}>
                                        姓名: 
                                    </Text>
                                    <Text style={[styles.subTitle]}>
                                        {fetchData.name}
                                    </Text>
                                </View>
                                <View flexDirection={'row'}>
                                    <Text style={[{width: 130}, styles.contentText]}>性別: </Text>
                                    <Text style={[styles.subTitle]}>{fetchData.gender}</Text>
                                </View>
                                <View flexDirection={'row'}>
                                    <Text style={[{width: 130}, styles.contentText]}>出生日期: </Text>
                                    <Text style={[styles.subTitle]}>{fetchData.birthday}</Text>
                                </View>

                                {/* Email */}
                                <FormControl isInvalid={input.email == ""}>
                                    <Text style={[{width: 130}, styles.contentText]}>Email: </Text>
                                    <Input
                                        size="lg"
                                        placeholder="Email" 
                                        keyboardType='email-address'
                                        value={input.email} 
                                        onChangeText={email => setInput({...input, email: email})}
                                    />
                                    <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
                                        此項必須填寫
                                    </FormControl.ErrorMessage>
                                </FormControl>

                                {/* 手提電話號碼 */}
                                <FormControl isInvalid={input.phone == ""} >
                                    <Text style={[{width: 130}, styles.contentText]}>手提電話號碼: </Text>
                                    <Input 
                                        value={input.areaCode}
                                        isDisabled={true}
                                        size="lg" 
                                        keyboardType="numeric"
                                        placeholder="區號" 
                                        onChangeText={phoneInputHandler}
                                    />
                                    <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
                                        此項必須填寫
                                    </FormControl.ErrorMessage>
                                    <Input
                                        isDisabled={isDisable.phoneInput}
                                        size="lg" 
                                        keyboardType="numeric"
                                        placeholder="手提電話號碼" 
                                        value={input.phone} 
                                        onChangeText={phoneInputHandler}
                                    />
                                    <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />} isInvalid={input.phone.length != 8}>
                                        此項必須為 8 位數字電話號碼
                                    </FormControl.ErrorMessage>
                                    <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
                                        此項必須填寫
                                    </FormControl.ErrorMessage>
                                </FormControl>

                            </View>
                            <View flexDirection={"row"}>
                                <Button 
                                    isDisabled={isDisable.button}
                                    colorScheme={"danger"}
                                    alignSelf={'flex-start'} 
                                    marginBottom={5}
                                    padding={1} 
                                    height={10} 
                                    flex={2} 
                                    size={"lg"}
                                    onPress={verifyButtonHandler}
                                    >
                                        <Text style={{color: "white"}}>
                                            驗證碼 {isActive &&`(${counter})`}
                                        </Text>
                                </Button>
                                <FormControl isInvalid={isDisable.warning} flex={4}>
                                    <Input
                                        isDisabled={isDisable.input}
                                        height={10}
                                        size="lg"  
                                        placeholder="請輸入短訊驗證碼" 
                                        onChangeText={verifyCodeInputHandler}
                                    />
                                    
                                    <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
                                        此項必須填寫
                                    </FormControl.ErrorMessage>
                                </FormControl>
                            </View>

                            <View justifyContent={"center"} height={50} marginY={5} >
                                <Button 
                                    alignSelf={'center'} 
                                    marginX={2}
                                    marginBottom={5}
                                    padding={1} 
                                    height={10} 
                                    width={200} 
                                    size={"lg"} 
                                    onPress={save}
                                >
                                    儲存變更
                                </Button>
                            </View>
                        </>
                        :
                            // Loading Spinner
                        <HStack space={2} justifyContent="center" alignItems={'center'}>
                            <Spinner color="#225D66" accessibilityLabel="Loading posts" />
                        </HStack>
                    }
                    
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}