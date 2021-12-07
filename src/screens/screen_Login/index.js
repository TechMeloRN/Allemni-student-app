import React, { useEffect, Component, useState } from 'react'
import {
    StyleSheet,
    Text,
    View,
    ImageBackground,
    Image,
    StatusBar,
    Pressable,
    Platform,
    TextInput,
    ScrollView,

} from 'react-native'
import Url from '../../baseurl.json'
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp
} from 'react-native-responsive-screen';
import { COLORS } from '../../assets/Styles/color.js'
import CustomButton from '../../components/CustomButton.js';
import CustomActivityIndicator from '../../components/CustomActivityIndicator.js';
import Axios from 'react-native-axios'
import AsyncStorage from '@react-native-community/async-storage';

//Fireabse
import auth from '@react-native-firebase/auth';
import firebase from '@react-native-firebase/app'

//Icons Assests
import backgroundImage from '../../assets/Images/background/backgroundImage.png'
import logo from '../../assets/Images/logo/logo.png'
import backBtnIcon from '../../assets/Images/icons/btnIcon.png'
import gmailIcon from '../../assets/Images/icons/gmailIcon.png'
import appleIcon from '../../assets/Images/icons/appleIcon.png'
import facebookIcon from '../../assets/Images/icons/facebookIcon.png'
import twitterIcon from '../../assets/Images/icons/twitterIcon.png'

const index = ({ navigation }) => {

    const [hide, sethide] = useState(true);
    const [loaded, setloaded] = useState(false);

    const [phoneNo, setphoneNo] = useState('')
    const [confirmResult, setconfirmResult] = useState(null)

    const validatePhoneNumber = () => {
        var regexp = /^\+[0-9]?()[0-9](\s|\S)(\d[0-9]{8,15})$/
        return regexp.test(phoneNo)
    }

    const handleSendCode = () => {
        // Request to send OTP
        
        if (validatePhoneNumber()) {
            firebase.auth().signInWithPhoneNumber(phoneNo)
                .then(val => {
                    setconfirmResult(val)
                    navigation.navigate('LoginVerification',{confirmResult:val,phoneNo})

                })
                .catch(error => {
                    alert('Please try again! \n'+ error.message)

                    console.log("Firebase error: "+ error)
                })
                
        } else {
            alert('Invalid Phone Number \n'+'Phone number must include country code.')
        }
   


    }
    const userCheck = () => {
        
        setloaded(true)
        if(validatePhoneNumber()){
        
            Axios.post(Url.baseUrl + "/user-check", {
            email: 'check@gmail.com',   //Line will remove.
            mobileNumber: phoneNo,
        })
            .then(function (response) {
                console.log("checkData"+JSON.stringify(response));

                if(response.data==='Mobile number already exists'){
                    AsyncStorage.setItem('mobileNo',(response.data.mobileNumber?response.data.mobileNumber:''))
                    handleSendCode()
                    setloaded(false)
                    
                }

                else{       
                    alert("Account not exists!");
                    setloaded(false)
                }

            })
            .catch(function (error) {
                console.log(error.message);
                setloaded(false)
             //   alert("Database error");
            });
        }else{
            alert("Enter Valid Number.")
            setloaded(false)
        }
    }

    //Login Api Func
    // const baseURL = 'https://test.nadvertex.com/allemni/api';
    // const verifyLogin = () => {
    //     setloaded(true)
    //     Axios.post(Url.baseUrl+"/user-login", {
    //         email: email,
    //         password: password,
    //       })
    //         .then(function (response) {
    //           console.log(JSON.stringify(response));
    //           if (response.data === "Invalid user") {
    //             alert("incoreect passord or user name");
    //             setloaded(false)
    //           }else if(response.data==='Account deactivated'){
    //             alert("Account is deactivated!");
    //             setloaded(false)
               
    //            } else {
    //               if(response.data.roleId==="3"){
    //             navigation.navigate('HomeScreen',{data:response.data})
    //             setloaded(false)
    //             AsyncStorage.setItem('fName',(response.data.firstName?response.data.firstName:''))
    //             AsyncStorage.setItem('lName',(response.data.lastName?response.data.lastName:''))
    //             AsyncStorage.setItem('mobileNo',(response.data.mobileNumber?response.data.mobileNumber:''))
    //             AsyncStorage.setItem('email',(response.data.email?response.data.email:''))
    //             //AsyncStorage.setItem('userid',(JSON.stringify(response.data.id)))
    //               }else{
    //                 alert("incoreect passord or user name!");
    //                 setloaded(false)
    //               }
    //           }
    //         })
    //         .catch(function (error) {
    //           console.log(error);
    //           setloaded(false)
    //           alert("Network error!");
    //         });
    // }
  

    return (
        <ImageBackground style={styles.container} source={backgroundImage}>

            <StatusBar barStyle='light-content' />

            <Pressable onPress={() => navigation.navigate('NewInitialScreen')} style={[styles.backButtonView, { marginTop: Platform.OS === 'ios' ? hp(5) : hp(2) }]}>
                <Image style={styles.backButton} source={backBtnIcon} />
            </Pressable>
            <ScrollView style={{ flex: 1 }}>
                <Image style={styles.logoImage} source={logo} />


                <View style={styles.contentView}>
                    <Text style={[styles.btnText, {fontSize:hp(2.5),fontFamily:'Cairo-SemiBold'}]}> مرحبا </Text>
                    <Text style={[styles.btnText,{fontSize:hp(1.9)}]}> یرجی الدخول اِلی الحساب الشخصی </Text>

                    {/* <TextInput
                        placeholder='البرید الالکترونی'
                        placeholderTextColor={COLORS.white}
                        style={styles.emailInputText}
                        onChangeText={(val) => setemail(val)}
                        value={email}
                    />

                    <View style={styles.passwordInputTextView}>
                        <Pressable onPress={() => sethide(!hide)} style={[styles.eyeButton, { height: hide ? hp(2) : hp(3) }]}  >
                            <Image
                                source={hide ? eyeTrueIcon : eyeFalseIcon}
                                style={{ height: hide ? hp(2.5) : hp(3), width: wp(9.2) }}
                            />
                        </Pressable>
                        <TextInput
                            placeholder='کلمة المرور'
                            secureTextEntry={hide}
                            placeholderTextColor={COLORS.white}
                            style={styles.passwordInputText}
                            onChangeText={(val) => setPassword(val)}
                            value={password}
                        />
                    </View> */}

                    {/* Login with PhoneNo verification */}

                    <TextInput
                        placeholder='  رقم الجوال '
                        placeholderTextColor='#fff'
                        style={styles.emailInputText}
                        onChangeText={(val) => setphoneNo(val)}
                        value={phoneNo}
                    />

                    <Pressable onPress={() => alert('نسیت کلمة المرور')} style={styles.forgetPasswordBtn}>
                        <Text style={[styles.btnText]}> نسیت کلمة المرور؟ </Text>
                    </Pressable>

                    {/* LoginButton  */}
                    {!loaded ?
                        <CustomButton
                            btnText='انشائ حساب'
                            backgroundColor={COLORS.yellow}
                            textColor={COLORS.white}
                            onPress={() => userCheck()}
                        />
                        :
                        <CustomActivityIndicator
                            backgroundColor={COLORS.yellow}
                            color={COLORS.white}
                        />
                    }
                    <Pressable onPress={() => sethide(!hide)} style={{ marginTop: Platform.OS === 'ios' ? hp(2) : hp(3) }}>
                        <Text style={[styles.btnText]}> اُوتسجیل الدخول بواسطة </Text>
                    </Pressable>

                    {/* Social Authentications  */}
                    <View style={styles.socialBtnView}>
                        <Pressable onPress={() => alert('Facebook')}>
                            <Image style={styles.socialBtn} source={facebookIcon} />
                        </Pressable>

                        <Pressable onPress={() => alert('Twitter')}>
                            <Image style={styles.socialBtn} source={twitterIcon} />
                        </Pressable>

                        <Pressable onPress={() => alert('Gmail')}>
                            <Image style={styles.socialBtn} source={gmailIcon} />
                        </Pressable>

                        <Pressable onPress={() => alert('Apple')}>
                            <Image style={styles.socialBtn} source={appleIcon} />
                        </Pressable>
                    </View>


                    <View style={styles.signUpBtnView}>
                        <Pressable onPress={() => alert('سجل الآن')} >
                            <Text style={[styles.btnText, { color: COLORS.yellow, textDecorationLine: 'underline' }]}> سجل الآن </Text>
                        </Pressable>

                        <Text style={[styles.btnText]}> لیس لدیک حساب؟ </Text>
                    </View>

                    <View style={styles.signUpBtnView}>
                        <Pressable onPress={() => alert('سجل الآن')} >
                            <Text style={[styles.btnText, { textDecorationLine: 'underline' }]}> الشروط و الاحکام </Text>
                        </Pressable>

                        <Text style={[styles.btnText]}> بالدخول للحساب،انت موافق علی </Text>
                    </View>

                </View>

            </ScrollView>
        </ImageBackground>
    )
}

