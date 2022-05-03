import React, { useState } from 'react';
import { SafeAreaView, ScrollView } from 'react-native';
import { AddressForm } from '../../components/address/AddressForm';
import { styles } from '../../styles/GeneralStyles';

// Redux
import { useSelector } from 'react-redux';

// Native-base
import { View, Button, useToast } from 'native-base';

// .env
import Config from 'react-native-config';


export function EditAddressPage({navigation}:any) {

    const addressContent = useSelector((state:any) => state.getAddressData).addressEditContent
    const blankContent = {
        // hkid:"",
        name:"",
        phone:"",
        area:"",
        district:"",
        address:"",
        is_default: false
    }
    

    const [formFilled, setFormFilled] = useState(false)

    const [input, setInput] = (addressContent == null)? useState(blankContent) : useState(addressContent)
    
    // Toast: Save Successful
    const toast = useToast();

    const save = async () => {
        if (!formFilled) {
            return
        }

        let resp: any;
        if (addressContent == null) {
            const hkIdResp = await fetch (`${Config.REACT_APP_API_SERVER}/client/profile`)
            const hkId = (await hkIdResp.json()).id_number
            resp = await fetch (`${Config.REACT_APP_API_SERVER}/client/new-addr-book`, {
                headers: {
                    'Content-Type': 'application/json'
                },
                method: "POST",
                body: JSON.stringify({...input, hkid: hkId})
            })

        } else {
            resp = await fetch (`${Config.REACT_APP_API_SERVER}/client/edit-addr-book`, {
                headers: {
                    'Content-Type': 'application/json'
                },
                method: "POST",
                body: JSON.stringify(input)
            })
        }
        
        navigation.navigate("我的地址")

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
