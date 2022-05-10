import React, { useEffect } from 'react'

import {
    SafeAreaView,
    ScrollView,
    View,
    Image,
} from 'react-native';

import { NewsCard } from '../components/home/NewsCard';
import { TipsCard } from '../components/home/TipsCard';

import Config from "react-native-config";
console.log(Config.REACT_APP_API_SERVER)

export const Home =  () => {
    const backgroundStyle = {
        backgroundColor:'white',
    };

    return (
        <SafeAreaView style={backgroundStyle}>
            <ScrollView
                contentInsetAdjustmentBehavior="automatic"
                style={backgroundStyle}>
                {/* Banner image */}
                <Image resizeMode='cover' style={{ flex: 1, height: 150, width: undefined }} source={{uri: `${Config.REACT_APP_API_SERVER}/banner_01.jpeg`,}
                  } />
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
