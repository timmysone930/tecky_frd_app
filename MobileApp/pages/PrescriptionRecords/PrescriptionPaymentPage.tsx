import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';
import { RadioButton } from 'react-native-paper';
import Config from 'react-native-config';
import { useSelector } from 'react-redux';
import { useToast } from 'native-base';

//Redux
import { store } from '../../redux/store';
import { setPrescriptionCode } from '../../redux/slice';
import { SpinnerComponent } from '../../components/utils/SpinnerComponent';
import { useStripe } from '@stripe/stripe-react-native';
import { useGetUserInfoQuery } from '../../API/UserInfoAPI';
import { useIsFocused } from '@react-navigation/native';

export const PrescriptionPaymentPage = (props: any) => {
  const userToken = useSelector((state: any) => state.getUserStatus.token);
  const userInfo = useSelector((state: any) => state.getUserInfo);
  // get current users profile
  const userData = useGetUserInfoQuery(userToken);

  const { initPaymentSheet, presentPaymentSheet } = useStripe();
  const [loading, setLoading] = useState(false);
  const [paymentId, setPaymentId] = useState('');
  // console.log(userData);

  // white background
  const backgroundStyle = {
    backgroundColor: 'white',
  };

  const isFocused = useIsFocused();

  //Toast
  const toast = useToast();

  const [fetchData, setFetchData] = useState(null as any);
  const [finalPayFee, setFinalPayFee] = useState(9999 + '');
  const redux = useSelector((state: any) => state.getPrescriptionCode);
  const prescriptionDetail = redux.prescriptionDetail;
  useEffect(() => {
    console.log(prescriptionDetail);
    if (fetchData == null) {
      setFetchData(prescriptionDetail);
    }
    if (Array.isArray(prescriptionDetail.bill)) {
      setFinalPayFee(prescriptionDetail.bill[0].totel_amount + '');
    }
    console.log(fetchData);
  }, []);

  const setRedux = (payment_status: boolean) => {
    store.dispatch(
      setPrescriptionCode({
        payment_status: payment_status,
        prescriptionDetail: prescriptionDetail,
      }),
    );
  };

  // submit disable
  const [submitStatus, setSubmitStatus] = React.useState(true);

  // stripe implementation

  const fetchPaymentSheetParams = async () => {
    const response = await fetch(
      `${Config.REACT_APP_API_SERVER}/payment/payment-sheet`,
      {
        method: 'POST',
        body: JSON.stringify({
          amount: Array.isArray(prescriptionDetail.bill)
            ? prescriptionDetail.bill[0].totel_amount + ''
            : 9999 + '',
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
    const { paymentIntent, ephemeralKey, customer, publishableKey } =
      await response.json();
    console.log('wt did i get?', paymentIntent);

    setPaymentId(paymentIntent);
    return {
      paymentIntent,
      ephemeralKey,
      customer,
      publishableKey,
    };
  };

  const initializePaymentSheet = async () => {
    const { paymentIntent, ephemeralKey, customer, publishableKey } =
      await fetchPaymentSheetParams();
    console.log('wt did i get?', paymentIntent);

    setPaymentId(paymentIntent);

    const { error } = await initPaymentSheet({
      merchantDisplayName: 'Telemedicine',
      customerId: customer,
      customerEphemeralKeySecret: ephemeralKey,
      paymentIntentClientSecret: paymentIntent,
      // Set `allowsDelayedPaymentMethods` to true if your business can handle payment
      //methods that complete payment after a delay, like SEPA Debit and Sofort.
      allowsDelayedPaymentMethods: true,
      defaultBillingDetails: {
        name: userData.data.name_en,
      },
    });
    if (!error) {
      setLoading(true);
    }
    console.log('wt did i get?', paymentIntent);

    setPaymentId(paymentIntent);
  };

  const openPaymentSheet = async () => {
    if (!paymentId) {
      return;
    }
    // see below
    const { error } = await presentPaymentSheet();

    if (!error) {
      console.log('payment id please ok', paymentId);

      // create payment table
      const editPaymentResp = await fetch(
        `${Config.REACT_APP_API_SERVER}/payment/pay-pres`,
        {
          method: 'PUT',
          headers: {
            Authorization: `Bearer ${userToken}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            payment: {
              id: fetchData.prescription.payment,
              payment_id: paymentId,
              gateway: 'stripe',
              amount: finalPayFee,
              payment_status: true,
              type: 'prescription',
              payment_type: 'stripe',
              bill: fetchData.bill[0],
            },
            newPres: {
              pres_code: prescriptionDetail.prescription.pres_code,
              address: prescriptionDetail.prescription.address,
              area: prescriptionDetail.prescription.area,
              courier_code: prescriptionDetail.prescription.courier_code,
              delivery_contact:
                prescriptionDetail.prescription.delivery_contact,
              delivery_phone: prescriptionDetail.prescription.delivery_phone,
              district: prescriptionDetail.prescription.district,
              is_delivery: prescriptionDetail.prescription.is_delivery,
              payment: prescriptionDetail.prescription.payment,
              pick_up_store: prescriptionDetail.prescription.pick_up_store,
              pres_details: prescriptionDetail.prescription.pres_details,
              payment_status: 'paid',
            },
          }),
        },
      );
      const email = await fetch(
        `${Config.REACT_APP_API_SERVER}/payment/receipt/diagnosis`,
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${userToken}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            pres_code: prescriptionDetail.prescription.pres_code,
          }),
        },
      );

      console.log(email);

      // "payment_id": paypalRes.data.nonce
      // const editPaymentResult = editPaymentResp.status == 200 ? (await editPaymentResp.json()) : null;
      console.log(editPaymentResp.status);
      console.log(await editPaymentResp.text());
      if (editPaymentResp.status == 200) {
        setRedux(true);
        toast.show({
          description: '付款完成',
        });
      } else {
        setRedux(false);
        toast.show({
          description: '更新失敗，如已付款請聯絡客服',
        });
      }

      props.navigation.navigate({ name: '付款完成' });
    } else {
      setRedux(false);
      toast.show({
        description: '付款失敗',
      });
      props.navigation.navigate({ name: '付款完成' });
    }
  };

  useEffect(() => {
    isFocused && initializePaymentSheet();
  }, [isFocused]);

  useEffect(() => {
    if (paymentId !== '') {
      setSubmitStatus(true)
    } else {
      setSubmitStatus(false);
    };
  }, [paymentId])

  // Radio Button
  const [radioValue, setRadioValue] = React.useState('PayPal');
  return (
    <SafeAreaView style={[backgroundStyle, { flex: 1 }]}>
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={{ backgroundColor: 'white', marginBottom: 2, marginLeft: 5 }}>
        {fetchData && (
          <View>
            <Text
              style={[
                styles.subTitle,
                { paddingHorizontal: 15, paddingTop: 15 },
              ]}>
              藥單費用：${fetchData.bill[0].totel_amount}
            </Text>
          </View>
        )}
        {submitStatus ? (
          <RadioButton.Group
            onValueChange={value => {
              setRadioValue(value);
            }}
            value={radioValue}>
            {/* <TouchableOpacity style={{ flexDirection: 'row', justifyContent: 'flex-start' }} onPress={() => setRadioValue("PayPal")}>
                        <RadioButton.Item label="" value="PayPal" mode='android' color='#6d7f99' style={{ paddingTop: 30 }} />
                        <Image style={{ width: 200, height: 100, }} resizeMode="contain" resizeMethod="scale" source={{ uri: `${Config.REACT_APP_API_SERVER}/logo_PayPal.png` }} />
                    </TouchableOpacity> */}
            <TouchableOpacity
              style={{ flexDirection: 'row', justifyContent: 'flex-start' }}
              onPress={() => setRadioValue('stripe')}>
              <RadioButton.Item
                label=""
                value="stripe"
                mode="android"
                color="#6d7f99"
                style={{ paddingTop: 30 }}
              />
              <Image
                style={{ width: 200, height: 100 }}
                resizeMode="contain"
                resizeMethod="scale"
                source={{ uri: `${Config.REACT_APP_API_SERVER}/logo_stripe.png` }}
              />
            </TouchableOpacity>
          </RadioButton.Group>
        ) : (
          <SpinnerComponent />
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
          onPress={openPaymentSheet}
          disabled={!submitStatus}>
          <Text style={styles.buttonText}>下一步</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  subTitle: {
    color: '#225D66',
    fontSize: 17,
    fontWeight: '600',
    marginTop: 8,
    marginBottom: 15,
  },
  button: {
    width: '50%',
    backgroundColor: '#6d7f99',
    paddingVertical: 16,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 16,
  },
});
