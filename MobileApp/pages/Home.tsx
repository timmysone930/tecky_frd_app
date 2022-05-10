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

async function getMoviesFromApi() {
    try {
      // 注意这里的await语句，其所在的函数必须有async关键字声明
      let response = await fetch(
        'http://telemedicine.onesolution.hk/doctors/list'
      );
      let responseJson = await response.json();
      console.log(responseJson)
      return responseJson;
    } catch (error) {
      console.error(error);
    }
  }

export const Home =  () => {
    const backgroundStyle = {
        backgroundColor:'white',
    };

    getMoviesFromApi()
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
