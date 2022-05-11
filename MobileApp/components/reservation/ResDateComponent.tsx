import { CheckIcon, Select } from 'native-base'
import React from 'react'

interface Props {
    onChange: (value:string) => void,
    data:[string,[[Object]]],
    mode:string,
    placeholder: string,
    dateValue: string,
}
interface dataMapType {
    "clinic_code": string, 
    "doctor_code": string, 
    "from_time": string, 
    "id": string, 
    "to_time": string, 
    "weekday": string
}

export const ResDateComponent = (props: Props) => {
    let selectFunction;
    const rosterDate = Object.entries(props.data)
    // Check the picker mode
    if (props.mode === 'date') {
        selectFunction = rosterDate.map((item: [string, string | [[Object]]], idx: number) => {
            return <Select.Item label={item[0]} value={item[0]} key={`picker_date_${idx}`} />
        })
    } else if (props.mode === 'time') {
        // 檢查用戶有選擇日期
        if (props.dateValue !== '') {
            let found: any = rosterDate.find((x: [string, string | [[Object]]]) => x[0] === props.dateValue)
            // 檢查醫生有沒有時間提供
            if (found[1] !== []) {
                let numbersCopy = [...found[1]];
                numbersCopy.sort(function (a, b) { return a.from_time.substring(0, 2) - b.from_time.substring(0, 2); });
                selectFunction = numbersCopy.map((item: dataMapType, idx: number) => {
                    return <Select.Item label={`${item['from_time']} - ${item['to_time']}`} value={item['id']} key={`picker_time_${idx}`} />
                })
            } else {
                selectFunction = <Select.Item label={`沒有可供應時間`} value={`沒有可供應時間`} />
            }
        } else {
            selectFunction = <Select.Item label={`請先選擇應診日期`} value={`請先選擇應診日期`} />
        }
    }
    return (
        <Select minWidth="120" accessibilityLabel={props.placeholder} placeholder={props.placeholder}
            _selectedItem={{endIcon: <CheckIcon size={5} />}}
            mt="1.5" mb='1' fontSize="sm" borderColor="#737474" onValueChange={props.onChange} flex={1} borderRadius="3" borderWidth='0.7'>
            {selectFunction}
        </Select>
    )
}
