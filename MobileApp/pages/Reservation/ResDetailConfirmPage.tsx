import React, {useEffect} from 'react';
import Config from 'react-native-config';
import {useSelector} from 'react-redux';
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from 'react-native';

import {store} from '../../redux/store';
import {setMemberCode} from '../../redux/slice';
import {checkRosterStatus} from '../../redux/PaymentSlice';

import {useGetReservedSessionByIdQuery} from '../../API/DoctorAPI';
import {SpinnerComponent} from '../../components/utils/SpinnerComponent';
import {DocListComponent} from '../../components/doctor/DocListComponent';

import {styles} from '../../styles/GeneralStyles';

// white background
const backgroundStyle = {backgroundColor: 'white'};

// row title
const rowTitleArr = [
  '問診費用：',
  '選擇日期：',
  '選擇時間：',
  '應診者姓名：',
  '身份證類型：',
  '身份證編號：',
];

export const ResDetailConfirmPage: React.FC = (props: any) => {
  // selected doctor id
  const docInfo = useSelector((state: any) => state.setDoctorID);

  // get form data
  const formData = useSelector((state: any) => state.getFormData);

  // get JWT token
  const userToken = useSelector((state: any) => state.getUserStatus.token);

  // roster session
  let reserveSession: string;
  let rowCellArr: any;

  const rosterSession = useGetReservedSessionByIdQuery({
    rosterId: formData.reservedSession,
    token: userToken,
  });

  useEffect(() => {
    console.log('fuccccccccccc');
    console.log(props.route.params);
  }, []);

  if (rosterSession.isSuccess) {
    // console.log(formData)
    // console.log("docInfo", docInfo.docData.video_diag_fee)
    reserveSession = `${rosterSession.currentData['start_at']} - ${rosterSession.currentData['end_at']}`;
    rowCellArr = [
      `$ ${
        docInfo.docData.video_diag_fee === 0
          ? 0
          : docInfo.docData.video_diag_fee || 9999
      }`,
      formData.reservedDate,
      reserveSession,
      formData.name,
      formData.idType,
      formData.idNumber,
    ];
  } else if (rosterSession.isLoading) {
    reserveSession = '載入中';
  }

  useEffect(() => {
    console.log('rosterSession', rosterSession);
    if (rosterSession.isError) {
      store.dispatch(checkRosterStatus({paymentRoster: 'full'}));
      store.dispatch(setMemberCode({memberCode: ''}));
      props.navigation.navigate('預約確認', {
        isNewPatient: props.route.params.isNewPatient,
      });
    }
  }, [rosterSession]);

  useEffect(() => {
    console.log(docInfo.docData);
  }, []);

  return (
    <SafeAreaView style={[backgroundStyle, {flex: 1}]}>
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={{backgroundColor: 'white', marginBottom: 2, marginLeft: 5}}>
        {rosterSession.isLoading && <SpinnerComponent />}
        {rosterSession.isSuccess && (
          <>
            <View style={[styles.drListCard, styles.mb_30]}>
              <DocListComponent props={docInfo.docData} />
            </View>
            {rowTitleArr.map((item, idx) => (
              <View
                style={[
                  backgroundStyle,
                  {flexDirection: 'row', marginBottom: 1, marginHorizontal: 15},
                ]}
                key={`confirm_row_${idx}`}>
                <View style={{flex: 1.3}}>
                  <Text style={styles.rowTitle}>{item}</Text>
                </View>
                <View style={{flex: 3}}>
                  <Text style={styles.rowCellText}>{rowCellArr[idx]}</Text>
                </View>
              </View>
            ))}
          </>
        )}
      </ScrollView>
      {/* Button to go back and next page */}
      <View style={{flexDirection: 'row'}}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => props.navigation.navigate({name: '醫生'})}>
          <Text style={styles.buttonText}>返回主頁</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, {backgroundColor: '#325C80'}]}
          onPress={() =>
            props.navigation.navigate(
              // docInfo.docData.approve_needed === 1 ? '確認審批預約' : '付款',
              docInfo.docData.video_diag_fee === 0 ? '確認審批預約' : '付款',
              {isNewPatient: props.route.params.isNewPatient},
            )
          }
          // onPress={() => props.navigation.navigate({
          //     name: '付款'
          // })}
        >
          <Text style={styles.buttonText}>
            {/* {docInfo.docData.approve_needed === 1 ? '前往預約' : '前往付款'} */}
            {docInfo.docData.video_diag_fee === 0 ? '前往預約' : '前往付款'}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};
