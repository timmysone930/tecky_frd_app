import React, { useEffect } from 'react'
import { StyleSheet, Text, View, TouchableHighlight, Dimensions, ScrollView, RefreshControl } from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import Icon from 'react-native-vector-icons/FontAwesome';
import { wait } from '../../pages/ResRecordPage';
import { useGetAllSpecQuery } from '../../API/DoctorAPI';
import { SpinnerComponent } from '../utils/SpinnerComponent';
const windowHeight = Dimensions.get('window').height;
// Doctor Type Name
// const typeArr = ['所有專科', '未開放', '未開放', '未開放', '未開放', '未開放', '未開放', '未開放', '未開放',];
// const typeStatusArr = [false, true, true, true, true, true, true, true, true]
// const typeIconArr = ['hospital-o', 'exclamation-circle', 'exclamation-circle', 'exclamation-circle', 'exclamation-circle', 'exclamation-circle', 'exclamation-circle', 'exclamation-circle', 'exclamation-circle']

export const DocSpecCardComponent = (props: any) => {
    // Card isPress Status
    const [isPress, setIsPress] = React.useState(0);
    // fetch data
    const spec = useGetAllSpecQuery()
    // refetch
    const [refreshing, setRefreshing] = React.useState(false);
    const onRefresh = React.useCallback(() => {
        try {
            setRefreshing(true);
            spec.refetch();
            wait(2000).then(() => setRefreshing(false));

        } catch (e) {
            console.log(e)
        }
    }, []);

    return (
        <>
            <ScrollView contentInsetAdjustmentBehavior="automatic" style={{ backgroundColor: 'white' }}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                    />
                }
            >
                <Text style={styles.indexTitle}>選擇專科服務類型</Text>
                {spec.isLoading && <SpinnerComponent />}
                {spec.isError && <Text style={[styles.title, , styles.t_center]}>載入出現錯誤...</Text>}
                {spec.isSuccess &&
                    < View style={{ flexWrap: 'wrap', flexDirection: 'row', marginHorizontal: 15, }}>
                        <TouchableHighlight key={`dr_type_${0}`} style={styles.drTypeCard} onPress={() => { props.props.navigation.navigate({ name: '醫生列表', params: { mode: '所有專科' } }) }} activeOpacity={1} underlayColor="#6d7f99" onHideUnderlay={() => setIsPress(0)}
                            onShowUnderlay={() => { setIsPress(0 + 1) }}>
                            <>
                                <Icon name={'hospital-o'} size={30} color={isPress === (0 + 1) ? 'white' : 'grey'} style={{ marginBottom: 10 }} />
                                <Text style={isPress === (0 + 1) ? styles.drTypeTextAfterPressed : styles.drTypeTextBeforePressed}>所有專科</Text>
                            </>
                        </TouchableHighlight>
                        {
                            spec.data.map((item:any, idx:number) => (
                                <TouchableHighlight key={`dr_type_${idx}`} style={styles.drTypeCard} onPress={() => { props.props.navigation.navigate({ name: '醫生列表', params: { mode: item} }) }} activeOpacity={1} underlayColor="#6d7f99" onHideUnderlay={() => setIsPress(0)}
                                    onShowUnderlay={() => { setIsPress(idx + 2) }} >
                                    <>
                                        <Icon name={'hospital-o'} size={30} color={isPress === (idx + 2) ? 'white' : 'grey'} style={{ marginBottom: 10 }} />
                                        <Text style={isPress === (idx + 2) ? styles.drTypeTextAfterPressed : styles.drTypeTextBeforePressed}>{item}</Text>
                                    </>
                                </TouchableHighlight>
                            ))
                        }
                        {/* {
                            typeArr.map((item, idx) => (
                                <TouchableHighlight key={`dr_type_${idx}`} style={styles.drTypeCard} onPress={() => { props.props.navigation.navigate({ name: '醫生列表', params: { mode: item } }) }} activeOpacity={1} underlayColor="#6d7f99" onHideUnderlay={() => setIsPress(0)}
                                    onShowUnderlay={() => { setIsPress(idx + 1) }} disabled={typeStatusArr[idx]}>
                                    <>
                                        <Icon name={typeIconArr[idx]} size={30} color={isPress === (idx + 1) ? 'white' : 'grey'} style={{ marginBottom: 10 }} />
                                        <Text style={isPress === (idx + 1) ? styles.drTypeTextAfterPressed : styles.drTypeTextBeforePressed}>{item}</Text>
                                    </>
                                </TouchableHighlight>
                            ))
                        } */}

                    </View >
                }
            </ScrollView>
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
        height: windowHeight / 5,
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
        marginTop: 10,
    },
    drTypeTextAfterPressed: {
        fontWeight: '600',
        color: 'white',
        fontSize: 18,
        marginTop: 10,
    },
    title: {
        fontSize: 16,
        color: '#545454',
        marginBottom: 8,
    },
    t_center: {
        textAlign: 'center'
    },
});