import React, { Component, useState } from 'react';
import {
    StyleSheet,
    SafeAreaView,
    TouchableOpacity,
    View,
    Text,
    TextInput
} from 'react-native'
import auth from '@react-native-firebase/auth';

import firebase from '@react-native-firebase/app'

const AuthFunc = ({navigation}) => {


    const [phone, setphone] = useState('')
    const [confirmResult, setconfirmResult] = useState(null)
   

    const validatePhoneNumber = () => {
        var regexp = /^\+[0-9]?()[0-9](\s|\S)(\d[0-9]{8,16})$/
        return regexp.test(phone)
    }

    const handleSendCode = () => {
        // Request to send OTP
        if (validatePhoneNumber()) {
            firebase.auth().signInWithPhoneNumber(phone)
                .then(val => {
                    setconfirmResult(val)
                    navigation.navigate('ConfirmAuth',{confirmResult:val})

                })
                .catch(error => {
                    alert(error.message)

                    console.log(error)
                })
        } else {
            alert('Invalid Phone Number')
        }


    }
    console.log(confirmResult)

    return (
        <SafeAreaView style={[styles.container, { backgroundColor: '#fff' }]}>
        <View style={styles.page}>
          <TextInput
            style={styles.textInput}
            placeholder='Phone Number with country code'
            placeholderTextColor='#aaa'
            keyboardType='phone-pad'
            value={phone}
            onChangeText={val => setphone(val) }
            maxLength={15}
            editable={confirmResult ? false : true}
          />

          <TouchableOpacity
            style={[styles.themeButton, { marginTop: 20 }]}
            onPress={()=>handleSendCode()}>
            <Text style={styles.themeButtonTitle}>
              Send Code
            </Text>
          </TouchableOpacity>

        
        </View>
      </SafeAreaView>
    )
}

export default AuthFunc

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#aaa'
    },
    page: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center'
    },
    textInput: {
      marginTop: 20,
      width: '90%',
      height: 40,
      borderColor: '#555',
      borderWidth: 2,
      borderRadius: 5,
      paddingLeft: 10,
      color: '#000',
      fontSize: 16
    },
    themeButton: {
      width: '90%',
      height: 50,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#e60',
      borderColor: '#555',
      borderWidth: 2,
      borderRadius: 5
    },
    themeButton1: {
      width: '90%',
      height: 50,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#016358',
      borderColor: '#555',
      borderWidth: 2,
      borderRadius: 5
    },
    themeButtonTitle: {
      fontSize: 24,
      fontWeight: 'bold',
      color: '#fff'
    },
    verificationView: {
      width: '100%',
      alignItems: 'center',
      marginTop: 50
    }
  })
  
