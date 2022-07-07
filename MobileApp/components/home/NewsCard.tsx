import React from 'react'

import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
} from 'react-native';
import Config from 'react-native-config';

import { Colors } from 'react-native/Libraries/NewAppScreen';


export const NewsCard = () => {
    return (
        <>
            {/* SubTitle */}
            <Text style={styles.indexSubtitle}>最新動態</Text>
            {/* News Card boxes */}
            <View style={{ flexWrap: 'wrap', flexDirection: 'row', justifyContent: 'center' }}>
                <TouchableOpacity style={styles.newsCard}>
                    <Image resizeMode='contain' style={{ height:120, width:100, marginTop:10,}} source={{uri: `${Config.REACT_APP_API_SERVER}/images/news_test_01.jpeg`,}} />
                    <Text style={styles.cardDate}>12/11/2021</Text>
                    <Text style={styles.cardTitle}>抗體檢查測試</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.newsCard}>
                    <Image resizeMode='contain' style={{ height: 120, width:100, marginTop:10 }} source={{uri: `${Config.REACT_APP_API_SERVER}/images/news_test_02.jpeg`,}} />
                    <Text style={styles.cardDate}>15/10/2021</Text>
                    <Text style={styles.cardTitle}>國際乳癌關注月 - 乳房X光造影及超聲波檢查套餐</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.newsCard}>
                    <Image resizeMode='contain' style={{ height:120, width:100, marginTop:10,}} source={{uri: `${Config.REACT_APP_API_SERVER}/images/news_test_01.jpeg`,}} />
                    <Text style={styles.cardDate}>12/11/2021</Text>
                    <Text style={styles.cardTitle}>抗體檢查測試</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.newsCard}>
                    <Image resizeMode='contain' style={{ height: 120, width:100, marginTop:10 }}source={{uri: `${Config.REACT_APP_API_SERVER}/images/news_test_02.jpeg`,}} />
                    <Text style={styles.cardDate}>15/10/2021</Text>
                    <Text style={styles.cardTitle}>國際乳癌關注月 - 乳房X光造影及超聲波檢查套餐</Text>
                </TouchableOpacity>
            </View >
        </>
    )
}

const styles = StyleSheet.create({
    indexSubtitle: {
        marginVertical: 22,
        fontSize: 16,
        fontWeight: '500',
        textDecorationLine: 'underline',
        textAlign: 'center',
    },
    // news card
    newsCard: {
        padding:10,
        marginHorizontal: 5,
        marginBottom: 20,
        width: "45%",
        height: 'auto',
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 6,
        shadowColor: Colors.shadow,
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
    },
    // News Title
    cardTitle:{
        fontSize: 13, 
        marginVertical: 5, 
        color: 'purple', 
        fontWeight: '600' 
    },
    cardDate:{
        fontSize: 12, 
        marginTop: 10,
    }
});