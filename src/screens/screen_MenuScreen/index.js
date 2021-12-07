
import React, { useState, useEffect } from 'react'
import {
    StyleSheet,
    View,
    SafeAreaView,
    StatusBar,
    ScrollView,
    ImageBackground,
    Image,
    Pressable,
    Text,
    Dimensions,
    Platform,

} from 'react-native';

import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp
} from 'react-native-responsive-screen';
import AsyncStorage from '@react-native-community/async-storage';
import { COLORS } from '../../assets/Styles/color.js'
import headerMenuBackground from '../../assets/Images/background/headerMenuBackground.png'
import backBtnIcon from '../../assets/Images/icons/btnIcon.png'
import notificationIcon from '../../assets/Images/icons/notificationIcon.png'

import landscapeLogo from '../../assets/Images/logo/landscapeIcon.png'

//Tab Icons 
import moreFalseIcon from '../../assets/Images/icons/moreFalseIcon.png'
import moreTrueIcon from '../../assets/Images/icons/moreTrueIcon.png'

import homeFalseIcon from '../../assets/Images/icons/homeFalseIcon.png'
import homeTrueIcon from '../../assets/Images/icons/homeTrueIcon.png'


import messagesFalseIcon from '../../assets/Images/icons/messagesFalseIcon.png'
import messagesTrueIcon from '../../assets/Images/icons/messagesTrueIcon.png'

import classFalseIcon from '../../assets/Images/icons/classFalseIcon.png'
import classTrueIcon from '../../assets/Images/icons/classTrueIcon.png'

//Menu Icons 
import userIcon from '../../assets/Images/icons/userIcon.png'
import timeIcon from '../../assets/Images/icons/timeIcon.png'
import offersIcon from '../../assets/Images/icons/offersIcon.png'
import manageMoneyIcon from '../../assets/Images/icons/manageMoneyIcon.png'
import starIcon from '../../assets/Images/icons/starIcon.png'
import notificationMenuIcon from '../../assets/Images/icons/notificationMenuIcon.png'
import infoIcon from '../../assets/Images/icons/infoIcon.png'
import powerIcon from '../../assets/Images/icons/powerIcon.png'

