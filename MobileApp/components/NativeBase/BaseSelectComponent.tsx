import { CheckIcon, FormControl, Select, WarningOutlineIcon } from 'native-base'
import React from 'react'

export const BaseSelectComponent = (props: any) => {
    const data = props.data;
    let selectFunction;
    // Check the picker mode
    if (props.mode === 'date') {
        selectFunction = data.map((item: any, idx: Number) => (<Select.Item label={`${item['date']}`} value={`${item['date']}`} key={`picker_date_${item['id']}`} />))
    } else if (props.mode === 'time') {
        if (props.dateValue !== '請選擇應診日期') {
            data.map((item: any) => {
                if (item['date'] === props.dateValue) {
                    selectFunction = item['time'].map((item: any, idx: Number) => (
                        <Select.Item label={`${item}`} value={`${item}`} key={`picker_time+${item['id']}`} />
                    ))
                }
            })
        }else{
            selectFunction = <Select.Item label={`請先選擇應診日期`} value={`請先選擇應診日期`} />
        }
    } else if (props.mode === 'id') {
        selectFunction = data.map((item: any, idx: Number) => (
            <Select.Item label={`${item}`} value={`${item}`} key={`picker_date_${idx}`} />
        ))
    }

    return (
        <Select minWidth="200" accessibilityLabel={props.placeholder} placeholder={props.placeholder} _selectedItem={{
            bg: "teal.600",
            endIcon: <CheckIcon size={5} />
        }} mt="2" mb='1' fontSize="sm" borderColor="#737474" onValueChange={props.onChange}>

        {selectFunction}
        </Select>
    )
}
