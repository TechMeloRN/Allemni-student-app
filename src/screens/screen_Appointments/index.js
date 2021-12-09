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

import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp
} from 'react-native-responsive-screen';


import Material from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunity from 'react-native-vector-icons/MaterialCommunityIcons';
import OnlineIcon from 'react-native-vector-icons/SimpleLineIcons';

// Custom Components imports 

import { COLORS } from '../../assets/Styles/color.js'
import headerBackground from '../../assets/Images/background/headerBackground.png'
import backBtnIcon from '../../assets/Images/icons/btnIcon.png'
import notificationIcon from '../../assets/Images/icons/notificationIcon.png'

//Screens Icons
import landscapeLogo from '../../assets/Images/logo/landscapeIcon.png'
import teacherIcon from '../../assets/Images/Image/teacherIcon.png'
import teacherPic1 from '../../assets/Images/Image/teacherPic1.png'
import teacherPic2 from '../../assets/Images/Image/teacherPic2.png'
import backArrowLeft from '../../assets/Images/icons/backArrowLeft.png'
import backArrowRight from '../../assets/Images/icons/backArrowRight.png'
import onSiteTrue from '../../assets/Images/icons/onSiteTrue.png'
//Tab Icons 
import moreTrueIcon from '../../assets/Images/icons/moreTrueIcon.png'
import homeFalseIcon from '../../assets/Images/icons/homeFalseIcon.png'
import messagesFalseIcon from '../../assets/Images/icons/messagesFalseIcon.png'
import classFalseIcon from '../../assets/Images/icons/classFalseIcon.png'

