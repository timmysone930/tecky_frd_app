import React, { useState, useEffect } from 'react';
import { SafeAreaView, ScrollView, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { styles } from '../../styles/GeneralStyles';

// Native-base
import { Select, Radio, FormControl, CheckIcon, WarningOutlineIcon, Button, HStack, Spinner, Heading } from "native-base";

// Redux
import { store } from '../../redux/store';
import { setPrescriptionPaymentPreset } from '../../redux/slice';
import { useSelector } from 'react-redux';


// Component
import { AddressForm } from '../../components/address/AddressForm';
import { PayButton } from '../../components/prescription/PayButton';

// Config
import Config from 'react-native-config';

// Fake Data
import { FakeData } from './PrescriptionDetailPage';

export const FakeAddr = [
    {
        hkid: "A123456(7)",
        name: "張中和",
        phone: "12345678",
        area: "新界",
        district: "沙田區大圍",
        addr: "dsgssggfsgsgsddg",
        is_default: true,
    },
    {
        hkid: "A123456(7)",
        name: "張中和",
        phone: "12345678",
        area: "九龍",
        district: "油尖旺區大南",
        addr: "fsdfafdsfsdasf",
        is_default: false,
    },
]

// Page
export const DeliveryOptionPage = ({navigation}:any)=> {

    const fetchData = FakeData ;

    const prescriptionDetail = useSelector((state:any)=>state.getPrescriptionCode).prescriptionDetail

    // deliveryOption: 'pick-up' || 'deliver'
    const [deliveryOption, setDeliveryOption] = useState('pick-up');
    // Allow pick Up clinic
    const [allowPickUp, setAllowPickUp] = useState(null as any)

    // pickUpClinic: The selected pick-up store
    const [pickUpClinic, setPickUpClinic] = useState({
        clinic_code: "",
        area: "",
        district: "",
        addr: ""
    })

    // input: Customer's address for delivery

    // const defaultInput = FakeAddr.filter((obj:any) => obj.is_default == true)[0]
    const [input, setInput] = useState(null as any)
    const [formFilled, setFormFilled] = useState(false)

    const dataFetching = async () => {
        const resp = await fetch (`${Config.REACT_APP_API_SERVER}/client/default-address`)
        const defaultAddress = await resp.json()
        if (defaultAddress != null) {
            setInput(defaultAddress)
        }
        const pickUpStoreResp = await fetch (`${Config.REACT_APP_API_SERVER}/clinics/getList`)
        const pickUpStore = (await pickUpStoreResp.json()).filter((item: any) => item.allow_store_pickup)
        if (pickUpStore.length > 0) {
            setAllowPickUp(pickUpStore)
        }
    }

    const submitHandler = () => {
        if (pickUpClinic.clinic_code == "" && deliveryOption == "pick-up") {
            return
        }
        if (!formFilled && deliveryOption == "deliver") {
            return
        }

        store.dispatch(setPrescriptionPaymentPreset({
            deliveryMethod: deliveryOption, 
            pickUpStore: pickUpClinic, 
            deliverAddress: input
        }))
        navigation.navigate("付款確認")
    }

    const [fetched, setFetched] = useState(false)
  
    useEffect(()=>{
        if (!fetched) {
            dataFetching()
            setFetched(true)
        }
    },[])

    return (
        <SafeAreaView>
            <ScrollView>
                { fetched && allowPickUp != null && 
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
                            
                            <FormControl isRequired isDisabled={deliveryOption === 'deliver'} isInvalid={pickUpClinic.clinic_code == "" && deliveryOption == "pick-up"}>
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
                                            const selectedStore = allowPickUp.filter((item: any)=> item.clinic_code == itemValue)[0]
                                            setPickUpClinic({
                                                clinic_code: itemValue,
                                                area: selectedStore.area,
                                                district: selectedStore.district,
                                                addr: selectedStore.clinic_address,
                                            })
                                        }}
                                    >
                                        
                                        {allowPickUp.map((item: any) => (
                                            <Select.Item label={item.area+"分店"} value={item.clinic_code} key={item.clinic_code}/>
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
                            !fetched &&
                            // Loading Spinner
                            <HStack space={2} justifyContent="center" alignItems={'center'}>
                                <Spinner color="#225D66" accessibilityLabel="Loading posts" />
                            </HStack>
                        }

                        {
                            
                        input == null ?
                        <>
                                <Text style={[styles.subTitle, styles.mv_10, styles.textCenter]}>
                                    沒有地址記錄
                                </Text>
                                <Button size={"lg"} onPress={() => navigation.navigate("送藥地址", {screen: "編輯地址"})}>
                                    新增地址
                                </Button>
                            </>
                            :
                            <View>
                                <AddressForm
                                    hkid={input.hkid}
                                    name={input.name}
                                    phone={input.phone}
                                    area={input.area}
                                    district={input.district}
                                    addr={input.address}
                                    enabled={deliveryOption === 'deliver'}
                                    allFilled={formFilled}
                                    setAllFilled={setFormFilled}
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
                }

            </ScrollView>
        </SafeAreaView>
    );
}

