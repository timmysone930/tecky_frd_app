import React, { useEffect } from 'react';
import Config from 'react-native-config';
import { useSelector } from 'react-redux';
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from 'react-native';

import { store } from '../../redux/store';
import { setMemberCode } from '../../redux/slice';
import { checkRosterStatus } from '../../redux/PaymentSlice';

import { useGetReservedSessionByIdQuery, useGetRosterByIdQuery } from '../../API/DoctorAPI';
import { SpinnerComponent } from '../../components/utils/SpinnerComponent';
import { DocListComponent } from '../../components/doctor/DocListComponent';

import { styles } from '../../styles/GeneralStyles';
import { usePostPatientRegisterMutation, usePostPatientReservationMutation, usePutHoldSessionMutation } from '../../API/PatientAPI';
import { useToast } from 'native-base';

// white background
const backgroundStyle = { backgroundColor: 'white' };

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
    //console.log('fuccccccccccc');
    //console.log(props.route.params);
  }, []);

  if (rosterSession.isSuccess) {
    // //console.log(formData)
    // //console.log("docInfo", docInfo.docData.video_diag_fee)
    reserveSession = `${rosterSession.currentData['start_at']} - ${rosterSession.currentData['end_at']}`;
    rowCellArr = [
      `$ ${docInfo.docData.video_diag_fee === 0
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
    //console.log('rosterSession', rosterSession);
    if (rosterSession.isError) {
      store.dispatch(checkRosterStatus({ paymentRoster: 'full' }));
      store.dispatch(setMemberCode({ memberCode: '' }));
      props.navigation.navigate('預約確認', {
        isNewPatient: props.route.params.isNewPatient,
      });
    }
  }, [rosterSession]);

  const submitData = new FormData();
  const [postPatientRegister] = usePostPatientRegisterMutation();
  const rosterClinicCode = useGetRosterByIdQuery(formData.reservedTime);
  const [putHoldSession] = usePutHoldSessionMutation();
  const toast = useToast();
  const [postPatientReservation] = usePostPatientReservationMutation();

  function timer(t: number): Promise<boolean> {
    return new Promise(rec => {
      setTimeout(() => rec(true), t);
    });
  }

  const onPress = async () => {
    //console.log('before submitting dlgh', formData);
    //console.log('will user ah dlgh', wtf);
    //console.log('isNewPatient', props.route.params.isNewPatient);

    // setSubmitStatus(false)
    // non member
    if (props.route.params.isNewPatient) {
      // create member
      submitData.append('hkid', formData.idNumber);
      submitData.append('id_doc_type', formData.idType);
      submitData.append('name', formData.name);
      submitData.append('name_en', formData.name_en);
      submitData.append('alt_contact', formData.EmergencyContactName);
      submitData.append('alt_phone', formData.EmergencyContactPhone);
      submitData.append('gender', formData.title);
      submitData.append('email', formData.email);
      submitData.append('phone', formData.phone);
      submitData.append('birthday', formData.bDay);
      submitData.append('hkid_img', formData['idImg']);

      const res: any = await postPatientRegister(submitData);

      if (res.error) {
        //console.log('member', res.error);
        store.dispatch(checkRosterStatus({ paymentRoster: 'error' }));
        store.dispatch(setMemberCode({ memberCode: '' }));
        props.navigation.navigate({ name: '預約確認' });
        return;
      }
    }

    // refetch
    rosterSession.refetch();
    rosterClinicCode.refetch();

    // check session status
    if (rosterClinicCode.isSuccess) {
      if (
        rosterSession.currentData &&
        Array.isArray(rosterSession.currentData) &&
        rosterSession.currentData.length === 0
      ) {
        // selected session not enable
        store.dispatch(checkRosterStatus({ paymentRoster: 'full' }));
        store.dispatch(setMemberCode({ memberCode: '' }));
        props.navigation.navigate({ name: '預約確認' });
      } else {
        try {
          // hold session
          const holdRes: any = await putHoldSession(formData.reservedSession);
          //console.log('holderes', holdRes);

          if (holdRes !== undefined) {
            if (holdRes.error && holdRes?.error.status === 400) {
              store.dispatch(checkRosterStatus({ paymentRoster: 'full' }));
              store.dispatch(setMemberCode({ memberCode: '' }));
              props.navigation.navigate({ name: '預約確認' });
            } else if (holdRes.data && holdRes?.data.status === 'hold') {
              // selected session are available
              toast.show({
                description: '載入中',
              });

              //console.log(docInfo);

              // member
              // reservation data
              let resData = {
                patient_hkid: formData.idNumber,
                doc_code: docInfo.id,
                res_date: formData.reservedDate,
                res_time: `${rosterSession.data.start_at}:00`,
                res_type: 'online',
                cli_code:
                  rosterClinicCode.data[formData.reservedDate][0]['cli_code'],
                session_id: formData.reservedSession,
                status: 'booked',
                video_url: null,
                is_follow_up: true,
                channel: 'null',
                declare: {
                  isLeave: formData.leaveHK || false,
                  location: formData.Countries || '',
                  date_back:
                    formData.backDate === '選擇日期' ? '' : formData.backDate,
                  isFever: formData.isFever || false,
                  isCought: formData.isCough || false,
                  isVomit: formData.isVomit || false,
                  isCold: formData.isCold || false,
                },
              };
              //console.log(resData);

              const res = await fetch(
                `${Config.REACT_APP_API_SERVER}/reserve/addNoApprove`,
                {
                  method: 'POST',
                  headers: {
                    Authorization: `Bearer ${userToken}`,
                    'content-type': 'application/json',
                  },
                  body: JSON.stringify(resData),
                },
              );
              const result = await res.json();

              // console.log('RESULT', result);

              if (res.status === 200) {
                toast.show({
                  description: '預約成功',
                });
                // //console.log("first")

                store.dispatch(checkRosterStatus({ paymentRoster: 'true' }));
                store.dispatch(setMemberCode({ memberCode: '' }));

                await timer(1000);

                props.navigation.navigate({
                  name: '預約確認',
                  params: {
                    resCode: result.code,
                    res_date: formData.reservedDate,
                    res_time: `${rosterSession.data.start_at}`,
                  },
                });
              } else {
                toast.show({
                  description: '預約失敗',
                });

                store.dispatch(checkRosterStatus({ paymentRoster: 'false' }));
                store.dispatch(setMemberCode({ memberCode: '' }));
                props.navigation.navigate({ name: '預約確認' });
              }
            }
          }
        } catch (err) {
          //console.log(err);
        }
      }
    } else if (rosterClinicCode.isError) {
      store.dispatch(checkRosterStatus({ paymentRoster: 'full' }));
      store.dispatch(setMemberCode({ memberCode: '' }));
      props.navigation.navigate({ name: '預約確認' });
    }
  };

  return (
    <SafeAreaView style={[backgroundStyle, { flex: 1 }]}>
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={{ backgroundColor: 'white', marginBottom: 2, marginLeft: 5 }}>
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
                  { flexDirection: 'row', marginBottom: 1, marginHorizontal: 15 },
                ]}
                key={`confirm_row_${idx}`}>
                <View style={{ flex: 1.3 }}>
                  <Text style={styles.rowTitle}>{item}</Text>
                </View>
                <View style={{ flex: 3 }}>
                  <Text style={styles.rowCellText}>{rowCellArr[idx]}</Text>
                </View>
              </View>
            ))}
          </>
        )}
      </ScrollView>
      {/* Button to go back and next page */}
      <View style={{ flexDirection: 'row' }}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => props.navigation.navigate({ name: '醫生' })}>
          <Text style={styles.buttonText}>返回主頁</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, { backgroundColor: '#325C80' }]}
          onPress={() =>
            docInfo.docData.approve_needed === 0 && docInfo.docData.video_diag_fee === 0 ? onPress() :
              props.navigation.navigate(
                docInfo.docData.approve_needed === 1 ? '確認審批預約' : '付款',
                // docInfo.docData.video_diag_fee === 0 ? '確認審批預約' : '付款',
                { isNewPatient: props.route.params.isNewPatient },
              )
          }
        // onPress={() => props.navigation.navigate({
        //     name: '付款'
        // })}
        >
          <Text style={styles.buttonText}>
            {docInfo.docData.approve_needed === 0 && docInfo.docData.video_diag_fee !== 0 ? '前往付款' : '前往預約'}
            {/* {docInfo.docData.video_diag_fee === 0 ? '前往預約' : '前往付款'} */}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};
