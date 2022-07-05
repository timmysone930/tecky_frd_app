import React from 'react'
import { View, Text, TouchableHighlight, StyleSheet } from 'react-native';
import {
    SafeAreaView,
    ScrollView,
} from 'react-native';

export const MyInfoPage = ({navigation}:any) => {

    const listItems = ["帳戶資料", "預約記錄 ", "藥單記錄", "送藥地址"];

    // Set background to white
    const backgroundStyle = {
        backgroundColor:'white',
    };

    return (
        <SafeAreaView style={[backgroundStyle, { flex: 1 }]}>
            <ScrollView contentInsetAdjustmentBehavior="automatic" style={backgroundStyle}>
                
                {/* List component */}
                {listItems.map((item, key) => (
                    <TouchableHighlight underlayColor={"rgba(0, 0, 0, 0.4)"} key={key} onPress={() => navigation.navigate(item)}>
                        <View style={[styles.MyInfoButton]}>
                            <Text style={[styles.TextStyle]}>{item}</Text>
                        </View>
                    </TouchableHighlight>
                ))}
                
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    MyInfoButton: {
        height: 100,
        justifyContent: "center",
        paddingLeft: 30,
        borderBottomColor: "rgba(0, 0, 0, 0.4)",
        borderBottomWidth: 1,
    },
    TextStyle: {
        fontSize: 23,
        color:'black'
    }
})