const index = ({ navigation,route }) => {

    const [orientation, setorientation] = useState('');
   // const { data } = route.params;
   
    const signOut=()=>{
        AsyncStorage.removeItem('fName');
        AsyncStorage.removeItem('lName');
        AsyncStorage.removeItem('mobileNo');
        AsyncStorage.removeItem('email');
        navigation.navigate('NewLoginScreen')
    }
    useEffect(() => {
        getOrientation()
        Dimensions.addEventListener('change', getOrientation);


    }, []);

    //Screen Orientation 
    const getOrientation = () => {
        if (Dimensions.get('window').width < Dimensions.get('window').height) {
            setorientation('portrait');
        } else {
            setorientation('Landscape');
        }
    };

    return (
        <SafeAreaView style={styles.mainContainer}>
            <StatusBar barStyle={'light-content'} backgroundColor={COLORS.purple} />
            <ImageBackground source={headerMenuBackground} style={orientation == 'portrait' ? styles.portraitHeaderView : styles.landscapeHeaderView}>
                {/* back Button */}
                {/* <Pressable onPress={() => navigation.goBack()} style={styles.backButtonView}>
                    <Image style={styles.backButton} source={backBtnIcon} />
                </Pressable> */}

                {/* Notification Button */}
                <Pressable onPress={() => alert('Notification')} style={styles.backButtonView}>
                    <Image style={styles.backButton} source={notificationIcon} />
                </Pressable>

                <Text style={[styles.headerText,{width: orientation == 'portrait' ? wp(30) : '60%',textAlign:'right' }]}> القائمة </Text>

                <Image style={orientation == 'portrait' ? styles.portraitLogo : styles.landscapeLogo} source={landscapeLogo} />

            </ImageBackground>

            <ScrollView style={[styles.mainContent,{marginTop:orientation=='portrait'?Platform.OS==='ios'? hp(13):hp(18):Platform.OS==='ios'? hp(12):hp(8),}]}>
                
                {/* Menu Buttons */}
                <Pressable style={styles.menuButtonView} onPress={()=>navigation.navigate('PersonalProfile',{data:[]})}>
                    <Text style={styles.menuButtonText}> الملف الشخصی </Text>
                    <Image style={styles.menuIcon} source={userIcon} />
                </Pressable>
                
                <Pressable style={styles.menuButtonView} onPress={()=>alert("المواعید")}>
                    <Text style={styles.menuButtonText}> المواعید </Text>
                    <Image style={[styles.menuIcon,{height:hp(2.6)}]} source={timeIcon} />
                </Pressable>

                <Pressable style={styles.menuButtonView} onPress={()=>alert("الباقات")}> 
                    <Text style={styles.menuButtonText}> الباقات </Text>
                    <Image style={styles.menuIcon} source={offersIcon} />
                </Pressable>

                <Pressable style={styles.menuButtonView} onPress={()=>alert("الادارة المالیة")}>
                    <Text style={styles.menuButtonText}> الادارة المالیة </Text>
                    <Image style={[styles.menuIcon,{height:hp(2.6)}]} source={manageMoneyIcon} />
                </Pressable>

                <Pressable style={styles.menuButtonView} onPress={()=>alert("تقییم الدروس ")}>
                    <Text style={styles.menuButtonText}> تقییم الدروس </Text>
                    <Image style={styles.menuIcon} source={starIcon} />
                </Pressable>

                <Pressable style={styles.menuButtonView} onPress={()=>alert("الاشعارات")}>
                    <Text style={styles.menuButtonText}> الاشعارات </Text>
                    <Image style={[styles.menuIcon,{height:Platform.OS==='ios'? hp(3):hp(3.3)}]} source={notificationMenuIcon} />
                </Pressable>

                <Pressable style={styles.menuButtonView} onPress={()=>alert("عنالتطبیق")}>
                    <Text style={styles.menuButtonText}> عنالتطبیق </Text>
                    <Image style={[styles.menuIcon,{height:hp(2.6)}]} source={infoIcon} />
                </Pressable>

                <Pressable onPress={()=>signOut()} style={styles.menuButtonView}>
                    <Text style={styles.menuButtonText}> تسجیل الخروج </Text>
                    <Image style={[styles.menuIcon,{height:hp(2.6)}]} source={powerIcon} />
                </Pressable>
            </ScrollView>


            <View style={styles.bottomTabView}>
                <Pressable
                    onPress={() => navigation.navigate("MenuScreen")}
                    style={[styles.bottomTabButton, { borderTopLeftRadius: hp(3) }]
                    }>
                    <Image style={[styles.bottomIcon, { height: hp(1),marginTop:hp(2) }]} source={moreTrueIcon} />
                    <Text  style={{color:COLORS.purple,fontFamily: 'Cairo-Regular'}}> المزید</Text>
                </Pressable>

                <Pressable
                    onPress={() => navigation.navigate('ChatTeacherList')}
                    style={styles.bottomTabButton}>
                    <Image style={[styles.bottomIcon, { height: hp(3) }]} source={messagesFalseIcon} />
                    <Text style={styles.menuButtonText}> الرسائل</Text>
                </Pressable>

                <Pressable
                    onPress={() => navigation.navigate('NewClassroom')}
                    style={styles.bottomTabButton}>
                    <Image style={[styles.bottomIcon, { width: Platform.OS === 'ios' ? wp(8) : wp(7) }]} source={classFalseIcon} />
                    <Text style={styles.menuButtonText}> الدروس</Text>
                </Pressable>

                <Pressable
                    onPress={() => navigation.navigate('HomeScreen')}
                    style={[styles.bottomTabButton, { borderTopRightRadius: hp(3) }]}>
                    <Image style={styles.bottomIcon} source={homeFalseIcon} />
                    <Text style={styles.menuButtonText}>الرئیسیة </Text>
                </Pressable>
            </View>

        </SafeAreaView>
    )
}
const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        alignItems: 'flex-end',
        backgroundColor:COLORS.bgscreengrey

    },
    mainContent: {
        flex: 1,
        marginTop: Platform.OS==='ios'? hp(13):hp(18),
        width: '100%',

    },
    portraitHeaderView: {
        width: wp(100),
        height: Platform.OS === 'ios' ? hp(22) : hp(22),
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        position: 'absolute'
    },
    landscapeHeaderView: {
        width: '100%',
        height: Platform.OS === 'ios' ? hp(10) : hp(7),
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        position: 'absolute'
    },
    headerText:{ 
        color: COLORS.white, 
        fontSize: 18, 
        textAlign: 'center', 
        marginTop: Platform.OS === 'ios' ? hp(6) : hp(3), 
        fontFamily: 'Cairo-SemiBold'
    },
    backButtonView: {
        marginLeft:wp(2),
        height: hp(10),
        marginTop: Platform.OS === 'ios' ? hp(6) : hp(2) 
    },
    backButton: {

        height: hp(6),
        width: Platform.OS === 'ios' ? wp(13.2) : wp(12.5),
    },
    menuIcon: {
        height: hp(2.5),
        width: Platform.OS === 'ios' ? wp(5.5) : wp(5.5),
        marginRight:wp(5),
        marginLeft:wp(2)
    },
    landscapeLogo: {
        height: hp(5),
        //marginTop: Platform.OS === 'ios' ? hp(6) : hp(2),
        width: Platform.OS === 'ios' ? wp(30.2) : wp(30.2),
        marginRight:wp(2)
    },
    portraitLogo:{
        height: hp(5),
        marginTop: Platform.OS === 'ios' ? hp(6) : hp(2),
        width: Platform.OS === 'ios' ? wp(30.2) : wp(30.2),
        marginRight:wp(2)
    },
    menuButtonView:{ 
        flexDirection: 'row', 
        width: '92%', 
        justifyContent: 'flex-end', 
        alignItems: 'center', 
        alignSelf:'center',
        backgroundColor: COLORS.ashewhite , 
        borderRadius: hp(2), 
        height: hp(7), 
        elevation: 5, 
        shadowOpacity: .2 ,
        marginBottom:hp(1.5)
    },
    menuButtonText:{
        color:COLORS.black ,
        fontFamily: 'Cairo-Regular'
    },
    bottomTabView: {
        backgroundColor: COLORS.white,
        height: hp(8),
        width:'100%',
        borderTopLeftRadius: hp(3),
        borderTopRightRadius: hp(3),
        elevation: 5,
        shadowOpacity: .1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly',
       
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
        marginTop:Platform.OS==='ios'?hp(.5):0
    },
})
export default index