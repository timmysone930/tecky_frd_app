import React from 'react';
import { SafeAreaView, ScrollView, Text, View } from 'react-native';

// Component
import { DisplayDeliveryOption } from '../../components/prescription/DisplayDeliveryOption';

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
// Used Components: <DisplayDeliveryOption/>, <AddressForm/>
export const DeliveryOptionPage = ({navigation}:any)=> {
    return (
        <SafeAreaView>
            <ScrollView>
                <DisplayDeliveryOption data={FakeData} addressFormData={FakeAddr} changePage={() => navigation.navigate("付款確認")}/>
            </ScrollView>
        </SafeAreaView>
    );
}
