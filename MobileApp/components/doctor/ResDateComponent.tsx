import { CheckIcon, Select } from 'native-base'
import React from 'react'
import { useGetRosterSessionQuery } from '../../API/DoctorAPI';
import { SpinnerComponent } from '../NativeBase/SpinnerComponent';

export const ResDateComponent = (props: any) => {
    let selectFunction;
    // Auto gen the whole weekday
    let today = new Date();
    let workDateArr: any = [];
    let weekDayArr: any = [];
    let tempWeekDay = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六']
    let tempWeekDay_en = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat']
    function getNextWorkDay(d: any) {
        d.setDate(d.getDate() + 1); // tomorrow
        if (d.getDay() == 0) {
            d.setDate(d.getDate() + 1);
        } else if (d.getDay() == 6) {
            d.setDate(d.getDate() + 2);
        }
        return d;
    }

    for (let i = 0; i < 5; i++) {
        today = getNextWorkDay(today);
        let weekDay = today.getDay()
        const selectedDate = `${today.getFullYear()}年${today.getMonth() + 1}月${today.getDate()}日 (${tempWeekDay[weekDay]})`
        workDateArr.push(selectedDate)
        weekDayArr.push(weekDay)
    }
    // checking the dB data (prevent the same element)
    let provideDate: any = []
    let chineseArr:any = []
    props.data.map((item: any, idx: number) => {
        let index = tempWeekDay_en.findIndex(x => x === item['weekday']);
        if (provideDate.includes(index)) {
            return
        } else {
            provideDate.push(index)
        }
    })
    // sort the index and convert it to chinese day
    provideDate.sort();
    provideDate.map((item: any, idx: number) => {
        chineseArr.push(tempWeekDay[item])
    })
    // filter and convert it to full date and day
    let resultArr:any = []
    workDateArr.map((item:any)=>{
        const result = item.substring(item.indexOf("(")+1,item.lastIndexOf(")"))
        if(chineseArr.includes(result)){
            resultArr.push(item)
        }
    })
    // Check the picker mode
    if (props.mode === 'date') {
        selectFunction = resultArr.map((item: any, idx: number) => {
            return <Select.Item label={item} value={item} key={`picker_date_${idx}`} />

        })
    } else if (props.mode === 'time') { 
        // 檢查用戶選擇日期
        if (props.dateValue !== '') {
            let selectedIndex = workDateArr.findIndex((x: any) => x === props.dateValue)
            let timeArr: any = [];
            let rosterID:any = [];
            // to get the chinese date (e.g星期一)
            const chineseSliceDate = workDateArr[selectedIndex].substring(workDateArr[selectedIndex].indexOf("(")+1,workDateArr[selectedIndex].lastIndexOf(")"))
            //to get the chinese index for array map
            let chineseIndex = tempWeekDay.findIndex(x => x === chineseSliceDate);
            props.data.map((item: any, idx: number) => {
                if (item['weekday'] === tempWeekDay_en[chineseIndex]) {
                    timeArr.push({time:`${item['from_time']} - ${item['to_time']}`, id:item['id']})
                    timeArr.sort((a:any, b:any)=>(a.time > b.time));
                }
            })
            // 檢查醫生有沒有時間提供
            if (timeArr !== []) {
                selectFunction = timeArr.map((item: any, idx: number) => (
                    <Select.Item label={item['time']} value={item['id']} key={`picker_time_${idx}`} />
                ))
            }else{
                selectFunction = <Select.Item label={`沒有可供應時間`} value={`沒有可供應時間`} />
            }
        } else {
            selectFunction = <Select.Item label={`請先選擇應診日期`} value={`請先選擇應診日期`} />
        }
    }else if(props.mode === 'session'){
        let sessionID = props.timeValue
        const sessionData = useGetRosterSessionQuery(sessionID)
        if(sessionID !== ''){
            if(sessionData.isSuccess){
                if(sessionData.currentData === []){
                    selectFunction = <Select.Item label={`沒有可供應選擇的時段`} value={`沒有可供應選擇的時段`} />
                }else if(sessionData.currentData === undefined){
                    selectFunction = <Select.Item label={`載入中...`} value={`載入中...`} />
                }else if(sessionData.currentData.length === 0){
                    selectFunction = <Select.Item label={`沒有可供應選擇的時段`} value={`沒有可供應選擇的時段`} />
                }else{
                    selectFunction = sessionData.currentData.map((item:any,idx:number)=>(
                        <Select.Item label={`${item['start_at']} - ${item['end_at']}`} value={item['id']} key={`picker_date_${idx}`} />
                    ))
                }
             }else if(sessionData.isLoading){
                selectFunction = <Select.Item label={`載入中...`} value={`載入中...`} />
             }
        }else{
            selectFunction = <Select.Item label={`請先選擇應診日期及時間`} value={`請先選擇應診日期及時間`} />
        }
    }

    return (
        <Select minWidth="120" accessibilityLabel={props.placeholder} placeholder={props.placeholder}
            _selectedItem={{
                endIcon: <CheckIcon size={5} />
            }}
            mt="1.5" mb='1' fontSize="sm" borderColor="#737474" onValueChange={props.onChange} flex={1} borderRadius="3" borderWidth='0.7'>
            {selectFunction}
        </Select>
    )
}
