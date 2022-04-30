import React, { useState } from 'react';
import { SafeAreaView, ScrollView } from 'react-native';
import { AddressForm } from '../../components/address/AddressForm';
import { styles } from '../../styles/GeneralStyles';

// Redux
import { useSelector } from 'react-redux';

// Native-base
import { View, Button, useToast } from 'native-base';


export function EditAddressPage({navigation}:any) {

    const addressContent = useSelector((state:any) => state.getAddressData).addressEditContent
    const blacnkContent = {
        hkid:"",
        name:"",
        phone:"",
        area:"",
        district:"",
        addr:{
            street: "", 
            estate: "",
            flat: "",
            floor: "",
            block: "",
        },
        is_default: false
    }

    const [formFilled, setFormFilled] = useState(false)

    const [input, setInput] = (addressContent == null)? useState(blacnkContent) : useState(addressContent)
    
    // Toast: Save Successful
    const toast = useToast();

    const save = () => {
        if (!formFilled) {
            return
        }
        navigation.navigate("我的地址")

        toast.show({
            description: "儲存成功"
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
                        addr={input.addr}
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
