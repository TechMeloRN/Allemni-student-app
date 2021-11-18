
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

import homeHeader from '../../assets/Images/background/homeHeader.png'
import homeSliderPic1 from '../../assets/Images/Image/homeSliderPic1.png'


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

const index = ({ navigation, route }) => {

    const [orientation, setorientation] = useState('');

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
            <ImageBackground source={homeHeader} style={orientation == 'portrait' ? styles.portraitHeaderView : styles.landscapeHeaderView}>

                <Pressable onPress={() => alert('Notification')} style={styles.backButtonView}>
                    <Image style={styles.backButton} source={notificationIcon} />
                </Pressable>

                {/* <Text style={[styles.headerText,{width: orientation == 'portrait' ? wp(30) : '60%',textAlign:'right' }]}> القائمة </Text> */}

                <Image style={orientation == 'portrait' ? styles.portraitLogo : styles.landscapeLogo} source={landscapeLogo} />

            </ImageBackground>

            <View style={[styles.mainContent, { marginTop: orientation == 'portrait' ? Platform.OS === 'ios' ? hp(13) : hp(18) : Platform.OS === 'ios' ? hp(12) : hp(8) }]}>
                <View style={styles.searchMainView}>
                    <View style={styles.searchSubView}>
                        <Text style={{ color: COLORS.white }}> فلتر </Text>
                    </View>
                    <View style={[styles.searchSubView, { width: '65%', backgroundColor: COLORS.white }]}>
                        <Text style={{ color: COLORS.purple, textAlign: 'right', width: '70%' }}> ابحث ھنا </Text>
                    </View>
                </View>



                <ScrollView >
                    {/* Image Slider */}
                    <View style={styles.sliderView}>
                        <Image style={{ height: '100%', width: '100%', borderRadius: 15 }} source={homeSliderPic1} />
                    </View>
                    
                    <Text style={styles.contentText}> نوع التعلیم </Text>
                    <View style={styles.eduTypesView}>
                    <View style={styles.eduTypesBtn}>
                        <Text style={{color:COLORS.white}}> عن بعد </Text>
                    </View>

                    <View style={styles.eduTypesBtn}>
                        <Text style={{color:COLORS.white}}> حضوری </Text>
                    </View>

                    </View>
                </ScrollView>
            </View>

            <View style={styles.bottomTabView}>
                <Pressable
                    onPress={() => navigation.navigate("MenuScreen")}
                    style={[styles.bottomTabButton, { borderTopLeftRadius: hp(3) }]
                    }>
                    <Image style={[styles.bottomIcon, { height: hp(1) }]} source={moreFalseIcon} />
                    <Text style={{ color: COLORS.black }}> المزید</Text>
                </Pressable>

                <Pressable
                    onPress={() => navigation.navigate('ChatTeacherList')}
                    style={styles.bottomTabButton}>
                    <Image style={[styles.bottomIcon, { height: hp(3) }]} source={messagesFalseIcon} />
                    <Text style={{ color: COLORS.black }}> الرسائل</Text>
                </Pressable>

                <Pressable
                    onPress={() => navigation.navigate('NewClassroom')}
                    style={styles.bottomTabButton}>
                    <Image style={[styles.bottomIcon, { width: Platform.OS === 'ios' ? wp(8) : wp(7) }]} source={classFalseIcon} />
                    <Text style={{ color: COLORS.black }}> الدروس</Text>
                </Pressable>

                <Pressable
                    onPress={() => navigation.navigate('HomeScreen')}
                    style={[styles.bottomTabButton, { borderTopRightRadius: hp(3) }]}>
                    <Image style={[styles.bottomIcon]} source={homeTrueIcon} />
                    <Text style={{ color: COLORS.purple }}>الرئیسیة </Text>
                </Pressable>
            </View>

        </SafeAreaView>
    )
}
const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        alignItems: 'flex-end',
        backgroundColor: COLORS.bgscreengrey

    },
    mainContent: {
        flex: 1,
        marginTop: Platform.OS === 'ios' ? hp(13) : hp(18),
        width: '100%',

    },
    portraitHeaderView: {
        width: wp(100),
        height: Platform.OS === 'ios' ? hp(30) : hp(30),
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        position: 'absolute',
        resizeMode: 'stretch'
    },
    landscapeHeaderView: {
        width: '100%',
        height: Platform.OS === 'ios' ? hp(10) : hp(7),
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        position: 'absolute'
    },
    headerText: {
        color: COLORS.white,
        fontSize: 18,
        textAlign: 'center',
        marginTop: Platform.OS === 'ios' ? hp(6) : hp(3),
    },
    backButtonView: {
        marginLeft: wp(2),
        height: hp(10),
        marginTop: Platform.OS === 'ios' ? hp(6) : hp(2)
    },
    backButton: {

        height: hp(6),
        width: Platform.OS === 'ios' ? wp(13.2) : wp(12.5),
    },

    landscapeLogo: {
        height: hp(5),
        //marginTop: Platform.OS === 'ios' ? hp(6) : hp(2),
        width: Platform.OS === 'ios' ? wp(30.2) : wp(30.2),
        marginRight: wp(2)
    },
    portraitLogo: {
        height: hp(5),
        marginTop: Platform.OS === 'ios' ? hp(6) : hp(2),
        width: Platform.OS === 'ios' ? wp(30.2) : wp(30.2),
        marginRight: wp(2)
    },
    searchMainView: {
        height: hp(6),
        marginTop: Platform.OS === 'ios' ? hp(-5) : hp(-8),
        flexDirection: 'row',
        justifyContent: 'space-evenly'
    },
    searchSubView: {
        backgroundColor: COLORS.yellow,
        width: '27%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 15,
        flexDirection: 'row'
    },
    sliderView:{ 
        height: Platform.OS === 'ios' ? hp(20) : hp(22), 
        width: '94%', alignSelf: 'center', marginTop: hp(2), 
        borderRadius: 15
    },
    contentText:{
        color:COLORS.black,
        height:Platform.OS==='ios'?hp(5):hp(4),
        width:'98%',
        textAlign:'right',
        marginTop:hp(1),
        fontSize:15
    },
    eduTypesView:{
       // backgroundColor:'grey',
        height:hp(7),
        alignItems:'center',
        justifyContent:'space-evenly',
        flexDirection:'row'
    },
    eduTypesBtn:{
        height:'100%',
        width:'45%',
        backgroundColor:COLORS.purple,
        borderRadius:25,
        justifyContent:'center',
        alignItems:'center',
        elevation:10
    },
    bottomTabView: {
        backgroundColor: COLORS.white,
        height: hp(8),
        width: '100%',
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
        marginTop: Platform.OS === 'ios' ? hp(.5) : 0
    },
})
export default index