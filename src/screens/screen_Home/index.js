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
import CheckBox from 'react-native-vector-icons/MaterialIcons';
import ScreenIcon from 'react-native-vector-icons/SimpleLineIcons';

//Header
import homeHeader from '../../assets/Images/background/homeHeader.png'
import homeSliderPic1 from '../../assets/Images/Image/homeSliderPic1.png'
import notificationIcon from '../../assets/Images/icons/notificationIcon.png'
import landscapeLogo from '../../assets/Images/logo/landscapeIcon.png'

// Home Screen Icons
import teacherIcon from '../../assets/Images/Image/teacherIcon.png'
import onSiteTrue from '../../assets/Images/icons/onSiteTrue.png'
import onSiteFalse from '../../assets/Images/icons/onSiteFalse.png'
import courseTrueIcon from '../../assets/Images/icons/courseTrueIcon.png'
import courseFalseIcon from '../../assets/Images/icons/courseFalseIcon.png'
import universityTrueIcon from '../../assets/Images/icons/universityTrueIcon.png'
import universityFalseIcon from '../../assets/Images/icons/universityFalseIcon.png'
import generalTrueIcon from '../../assets/Images/icons/generalTrueIcon.png'
import generalFalseIcon from '../../assets/Images/icons/generalFalseIcon.png'
import locationIcon from '../../assets/Images/icons/locationIcon.png'
import starFalseIcon from '../../assets/Images/icons/starFalseIcon.png'
import starTrueIcon from '../../assets/Images/icons/starTrueIcon.png'
//import halfStarIcon1 from '../../assets/Images/icons/halfStarIcon1.png'
import halfStarIcon from '../../assets/Images/icons/halfStarIcon.png'

//BottomTab Icons 
import moreFalseIcon from '../../assets/Images/icons/moreFalseIcon.png'
import homeTrueIcon from '../../assets/Images/icons/homeTrueIcon.png'
import messagesFalseIcon from '../../assets/Images/icons/messagesFalseIcon.png'
import classFalseIcon from '../../assets/Images/icons/classFalseIcon.png'
import { TextInput } from 'react-native-gesture-handler';



