import React from 'react'

import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableHighlight,
} from 'react-native';


export const TipsCard = () => {
    // Tips Card isPress Status
    const [isPress, setIsPress] = React.useState(0);
    // Tips Card Name
    const tipsArr = ['癌症檢查', '心臟疾病', '疫苗注射', '體重控制', '健康貼士'];
    // Tips Card Icon
    const iconArr = [require('../../images/icons/ribbon.png'), require('../../images/icons/clipboard-heart.png'), require('../../images/icons/injection.png'), require('../../images/icons/weight.png'), require('../../images/icons/heart-pulse.png')]
    
    return (
        <>
       {/* Tips Card Title */}
            <Text style={styles.indexTitle}>健康小貼士</Text>
        {/* * Card boxes */}
            < View style={{ flexWrap: 'wrap', flexDirection: 'row', marginHorizontal: 15,justifyContent:'flex-start'}}>
                {
                    tipsArr.map((item, idx) => (
                        <TouchableHighlight key={`tip_${idx}`} style={styles.tipsCard} onPress={() => { }} activeOpacity={1} underlayColor="#3F0075" onHideUnderlay={() => setIsPress(0)}
                            onShowUnderlay={() => { setIsPress(idx + 1) }}>
                            <>
                                <Image key={`tip_icon_${idx}`} resizeMode='contain' style={isPress === (idx + 1) ? styles.tipsIconAfterPressed : styles.tipsIconBeforePressed} source={iconArr[idx]} />
                                <Text key={`tip_card_${idx}`} style={isPress === (idx + 1) ? styles.tipsTextAfterPressed : styles.tipsTextBeforePressed}>{item}</Text>
                            </>
                        </TouchableHighlight>
                    ))
                }
            </View >
        </>
    )
}


const styles = StyleSheet.create({
    // Tips Title
    indexTitle: {
        marginTop: 22,
        marginBottom: 5,
        paddingHorizontal: 12,
        fontSize: 16,
        fontWeight: '600',
        textDecorationLine: 'underline',
        textAlign: 'center',
    },
    // tips card
    tipsCard: {
        marginTop: 10,
        marginLeft: 7,
        backgroundColor: '#F5F5F5',
        width: "31%",
        height: 90,
        alignItems: 'center',
        justifyContent: 'center',
    },
    // Tips Card text color
    tipsTextBeforePressed: {
        fontWeight: '600',
        color: 'grey',
        fontSize: 12,
    },
    tipsTextAfterPressed: {
        fontWeight: '600',
        color: 'white',
        fontSize: 12,
    },
    // Tips Card icon color
    tipsIconBeforePressed: {
        width: 25,
        height: 25,
        marginBottom: 10,
        tintColor: 'grey',
    },
    tipsIconAfterPressed: {
        width: 25,
        height: 25,
        marginBottom: 10,
        tintColor: 'white',
    },
});