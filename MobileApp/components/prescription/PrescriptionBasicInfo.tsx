import React from 'react';
import { View, Text } from 'react-native';
import { DisplayOrderStatus } from '../prescription/DisplayOrderStatus'
import { styles } from '../../styles/GeneralStyles'

// props.data = {
//     _title: _content,
//     ...,
//     ...,
//     ...
// }

// Example
// props.data = {
//      "醫生": "doctor" , 
//      "專科": "profession", 
//      "開藥日期": "created_at", 
//      "療程": "course_of_treatment", 
//      "應診者": "patient_name", 
//      "身份證": "patient_id"
// }


export const PrescriptionBasicInfo = (props: any) => {

    const contentItemToDisplay: any = {
        "醫生": "doctor",
        "專科": "profession",
        "開藥日期": "created_at",
        "療程": "course_of_treatment",
        "應診者": "patient_name",
        "身份證": "patient_id"
    };

    return (
        <>
            <View style={[styles.RowCenterBetween, styles.mb_10]}>
                <Text style={[styles.title]}>{props.pres_code}</Text>
                {props.orderStatusShow && <DisplayOrderStatus orderStatus={props.order_status} />}
            </View>
            <View>

                {
                    Object.keys(contentItemToDisplay).map((key) => (
                        <View style={[styles.flexRow, styles.mv_10]} key={key}>
                            <Text style={[{ width: 95 }, styles.contentText]}>
                                {key}：
                            </Text>
                            <Text style={[styles.subTitle]}>
                                {props[contentItemToDisplay[key]]}
                            </Text>
                        </View>
                    ))
                }

            </View>
        </>
    );
}
