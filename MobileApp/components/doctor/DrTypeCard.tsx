import React from 'react'

import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableHighlight,
    Dimensions
} from 'react-native';

import {
    Colors,
} from 'react-native/Libraries/NewAppScreen';

const windowHeight = Dimensions.get('window').height;

export const DrTypeCard = (props:any) => {
    // Card isPress Status
    const [isPress, setIsPress] = React.useState(0);
    // Doctor Type Name
    const tipsArr = ['西醫', '中醫', '牙醫', '癌症檢查', '疫苗注射','物理治療', '身體檢查', '化驗報告', '體重控制',];

   
    return (
        <>
       {/* Card Title */}
            <Text style={styles.indexTitle}>選擇專科服務類型</Text>
        {/* * Card boxes */}
            < View style={{ flexWrap: 'wrap', flexDirection: 'row', marginHorizontal: 15,}}>
                {
                    tipsArr.map((item, idx) => (
                        <TouchableHighlight key={`dr_type_${idx}`} style={styles.drTypeCard}  onPress={() => {props.props.navigation.navigate('醫生列表')}} activeOpacity={1} underlayColor="#3F0075" onHideUnderlay={() => setIsPress(0)}
                            onShowUnderlay={() => { setIsPress(idx + 1) }}>
                            <>
                                <Image resizeMode='contain' style={isPress === (idx + 1) ? styles.drTypeIconAfterPressed : styles.drTypeIconBeforePressed} source={require('../../images/icons/clipboard-heart.png')} />
                                <Text style={isPress === (idx + 1) ? styles.drTypeTextAfterPressed : styles.drTypeTextBeforePressed}>{item}</Text>
                            </>
                        </TouchableHighlight>
                    ))
                }
            </View >
        </>
    )
}


const styles = StyleSheet.create({
    // Title
    indexTitle: {
        marginTop: 22,
        marginBottom: 5,
        paddingHorizontal: 12,
        fontSize: 16,
        fontWeight: '600',
        textDecorationLine: 'underline',
        textAlign: 'center',
    },
    // card
    drTypeCard: {
        marginTop: 15,
        marginLeft: 7,
        backgroundColor: '#DBDBDB',
        width: "31%",
        height: windowHeight/5,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 6,
        shadowColor: Colors.shadow,
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
    },
    // Card text color
    drTypeTextBeforePressed: {
        fontWeight: '600',
        color: 'grey',
        fontSize: 18,
    },
    drTypeTextAfterPressed: {
        fontWeight: '600',
        color: 'white',
        fontSize: 18,
    },
    // Tips Card icon color
    drTypeIconBeforePressed: {
        width: 25,
        height: 25,
        marginBottom: 10,
        tintColor: 'grey',
    },
    drTypeIconAfterPressed: {
        width: 25,
        height: 25,
        marginBottom: 10,
        tintColor: 'white',
    },
});