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
// import icon for FontAwesome
import Icon from 'react-native-vector-icons/FontAwesome';

export const DrTypeCard = (props:any) => {
    // Card isPress Status
    const [isPress, setIsPress] = React.useState(0);
    // Doctor Type Name
    const typeArr = ['西醫', '未開放', '未開放', '未開放', '未開放','未開放', '未開放', '未開放', '未開放',];
    const typeStatusArr = [false, true, true, true,true,true,true,true,true]
    const typeIconArr = ['hospital-o', 'exclamation-circle', 'exclamation-circle', 'exclamation-circle', 'exclamation-circle', 'exclamation-circle', 'exclamation-circle', 'exclamation-circle', 'exclamation-circle']

   
    return (
        <>
       {/* Card Title */}
            <Text style={styles.indexTitle}>選擇專科服務類型</Text>
        {/* * Card boxes */}
            < View style={{ flexWrap: 'wrap', flexDirection: 'row', marginHorizontal: 15,}}>
                {
                    typeArr.map((item, idx) => (
                        <TouchableHighlight key={`dr_type_${idx}`} style={styles.drTypeCard}  onPress={() => {props.props.navigation.navigate({name:'醫生列表', params:{mode:item}})}} activeOpacity={1} underlayColor="#6d7f99" onHideUnderlay={() => setIsPress(0)}
                            onShowUnderlay={() => { setIsPress(idx + 1) }} disabled={typeStatusArr[idx]}>
                            <>
                                <Icon name={typeIconArr[idx]} size={30} color={isPress === (idx + 1) ? 'white' : 'grey'} style={{marginBottom:10}} />
                                {/* <Image resizeMode='contain' style={isPress === (idx + 1) ? styles.drTypeIconAfterPressed : styles.drTypeIconBeforePressed} source={require('../../images/icons/clipboard-heart.png')} /> */}
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
        backgroundColor: '#F4F4F4',
        width: "31%",
        height: windowHeight/5,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 6,
        shadowColor: Colors.shadow,
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
    },
    // Card text color
    drTypeTextBeforePressed: {
        fontWeight: '600',
        color: 'grey',
        fontSize: 18,
        marginTop:10,
    },
    drTypeTextAfterPressed: {
        fontWeight: '600',
        color: 'white',
        fontSize: 18,
        marginTop:10,
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