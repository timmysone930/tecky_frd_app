import React from 'react'
import { FlatList, View, Text, TouchableOpacity, RefreshControl } from 'react-native';
import { ResRecordStatus } from './ResRecordStatus';
import { styles } from '../../styles/RecordListStyle';
import moment from 'moment';

interface Props {
    data: readonly any[] | null | undefined,
    props: any,
    refreshing: boolean,
    onRefresh: () => void,
}

export const ResRecordComponent = (props: Props) => {
    // console.log("props.data", props.data)
    return (
        <FlatList 
            data={props.data}
            refreshControl={<RefreshControl refreshing={props.refreshing} onRefresh={props.onRefresh} />}
            renderItem={
                ({ item }) => (
                    <TouchableOpacity 
                        style={[styles.box]} 
                        onPress={() => { 
                            props.props.navigation.navigate("預約詳情界面",{ 
                                screen: "預約詳情",
                                params: { 
                                    'resCode': item.res_code,
                                    'docCode': item.doc_code,
                                    'data': { item }
                                } 
                            })
                        }} >
                        <View>
                            <Text style={[styles.resCode]}>{item.res_code}</Text>
                            <Text style={[styles.contentFont]}>預約日期: {moment(item.res_date).format("YYYY-MM-DD")}</Text>
                            <Text style={[styles.contentFont]}>預約時間: {item.res_time.substring(0, 5)}</Text>
                            {/* {item.payment !== null && 
                                <Text style={[styles.contentFont, { color: 'red' }]}>
                                    {item.payment.payment_status ? "(已付款)" : "(待付款中)"} 
                                </Text>
                            } */}
                            { 
                            (item.approval_status === "wait_for_payment" || item.approval_status === "done") 
                            && item.payment_status !== null
                            && item.status !== "cancel"
                            && (
                                <>
                                <Text style={[styles.contentFont, { color: 'red' }]}>
                                    {item.payment_status ? "(已付款)" : "(待付款中)"} 
                                </Text>
                                </>
                                )
                            }

                            {item.status !== "cancel" && item.approval_status === "pending" && (
                                <>
                                <Text style={[styles.contentFont, { color: 'red' }]}>
                                    (審批中)
                                </Text>
                                </>
                                )
                            }

                        </View>
                        <View>
                            <ResRecordStatus resStatus={item.status} approval_status={item.approval_status} />
                        </View>
                    </TouchableOpacity>
                )
            }
            keyExtractor={item => item.res_code}
        />
    )
}