const index = ({ navigation, route }) => {

    const [orientation, setorientation] = useState('');

    //EducationTypes
    const [onSite, setonSite] = useState('radio-button-checked');
    const [online, setonline] = useState('radio-button-unchecked');
    const [eduType, seteduType] = useState('onSite');

    //Education Stages
    const [course, setcourse] = useState(courseFalseIcon);
    const [university, setuniversity] = useState(universityFalseIcon);
    const [general, setgeneral] = useState(generalTrueIcon);
    const [eduStage, seteduStage] = useState('general');
    const [subjectOptionModal, setsubjectOptionModal] = useState(false)
    const [selectedSubject, setselectedSubject] = useState('المادة')
    const [rating, setrating] = useState('0')



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
    const checkEduType = (check) => {
        if (check === 'online') {
            //console.log("online");
            seteduType('online')
            setonSite('radio-button-unchecked')
            setonline('radio-button-checked')
        }
        else {
            seteduType('onSite')
            setonline('radio-button-unchecked')
            setonSite('radio-button-checked')
            // console.log("onSite");
        }
    }



    //EducationType Handling 
    const checkEduStage = (check) => {
        if (check === 'course') {
            //console.log("online");
            seteduStage('course')
            setcourse(courseTrueIcon)
            setuniversity(universityFalseIcon)
            setgeneral(generalFalseIcon)
        }
        else if (check === 'university') {
            //console.log("online");
            seteduStage('university')
            setcourse(courseFalseIcon)
            setuniversity(universityTrueIcon)
            setgeneral(generalFalseIcon)
        }
        else {
            seteduStage('general')
            setcourse(courseFalseIcon)
            setuniversity(universityFalseIcon)
            setgeneral(generalTrueIcon)
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

            <Modal
                transparent={true}
                visible={subjectOptionModal}
            >
                <View style={styles.mainModelView}>
                    <View style={styles.modalItemContainer}>
                        <Pressable
                            onPress={() => setsubjectOptionModal(false)}
                            style={styles.modalCancelBtn}>
                            <Text style={{ color: COLORS.white }}> إلغاء </Text>
                        </Pressable>
                        <View style={{ height: Platform.OS === 'android' ? '75%' : '75%', width: '100%' }}>
                            <FlatList
                                data={subjects}
                                renderItem={({ item, index }) => (
                                    <Pressable
                                        onPress={() => {
                                            setselectedSubject(item.Title)
                                            setsubjectOptionModal(false)
                                        }}
                                        style={styles.subjectsListBtn}>
                                        <Text style={styles.subjectsListText}>{item.Title}</Text>
                                    </Pressable>
                                )}
                                keyExtractor={(item) => item.id}
                            />
                        </View>
                    </View>
                </View>
            </Modal>


            <StatusBar barStyle={'light-content'} backgroundColor={COLORS.purple} />
            <ImageBackground source={homeHeader} style={orientation == 'portrait' ? styles.portraitHeaderView : styles.landscapeHeaderView}>

                <Pressable onPress={() => alert('Notification')} style={styles.backButtonView}>
                    <Image style={styles.backButton} source={notificationIcon} />
                </Pressable>


                <Image style={orientation == 'portrait' ? styles.portraitLogo : styles.landscapeLogo} source={landscapeLogo} />

            </ImageBackground>

            <View style={[styles.mainContent, { marginTop: orientation == 'portrait' ? Platform.OS === 'ios' ? hp(13) : hp(18) : Platform.OS === 'ios' ? hp(12) : hp(8) }]}>
                <View style={styles.searchMainView}>
                    <View style={styles.searchSubView}>
                        <Material name='keyboard-arrow-down' size={hp(3)} color={COLORS.white} />
                        <Text style={{ color: COLORS.white }}> فلتر </Text>
                        <MaterialCommunity name='filter' size={hp(2)} color={COLORS.white} />
                    </View>
                    <View style={[styles.searchSubView, { width: '65%', backgroundColor: COLORS.white }]}>
                        <TextInput placeholder='ابحث ھنا' placeholderTextColor={COLORS.purple} style={{ color: COLORS.purple, textAlign: 'right', width: '85%' }} />
                        <Material name='search' size={hp(3)} color={COLORS.purple} />
                    </View>
                </View>



                <ScrollView >
                    {/* Image Slider */}
                    <View style={styles.sliderView}>
                        <Image style={{ height: '100%', width: '100%', borderRadius: 15 }} source={homeSliderPic1} />
                    </View>

                    <View style={[styles.eduTypeHeadingView]}>
                        <Text style={styles.contentText}> نوع التعلیم </Text>
                    </View>


                    <View style={styles.eduTypesView}>
                        <Pressable onPress={() => checkEduType('online')} style={[styles.eduTypesBtn, { backgroundColor: eduType == 'online' ? COLORS.purple : COLORS.white }]}>
                            <CheckBox name={online} size={hp(3)} color={eduType == 'online' ? COLORS.white : COLORS.purple} />
                            <Text style={[styles.eduTypeText, { color: eduType == 'online' ? COLORS.white : COLORS.black }]}> عن بعد </Text>
                            <ScreenIcon name='screen-desktop' size={hp(3)} color={eduType == 'online' ? COLORS.white : COLORS.purple} />
                        </Pressable>

                        <Pressable onPress={() => checkEduType('onSite')} style={[styles.eduTypesBtn, { backgroundColor: eduType == 'onSite' ? COLORS.purple : COLORS.white }]}>
                            <CheckBox name={onSite} size={hp(3)} color={eduType == 'onSite' ? COLORS.white : COLORS.purple} />
                            <Text style={[styles.eduTypeText, { color: eduType == 'onSite' ? COLORS.white : COLORS.black }]}> حضوری </Text>
                            <View style={{ height: hp(3), width: wp(6) }}>
                                <Image style={{ height: '100%', width: '100%' }} source={eduType == 'onSite' ? onSiteFalse : onSiteTrue} />
                            </View>

                        </Pressable>

                    </View>

                    <View style={[styles.contentTextView]}>
                        <Text style={styles.contentText}> المسارالتعلیمی</Text>
                    </View>

                    <View style={styles.eduStagesView}>
                        <Pressable onPress={() => checkEduStage('course')} style={[styles.eduStagesBtn, { backgroundColor: eduStage == 'course' ? COLORS.purple : COLORS.white }]}>
                            <View style={{ height: hp(5), width: wp(10) }}>
                                <Image style={{ height: '100%', width: '100%' }} source={course} />
                            </View>
                            <Text style={{ color: eduStage == 'course' ? COLORS.white : COLORS.black }}> دورات </Text>

                            {eduStage == 'course' &&
                                <View style={styles.eduStagesCheckBtn}>
                                    <Material name='check-circle' size={hp(2.5)} color={COLORS.purple} />
                                </View>
                            }
                        </Pressable>

                        <Pressable onPress={() => checkEduStage('university')} style={[styles.eduStagesBtn, { backgroundColor: eduStage == 'university' ? COLORS.purple : COLORS.white }]}>
                            <View style={{ height: hp(5), width: wp(10) }}>
                                <Image style={{ height: '100%', width: '100%' }} source={university} />
                            </View>
                            <Text style={{ color: eduStage == 'university' ? COLORS.white : COLORS.black }}> جامعی </Text>

                            {eduStage == 'university' &&
                                <View style={styles.eduStagesCheckBtn}>
                                    <Material name='check-circle' size={hp(2.5)} color={COLORS.purple} />
                                </View>
                            }
                        </Pressable>

                        <Pressable onPress={() => checkEduStage('general')} style={[styles.eduStagesBtn, { backgroundColor: eduStage == 'general' ? COLORS.purple : COLORS.white }]}>
                            <View style={{ height: hp(5), width: wp(10) }}>
                                <Image style={{ height: '100%', width: '100%' }} source={general} />
                            </View>
                            <Text style={{ color: eduStage == 'general' ? COLORS.white : COLORS.black }}> عام </Text>
                            {eduStage == 'general' &&
                                <View style={styles.eduStagesCheckBtn}>
                                    <Material name='check-circle' size={hp(2.5)} color={COLORS.purple} />
                                </View>
                            }
                        </Pressable>
                    </View>

                    <View style={styles.locationMainView}>
                        <Pressable onPress={() => alert("الموقع")} style={[styles.locationBtn]}>
                            <View style={{ height: Platform.OS === 'android' ? hp(2.2) : hp(2.1), width: wp(3) }}>
                                <Image style={{ height: '100%', width: '100%' }} source={locationIcon} />
                            </View>
                            <Text style={{ color: COLORS.black, width: '55%', textAlign: 'right' }}> الموقع </Text>
                        </Pressable>

                        <Pressable onPress={() => setsubjectOptionModal(true)} style={styles.locationBtn}>
                            <Material name='keyboard-arrow-down' size={hp(3)} color={COLORS.purple} />
                            <Text style={{ color: COLORS.black, width: '55%', textAlign: 'right' }}> {selectedSubject} </Text>
                        </Pressable>

                    </View>

                    <View style={styles.searchTeacherBtnView}>
                        <Pressable onPress={() => navigation.navigate('SearchTeacher')} style={[styles.locationBtn, { backgroundColor: COLORS.purple }]}>
                            <Text style={{ color: COLORS.white }}> ابحث عن معلمک </Text>
                        </Pressable>
                    </View>
                    <View style={[styles.contentTextView, { backgroundColor: COLORS.white, height: hp(6), marginTop: hp(-.5) }]}>
                        <Text style={styles.contentText}> افضل المعلمین</Text>
                    </View>
                    <View style={{ height: Platform.OS === 'android' ? hp(21) : hp(22) }}>


                        <FlatList
                            data={teacherData}
                            horizontal={true}
                            renderItem={({ item, index }) => (
                                <View style={styles.teacherInfoSubView}>
                                    <View style={{ height: hp(7), width: wp(14) }}>
                                        <Image style={{ height: '100%', width: '100%' }} source={teacherIcon} />
                                    </View>
                                    <Text style={{ color: COLORS.black, textAlign: 'center' }}>{item.name}</Text>

                                    <Pressable
                                        // onPress={()=>ratingStar(item.stars)}
                                        style={{ flexDirection: 'row' }}>
                                        <View style={{ height: hp(3), width: wp(6), marginRight: wp(-1) }}>
                                            <MaterialCommunity name={'star'} size={hp(2.5)} color={COLORS.yellow} />
                                        </View>
                                        <View style={{ height: hp(3), width: wp(6), marginRight: wp(-1) }}>
                                            <MaterialCommunity name={'star'} size={hp(2.5)} color={COLORS.yellow} />
                                        </View>
                                        <View style={{ height: hp(3), width: wp(6), marginRight: wp(-1) }}>
                                            <MaterialCommunity name={'star-half-full'} size={hp(2.5)} color={COLORS.yellow} />
                                        </View>
                                        <View style={{ height: hp(3), width: wp(6), marginRight: wp(-1) }}>
                                            <MaterialCommunity name={'star-outline'} size={hp(2.5)} color={COLORS.yellow} />
                                        </View>
                                        <View style={{ height: hp(3), width: wp(6), marginRight: wp(-1) }}>
                                            <MaterialCommunity name={'star-outline'} size={hp(2.5)} color={COLORS.yellow} />
                                        </View>
                                    </Pressable>
                                    <Text style={{ color: COLORS.purple, textAlign: 'center' }}>{item.status}</Text>
                                </View>

                            )}
                            keyExtractor={(item) => item.id}
                        />


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
        height: hp(30),
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
    sliderView: {
        height: Platform.OS === 'ios' ? hp(20) : hp(22),
        width: '94%',
        alignSelf: 'center',
        marginTop: hp(2),
        borderRadius: 15
    },
    eduTypeHeadingView: {
        width: '100%',
        marginTop: hp(1),
        height: hp(6),
        justifyContent: 'center',
        backgroundColor: COLORS.ashewhite,
    },
    contentTextView: {
        width: '100%',
        marginTop: hp(1),
        justifyContent: 'center',
        backgroundColor: COLORS.white,
        elevation: 5,
        height: hp(6),
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.35,
        shadowRadius: 2.62,
    },
    contentText: {
        color: COLORS.black,
        textAlign: 'right',
        fontSize: 15,
        marginRight: wp(3)
    },

    eduTypesView: {
        height: hp(8),
        alignItems: 'center',
        justifyContent: 'space-evenly',
        flexDirection: 'row'
    },

    eduTypesBtn: {
        height: hp(6),
        width: '45%',
        backgroundColor: COLORS.purple,
        flexDirection: 'row',
        borderRadius: 25,
        justifyContent: 'space-evenly',
        alignItems: 'center',
        elevation: 20,
        shadowColor: '#000',
        shadowOffset: {
            width: 2,
            height: 3,
        },
        shadowOpacity: 0.35,
        shadowRadius: 9.62,
    },
    eduTypeText: {
        color: COLORS.black,
        width: '40%',
        textAlign: 'right',
        marginRight: wp(-3),
        fontSize: hp(2),
        marginTop: Platform.OS === 'ios' ? hp(-1) : 0
    },

    eduStagesView: {
        height: hp(17),
        alignItems: 'center',
        justifyContent: 'space-evenly',
        flexDirection: 'row',
    },
    eduStagesBtn: {
        height: hp(13),
        width: '30%',
        backgroundColor: COLORS.purple,
        borderRadius: 25,

        justifyContent: 'center',
        alignItems: 'center',
        elevation: 20,
        shadowColor: '#000',
        shadowOffset: {
            width: 2,
            height: 3,
        },
        shadowOpacity: 0.35,
        shadowRadius: 9.62,
    },
    eduStagesCheckBtn: {
        borderWidth: .1,
        borderBottomColor: COLORS.white,
        backgroundColor: COLORS.white,
        borderRadius: 20,

        position: 'absolute',
        top: hp(11.5)
    },
    locationMainView: {
        height: hp(6),
        alignItems: 'center',
        justifyContent: 'space-evenly',
        flexDirection: 'row'
    },
    locationBtn: {
        height: hp(6),
        width: '45%',
        backgroundColor: COLORS.white,
        borderRadius: 15,
        justifyContent: 'space-around',
        flexDirection: 'row',
        alignItems: 'center',
        elevation: 20,
        shadowColor: '#000',
        shadowOffset: {
            width: 2,
            height: 3,
        },
        shadowOpacity: 0.35,
        shadowRadius: 9.62,
    },
    searchTeacherBtnView: {
        marginTop: hp(2),
        marginBottom: hp(2),
        height: hp(6),
        alignItems: 'center',
        justifyContent: 'space-evenly',
        flexDirection: 'row'
    },
    teacherInfoSubView: {
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        height: hp(18),
        width: wp(31),
        marginTop: hp(2),
        marginLeft: wp(1),
        marginRight: wp(1),
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
    mainModelView: {
        flex: 1,
        width: wp(100),
        height: hp(100),
        backgroundColor: 'rgba(0,0,0,0.3)',
        justifyContent: 'flex-end',
        alignItems: 'flex-end',


    },
    modalItemContainer: {
        width: wp(100),
        height: hp(40),
        backgroundColor: COLORS.ashewhite,
        borderTopLeftRadius: 50,
        borderTopRightRadius: 50,
        paddingVertical: 15,
        justifyContent: 'space-evenly',
        alignItems: 'center'
    },
    modalCancelBtn: {
        height: hp(5),
        width: '40%',
        backgroundColor: COLORS.purple,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10
    },
    subjectsListBtn: {
        width: '70%',
        height: hp(5),
        borderBottomWidth: 1,
        borderColor: COLORS.lightgrey,
        justifyContent: 'center',
        alignSelf: 'center'
    },
    subjectsListText: {
        color: COLORS.black,
        textAlign: 'center',

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