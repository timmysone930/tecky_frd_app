import React, { useEffect, useState } from 'react'
import { SafeAreaView, Text, ScrollView, RefreshControl } from 'react-native';
import { useGetReservationListQuery } from '../API/PatientAPI';
import { SpinnerComponent } from '../components/utils/SpinnerComponent';
import { ResRecordComponent } from '../components/reservationRecord/ResRecordComponent';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
// white background
const backgroundStyle = { backgroundColor: 'white', };

export const wait = (timeout: number) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
}

export const ResRecordPage = (props: any) => {
    const userToken = useSelector((state: any) => state.getUserStatus.token);
    // fetch the resRecord
    let recordData = useGetReservationListQuery(userToken);
    const navigation = useNavigation(); 
    const [refreshing, setRefreshing] = React.useState(false);

    const onRefresh = React.useCallback(() => {
        try {
            setRefreshing(true);
            recordData.refetch();
            // console.log('recordData.data',recordData.data);
            wait(2000).then(() => setRefreshing(false));

        } catch (e) {
            console.log(e)
        }
    }, []);
    
    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            recordData.refetch();
        });
            
        return () => { unsubscribe }
    }, [navigation])

    return (
        <SafeAreaView style={[backgroundStyle, { flex: 1 }]}>
                {recordData.isLoading && <SpinnerComponent />}
                {/* {recordData.isError && <Text style={{ textAlign: 'center', fontSize: 17, margin: 20 }}>沒有預約記錄</Text>} */}
                {/* {recordData.isSuccess && recordData.data.length !== 0 ? <ResRecordComponent data={recordData.data} props={props} refreshing={refreshing} onRefresh={onRefresh} /> :
                    <Text style={{ textAlign: 'center', fontSize: 17, margin: 20 }}>立刻去登記預約</Text>
                } */}
                {recordData.isSuccess && recordData.data.length !== 0 ? 
                    <ResRecordComponent 
                        data={recordData.data} 
                        props={props} 
                        refreshing={refreshing}
                        onRefresh={onRefresh} 
                    /> 
                    :
                    <ScrollView
                        refreshControl={
                        <RefreshControl
                            refreshing={refreshing}
                            onRefresh={onRefresh}
                        />
                        }
                    >
                      <Text style={{ textAlign: 'center', fontSize: 17, margin: 20 }}>沒有預約記錄</Text>
                  </ScrollView>
                }
        </SafeAreaView>
    )
}


