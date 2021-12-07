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
import AsyncStorage from '@react-native-community/async-storage';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp
} from 'react-native-responsive-screen';
import Axios from 'react-native-axios'
import Url from '../../baseurl.json'

//Fireabse
import auth from '@react-native-firebase/auth';
import firebase from '@react-native-firebase/app'


import { COLORS } from '../../assets/Styles/color.js'
import CheckBox from 'react-native-vector-icons/MaterialIcons';
import CustomButton from '../../components/CustomButton.js';
import CustomActivityIndicator from '../../components/CustomActivityIndicator.js';
//Icons Assests
import backgroundImage from '../../assets/Images/background/backgroundImage.png'
import logo from '../../assets/Images/logo/logo.png'
import backBtnIcon from '../../assets/Images/icons/btnIcon.png'
import eyeTrueIcon from '../../assets/Images/icons/eyeTrue.png'
import eyeFalseIcon from '../../assets/Images/icons/eyeFalse.png'
import gmailIcon from '../../assets/Images/icons/gmailIcon.png'
import appleIcon from '../../assets/Images/icons/appleIcon.png'
import facebookIcon from '../../assets/Images/icons/facebookIcon.png'
import twitterIcon from '../../assets/Images/icons/twitterIcon.png'

const index = ({ navigation }) => {

    const [loaded, setloaded] = useState(false)
    const [hide, sethide] = useState(true);
    // const [email, setemail] = useState('');
    // const [password, setPassword] = useState('');
    const [fname, setfname] = useState('');
    const [lname, setlname] = useState('');
    const [phoneNo, setphoneNo] = useState('');
    const [gender, setgender] = useState('Male');
    
    //RadioBtn Handling 
    const [male, setmale] = useState('radio-button-checked');
    const [female, setfemale] = useState('radio-button-unchecked');

    //Auth State
    //const [phone, setphone] = useState('')
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
               
                    navigation.navigate('SignupVerification',{confirmResult:val,phoneNo,fname,lname,gender})

                })
                .catch(error => {
                    alert(error.message)

                    console.log(error)
                })
                
        } else {
            alert('Invalid Phone Number \n'+'Phone number must include country code.')
        }
   


    }
    console.log(confirmResult)

    const checkHandle = (check) => {
        if (check === 'male') {
            console.log("male");
            setgender('Male')
            setmale('radio-button-checked')
            setfemale('radio-button-unchecked')
        }
        else {
            setgender('Female')
            setfemale('radio-button-checked')
            setmale('radio-button-unchecked')
            console.log("female");
        }
    }

    const userCheck = () => {
        
        setloaded(true)
        if(fname && lname && phoneNo && gender){
        Axios.post(Url.baseUrl + "/user-check", {
            email: 'check@gmail.com',   //Line will remove.
            mobileNumber: phoneNo,
        })
            .then(function (response) {
                console.log(JSON.stringify(response));

                if(response.data==='Email already exists'){
                    alert("Email already exists!");
                    setloaded(false)
                }
                else if(response.data==='Mobile number already exists'){
                    alert("Phone number already exists!");
                    setloaded(false)
                }
                else if(response.data==='Email already existsMobile number already exists'){
                    alert("Phone number and email already used!");
                    setloaded(false)
                }
                else{
                    AsyncStorage.setItem('fName',(response.data.firstName?response.data.firstName:''))
                    AsyncStorage.setItem('lName',(response.data.lastName?response.data.lastName:''))
                    AsyncStorage.setItem('mobileNo',(response.data.mobileNumber?response.data.mobileNumber:''))
                   // AsyncStorage.setItem('email',(response.data.email?response.data.email:''))
                    handleSendCode()
                    setloaded(false)
                }

            })
            .catch(function (error) {
                console.log(error);
                setloaded(false)
             //   alert("Database error");
            });
        }else{
            alert("Enter all fields.")
            setloaded(false)
        }
    }

    console.log("First Name : ",fname)
    console.log("Last Name : ",lname)
    console.log("Mobile No : ",phoneNo)
  //  console.log("email : ",email)
    console.log("gender : ",gender)
  //  console.log("password : ",password)
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
                    <Text style={[styles.btnText, {fontSize:hp(2.5),fontFamily:'Cairo-SemiBold'}]}> مرحبا </Text>
                    <Text style={[styles.btnText,{fontSize:hp(1.9)}]}> یرجی الدخول اِلی الحساب الشخصی </Text>

                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
                        <TextInput
                            placeholder='الاسم الثاني'
                            placeholderTextColor='#fff'
                            style={styles.nameTextInput}
                            onChangeText={(val) => setlname(val)}
                            value={lname}
                            
                        />

                        <TextInput
                            placeholder='الاسم الاٗول'
                            placeholderTextColor='#fff'
                            style={styles.nameTextInput}
                            onChangeText={(val) => setfname(val)}
                            value={fname}
                        />

                    </View>

                    <TextInput
                        placeholder='  رقم الجوال '
                        placeholderTextColor='#fff'
                        style={styles.phoneInputText}
                        onChangeText={(val) => setphoneNo(val)}
                        value={phoneNo}
                    />
                    {/* <TextInput
                        placeholder='البرید الالکترونی'
                        placeholderTextColor='#fff'
                        style={styles.phoneInputText}
                        onChangeText={(val) => setemail(val)}
                        value={email}
                    /> */}

                    {/* <View style={styles.passwordInputTextView}>
                        <Pressable onPress={() => sethide(!hide)} style={[styles.eyeButton, { height: hide ? hp(2) : hp(3), }]}  >
                            <Image
                                source={hide ? eyeTrueIcon : eyeFalseIcon}
                                style={{ height:'100%', width: '100%' }}
                            />
                        </Pressable>
                        <TextInput
                            placeholder='کلمة المرور'
                            secureTextEntry={hide}
                            placeholderTextColor='#fff'
                            style={styles.passwordInputText}
                            onChangeText={(val) => setPassword(val)}
                            value={password}
                        />
                    </View> */}

                    <View style={{ width: wp(80), height: hp(12), marginTop: hp(1) }}>
                        <Text style={styles.genderMainText}> النوع </Text>
                        <View style={{ flexDirection: 'row', marginTop: hp(1) }}>
                            <View style={{ width: wp(40) }}></View>

                            <Pressable onPress={() => checkHandle('female')} style={{ flexDirection: 'row', width: wp(15), justifyContent: 'space-between', alignItems: 'center' }}>
                                <Text style={styles.genderText}> اُنثی </Text>
                                <CheckBox name={female} size={30} color={COLORS.yellow} />
                            </Pressable>

                            <Pressable onPress={() => checkHandle('male')} style={{ flexDirection: 'row', width: wp(15), justifyContent: 'space-between', marginLeft: wp(10) }}>
                                <Text style={styles.genderText}> ذکر </Text>
                                <CheckBox name={male} size={30} color={COLORS.yellow} />
                            </Pressable>
                        </View>
                    </View>

                    {/* LoginButton  */}
                    {loaded ?
                        <CustomActivityIndicator
                            backgroundColor={COLORS.yellow}
                            color={COLORS.white}
                        />
                        :
                        <CustomButton
                            btnText='انشائ حساب'
                            backgroundColor={COLORS.yellow}
                            textColor={COLORS.white}
                            onPress={() => userCheck()}
                        />   
                    }
                    <Pressable onPress={() => sethide(!hide)} style={{ marginTop: Platform.OS === 'ios' ? hp(2) : hp(3) }}>
                        <Text style={[styles.btnText]}> اٗوانشای الحساب بواسطة </Text>
                    </Pressable>

                    {/* Social Authentications  */}
                    <View style={styles.socialBtnView}>
                        <Pressable style={styles.socialBtn} onPress={() => alert('Facebook')}>
                            <Image style={{height:'100%',width:'100%'}} source={facebookIcon} />
                        </Pressable>

                        <Pressable style={styles.socialBtn} onPress={() => alert('Twitter')}>
                            <Image style={{height:'100%',width:'100%'}} source={twitterIcon} />
                        </Pressable>

                        <Pressable style={styles.socialBtn} onPress={() => alert('Gmail')}>
                            <Image style={{height:'100%',width:'100%'}} source={gmailIcon} />
                        </Pressable>

                        <Pressable style={styles.socialBtn} onPress={() => alert('Apple')}>
                            <Image style={{height:'100%',width:'100%'}} source={appleIcon} />
                        </Pressable>
                    </View>


                    <View style={styles.signinBtnView}>
                        <Pressable onPress={() => navigation.navigate('NewLoginScreen')} >
                            <Text style={[styles.btnText, { color: '#edb625', textDecorationLine: 'underline' }]}> سجل دخول </Text>
                        </Pressable>

                        <Text style={[styles.btnText]}> لدیک حساب؟ </Text>
                    </View>

                    <View style={styles.signinBtnView}>
                        <Pressable onPress={() => alert("الشروطوالاٗحکام")} >
                            <Text style={[styles.btnText, { textDecorationLine: 'underline' }]}> الشروطوالاٗحکام </Text>
                        </Pressable>

                        <Text style={[styles.btnText]}> بانشائ الحساب،اٗنت موافق علی </Text>
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
    phoneInputText: {
        height: hp(7),
        width: wp(80),
        borderBottomWidth: 1,
        borderBottomColor: '#fff',
        color: '#fff',
        textAlign: 'right',
        fontFamily:'Cairo-Regular'
    },
    nameTextInput: {
        height: hp(7),
        width: '45%',
        borderBottomWidth: 1,
        borderBottomColor: '#fff',
        color: '#fff',
        textAlign: 'right',
        fontFamily:'Cairo-Regular'
    },
    passwordInputTextView: {
        flexDirection: 'row',
        alignItems: 'center',
        height: hp(7),
        borderBottomWidth: 1,
        borderBottomColor: '#fff',
    },
    eyeButton: {
        width: wp(8.5),
        justifyContent: 'center',
        alignItems: 'center'
    },
    passwordInputText: {
        height: hp(7),
        width: wp(70),
        color: '#fff',
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
        flexDirection: 'row',
        marginTop:Platform.OS==='android'? hp(0):hp(-1)
    },
    socialBtn: {
        height: hp(5.1),
        width: Platform.OS === 'ios' ? wp(11) : wp(10.5)
    },
    signinBtnView: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        height: hp(7),
        width: wp(80),
        marginTop:Platform.OS==='android'? hp(-2):hp(-3)
    },

    btnText: {
        color: '#fff',
        fontSize: Platform.OS === 'android' ? hp(1.6) : hp(1.7),
        fontFamily:'Cairo-Medium'
    },
    genderMainText: {
        color: COLORS.white,
        alignSelf: 'flex-end',
        fontFamily:'Cairo-Medium'
    },
    genderText:{ 
        color: COLORS.white, 
        fontSize: 15,
        fontFamily:'Cairo-Regular' 
    },



})

