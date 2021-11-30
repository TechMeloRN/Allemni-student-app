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
    FlatList,
    Modal,
} from 'react-native';

import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp
} from 'react-native-responsive-screen';

import { COLORS } from '../../assets/Styles/color.js'


import Material from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunity from 'react-native-vector-icons/MaterialCommunityIcons';

//Header
import homeHeader from '../../assets/Images/background/homeHeader.png'
import notificationIcon from '../../assets/Images/icons/notificationIcon.png'
import backButton from '../../assets/Images/icons/btnIcon.png'
import landscapeLogo from '../../assets/Images/logo/landscapeIcon.png'

// Home Screen Icons
import teacherIcon from '../../assets/Images/Image/teacherIcon.png'
import courseTrueIcon from '../../assets/Images/icons/courseTrueIcon.png'
import courseFalseIcon from '../../assets/Images/icons/courseFalseIcon.png'
import universityTrueIcon from '../../assets/Images/icons/universityTrueIcon.png'
import universityFalseIcon from '../../assets/Images/icons/universityFalseIcon.png'
import generalTrueIcon from '../../assets/Images/icons/generalTrueIcon.png'
import generalFalseIcon from '../../assets/Images/icons/generalFalseIcon.png'
import starFalseIcon from '../../assets/Images/icons/starFalseIcon.png'
import starTrueIcon from '../../assets/Images/icons/starTrueIcon.png'
import halfStarIcon from '../../assets/Images/icons/halfStarIcon.png'

//BottomTab Icons 
import moreFalseIcon from '../../assets/Images/icons/moreFalseIcon.png'
import homeTrueIcon from '../../assets/Images/icons/homeTrueIcon.png'
import messagesFalseIcon from '../../assets/Images/icons/messagesFalseIcon.png'
import classFalseIcon from '../../assets/Images/icons/classFalseIcon.png'
import { TextInput } from 'react-native-gesture-handler';



