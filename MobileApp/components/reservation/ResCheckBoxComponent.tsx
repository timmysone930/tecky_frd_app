import { Checkbox } from 'native-base';
import React from 'react'

interface checkBoxProps {
    groupValues: string[],
    onChange:(item:[]) => void, 
}

const data = ['發燒', '咳嗽、呼吸困難或咽喉痛', '腹瀉或嘔吐', '流感症狀']

export const ResCheckBoxComponent = (props: checkBoxProps) => {
    return (
        <Checkbox.Group onChange={props.onChange} value={props.groupValues} accessibilityLabel="choose the symptoms" mt={1}>
            {data.map((item: any, idx: number) => (
                <Checkbox value={item} key={`health_check_${idx}`} mt={4} mb={3}>{item}</Checkbox>
            )
          )}
        </Checkbox.Group>
    )
}
