import React from 'react'
import { SafeAreaView, ScrollView } from 'react-native';
import { Searchbar } from 'react-native-paper';

// import Config from 'react-native-config';
import { DocSpecCardComponent } from '../components/doctor/DocSpecCardComponent';

export const DocSpecPage = (props:any) => {
    // Set background to white
    const backgroundStyle = { backgroundColor:'white' };

    return (
        <SafeAreaView style={[backgroundStyle, { flex: 1 }]}>
            {/* <ScrollView contentInsetAdjustmentBehavior="automatic" style={backgroundStyle}> */}
                {/* Card component */}
                <Searchbar
                    placeholder={"搜索醫生以及科目"}
                    value={""}
                    onPressIn={ () => {
                        props.navigation.navigate({ 
                            name: '醫生列表',
                            params: { mode: '所有專科' }
                        }) 
                    }}
                    inputStyle={{ fontSize: 16 }}
                    iconColor={'#B7B7B7'}
                    style={{ margin: 20, backgroundColor: '#F2F2F2', borderRadius: 13, shadowOpacity: 0.2, shadowRadius: 4, shadowOffset: { width: 0, height: 0 } }}
                />
                <DocSpecCardComponent props={props}/>
            {/* </ScrollView> */}
        </SafeAreaView>
    )
}
