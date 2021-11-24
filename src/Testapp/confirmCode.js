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

const confirmCode = ({route,navigation}) => {
    const [phone, setphone] = useState('')
    
    const [verificationCode, setverificationCode] = useState('')
    const [userId, setuserId] = useState('')

    const {confirmResult} =route.params;

    const handleVerifyCode = () => {
        if (verificationCode.length == 6) {
            confirmResult.confirm(verificationCode)
                .then(user => {
              
                    setuserId(user.uid)
                    alert(`Verified!`)
                    navigation.navigate('MenuScreen')
                })
                .catch(error => {
                    navigation.goBack()
                    console.log(error)
                })
        } else {
            alert('Please enter a 6 digit OTP code.')
        }
    }
    return (
        <View style={styles.verificationView}>
                <TextInput
                    style={styles.textInput}
                    placeholder='Verification code'
                    placeholderTextColor='#aaa'
                    value={verificationCode}
                    keyboardType='numeric'
                    onChangeText={(val) => setverificationCode(val)}
                    maxLength={6}
                />
                <TouchableOpacity
                    style={[styles.themeButton1, { marginTop: 20 }]}
                    onPress={()=>handleVerifyCode()}>
                    <Text style={styles.themeButtonTitle}>Verify Code</Text>
                </TouchableOpacity>

              

            </View>
    )
}

export default confirmCode

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
