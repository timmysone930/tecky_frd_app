import React from 'react';
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {useSelector} from 'react-redux';
import {useGetReservedSessionByIdQuery} from '../../API/DoctorAPI';
import {BottomLineComponent} from '../../components/utils/BottomLineComponent';
import {checkRosterStatus} from '../../redux/PaymentSlice';
import {store} from '../../redux/store';
import {styles} from '../../styles/GeneralStyles';
// white background
const backgroundStyle = {backgroundColor: 'white'};

export const ResPolicyPage: React.FC = (props: any) => {
  // get form data
  const formData = useSelector((state: any) => state.getFormData);
  // get JWT token
  const userToken = useSelector((state: any) => state.getUserStatus.token);
  // roster session
  const rosterSession = useGetReservedSessionByIdQuery({
    rosterId: formData.reservedSession,
    token: userToken,
  });

  // check Roster Status
  const onPress = async () => {
    //console.log(props.route);

    props.navigation.navigate('確認預約資料', {
      isNewPatient: props.route.params
        ? props.route.params.isNewPatient
        : false,
    });
  };

  return (
    <SafeAreaView style={[backgroundStyle, {flex: 1}]}>
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={{
          backgroundColor: 'white',
          padding: 15,
          paddingTop: 25,
          marginBottom: 2,
        }}>
        <View style={[backgroundStyle, {flex: 1, marginBottom: 15}]}>
          <Text style={[styles.subTitle, styles.mt_10]}>服務條款</Text>

          <Text style={[styles.subTitle, styles.mt_10]}>
            請仔細閱讀以下有關醫生所提供之遠程會診服務使用的條款及細則。
          </Text>

          <Text style={styles.greyPolicyText}>
            條款及細則 •
            德信醫療集團（德信醫療）的醫生透過經網站、客戶服務中心、及診所直接的預約安排，於線上以視像會議的方式提供遠程
            會診服務（視像會診）。 • 視像會診服務恕不接受醫療券使用。 •
            視像會診服務受下述條款及細則約束。 •
            視像會診服務在任何情況下都並非用以取代面對面問診。如您對其準確性、有用性或適用性存在猶豫，德信醫療建議您安排醫生面對面問診或到訪醫院的急診科尋求進一步醫療諮詢。
            • 2019
            冠狀病毒測試：若果檢測結果有上報的需要，或患者的情況有可能為公共衛生帶來隱憂，德信醫療將根據衞生防護中心的指示上報有關個案。患者將會收到通知及被安排送往醫管局豁下設施作進一步診治。
            • 此等條款中使用的「您」及「您們」是指使用德信醫療集團服務的人士。
          </Text>

          <Text style={styles.greyPolicyText}>
            預約申請及會診費用 •
            指定醫生可供預約的時間視乎該醫生的空檔、意願及最終決定。 •
            指定醫生視像會診預約服務之確認（視乎該醫生的空檔）將會透過短訊／WhatsApp／微信／電郵發送給您。醫生保留更改預約時間或取消預約的最終權利而無須作事先通知。
            •
            我們提供的視像會診時間僅供參考，最終的會診時間或會根據醫生的最終決定而改變。會診費用將按所提供的參考時間段為基準，並有機會再作調整。
            •
            在確認會診預約時，您有可能需要預先支付會診費用（診金）。倘若您沒有完整支付診金全額，德信醫療有權在不作任何通知之下取消您的預約。德信醫療一概不接受部分繳款，而收取後的所有費用均不作任何退還。
            •
            假若醫生認為需要延長會診時間，將會在會診前或會診期間作出安排，會診收費亦會根據需要而調整。若果無法延長會診時間，或需安排第二次診症。
            • 如欲更改預約時間或取消預約，請於原定時間前兩天作通知。
          </Text>

          <Text style={styles.greyPolicyText}>
            所需資料及文件 •
            您必須為您所提供的醫療、健康及個人方面的資料的準確性和完整性負上全部責任。醫生所作出的意見或建議將完全取決於您所提供的資訊。
            • 您應自行決定是否分享您的個人及臨床資料。 •
            德信醫療提供兒童視像會診服務，但所有十八歲或以下的患者必須由其父母及法定監護人代為登記預約。若果您是以父母及法定監護人的身份為未成年人登記預約，您應當遵守此等條款並負上全部責任。
            •
            假若您所提供的資料含虛假／欺騙／不準確或誤導成分，德信醫療將保留取消您的預約的權利而毋須承擔任何責任。
            •
            您所提供的資料有可能用作其他用途，包括分析、研究、培訓或（有必要時）向德信醫療的旗下機構、代理機構及政府機構披露。
            •
            您所提供的資料將會無限期由德信醫療保存，並在不披露您的身份的情況下另作使用。
          </Text>

          <Text style={styles.greyPolicyText}>
            設備及連接要求 •
            視訊會診服務將透過視像會議的形式提供。請確保你已配備相關的設備及軟件，以及有穩定的網絡連接。若果視像會診因設備不足、技術問題、網絡不穩定等因素而無法順利進行，德信醫療保留更改預約時間或取消預約的最終權利而不另作通知。
            •
            您理解並知道視像會診服務並不包括任何身體檢查。所有會診服務均以遙距方式進行。醫生提供的意見將完全基於患者與有關醫生口頭上的溝通以及您所提供的其他資料。無論在任何情況及環境，醫生都不會對以下情況承擔任何責任，包括
            i) 錯誤診斷；ii) 錯誤判斷；iii) 錯誤闡釋；iv) 錯誤理解；v)
            處方治療及建議無效；vi)
            醫生所提供的建議及處方在您居住的國家無效；vii)
            醫生處方或建議的治療和藥物因各種原因無法應用。 •
            用戶應就視訊會診後取得的意見或建議作自行判斷。 •
            視訊會診服務並不適用於緊急或有生命危險的狀況。若出現以上情況，建議患者到鄰近的醫院就醫。
          </Text>

          <Text style={styles.greyPolicyText}>
            會診 •
            在視像會診開始之時，我們要先透過影像確認患者的身份。假若患者為十八歲以下人士，我們亦需查看患者的出生證明書，以確認患者與其父母或法定監護人的關係。
            • 醫生將自己證明身份。 •
            醫生需要知道在進行視像會診的房間內有甚麼人。當醫生問及時請如實作答。
            •
            在會診期間，您及任何人（包括可能陪同您進行視像會診的人士）均不得對視像會診服務的任何部分進行任何截圖、拍照、錄音或錄。我們的醫生會根據其專業判斷認為是有必要和適當的情况下進行截圖、拍照、錄音及/或錄像會構成您的醫療記錄的一部分，並由德信醫療保存。
            • 目前在香港以外地區或國家居住的人士： •
            我們的醫生並未有取得可在您身處地區或國家執業的執照，因此他／她的意見／建議／提議的治療方法最多只能被視為一項基於您所提供資訊的意見，而非醫療建議。
            •
            您必須為您所提供的醫療、健康及個人方面的資料的準確性和完整性負上全部責任。您知道醫生提供的意見是完全取決於您所提供的資訊。
            • 我們的醫生操守只受香港醫務委員會所規管。 •
            我們的醫生強烈建議您就所提供的意見的準確性及適用性作獨立評估，並在作任何決定前先諮詢您所在地區或國家的執業醫生。
          </Text>

          <Text style={styles.greyPolicyText}>
            藥物及治療 •
            我們的醫生在與您進行視像會診後基於其專業判斷認為有必要及適當，可能為您處方藥物。任何處方藥物均不可退還、交換或退款。
            •
            若醫生在視像會診後為您處方藥物，我們客服將在您全額支付所有應付收費後，安排把藥物，連同該次視像會診相應的診金及費用收據，委托運送合作夥伴，送遞至您的指定地址。該送遞需另外收費。
            •
            為使在視像會診後提取及送遞任何處方藥物，您同意一次性授權予德信醫療運送合作夥伴的指定送遞員代表您從德信醫療提取您的藥物並送遞予您。同时，您亦同意德信醫療將您的一些重要個人詳細信息（包括但不限於您的姓名、地址和電話號碼）交予指定的運送合作夥伴以進行上述送遞服務。所有藥物將會預先包裝及封條，確保指定送遞員不會獲取任何您藥物的訊息。我們客服將於視像會診後就有關運送安排與您聯絡。
            •
            為使藥物得以送遞，德信醫療的運送合作夥伴亦會向您發送一個獨特收件號碼，有關號碼必須在您的指定地址收取藥物時，向指定送遞員出示或向其告知。
            •
            您應親自在指定地址收取藥物，若您基於任何原因無法親自接收，請確保接收藥物的人已年滿
            18
            歲並獲您正式授權，且能夠向指定送遞員出示或向其告知收件號碼。接收藥物的人透過能夠出示或告知您的收件號碼，即表示該指定送遞員應視收取藥物的人已年滿
            18 歲，並獲正式授權代表您收取藥物，而毋須核實其身份。
          </Text>

          <Text style={styles.greyPolicyText}>
            收費及退款 •
            完成視像會診後，即使醫生沒有處方藥物、簽發醫療證明或任何運送，您必須支付所有相應的診金及費用餘額，我們客服在結束視像會診前會安排您支付所有應付費用。所有支付的診金、藥物、運送及後續檢查的款項不設退還或退款，部分繳款均一概不會接受。
            •
            德信醫療保留最終權利，在您支付首筆費用或其他未來費用之前的任何時間修改或實行新的定價結構。
          </Text>

          <Text style={styles.greyPolicyText}>
            私隱及安全 •
            您的私隱及資料的機密性將得到保障。視像會診的所有紀錄將會如同其他書面紀錄般保存在德信醫療的紀錄系統內。
            • 我們將盡最大能力確保信息網絡及系統安全。 •
            德信醫療用盡一切可行的方法確保網上付款工具安全上的完整性。儘管我們竭盡所能，但私隱及機密外洩的情況仍有可能發生。您理解並認知我們並不會為任何因網絡及系統安全上的問題導致您個人資料外洩的後果承擔任何責任。
          </Text>

          <Text style={styles.greyPolicyText}>
            責任聲明 •
            您同意向德信醫療及相關醫生賠償因以下情況而招致的一切損失、成本、收費及包括合理律師費在內的開支；情況包括因
            i)您未能及時、以及在臨床上認為適合的方式提供正確或／及完整的臨床資料／歷史；或
            ii) 您隱瞞重要事實；或 iii) 您無法提供患者相關的臨床資料；或 iv)
            您錯誤判斷我方所提供的建議／處方／診斷；或 v)
            您未有遵從醫生提供的建議／處方，所導致的錯誤診斷／錯誤判斷／錯誤闡釋／錯誤理解。
            •
            德信醫療在任何情況下均不負責任何直接、間接、懲罰性、連帶性、特殊或相應的損失，以及因使用德信醫療的服務（或任何與之有關的）而導致的任何損失，包括但不限於使用上、數據上以及利潤上之損失。
            • 德信醫療可隨時在不作事前通知的情況下修改此等條款及細則。
          </Text>

          <Text style={styles.greyPolicyText}>
            一般條款及細則 •
            本協議將受香港特別行政區的法律管轄，並由香港特別行政區的法律作出詮釋。
            • 對於此項服務是否適用於香港以外的地點，德信醫療並不作任何保證。 •
            若果本協議中有任何一部分被適用的法例視為無效或無法執行，該部分將被有效、可執行的條款取替，而協議內的其餘部分將繼續維持有效。
            • 您聲明並保證您已年過 18
            歲並有能力及符合資格簽署具有法律約束力的協議。
          </Text>

          <BottomLineComponent />
          <Text style={styles.greyPolicyText}>
            此等條款及細則將構成一份協議。當您確認本協議時，表示您已閱讀、明白及同意上述有關服務使用的條款及細則。您必須同意上述條款及細則，才能使用有關服務，並且同意支付涉及的全部費用。
          </Text>
          <BottomLineComponent />

          <Text style={styles.greyPolicyText}>
            香港銅鑼灣恩平道28號利園2期24/F 2401室 Unit 2401, 24/F., Lee Garden
            II, 28 Yan Ping Road, Causeway Bay, Hong Kong
          </Text>

          <Text style={styles.greyPolicyText}>
            Tel:(852) 2951 1988 Fax: (852) 2951 1999
          </Text>
          <BottomLineComponent />
        </View>
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
          onPress={onPress}>
          <Text style={styles.buttonText}>我已了解</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};
