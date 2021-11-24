import React, { useEffect, Component, useState,useRef } from 'react'
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
import CustomActivityIndicator from '../../components/CustomActivityIndicator.js';
import AsyncStorage from '@react-native-community/async-storage';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp
} from 'react-native-responsive-screen';
import Axios from 'react-native-axios'
import Url from '../../baseurl.json'
import { COLORS } from '../../assets/Styles/color.js';
import CustomButton from '../../components/CustomButton.js';
//Icons Assests
import backgroundImage from '../../assets/Images/background/backgroundImage.png';
import logo from '../../assets/Images/logo/logo.png';
import backBtnIcon from '../../assets/Images/icons/btnIcon.png';


const index = ({ navigation,route }) => {

    const firstTextInputRef = useRef(null);
    const secondTextInputRef = useRef(null);
    const thirdTextInputRef = useRef(null);
    const fourthTextInputRef = useRef(null);
    const fifthTextInputRef = useRef(null);
    const sixthTextInputRef = useRef(null);

    const [otpCode, setotpCode] = useState('');
    const {confirmResult,phoneNo,fname,lname,gender} =route.params;
    const [userId,setuserId] = useState('');
    const [loaded,setloaded] = useState('');

    const handleVerifyCode = () => {
        if (otpCode.length == 6) {
            confirmResult.confirm(otpCode)
                .then(user => {
              
                    setuserId(user.uid)
                    SignUp()
                })
                .catch(error => {
                    alert('Invalid Code!')
                    console.log(error.message)
                })
        } else {
            alert('Please enter a 6 digit OTP code.')
        }
    }
    const inputOtpCode = (val) => {
        if (val != '')
            setotpCode(otpCode + val)
        else {
            setotpCode(otpCode.slice(0, -1))
        }
    }
    const SignUp = () => {
        var crypto = '';
        var val = crypto.randomBytes(5).toString("hex") + "@gamil.com";
        

        setloaded(true)
        Axios.post(Url.baseUrl + "/user-register", {
            firstName: fname,
            lastName: lname,
            mobileNumber: phoneNo,
            email: val,
            gender: gender,
            password: '112233',
            image:' ',
            roleTitle:'Student'

        })
            .then(function (response) {
                console.log(JSON.stringify(response));
                if (response.data !== "student already exists") {
                    navigation.navigate('HomeScreen')
                    AsyncStorage.setItem('fName',(response.data.firstName?response.data.firstName:''))
                    AsyncStorage.setItem('lName',(response.data.lastName?response.data.lastName:''))
                    AsyncStorage.setItem('mobileNo',(response.data.mobileNumber?response.data.mobileNumber:''))
                   // AsyncStorage.setItem('email',(response.data.email?response.data.email:''))
                    setloaded(false)
                } else {
                    alert("student already exists!");
                    setloaded(false)
                }
            })
            .catch(function (error) {
                console.log(error);
                setloaded(false)
              //  alert("Database error");
            });
    }
    console.log('OTP' + otpCode)
    console.log("confirmResult"+ confirmResult);
    console.log("First Name : ",fname)
    console.log("Last Name : ",lname)
    console.log("Mobile No : ",phoneNo)
    //console.log("email : ",email)
    console.log("gender : ",gender)
   // console.log("password : ",password)
    return (
        <ImageBackground style={styles.container} source={backgroundImage}>

            <StatusBar barStyle='light-content' />

            <Pressable onPress={() => navigation.goBack()} style={[styles.backButtonView, { marginTop: Platform.OS === 'ios' ? hp(5) : hp(2) }]}>
                <Image style={styles.backButton} source={backBtnIcon} />
            </Pressable>
            <ScrollView style={{ flex: 1 }}>
                <View style={styles.logoImage}> 
                    <Image style={{height:'100%',width:'100%'}} source={logo} />
                </View>
                


                <View style={styles.contentView}>
                    <Text style={[styles.btnText,{fontSize:hp(2)}]}> من فضلک </Text>
                    <Text style={styles.btnText}> اٗدخل رمز التحقق الذی اٗرسل اِلی جوالک </Text>

                    <View style={styles.verficationView}>
                    <View style={styles.verficationSubView}>
                        <TextInput
                            style={styles.verficationCodeText}
                            keyboardType='number-pad'
                            maxLength={1}
                            autoFocus={true}
                            placeholder='0'
                            placeholderTextColor={COLORS.lightgrey}
                            ref={firstTextInputRef}
                            onChangeText={(val) => {
                                val != '' ? secondTextInputRef.current.focus() : firstTextInputRef.current.focus()
                                inputOtpCode(val)
                            }} />
                    </View>

                    <View style={styles.verficationSubView}>
                        <TextInput
                            style={styles.verficationCodeText}
                            keyboardType='number-pad'
                            maxLength={1}
                            placeholder='0'
                            placeholderTextColor={COLORS.lightgrey}
                            ref={secondTextInputRef}
                            onChangeText={(val) => {
                                val != '' ? thirdTextInputRef.current.focus() : firstTextInputRef.current.focus()
                                inputOtpCode(val)
                            }} />
                    </View>

                    <View style={styles.verficationSubView}>
                        <TextInput
                            style={styles.verficationCodeText}
                            keyboardType='number-pad'
                            maxLength={1}
                            placeholder='0'
                            placeholderTextColor={COLORS.lightgrey}
                            ref={thirdTextInputRef}
                            onChangeText={(val) => {
                                val != '' ? fourthTextInputRef.current.focus() : secondTextInputRef.current.focus()
                                inputOtpCode(val)
                            }} />
                    </View>

                    <View style={styles.verficationSubView}>
                        <TextInput
                            style={styles.verficationCodeText}
                            keyboardType='number-pad'
                            maxLength={1}
                            placeholder='0'
                            placeholderTextColor={COLORS.lightgrey}
                            ref={fourthTextInputRef}
                            onChangeText={(val) => {
                                val != '' ? fifthTextInputRef.current.focus() : thirdTextInputRef.current.focus()
                                inputOtpCode(val)
                            }} />
                    </View>

                    <View style={styles.verficationSubView}>
                        <TextInput
                            style={styles.verficationCodeText}
                            keyboardType='number-pad'
                            maxLength={1}
                            placeholder='0'
                            placeholderTextColor={COLORS.lightgrey}
                            ref={fifthTextInputRef}
                            onChangeText={(val) => {
                                val != '' ? sixthTextInputRef.current.focus() : fourthTextInputRef.current.focus()
                                inputOtpCode(val)
                            }} />
                    </View>                    

                    <View style={styles.verficationSubView}>
                        <TextInput
                            style={styles.verficationCodeText}
                            keyboardType='number-pad'
                            maxLength={1}
                            placeholder='0'
                            placeholderTextColor={COLORS.lightgrey}
                            ref={sixthTextInputRef}
                            onChangeText={(val) => {
                                val != '' ? sixthTextInputRef.current.focus() : fifthTextInputRef.current.focus()
                                inputOtpCode(val)
                            }} />
                    </View> 
                   
                </View>

                {/* LoginButton  */}
                
                    {!loaded ?
                        <CustomButton 
                    btnText='ارسال' 
                    backgroundColor={COLORS.yellow} 
                    textColor={COLORS.white} 
                    onPress={() => handleVerifyCode()}
                />
                        :
                        <CustomActivityIndicator
                            backgroundColor={COLORS.yellow}
                            color={COLORS.white}
                        />
                    }   
                </View>

            </ScrollView>
        </ImageBackground>
    )
}

export default index

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
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
    
    btnText: {
        color: '#fff',
        fontSize: Platform.OS === 'android' ? hp(1.6) : hp(1.7),
    },
    verficationView: {
        height: hp(9),
        width: '100%',
        alignSelf: 'center',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent:'space-evenly',
        marginBottom:hp(3)

    },
    verficationSubView: {
        height: hp(7),
        width: wp(12),
        borderBottomWidth:1,
        borderBottomColor:'#C0C0C0',
        marginRight: wp(2),
        alignItems: 'center',
        justifyContent: 'center'
    },
    verficationCodeText: {
        height: hp(7),
        width: wp(10),
        fontSize: 25,
        textAlign: 'center',
        color: COLORS.white
    },



})

