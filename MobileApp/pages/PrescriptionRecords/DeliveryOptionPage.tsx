import React, { useState } from 'react';
import { SafeAreaView, ScrollView, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { styles } from '../../styles/GeneralStyles';

// Native-base
import { Select, Radio, FormControl, CheckIcon, WarningOutlineIcon, Button } from "native-base";

// Redux
import { store } from '../../redux/store';
import { setPrescriptionPaymentPreset } from '../../redux/slice';


// Component
import { AddressForm } from '../../components/address/AddressForm';
import { PayButton } from '../../components/prescription/PayButton';


// Fake Data
import { FakeData } from './PrescriptionDetailPage';

export const FakeAddr = [
    {
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
        hkid: "A123456(7)",
        name: "張中和",
        phone: "12345678",
        area: "九龍",
        district: "油尖旺區大南",
        addr: {
            street: "XXX街", 
            estate: "XXX屋苑", 
            flat: "3", 
            floor: "20", 
            block: "A"
        },
        is_default: false,
    },
]

// Page
export const DeliveryOptionPage = ({navigation}:any)=> {

    const fetchData = FakeData ;

    // deliveryOption: 'pick-up' || 'deliver'
    const [deliveryOption, setDeliveryOption] = useState('pick-up');

    // pickUpClinic: The selected pick-up store
    const [pickUpClinic, setPickUpClinic] = useState({
        clinic_code: fetchData.pick_up_store[0].clinic_code,
        area: fetchData.pick_up_store[0].area,
        district: fetchData.pick_up_store[0].district,
        addr: fetchData.pick_up_store[0].addr
    })

    // input: Customer's address for delivery
    const defaultInput = FakeAddr.filter((obj:any) => obj.is_default == true)[0]
    const [input, setInput] = useState(defaultInput)

    const submitHandler = () => {
        store.dispatch(setPrescriptionPaymentPreset({
            deliveryMethod: deliveryOption, 
            pickUpStore: pickUpClinic, 
            deliverAddress: input
        }))
        navigation.navigate("付款確認")
    }

    return (
        <SafeAreaView>
            <ScrollView>
                <View style={[styles.viewContainer]}>
                    <Text style={[styles.title, styles.mb_30]}>
                        藥單編號: {fetchData.pres_code}
                    </Text>

                    {/*  */}
                    

                    <Radio.Group 
                        name="myRadioGroup" 
                        accessibilityLabel="favorite number" 
                        value={deliveryOption} 
                        onChange={nextValue => {
                        setDeliveryOption(nextValue);
                        }}
                    >

                        {/* Select Method: 分店自取 */}
                        <Radio value="pick-up" my={1}>
                            <Text style={[styles.contentFont, styles.mh_10]}>
                                分店自取
                            </Text>
                        </Radio>
                        
                        <Text style={[styles.subTitle, styles.mt_10]}>
                            供自取分店
                        </Text>
                        
                        <FormControl isRequired isDisabled={deliveryOption === 'deliver'}>
                            {/* <FormControl.Label>分店自取</FormControl.Label> */}
                            <Select 
                                accessibilityLabel="請選擇自取分店" 
                                placeholder="請選擇自取分店" 
                                borderColor="#737474"
                                minWidth="200" 
                                fontSize="sm"
                                mt="2"
                                mb='1'
                                _selectedItem={{
                                    bg: "teal.600",
                                    endIcon: <CheckIcon size={5} />
                                }}
                                onValueChange={(itemValue) => {
                                    const selectedStore = fetchData.pick_up_store.filter((item)=> item.clinic_code == itemValue)[0]
                                    setPickUpClinic({
                                        clinic_code: itemValue,
                                        area: selectedStore.area,
                                        district: selectedStore.district,
                                        addr: selectedStore.addr,
                                    })
                                }}
                            >

                                {fetchData.pick_up_store.map((item: any) => (
                                    <Select.Item label={item.district+"分店"} value={item.clinic_code} key={item.clinic_code}/>
                                ))}

                            </Select>

                            <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
                                此項必須選擇
                            </FormControl.ErrorMessage>

                        </FormControl>

                        <View style={[styles.flexRow, styles.mb_30]}>
                            <Icon name="map-marker" size={20} color="#325C80" />
                            <Text style={[styles.mb_10, styles.mh_10]}>
                                {pickUpClinic.area} {pickUpClinic.district} {pickUpClinic.addr}
                            </Text>
                        </View>
                        
                        {/* Select Method: 上門送藥 */}
                        <Radio value="deliver" my={1}>
                            <Text style={[styles.contentFont, styles.mh_10]}>
                                上門送藥 (運費到付)
                            </Text>
                        </Radio>

                    </Radio.Group>
                    {
                        input == null && 
                        <>
                            <Text style={[styles.subTitle, styles.mt_10, styles.textCenter]}>
                                沒有地址記錄
                            </Text>
                            <Button size={"lg"} onPress={() => navigation.navigate("付款確認")}>
                                新增地址
                            </Button>
                        </>
                    }
                    {
                        input != null &&
                        <View>
                            <AddressForm
                                hkid={input.hkid}
                                name={input.name}
                                phone={input.phone}
                                area={input.area}
                                district={input.district}
                                addr={input.addr}
                                enabled={deliveryOption === 'deliver'}
                                input={input}
                                setInput={setInput}
                            />
                        </View>
                    }

                    <Text style={[styles.mt_30, styles.mb_10]}>
                        付款前，請詳細核對送貨地址。
                    </Text>
                    <PayButton title={"確定及付款"} disabled={false} onPressFunction={submitHandler}/>

                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

