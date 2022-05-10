import React, { useState } from 'react';
import { SafeAreaView, ScrollView, Text } from 'react-native';
import { AddressForm } from '../../components/address/AddressForm';
import { styles } from '../../styles/GeneralStyles';

// Redux
import { useSelector } from 'react-redux';

// Native-base
import { View, Button, useToast, Radio } from 'native-base';

// .env
import Config from 'react-native-config';


export function PrescriptionNewAddrPage({navigation}:any) {

    const blankContent = {
        hkid:"",
        name:"",
        phone:"",
        area:"",
        district:"",
        address:"",
        is_defaultValue: false
    }
    

    const [formFilled, setFormFilled] = useState(false)

    const [input, setInput] = useState(blankContent)

    const [defaultValue, setDefaultValue] = useState("true");
    
    // Toast: Save Successful
    const toast = useToast();

    const save = async () => {
        if (!formFilled) {
            return
        }

        const hkIdResp = await fetch (`${Config.REACT_APP_API_SERVER}/client/profile`)
        const hkId = (await hkIdResp.json()).id_number

        const resp = await fetch (`${Config.REACT_APP_API_SERVER}/client/new-addr-book`, {
            headers: {
                'Content-Type': 'application/json'
            },
            method: "POST",
            body: JSON.stringify({...input, hkid: hkId, is_default: true})
        })

        
        navigation.navigate("地址確認")

        toast.show({
            description: resp.status == 201 ? "儲存成功" : "系統錯誤，儲存失敗"
        })
    }
    return (
        <SafeAreaView>
            <ScrollView>
                <View style={[styles.viewContainer]}>
                    <AddressForm 
                        hkid={input.hkid}
                        name={input.name}
                        phone={input.phone}
                        area={input.area}
                        district={input.district}
                        addr={input.address}
                        allFilled={formFilled}
                        setAllFilled={setFormFilled}
                        enabled={true}
                        input={input}
                        setInput={setInput}
                    />
                </View>
                <View alignItems={"center"} marginBottom={10}>
                    <Radio.Group 
                        name="myRadioGroup" 
                        accessibilityLabel="favorite number" 
                        value={defaultValue} 
                        onChange={nextvalue => {
                            setDefaultValue(nextvalue);
                        }}
                    >
                        <Radio value="true" my={1}>
                            <Text style={[styles.subTitle]}>
                                設為預設送藥地址
                            </Text>
                        </Radio>
                    </Radio.Group>
                </View>

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
                    儲存
                </Button>
            </ScrollView>
        </SafeAreaView>
    );
}
