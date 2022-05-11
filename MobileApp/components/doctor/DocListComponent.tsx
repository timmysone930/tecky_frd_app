import React from 'react'
import { StyleSheet, Text, View, Image, } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Config from "react-native-config";
import { styles } from '../../styles/DoctorStyle';
export const DocListComponent = ({ props }: any) => {
    return (
        <>
            <View >
                {props.img === null ? <Image style={{ width: 75, height: 75, borderRadius: 50 }} resizeMode="contain" source={{ uri: `${Config.REACT_APP_API_SERVER}/profilePic/default.jpg`, }
                } /> :
                    <Image style={{ width: 75, height: 75, borderRadius: 50 }} resizeMode="contain" source={{ uri: `${Config.REACT_APP_API_SERVER}/profilePic/${props.img}`, }} />}
            </View>
            <View style={styles.ml_20}>
                <Text style={styles.title}>{props.name}{props.name_en}</Text>

                <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                    <View style={[styles.infoBox, props.gender === 'Male' ? styles.blue : styles.red]} >
                        <Text style={styles.gender}>{props.gender === 'Male' ? '男' : '女'}</Text>
                    </View>

                    {props.spec_name.map((item: string, idx: number) => (
                        <View style={styles.infoBox} key={`docSpec_${idx}`}>
                            <Text style={[styles.gender, { color: 'grey' }]}>{item}</Text>
                        </View>
                    ))}
                </View>
                {
                    props.clinic.map((item: { address: string, clinic_name: string }, idx: number) => (
                        <View style={{ flexDirection: 'row', }} key={`docClinic_${idx}`}>
                            <Icon name="map-marker" size={20} color="#325C80" />
                            <Text style={styles.address}>{item.address}</Text>
                        </View>
                    ))
                }

            </View>
        </>
    )
}