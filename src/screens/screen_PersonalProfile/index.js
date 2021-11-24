import React, { useState, useEffect } from 'react'
import {
    StyleSheet,
    View,
    SafeAreaView,
    StatusBar,
    Text,
    FlatList,
    Pressable,
    ImageBackground,
    Platform,
    Image,
    Dimensions
} from 'react-native';
import Axios from 'react-native-axios'
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp
} from 'react-native-responsive-screen';
//import Icon from 'react-native-vector-icons/Feather';
import { firebase } from '@react-native-firebase/database';
import AsyncStorage from '@react-native-community/async-storage';
//import firebaseConfig from '../../firebaseConfig'
// Custom Components imports 

import { COLORS } from '../../assets/Styles/color.js'
import headerBackground from '../../assets/Images/background/headerBackground.png'
import backBtnIcon from '../../assets/Images/icons/btnIcon.png'
import notificationIcon from '../../assets/Images/icons/notificationIcon.png'

import landscapeLogo from '../../assets/Images/logo/landscapeIcon.png'
import teacherIcon from '../../assets/Images/Image/teacherIcon.png'

//Tab Icons 
import moreFalseIcon from '../../assets/Images/icons/moreFalseIcon.png'
import moreTrueIcon from '../../assets/Images/icons/moreTrueIcon.png'

import homeFalseIcon from '../../assets/Images/icons/homeFalseIcon.png'
import homeTrueIcon from '../../assets/Images/icons/homeTrueIcon.png'


import messagesFalseIcon from '../../assets/Images/icons/messagesFalseIcon.png'
import messagesTrueIcon from '../../assets/Images/icons/messagesTrueIcon.png'

import classFalseIcon from '../../assets/Images/icons/classFalseIcon.png'
import classTrueIcon from '../../assets/Images/icons/classTrueIcon.png'


