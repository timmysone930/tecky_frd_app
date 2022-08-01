import React, { useEffect } from 'react'
import { CheckIcon, Select } from 'native-base'
import { useGetRosterSessionQuery } from '../../API/DoctorAPI';
import moment from 'moment-timezone';

interface Props {
    onChange: (value:string) => void,
    placeholder: string,
    timeValue: string,
    userToken:string,
    selectedTime?: string
}

interface dataMapType {
    "end_at": string,
    "id": string,
    "res_code": null,
    "roster_id": number,
    "start_at": string,
    "status": string
}

export const ResSessionComponent = (props: Props) => {
    let selectFunction;
    let sessionID = props.timeValue
    const sessionData = useGetRosterSessionQuery({id:sessionID, token:props.userToken})

    useEffect(() => {
        sessionData.refetch();
        
    }, [sessionID])
    
    // 已選擇時段
    if (sessionID !== '') {
        if (sessionData.isSuccess) {
            // 沒有時間選擇
            if (Array.isArray(sessionData.currentData) && sessionData.currentData.length === 0) {
                selectFunction = <Select.Item label={`沒有可供應選擇的時段`} value={`沒有可供應選擇的時段`} />
            }
            else if (sessionData.currentData === undefined) {
                // 載入中
                selectFunction = <Select.Item label={`載入中...`} value={`載入中...`} />
            }
            else if (sessionData.currentData.length === 0) {
                selectFunction = <Select.Item label={`沒有可供應選擇的時段`} value={`沒有可供應選擇的時段`} />
            } 
            else {

                const currentTime = moment();
                let hkTime = currentTime.clone().tz('Asia/Hong_Kong').format();

                const currentTimeHours = hkTime.slice(11,16); // 15:31
                const currentday = hkTime.slice(0,10); // 2022-08-01

                // add 30 mins
                let splitTime = currentTimeHours.split(":").map( (v) => +v );
                if(splitTime[1] + 30 >= 60){
                    splitTime[0] += 1;
                    splitTime[1] -= 60;
                }
                const finalMinutesTime = splitTime.join(":")


                if(props.selectedTime && currentday === props.selectedTime){
        
                    selectFunction = sessionData.currentData
                    .filter( (v:any) => v.start_at >= finalMinutesTime)
                    .map((item: dataMapType, idx: number) => (
                        <Select.Item label={`${item['start_at']} - ${item['end_at']}`} value={item['id']} key={`picker_date_${idx}`} />
                    ))
                }
                else{

                    selectFunction = sessionData.currentData.map((item: dataMapType, idx: number) => (
                        <Select.Item label={`${item['start_at']} - ${item['end_at']}`} value={item['id']} key={`picker_date_${idx}`} />
                    ))
                }

            }
        } else if (sessionData.isLoading) {
            selectFunction = <Select.Item label={`載入中...`} value={`載入中...`} />
        }
    } else {
        // 未選擇時段
        selectFunction = <Select.Item label={`請先選擇應診日期及時間`} value={`請先選擇應診日期及時間`} />
    }

    return (
        <Select 
            minWidth="120"
            accessibilityLabel={props.placeholder}
            placeholder={props.placeholder}
            _selectedItem={{ endIcon: <CheckIcon size={5} /> }}
            mt="1.5" mb='1' fontSize="sm" borderColor="#737474"
            onValueChange={props.onChange} 
            flex={1} borderRadius="3" borderWidth='0.7'
        >
            {selectFunction}
        </Select>
    )
}
