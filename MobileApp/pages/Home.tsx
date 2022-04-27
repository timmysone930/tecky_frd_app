import React, { useEffect } from 'react'

import {
    SafeAreaView,
    ScrollView,
    View,
    Image,
} from 'react-native';
import { useGetDoctorListQuery } from '../API/DoctorAPI';

import { NewsCard } from '../components/home/NewsCard';
import { TipsCard } from '../components/home/TipsCard';

export const Home = () => {
    const backgroundStyle = {
        backgroundColor:'white',
    };

    const {
        data, isLoading, isSuccess, isError, error } = useGetDoctorListQuery()
    if(isLoading){
        console.log("HI")
        console.log(JSON.stringify(data))
    }else{
        console.log("BYE")
        console.log(JSON.stringify(data))
    }
    
    return (
        <SafeAreaView style={backgroundStyle}>
            <ScrollView
                contentInsetAdjustmentBehavior="automatic"
                style={backgroundStyle}>
                {/* Banner image */}
                <Image resizeMode='cover' style={{ flex: 1, height: 150, width: undefined }} source={require("../images/banner_01.jpeg")} />
                <View style={backgroundStyle}>
                    {/* Tips Card component */}
                    <TipsCard />
                    {/* Latest News Card component */}
                    <NewsCard />
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}