const index = ({ navigation }) => {

    const [orientation, setorientation] = useState('');


    const [teacherData, setteacherData] = useState([
        {
            id: 1,
            name: 'عبید عبداللہ المدوانی',
            image: teacherIcon,
            Title: 'جبرواحصائ',
            courceStatus: 'online',
            appointmentStatus: 'confirm',
            stars: 0,

            date: '8 June 2021',
            day: 'الاریعائ',
            time: ' 1:00 م - 11:00 ص '


        },
        {
            id: 2,
            name: 'رشاد محمود الحلوانی',
            image: teacherPic1,
            Title: 'ریاضیات',
            courceStatus: 'onsite',
            appointmentStatus: 'pending',
            stars: 1.5,
            date: '29 June 2021 ',
            day: 'الاریعائ',
            time: ' 1:00 م - 11:00 ص '



        },
        {
            id: 3,
            name: 'عبید عبداللہ المدوانی',
            image: teacherPic2,
            Title: 'جبرواحصائ',
            courceStatus: 'online',
            appointmentStatus: 'none',
            stars: 2.5,
            date: '13 June 2021',
            day: 'الاریعائ',
            time: ' 1:00 م - 11:00 ص '



        },
        {
            id: 4,
            name: 'رشاد محمود الحلوانی',
            image: teacherIcon,
            Title: 'ریاضیات متقدمۃ',
            courceStatus: 'onSite',
            appointmentStatus: 'confirm',
            stars: 1,
            date: '10 June 2021',
            day: 'الاریعائ',
            time: ' 1:00 م - 11:00 ص '


        }
    ]);

    useEffect(() => {
        // ShowTeachers();
        getOrientation()
        Dimensions.addEventListener('change', getOrientation);


    }, []);

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
            <StatusBar barStyle={'light-content'} backgroundColor={COLORS.purple} />

            {/* Header code*/}
            <ImageBackground source={headerBackground} style={orientation == 'portrait' ? styles.portraitHeaderView : styles.landscapeHeaderView}>

                <Pressable onPress={() => navigation.goBack()} style={styles.backButtonView}>
                    <Image style={styles.backButton} source={backBtnIcon} />
                </Pressable>

                <Pressable onPress={() => alert('Notification')} style={styles.backButtonView}>
                    <Image style={styles.backButton} source={notificationIcon} />
                </Pressable>

                <Text style={[styles.headerText, { width: orientation == 'portrait' ? wp(30) : '60%' }]}> المواعید </Text>

                <Image style={orientation == 'portrait' ? styles.portraitLogo : styles.landscapeLogo} source={landscapeLogo} />

            </ImageBackground>

            <View style={styles.mainContent}>

                {/* Date View */}
                <View style={styles.dataView}>
                    <Pressable onPress={() => alert("Back Date")} style={{ height: hp(4), width: wp(8) }}>
                        <Image style={{ height: '100%', width: '100%' }} source={backArrowLeft} />
                    </Pressable>

                    <Text style={styles.dataViewText}>  7 يونيو2021٫ الي 13 يونيو2021٫ </Text>

                    <Pressable onPress={() => alert("Forward Date")} style={{ height: hp(4), width: wp(8) }}>
                        <Image style={{ height: '100%', width: '100%' }} source={backArrowRight} />
                    </Pressable>

                </View>

                {/* Teacher Info   */}
                <View style={{ flex: 1 }}>
                    <FlatList
                        data={teacherData}
                        renderItem={({ item, index }) => (
                            <Pressable onPress={()=>navigation.navigate("BookingScreen")} style={styles.teacherInfoView}>
                                <View style={styles.teacherInfoSubView}>
                                    <View style={styles.StatusView}>

                                        {item.appointmentStatus === 'confirm' ?
                                            <View style={styles.eduStagesCheckBtn}>
                                                <Material name='check-circle' size={hp(3)} color={COLORS.purple} />
                                            </View>
                                            : item.appointmentStatus === 'pending' ?
                                                <View style={styles.eduStagesCheckBtn}>
                                                    <MaterialCommunity name='alert-circle' size={hp(3)} color={COLORS.purple} />
                                                </View>
                                                :
                                                <View></View>
                                        }

                                        {item.courceStatus === 'online' ?
                                            <View style={styles.eduStagesCheckBtn}>
                                                <OnlineIcon name='screen-desktop' size={hp(3)} color={COLORS.purple} />
                                            </View>
                                            :
                                            <View style={{ height: hp(3), width: wp(6), marginTop: hp(1) }}>
                                                <Image style={{ height: '100%', width: '100%' }} source={onSiteTrue} />
                                            </View>
                                        }
                                    </View>

                                    <View style={styles.teacherBasicInfo}>
                                        <Text style={styles.teacherNameText}>{item.name}</Text>

                                        <Pressable style={{ flexDirection: 'row', marginRight: wp(4) }}>
                                            <View style={styles.starsView}>
                                                <MaterialCommunity name={'star'} size={hp(2.5)} color={COLORS.yellow} />
                                            </View>
                                            <View style={styles.starsView}>
                                                <MaterialCommunity name={'star'} size={hp(2.5)} color={COLORS.yellow} />
                                            </View>
                                            <View style={styles.starsView}>
                                                <MaterialCommunity name={'star-half-full'} size={hp(2.5)} color={COLORS.yellow} />
                                            </View>
                                            <View style={styles.starsView}>
                                                <MaterialCommunity name={'star-outline'} size={hp(2.5)} color={COLORS.yellow} />
                                            </View>
                                            <View style={styles.starsView}>
                                                <MaterialCommunity name={'star-outline'} size={hp(2.5)} color={COLORS.yellow} />
                                            </View>
                                        </Pressable>
                                        <Text style={[styles.teacherNameText, { color: COLORS.purple }]}>{item.Title}</Text>
                                    </View>
                                    <View style={styles.teacherImageView}>
                                        <View style={{ height: hp(12), width: wp(24) }}>
                                            <Image style={{ height: '100%', width: '100%' }} source={item.image} />
                                        </View>
                                    </View>
                                </View>

                                <View style={styles.teacherDetailView}>
                                    <Text style={styles.teacherDetailText}> {item.day} {item.date}  </Text>
                                    <Text style={[styles.teacherDetailText, { color: COLORS.purple }]}> {item.time}   </Text>
                                </View>
                            </Pressable>
                        )}
                        keyExtractor={(item) => item.id}
                    />
                </View>

            </View>

            {/* Bottom Navigation Tab */}
            <View style={styles.bottomTabView}>
                <Pressable
                    onPress={() => navigation.navigate("MenuScreen")}
                    style={[styles.bottomTabButton, { borderTopLeftRadius: hp(3) }]
                    }>
                    <Image style={[styles.bottomIcon, { height: hp(1), marginTop: hp(2) }]} source={moreTrueIcon} />
                    <Text style={[styles.menuButtonText, { color: COLORS.purple }]}> المزید</Text>
                </Pressable>

                <Pressable
                    onPress={() => navigation.navigate('ChatTeacherList')}
                    style={styles.bottomTabButton}>
                    <Image style={[styles.bottomIcon, { height: hp(3) }]} source={messagesFalseIcon} />
                    <Text style={[styles.menuButtonText]}> الرسائل</Text>
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
        backgroundColor: COLORS.ashewhite

    },
    mainContent: {
        flex: 1,
        marginTop: Platform.OS === 'ios' ? hp(8) : hp(10),

    },
    dataView: {
        height: hp(6),
        width: '95%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        alignSelf: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#D0D0D0'
    },
    dataViewText: {
        color: COLORS.black,
        fontFamily: 'Cairo-Regular',
        fontSize: Platform.OS === 'android' ? hp(2) : hp(1.9)
    },
    portraitHeaderView: {
        width: '100%',
        height: Platform.OS === 'android' ? hp(10) : hp(13),
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        position: 'absolute',
        resizeMode: 'stretch'
    },
    landscapeHeaderView: {
        width: '110%',
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
        fontFamily: 'Cairo-Regular'
    },
    teacherInfoView: {
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        width: '95%',
        marginVertical: hp(.5),
        marginHorizontal: wp(1),
        borderRadius: 15,
        elevation: 20,
        shadowColor: '#000',
        shadowOffset: {
            width: 2,
            height: 3,
        },
        shadowOpacity: 0.35,
        shadowRadius: 9.62,
    },
    teacherInfoSubView: {
        height: hp(14),
        width: '95%',
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: COLORS.ashewhite
    },
    StatusView: {
        width: '10%',
        borderTopLeftRadius: 20,
        justifyContent: 'center',
        alignItems: 'center'
    },
    eduStagesCheckBtn: {
        backgroundColor: COLORS.white,
        marginTop: hp(1),

    },

    teacherBasicInfo: {
        width: '60%',
        justifyContent: 'center',
        alignItems: 'flex-end'
    },
    teacherNameText: {
        color: COLORS.black,
        textAlign: 'center',
        marginRight: wp(4),
        fontFamily: 'Cairo-Regular'
    },
    starsView: {
        height: hp(3),
        width: wp(6),
        marginRight: wp(-1)
    },
    teacherImageView: {
        width: '30%',
        borderTopRightRadius: 20,
        justifyContent: 'center',
        alignItems: 'center'
    },
    teacherDetailView: {
        height: hp(7),
        width: '90%',
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        justifyContent: 'center',
        alignItems: 'flex-end',
    },
    teacherDetailText: {
        textAlign: 'right',
        color: COLORS.black,
        fontFamily: 'Cairo-Regular'
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
        width: wp(30.2),
        marginRight: wp(2)
    },
    portraitLogo: {
        height: hp(5),
        marginTop: Platform.OS === 'ios' ? hp(6) : hp(2),
        width: wp(30.2),
        marginRight: wp(2)
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
    menuButtonText: {
        color: COLORS.black,
        fontFamily: 'Cairo-Regular'
    },

})
export default index