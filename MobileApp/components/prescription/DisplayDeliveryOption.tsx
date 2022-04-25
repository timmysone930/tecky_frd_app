import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { RadioButton } from 'react-native-paper';
import { Picker } from '@react-native-picker/picker';
import { Button } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';
import { styles } from '../../styles/GeneralStyles';

// Component
import { AddressForm } from '../address/AddressForm';
import { PayButton } from './PayButton';

// import type of Addr
import {Addr} from "../address/AddressForm"
interface Pick_up_store {
    district: string,
    addr: string  
}

interface Props {
    data: {
        pick_up_store: Array<Pick_up_store>,
        pres_code: string,
    },
    addressFormData: Array<
        {
            hkid: string;
            name: string;
            phone: string;
            area: string;
            district: string;
            addr: Addr;
            is_default: boolean;
        }
    >,
    changePage: () => void
}

// Component
export const DisplayDeliveryOption = (props:Props) => {
    
    const [deliveryOption, setDeliveryOption] = useState('pick-up');
    const [pickUpClinic, setPickUpClinic] = useState({
        district: props.data.pick_up_store[0].district,
        addr: props.data.pick_up_store[0].addr
    })

    return (
        <View style={[styles.viewContainer]}>
            <Text style={[styles.title, styles.mb_10]}>
                藥單編號: {props.data.pres_code}
            </Text>
            <View>

                {/* Select Method: 分店自取 */}
                <View style={[styles.flexRow, styles.AICenter, styles.mt_10]}>
                    <RadioButton
                        value="pick-up"
                        status={ deliveryOption === 'pick-up' ? 'checked' : 'unchecked' }
                        onPress={() => setDeliveryOption('pick-up')}
                    />
                    <Text style={[styles.contentFont]}>
                        分店自取
                    </Text>
                </View>
                <View style={[styles.mb_10]}>
                    <Picker
                        style={[styles.mb_10, {backgroundColor:"#e7e7e7"}]}
                        enabled={deliveryOption === 'pick-up'}
                        selectedValue={pickUpClinic.district}
                        onValueChange={(itemValue, itemIndex) =>
                            setPickUpClinic({
                                district: itemValue,
                                addr: props.data.pick_up_store[itemIndex].addr
                            })
                    }>
                        {props.data.pick_up_store.map((item: any) => (
                            <Picker.Item label={item.district+"分店"} value={item.district} key={item.district}/>
                        ))}
                    </Picker>
                    <View style={[styles.flexRow]}>
                        <Icon name="map-marker" size={20} color="#325C80" />
                        <Text style={[styles.mb_10, styles.mh_10]}>
                            {pickUpClinic.addr}
                        </Text>
                    </View>
                </View>

                {/* Select Method: 上門送藥 */}
                <View style={[styles.flexRow, styles.AICenter, styles.mt_30, styles.mv_10]}>
                    <RadioButton
                        value="deliver"
                        status={ deliveryOption === 'deliver' ? 'checked' : 'unchecked' }
                        onPress={() => setDeliveryOption('deliver')}
                    />
                    <Text style={[styles.contentFont]}>
                        上門送藥 (運費到付)
                    </Text>
                </View>
                <View>
                    <AddressForm inputData={props.addressFormData} enabled={deliveryOption === 'deliver'}/>
                </View>
            </View>
            <Text style={[styles.mt_30, styles.mb_10]}>
                付款前，請詳細核對送貨地址。
            </Text>
            <PayButton title={"確定及付款"} disabled={false} onPressFunction={props.changePage}/>
        </View>
    )
}