export default index

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.white
    },
    backButtonView: {
        width: '100%',
        height: hp(8),
        marginLeft: wp(4),
    },
    backButton: {
        height: hp(6),
        width: Platform.OS === 'ios' ? wp(13.2) : wp(12.5),
        alignSelf: 'flex-start'
    },
    logoImage: {
        alignSelf: 'center',
        height: Platform.OS === 'ios' ? hp(18) : hp(19.2),
        width: Platform.OS === 'ios' ? wp(30.5) : wp(31)
    },
    contentView: {
        width: wp(80),
        alignItems: 'center',
        marginTop: Platform.OS === 'ios' ? hp(1) : hp(3),
        alignSelf: 'center'
    },
    emailInputText: {
        height: hp(7),
        width: wp(80),
        borderBottomWidth: 1,
        borderBottomColor: COLORS.white,
        color: COLORS.white,
        textAlign: 'right',
        fontFamily:'Cairo-Regular'
    },
    passwordInputTextView: {
        flexDirection: 'row',
        alignItems: 'center',
        height: hp(7),
        borderBottomWidth: 1,
        borderBottomColor: COLORS.white,
    },
    eyeButton: {
        width: wp(8.5),
        justifyContent: 'center',
        alignItems: 'center'
    },
    passwordInputText: {
        height: hp(7),
        width: wp(70),
        color: COLORS.white,
        textAlign: 'right'
    },
    forgetPasswordBtn: {
        marginTop: Platform.OS === 'ios' ? hp(1) : hp(2),
        alignSelf: 'flex-start'
    },
    socialBtnView: {
        height: hp(10),
        width: wp(60),
        alignItems: 'center',
        justifyContent: 'space-evenly',
        flexDirection: 'row'
    },
    socialBtn: {
        height: hp(5.1),
        width: Platform.OS === 'ios' ? wp(11) : wp(10.5)
    },
    signUpBtnView: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        height: hp(7),
        width: wp(80)
    },
    btnView: {
        width: wp(80),
        height: hp(7),
        backgroundColor: COLORS.yellow,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: hp(2)
    },
    btnText: {
        color: COLORS.white,
        fontSize: Platform.OS === 'android' ? hp(1.6) : hp(1.7),
        fontFamily:'Cairo-Regular'
    },

})