const index = ({ navigation, route }) => {

    const [orientation, setorientation] = useState('');
    const [rating, setrating] = useState(COLORS.white);
    const [expertise, setexpertise] = useState(COLORS.white);
    const [personalInfo, setpersonalInfo] = useState(COLORS.purple)
    const [selectedMenu ,setselectedMenu] = useState('personalInfo')



    const [subjects, setsubjects] = useState([
        {
            id: 1,
            Title: 'Introduction to Computer'
        },
        {
            id: 2,
            Title: 'System Programing'
        },
        {
            id: 3,
            Title: 'Virtual Programing'
        },
        {
            id: 4,
            Title: 'Programing Fundamental'
        },
        {
            id: 5,
            Title: 'Object oriented Programing'
        },
        {
            id: 6,
            Title: 'Modren Programing Language'
        },
        {
            id: 7,
            Title: 'Software Engneering'
        }

    ])
    const [teacherData, setteacherData] = useState([
        {
            id: 1,
            name: 'عبید عبداللہ المدوانی',
            image: teacherIcon,
            status: 'مدرس ابتدائی',
            stars: 0
        },
        {
            id: 2,
            name: 'رشاد محمود الحلوانی',
            image: teacherIcon,
            status: 'مقتش عام',
            stars: 1.5
        },
        {
            id: 3,
            name: 'عبید عبداللہ المدوانی',
            image: teacherIcon,
            status: 'مدرس ابتدائی',
            stars: 2.5
        },
        {
            id: 4,
            name: 'رشاد محمود الحلوانی',
            image: teacherIcon,
            status: 'مقتش عام',
            stars: 1
        }
    ]);

    useEffect(() => {
        getOrientation()
        Dimensions.addEventListener('change', getOrientation);
    }, []);





    //EducationType Handling 
    const checkMenu = (check) => {
        if (check == 'personalInfo') {
            //console.log("online");
            setselectedMenu('personalInfo')
            setpersonalInfo(COLORS.purple)
            setexpertise(COLORS.white)
            setrating(COLORS.white)
        }
        else if (check == 'expertise') {
            //console.log("online");
            setselectedMenu('expertise')
            setpersonalInfo(COLORS.white)
            setexpertise(COLORS.purple)
            setrating(COLORS.white)
        }
        else {
            setselectedMenu('rating')
            setpersonalInfo(COLORS.white)
            setexpertise(COLORS.white)
            setrating(COLORS.purple)
        }
    }

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

            {/* ////////////////////////////////////////////
            ///////// Subjects List Model ////////////////
            //////////////////////////////////////////// */}
            <StatusBar barStyle={'light-content'} backgroundColor={COLORS.purple} />
            <ImageBackground source={homeHeader} style={orientation == 'portrait' ? styles.portraitHeaderView : styles.landscapeHeaderView}>

                <Pressable onPress={() => navigation.goBack()} style={styles.backButtonView}>
                    <Image style={styles.backButton} source={backButton} />
                </Pressable>

                <Pressable onPress={() => alert('Notification')} style={styles.backButtonView}>
                    <Image style={styles.backButton} source={notificationIcon} />
                </Pressable>

                <Text style={[styles.headerText, { width: orientation == 'portrait' ? wp(30) : '60%' }]}> تفاصیل المعلم </Text>

                <Image style={orientation == 'portrait' ? styles.portraitLogo : styles.landscapeLogo} source={landscapeLogo} />

            </ImageBackground>

            <View style={[styles.mainContent, { marginTop: orientation == 'portrait' ? Platform.OS === 'ios' ? hp(6) : hp(6) : Platform.OS === 'ios' ? hp(2) : hp(8) }]}>

                {/* Teacher Detail  */}
                <View style={styles.teacherInfoSubView}>
                    <View style={styles.courseRateView}>
                        <View style={styles.courseRateSubView}>
                            <Text style={{ color: COLORS.purple }}> {'150' + " " + "ر۔س"}</Text>
                        </View>
                    </View>
                    <View style={styles.teacherBasicInfo}>
                        <Text style={styles.teacherNameText}> سعود ابراھیم حمندی </Text>

                        <Pressable onPress={() => ratingStar(item.stars)} style={{ flexDirection: 'row' }}>
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
                        <Text style={[styles.teacherNameText, { color: COLORS.white }]}> ریاضیات الصف الاول </Text>
                    </View>
                    <View style={styles.teacherImageView}>
                        <View style={{ height: hp(10), width: wp(22) }}>
                            <Image style={{ height: '100%', width: '100%' }} source={teacherIcon} />
                        </View>
                    </View>
                </View>

                <Pressable style={styles.bookButton}>
                    <Text style={{ color: COLORS.white }}> احجزالآن </Text>
                </Pressable>

                <View style={{ flex: 1, marginTop: hp(3) }}>
                    <View style={styles.menuView}>
                        <Pressable onPress={()=>checkMenu("rating")} style={[styles.menuElements, { backgroundColor: rating,borderRightWidth:selectedMenu=='rating'?wp(1.5):0,borderLeftWidth:selectedMenu=='rating'?wp(1.5):0}]}>
                            <Text style={{ color:selectedMenu=='rating'?COLORS.white:COLORS.black }}> التقییمات</Text>
                        </Pressable>

                        <Pressable onPress={()=>checkMenu("expertise")} style={[styles.menuElements, { backgroundColor: expertise,borderRightWidth:selectedMenu=='expertise'?wp(1.5):0,borderLeftWidth:selectedMenu=='expertise'?wp(1.5):0}]}>
                            <Text style={{ color: selectedMenu=='expertise'?COLORS.white:COLORS.black }}> الخبرات</Text>
                        </Pressable>

                        <Pressable onPress={()=>checkMenu("personalInfo")} style={[styles.menuElements, { backgroundColor: personalInfo,borderRightWidth:selectedMenu=='personalInfo'?wp(1.5):0,borderLeftWidth:selectedMenu=='personalInfo'?wp(1.5):0 }]}>
                            <Text style={{ color: selectedMenu=='personalInfo'?COLORS.white:COLORS.black }}> الملف الشخصي</Text>
                        </Pressable>
                    </View>


                </View>
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
                    <Image style={[styles.bottomIcon, { width: Platform.OS === 'ios' ? wp(8) : wp(7), height: Platform.OS === 'ios' ? hp(4.5) : hp(4), marginTop: hp(1) }]} source={classFalseIcon} />
                    <Text style={{ color: COLORS.black, marginTop: Platform.OS === 'ios' ? hp(-1) : 0 }}> الدروس</Text>
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
        backgroundColor: COLORS.ashewhite

    },
    mainContent: {
        flex: 1,
        marginTop: Platform.OS === 'ios' ? hp(13) : hp(18),
        width: '100%',

    },
    portraitHeaderView: {
        width: wp(100),
        height: hp(36),
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
        width: wp(30.2),
        marginRight: wp(2)
    },
    portraitLogo: {
        height: hp(5),
        marginTop: Platform.OS === 'ios' ? hp(6) : hp(2),
        width: wp(30.2),
        marginRight: wp(2)
    },
    teacherInfoSubView: {
        height: hp(15),
        width: '95%',
        flexDirection: 'row',
    },
    courseRateView: {
        width: '30%',
        borderTopLeftRadius: 20,
        justifyContent: 'center',
        alignItems: 'center'
    },
    courseRateSubView: {
        height: hp(4.8),
        width: '80%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#eee',
        borderRadius: 20
    },
    teacherBasicInfo: {
        width: '45%',
        justifyContent: 'center',
        alignItems: 'flex-end'
    },
    teacherNameText: {
        color: COLORS.white,
        textAlign: 'center',
        //marginRight: wp(4) 
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
        height: hp(10),
        width: '90%',
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        justifyContent: 'center',
        alignItems: 'flex-end',
    },
    teacherDetailText: {
        textAlign: 'right',
        color: COLORS.black
    },
    bookButton: {
        backgroundColor: COLORS.yellow,
        width: '60%', height: hp(5),
        alignSelf: 'center',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: wp(18)
    },
    menuView: {
        flexDirection: 'row',
        backgroundColor: COLORS.ashewhite,
        width: '100%',
        height: hp(6),
        justifyContent: 'space-between'
    },
    menuElements: {
        width: '32%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: COLORS.white,
        elevation: 20,
        shadowColor: '#000',
        shadowOffset: {
            width: 2,
            height: 3,
        },
        shadowOpacity: 0.35,
        shadowRadius: 2.62,
        borderColor:COLORS.yellow
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