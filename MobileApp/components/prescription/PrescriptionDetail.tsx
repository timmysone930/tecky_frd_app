import React, {useState} from 'react';
import {View, Text} from 'react-native';
import {styles} from '../../styles/GeneralStyles';
import {
  Table,
  TableWrapper,
  Row,
  Rows,
  Col,
  Cols,
  Cell,
} from 'react-native-table-component';

interface Props {
  treatmentItems: any;
}

export const PrescriptionDetail = (props: Props) => {
  const [tableHead, setTableHead] = useState([
    '名稱',
    '數量',
    '數量/次',
    '次數/日',
    '總日數',
  ]);
  const [tableData, seTableData] = useState(
    props.treatmentItems.map((item: any) => {
      return [
        item.name_en,
        item.quantity,
        item.dosage,
        item.times_per_day,
        item.total_day,
      ];
    }),
  );

  const treatments = props.treatmentItems;

  return (
    <>
      <Text style={[styles.mb_10, styles.mt_30, styles.title]}>藥物明細：</Text>
      <Table borderStyle={{borderWidth: 2, borderColor: '#225D66'}}>
        <Row data={tableHead} />
        <Rows data={tableData} />
      </Table>
      {/* {treatments.map((item: any) => (
        <View
          key={`treatment${treatments.indexOf(item)}`}
          style={[styles.mv_10]}>
          <Text style={[styles.contentText]}>
            {treatments.indexOf(item) + 1}. {item.name_en}: {item.quantity}{' '}
            數量/次: {item.dosage} 次數/日: {item.times_per_day} 總日數:{' '}
            {item.total_day}
          </Text>
        </View>
      ))} */}
    </>
  );
};
