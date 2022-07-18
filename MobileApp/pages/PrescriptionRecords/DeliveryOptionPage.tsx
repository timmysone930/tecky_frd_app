import React, { useState, useEffect, useRef } from 'react';
import { SafeAreaView, ScrollView, Text, View, RefreshControl } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { styles } from '../../styles/GeneralStyles';

// Native-base
import { Select, Radio, FormControl, CheckIcon, WarningOutlineIcon, Button, HStack, Spinner, useToast } from "native-base";

// Redux
import { store } from '../../redux/store';
import { setPrescriptionPaymentPreset } from '../../redux/slice';
import { useSelector } from 'react-redux';


// Component
import { AddressForm } from '../../components/address/AddressForm';
import { PayButton } from '../../components/prescription/PayButton';

// Config
import Config from 'react-native-config';


const wait = (timeout:any) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
}

// Page
export const DeliveryOptionPage = ({navigation}:any)=> {

    const userToken = useSelector((state: any) => state.getUserStatus.token);
    const init = {
        headers:{
            "Authorization":`Bearer ${userToken}`,
        }
    };

    const [refreshing, setRefreshing] = useState(false);

    const onRefresh = React.useCallback(() => {
      setRefreshing(true);
      wait(2000).then(() => setRefreshing(false));
    }, []);

    // Toast
    const toast = useToast()

    const reduxData = useSelector((state: any) => state.getPrescriptionCode)
    const [prescriptionSelecting, setPrescriptionSelecting] = useState(null as any) ;


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
    const [formFilled, setFormFilled] = useState(false);

    const [ isValidToSubmit, setIsValidToSubmit ] = useState<boolean>(true);

    const dataFetching = async () => {
        const resp = await fetch (`${Config.REACT_APP_API_SERVER}/client/default-address`, init)
        const result = resp.status === 200 ? (await resp.json()) : null

        setInput(result.defaultAddress != null ? result.defaultAddress[0] : "")

        setAllowPickUp(result.pickUpStores != null ? result.pickUpStores : "")
        console.log(result.pickUpStores);
    }

    const submitHandler = () => {
        if (pickUpClinic.clinic_code == "" && deliveryOption == "pick-up") {
            return
        }

        if (!formFilled && deliveryOption == "deliver") {

            if (input == "") {
                toast.show({
                    description: "暫無任何地址記錄，請點選新增地址新增記錄，或選擇分店自取。"
                })
            }

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
        setPrescriptionSelecting(reduxData.prescriptionSelecting)
    }, [reduxData])
  
    useEffect(()=>{
        const unsubscribe = navigation.addListener('focus', () => {
            dataFetching()
            setFetched(true)
        });

        return () => {unsubscribe}
    },[navigation])

    return (
        <SafeAreaView>
            <ScrollView
                refreshControl={
                    <RefreshControl
                    refreshing={refreshing}
                    onRefresh={onRefresh}
                    />
                }
            >
                {
                    allowPickUp == null &&
                    // Loading Spinner
                    <HStack space={2} justifyContent="center" alignItems={'center'} marginTop={50}>
                        <Spinner color="#225D66" accessibilityLabel="Loading posts" />
                    </HStack>
                }
                { fetched && allowPickUp != null && prescriptionSelecting != null &&
                    <View style={[styles.viewContainer]}>
                        <Text style={[styles.title, styles.mb_30]}>
                            藥單編號: {prescriptionSelecting.prescription.pres_code}
                        </Text>

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
                            
                            <FormControl 
                                isRequired isDisabled={deliveryOption === 'deliver'} 
                                isInvalid={pickUpClinic.clinic_code == "" && deliveryOption == "pick-up"}
                            >
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
                                            <Select.Item 
                                                label={`${item.area} - ${item.clinic_name}`} 
                                                value={item.clinic_code} 
                                                key={item.clinic_code}
                                            />
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
                            <Radio value="deliver" my={1} isDisabled={input == "" && input != null}>
                                <Text style={[styles.contentFont, styles.mh_10]}>
                                    上門送藥 (運費到付)
                                </Text>
                            </Radio>

                        </Radio.Group>


                        {
                            input == "" && input != null ?
                            <>
                                <Text>
                                    請先返回頁面，我的 {'>'} 送藥地址 {'>'} 按"新增送貨地址"。
                                </Text>
                                {/* <Text style={[styles.subTitle, styles.mv_10, styles.textCenter]}>
                                    沒有地址記錄
                                </Text>
                                <Button size={"lg"} onPress={() => navigation.navigate("新增地址")}>
                                    新增地址
                                </Button> */}
                            </>
                            :
                            <View>
                                <AddressForm
                                    hkid={input.hkid}
                                    name={input.name}
                                    name_en={input.name_en}
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


                        <PayButton title={"確定及付款"} disabled={!isValidToSubmit} onPressFunction={submitHandler}/>


                    </View>
                }

            </ScrollView>
        </SafeAreaView>
    );
}