const index = ({ navigation,route }) => {
 
   const [firstName,setfirstName] = useState('');
   const [lastName,setlastName] = useState('');
   const [phone,setphone] = useState('');
   const [email,setemail] = useState('');
   const [id,setid] = useState('');
   //const { data } = route.params;
   
    const [orientation, setorientation] = useState('');
    
    useEffect(() => {
        (async () => {
        setfirstName(await AsyncStorage.getItem('fName'))
        setlastName(await AsyncStorage.getItem('lName'))
        setphone(await AsyncStorage.getItem('mobileNo'))
        setemail(await AsyncStorage.getItem('email'))
        //setid(await AsyncStorage.getItem('userid'))
       // getUserData()
    })()
        getOrientation()
        Dimensions.addEventListener('change', getOrientation);
    
    }, []);

    // const getUserData=()=>{
    //     Axios.post(Url.baseUrl+"/user-login", {
    //         userId:id
    //       })
    //         .then(function (response) {
    //           console.log("Single USer"+JSON.stringify(response));
    //           if(response.data!=="User not found"){
    //               setfirstName(response.data.firstName)
    //               setlastName(response.data.lastName)
    //               setemail(response.data.email)
    //               setphone(response.data.mobileNumber)
    //           }
    //         })
    //         .catch(function (error) {
    //           console.log(error);
    //           setloaded(false)
    //           alert("api fault");
    //         });
    // }
      
    // Screen Orientation
    const getOrientation = () => {
        if (Dimensions.get('window').width < Dimensions.get('window').height) {
            setorientation('portrait');
        } else {
            setorientation('Landscape');
        }
    };
    
    return (
        <SafeAreaView style={styles.mainContainer}>
            <StatusBar barStyle={Platform.OS==='ios'? 'dark-content':'light-content'} backgroundColor={COLORS.purple} />

            {/* Header code*/}
            <ImageBackground source={headerBackground} style={styles.headerView}>
                {/* back Button */}
                <Pressable onPress={() => navigation.goBack()} style={styles.backButtonView}>
                    <Image style={styles.backButton} source={backBtnIcon} />
                </Pressable>

                {/* Notification Button */}
                <Pressable onPress={() => alert('Notification')} style={styles.backButtonView}>
                    <Image style={styles.backButton} source={notificationIcon} />
                </Pressable>

                <Text style={[styles.headerText,{width:orientation=='portrait'? wp(30):'60%'}]}> الملف الشخصی </Text>

                <Image style={styles.landscapeLogo} source={landscapeLogo} />

            </ImageBackground>


            <View style={styles.mainContent}>
               <View style={styles.infoView}>
                    <Text style={[styles.infoText,{marginRight:wp(5)}]}> {firstName} </Text>
                    <Text style={[styles.infoText,{width:'25%'}]}> الاسم اول </Text>
               </View>

               <View style={styles.infoView}>
                    <Text style={[styles.infoText,{marginRight:wp(5)}]}> {lastName} </Text>
                    <Text style={[styles.infoText,{width:'25%'}]}> الاسم الثانی </Text>
               </View>

               <View style={styles.infoView}>
                    <Text style={[styles.infoText,{marginRight:wp(5)}]}> {phone} </Text>
                    <Text style={[styles.infoText,{width:'25%'}]}> رقم الجوال </Text>
               </View>

               <View style={styles.infoView}>
                    <Text style={[styles.infoText,{marginRight:wp(5)}]}> {email} </Text>
                    <Text style={[styles.infoText,{width:'25%'}]}> البرید الالکترونی </Text>
               </View>

             

            </View>

            <View style={styles.bottomTabView}>
                <Pressable
                    onPress={() => navigation.navigate('MenuScreen')}
                    style={[styles.bottomTabButton, { borderTopLeftRadius: hp(3) }]
                    }>
                    <Image style={[styles.bottomIcon, { height: hp(1) }]} source={moreFalseIcon} />
                    <Text style={{ color:COLORS.black }}> المزید</Text>
                </Pressable>

                <Pressable
                    onPress={() => navigation.navigate('ChatTeacherList')}
                    style={styles.bottomTabButton}>
                    <Image style={[styles.bottomIcon, { height: hp(3) }]} source={messagesFalseIcon} />
                    <Text style={{ color:COLORS.black }} > الرسائل</Text>
                </Pressable>

                <Pressable
                    onPress={() => navigation.navigate('NewClassroom')}
                    style={styles.bottomTabButton}>
                    <Image style={[styles.bottomIcon, { width: Platform.OS === 'ios' ? wp(8) : wp(7) }]} source={classFalseIcon} />
                    <Text style={{ color:COLORS.black }}> الدروس</Text>
                </Pressable>

                <Pressable
                    onPress={() => navigation.navigate('HomeScreen')}
                    style={[styles.bottomTabButton, { borderTopRightRadius: hp(3) }]}>
                    <Image style={styles.bottomIcon} source={homeFalseIcon} />
                    <Text style={{ color:COLORS.black }}>الرئیسیة </Text>
                </Pressable>
            </View>




        </SafeAreaView>
    )
}
const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: COLORS.ashewhite

    },
    headerView:{ 
        width: '100%', 
        height: Platform.OS === 'ios' ? hp(12) : hp(12), 
        flexDirection: 'row', 
        alignItems: 'center', 
        justifyContent: 'space-evenly' 
    },
    headerText:{ 
        color: '#fff', 
        fontSize: 18, 
        textAlign: 'center', 
     
    },
    mainContent: {
        flex: 1,
        alignItems: 'center'

    },
    infoView:{
        width:'90%',
        height:hp(7),
        marginTop:hp(3),
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-evenly'
    },
    infoText:{
        width:'60%',
        textAlign:'right',
        color:COLORS.purple, 
        fontWeight:'bold',
        fontSize:hp(1.7),
        //backgroundColor:'pink'
    },
   
    backButtonView: {
        height: hp(10),
        marginTop: Platform.OS === 'ios' ? hp(4) : hp(2)
    },
    backButton: {
        height: hp(6),
        width: Platform.OS === 'ios' ? wp(13.2) : wp(12.5),
        marginTop: Platform.OS === 'ios' ? hp(0) : hp(1)
    },
    landscapeLogo: {
        height: hp(5),       
        width: Platform.OS === 'ios' ? wp(30.2) : wp(30.2),
    },
    bottomTabView: {
        backgroundColor: COLORS.white,
        height: hp(10),
        borderTopLeftRadius: hp(3),
        borderTopRightRadius: hp(3),
        elevation: 5,
        shadowOpacity: .1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly'
    },
    bottomTabButton: {
        backgroundColor: COLORS.white,
        width: wp(25),
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    bottomIcon: {
        height: hp(4),
        width: Platform.OS === 'ios' ? wp(9.5) : wp(8.5),
    },
    teacherImage: {
        height: Platform.OS === 'android' ? hp(9) : hp(8.5),
        width: wp(18.5),
        borderColor: '#D0D0D0',
        borderRadius: 36,
        borderWidth: 3
    }
})
export default index