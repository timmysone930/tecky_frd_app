import React from 'react';
import { StyleSheet } from 'react-native';


export const styles = StyleSheet.create({
    viewContainer: {
      padding: 20,
    },
    box: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      borderBottomColor: 'rgba(0, 0, 0, 0.4)',
      borderBottomWidth: 1,
      padding: 12
    },
  
    prescriptionCode: {
      fontSize: 25, 
      fontWeight: "bold"
    },
  
    orderStatus: {
      height: 40, 
      width: 80,
      justifyContent: "center",
      alignItems: "center"
    },
  
    orderStatusFont: {
      color: "#fff",
      fontSize: 20
    },

    contentFont: {
      fontSize: 20
    },

    RowCenterBetween: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },

    costDisplay: {
      flexDirection: "row",
      justifyContent: "center",
      fontSize: 30,
      marginTop: 10,
    },

    payButton: {
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      fontSize: 20,
      borderRadius: 4,
      elevation: 3,
      backgroundColor: "#00cc00",
      paddingVertical: 10,
      marginVertical: 20,
      marginHorizontal: 90,
    },

    JCCenter: {
      justifyContent: "center"
    },

    AICenter: {
      alignItems: "center"
    },

    flexRow: {
      flexDirection: "row"
    },

    textCenter: {
      textAlign: "center"
    },

    mb_10: {
      marginBottom: 10
    },

    mt_10: {
      marginTop: 10
    },
  })