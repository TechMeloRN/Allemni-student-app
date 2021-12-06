import React, { useState, useEffect } from 'react';
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
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import { COLORS } from '../../assets/Styles/color.js';

import Material from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunity from 'react-native-vector-icons/MaterialCommunityIcons';

//Header
import homeHeader from '../../assets/Images/background/homeHeader.png';
import notificationIcon from '../../assets/Images/icons/notificationIcon.png';
import backButton from '../../assets/Images/icons/btnIcon.png';
import landscapeLogo from '../../assets/Images/logo/landscapeIcon.png';

// Home Screen Icons
import teacherIcon from '../../assets/Images/Image/teacherIcon.png';
import qualificationIcon from '../../assets/Images/icons/qualificationIcon.png';
import workHistoryIcon from '../../assets/Images/icons/workHistoryIcon.png';
import yearOfExpIcon from '../../assets/Images/icons/yearOfExpIcon.png';
import courseFalseIcon from '../../assets/Images/icons/courseFalseIcon.png';
import blurRectangle from '../../assets/Images/background/blurRectangle.png';
//BottomTab Icons
import moreFalseIcon from '../../assets/Images/icons/moreFalseIcon.png';
import homeTrueIcon from '../../assets/Images/icons/homeTrueIcon.png';
import messagesFalseIcon from '../../assets/Images/icons/messagesFalseIcon.png';
import classFalseIcon from '../../assets/Images/icons/classFalseIcon.png';
import { TextInput } from 'react-native-gesture-handler';

const index = ({ navigation, route }) => {
    const [orientation, setorientation] = useState('');
    const [rating, setrating] = useState(COLORS.white);
    const [expertise, setexpertise] = useState(COLORS.white);
    const [personalInfo, setpersonalInfo] = useState(COLORS.purple);
    const [selectedMenu, setselectedMenu] = useState('personalInfo');

    const [qualification, setqualification] = useState(false);
    const [course, setcourse] = useState(false);
    const [yearOfExp, setyearOfExp] = useState(false);
    const [workHistory, setworkHistory] = useState(false);
    const [level, setlevel] = useState(false);
    const [detail, setdetails] = useState('الأستاذ رشاد مدرس تاريخ وجغرافيا دو خبرة تزيد على العشرين عامافي المرحلتين الابتدائية والإعدادية في أكثر من مدرسة على مستوى المملكة والبحرين والكويت');

    const [teacherData, setteacherData] = useState([
        {
            id: 1,
            name: 'عبید عبداللہ المدوانی',
            image: teacherIcon,
            comment: 'ممتاز',
            stars: 0,
            time: '2 month ago'
        },
        {
            id: 2,
            name: 'رشاد محمود الحلوانی',
            image: teacherIcon,
            comment: 'أفضل مدرس جغرافيا',
            stars: 1.5,
            time: '3 month ago'
        },
        {
            id: 3,
            name: 'عبید عبداللہ المدوانی',
            image: teacherIcon,
            comment: 'أفضل مدرس رياضيات',
            stars: 2.5,
            time: '6 month ago'
        },
        {
            id: 4,
            name: 'رشاد محمود الحلوانی',
            image: teacherIcon,
            comment: 'مدرس الرياضيات العظيم',
            stars: 1,
            time: '4 month ago'
        },
    ]);



    useEffect(() => {
        getOrientation();

        Dimensions.addEventListener('change', getOrientation);
    }, []);

    //Teacher Menu Handling
    const checkMenu = check => {
        if (check == 'personalInfo') {
            setselectedMenu('personalInfo');
            setpersonalInfo(COLORS.purple);
            setexpertise(COLORS.white);
            setrating(COLORS.white);
        } else if (check == 'expertise') {
            setselectedMenu('expertise');
            setpersonalInfo(COLORS.white);
            setexpertise(COLORS.purple);
            setrating(COLORS.white);
        } else {
            setselectedMenu('rating');
            setpersonalInfo(COLORS.white);
            setexpertise(COLORS.white);
            setrating(COLORS.purple);
        }
    };

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
            <ImageBackground
                source={homeHeader}
                style={
                    orientation == 'portrait'
                        ? styles.portraitHeaderView
                        : styles.landscapeHeaderView
                }>
                <Pressable
                    onPress={() => navigation.goBack()}
                    style={styles.backButtonView}>
                    <Image style={styles.backButton} source={backButton} />
                </Pressable>

                <Pressable
                    onPress={() => alert('Notification')}
                    style={styles.backButtonView}>
                    <Image style={styles.backButton} source={notificationIcon} />
                </Pressable>

                <Text
                    style={[
                        styles.headerText,
                        { width: orientation == 'portrait' ? wp(30) : '60%' },
                    ]}>
                    {' '}
                    تفاصیل المعلم{' '}
                </Text>

                <Image
                    style={
                        orientation == 'portrait'
                            ? styles.portraitLogo
                            : styles.landscapeLogo
                    }
                    source={landscapeLogo}
                />
            </ImageBackground>

            <View
                style={[
                    styles.mainContent,
                    {
                        marginTop:
                            orientation == 'portrait'
                                ? Platform.OS === 'ios'
                                    ? hp(6)
                                    : hp(6)
                                : Platform.OS === 'ios'
                                    ? hp(2)
                                    : hp(8),
                    },
                ]}>
                {/* Teacher Detail  */}
                <View style={[styles.teacherInfoSubView, { height: hp(15), marginTop: Platform.OS === 'android' ? hp(1) : 0 }]}>
                    <View style={styles.courseRateView}>
                        <ImageBackground
                            source={blurRectangle}
                            style={styles.courseRateSubView}>
                            <Text style={{ color: COLORS.white }}> {'150' + ' ' + 'ر۔س'}</Text>
                        </ImageBackground>
                    </View>
                    <View style={styles.teacherBasicInfo}>
                        <Text style={styles.teacherNameText}> سعود ابراھیم حمندی </Text>

                        <Pressable
                            onPress={() => ratingStar(item.stars)}
                            style={{ flexDirection: 'row' }}>
                            <View style={styles.starsView}>
                                <MaterialCommunity
                                    name={'star'}
                                    size={hp(2.5)}
                                    color={COLORS.yellow}
                                />
                            </View>
                            <View style={styles.starsView}>
                                <MaterialCommunity
                                    name={'star'}
                                    size={hp(2.5)}
                                    color={COLORS.yellow}
                                />
                            </View>
                            <View style={styles.starsView}>
                                <MaterialCommunity
                                    name={'star-half-full'}
                                    size={hp(2.5)}
                                    color={COLORS.yellow}
                                />
                            </View>
                            <View style={styles.starsView}>
                                <MaterialCommunity
                                    name={'star-outline'}
                                    size={hp(2.5)}
                                    color={COLORS.yellow}
                                />
                            </View>
                            <View style={styles.starsView}>
                                <MaterialCommunity
                                    name={'star-outline'}
                                    size={hp(2.5)}
                                    color={COLORS.yellow}
                                />
                            </View>
                        </Pressable>
                        <Text style={[styles.teacherNameText, { color: COLORS.white }]}>
                            {' '}
                            ریاضیات الصف الاول{' '}
                        </Text>
                    </View>
                    <View style={styles.teacherImageView}>
                        <View
                            style={{
                                height: Platform.OS === 'ios' ? hp(10) : hp(11),
                                width: wp(22),
                            }}>
                            <Image
                                style={{ height: '100%', width: '100%' }}
                                source={teacherIcon}
                            />
                        </View>
                    </View>
                </View>

                <Pressable style={styles.bookButton}>
                    <Text style={{ color: COLORS.white }}> احجزالآن </Text>
                </Pressable>

                <View style={styles.menuView}>
                    <Pressable
                        onPress={() => checkMenu('rating')}
                        style={[
                            styles.menuElements,
                            {
                                backgroundColor: rating,
                                borderRightWidth: selectedMenu == 'rating' ? wp(1.5) : 0,
                                borderLeftWidth: selectedMenu == 'rating' ? wp(1.5) : 0,
                            },
                        ]}>
                        <Text
                            style={{
                                color: selectedMenu == 'rating' ? COLORS.white : COLORS.black,
                            }}>
                            {' '}
                            التقییمات
                        </Text>
                    </Pressable>

                    <Pressable
                        onPress={() => checkMenu('expertise')}
                        style={[
                            styles.menuElements,
                            {
                                backgroundColor: expertise,
                                borderRightWidth: selectedMenu == 'expertise' ? wp(1.5) : 0,
                                borderLeftWidth: selectedMenu == 'expertise' ? wp(1.5) : 0,
                            },
                        ]}>
                        <Text
                            style={{
                                color:
                                    selectedMenu == 'expertise' ? COLORS.white : COLORS.black,
                            }}>
                            {' '}
                            الخبرات
                        </Text>
                    </Pressable>

                    <Pressable
                        onPress={() => checkMenu('personalInfo')}
                        style={[
                            styles.menuElements,
                            {
                                backgroundColor: personalInfo,
                                borderRightWidth: selectedMenu == 'personalInfo' ? wp(1.5) : 0,
                                borderLeftWidth: selectedMenu == 'personalInfo' ? wp(1.5) : 0,
                            },
                        ]}>
                        <Text
                            style={{
                                color:
                                    selectedMenu == 'personalInfo' ? COLORS.white : COLORS.black,
                            }}>
                            {' '}
                            الملف الشخصي
                        </Text>
                    </Pressable>
                </View>

                <View style={{ flex: 1, backgroundColor: COLORS.ashewhite }}>
                    {selectedMenu === 'expertise' && (
                        <>
                            {/* Expertise Screen */}
                            <Pressable
                                onPress={() => setqualification(!qualification)}
                                style={[styles.contentTextView]}>
                                <Material
                                    name={
                                        qualification ? 'keyboard-arrow-up' : 'keyboard-arrow-down'
                                    }
                                    size={hp(3)}
                                    color={COLORS.purple}
                                />
                                <Text style={styles.contentText}> الموھلات</Text>
                                <Image
                                    style={{
                                        height: Platform.OS === 'ios' ? hp(3) : hp(3.5),
                                        width: wp(7),
                                        marginRight: wp(2),
                                    }}
                                    source={qualificationIcon}
                                />
                            </Pressable>

                            {qualification && (
                                <View
                                    style={styles.expertiseDetailsView}>
                                    <Text
                                        style={{
                                            height: hp(4),
                                            marginTop: hp(1),
                                            color: COLORS.black,
                                        }}>
                                        {' '}
                                        qualification{' '}
                                    </Text>
                                </View>
                            )}

                            <Pressable
                                onPress={() => setcourse(!course)}
                                style={[styles.contentTextView]}>
                                <Material
                                    name={course ? 'keyboard-arrow-up' : 'keyboard-arrow-down'}
                                    size={hp(3)}
                                    color={COLORS.purple}
                                />
                                <Text style={styles.contentText}> الدورات</Text>
                                <Image
                                    style={{
                                        height: Platform.OS === 'ios' ? hp(3) : hp(3.5),
                                        width: wp(7),
                                        marginRight: wp(2),
                                    }}
                                    source={courseFalseIcon}
                                />
                            </Pressable>

                            {course && (
                                <View
                                    style={styles.expertiseDetailsView}>
                                    <Text
                                        style={{
                                            height: hp(4),
                                            marginTop: hp(1),
                                            color: COLORS.black,
                                        }}>
                                        {' '}
                                        Course{' '}
                                    </Text>
                                </View>
                            )}

                            <Pressable
                                onPress={() => setyearOfExp(!yearOfExp)}
                                style={[styles.contentTextView]}>
                                <Material
                                    name={yearOfExp ? 'keyboard-arrow-up' : 'keyboard-arrow-down'}
                                    size={hp(3)}
                                    color={COLORS.purple}
                                />
                                <Text style={styles.contentText}> سنوات الخبرة</Text>
                                <Image
                                    style={{
                                        height: Platform.OS === 'ios' ? hp(3) : hp(3.5),
                                        width: wp(5),
                                        marginRight: wp(2),
                                    }}
                                    source={yearOfExpIcon}
                                />
                            </Pressable>

                            {yearOfExp && (
                                <View
                                    style={styles.expertiseDetailsView}>
                                    <Text
                                        style={{
                                            height: hp(4),
                                            marginTop: hp(1),
                                            color: COLORS.black,
                                        }}>
                                        {' '}
                                        Year Of Exp{' '}
                                    </Text>
                                </View>
                            )}
                            <Pressable
                                onPress={() => setworkHistory(!workHistory)}
                                style={[styles.contentTextView]}>
                                <Material
                                    name={
                                        workHistory ? 'keyboard-arrow-up' : 'keyboard-arrow-down'
                                    }
                                    size={hp(3)}
                                    color={COLORS.purple}
                                />
                                <Text style={styles.contentText}> الخبرات </Text>
                                <Image
                                    style={{
                                        height: Platform.OS === 'ios' ? hp(2.7) : hp(3),
                                        width: wp(7),
                                        marginRight: wp(2),
                                    }}
                                    source={workHistoryIcon}
                                />
                            </Pressable>

                            {workHistory && (
                                <View
                                    style={styles.expertiseDetailsView}>
                                    <Text
                                        style={{
                                            height: hp(4),
                                            marginTop: hp(1),
                                            color: COLORS.black,
                                        }}>
                                        {' '}
                                        Work History{' '}
                                    </Text>
                                </View>
                            )}
                        </>
                    )}

                    {/* personalInfo */}
                    {selectedMenu === 'personalInfo' && (
                        <>
                            <View style={styles.personalInfoView}>
                                <Text style={[styles.personalInfoText,{marginVertical:hp(2)}]}>{detail}</Text>
                            </View>
                            <Pressable
                                onPress={() => setlevel(!level)}
                                style={[styles.contentTextView]}>
                                <Material
                                    name={course ? 'keyboard-arrow-up' : 'keyboard-arrow-down'}
                                    size={hp(3)}
                                    color={COLORS.purple}
                                />
                                <Text style={styles.contentText}> المسارالتعلیمی </Text>
                                <Image
                                    style={{
                                        height: Platform.OS === 'ios' ? hp(3) : hp(3.5),
                                        width: wp(7),
                                        marginRight: wp(2),
                                    }}
                                    source={courseFalseIcon}
                                />
                            </Pressable>

                            {level && (
                                <View style={styles.expertiseDetailsView}>
                                    <Text style={styles.personalInfoText}> ۔ الاول الابتدائي</Text>
                                    <Text style={styles.personalInfoText}> ۔ الاول المتوسط</Text>
                                </View>
                            )}

                        </>
                    )}

                    {/* Rating */}
                    {selectedMenu === 'rating' && (
                        <>
                            <FlatList
                                data={teacherData}
                                renderItem={({ item, index }) => (
                                    <View style={styles.teacherInfoView}>
                                        <View style={styles.teacherInfoSubView}>
                                            <View style={styles.courseRateView}>
                                                <Text style={{ color: COLORS.black }}> {item.time} </Text>
                                            </View>
                                            <View style={[styles.teacherBasicInfo, { width: '70%' }]}>
                                                <Text
                                                    style={[
                                                        styles.teacherNameText,
                                                        { color: COLORS.black },
                                                    ]}>
                                                    {' '}
                                                    {item.name} {' '}
                                                </Text>

                                                <Pressable
                                                    onPress={() => ratingStar(item.stars)}
                                                    style={{ flexDirection: 'row' }}>
                                                    <View style={styles.starsView}>
                                                        <MaterialCommunity
                                                            name={'star'}
                                                            size={hp(2.5)}
                                                            color={COLORS.yellow}
                                                        />
                                                    </View>
                                                    <View style={styles.starsView}>
                                                        <MaterialCommunity
                                                            name={'star'}
                                                            size={hp(2.5)}
                                                            color={COLORS.yellow}
                                                        />
                                                    </View>
                                                    <View style={styles.starsView}>
                                                        <MaterialCommunity
                                                            name={'star-half-full'}
                                                            size={hp(2.5)}
                                                            color={COLORS.yellow}
                                                        />
                                                    </View>
                                                    <View style={styles.starsView}>
                                                        <MaterialCommunity
                                                            name={'star-outline'}
                                                            size={hp(2.5)}
                                                            color={COLORS.yellow}
                                                        />
                                                    </View>
                                                    <View style={styles.starsView}>
                                                        <MaterialCommunity
                                                            name={'star-outline'}
                                                            size={hp(2.5)}
                                                            color={COLORS.yellow}
                                                        />
                                                    </View>
                                                </Pressable>
                                                <Text
                                                    style={[
                                                        styles.teacherNameText,
                                                        { color: COLORS.black },
                                                    ]}>
                                                    {' '}
                                                    {item.comment} {' '}
                                                </Text>
                                            </View>
                                        </View>
                                    </View>
                                )}
                                keyExtractor={item => item.id}
                            //   extraData={selectedId}
                            />
                        </>
                    )}
                </View>
            </View>

            <View style={styles.bottomTabView}>
                <Pressable
                    onPress={() => navigation.navigate('MenuScreen')}
                    style={[styles.bottomTabButton, { borderTopLeftRadius: hp(3) }]}>
                    <Image
                        style={[styles.bottomIcon, { height: hp(1) }]}
                        source={moreFalseIcon}
                    />
                    <Text style={{ color: COLORS.black }}> المزید</Text>
                </Pressable>

                <Pressable
                    onPress={() => navigation.navigate('ChatTeacherList')}
                    style={styles.bottomTabButton}>
                    <Image
                        style={[styles.bottomIcon, { height: hp(3) }]}
                        source={messagesFalseIcon}
                    />
                    <Text style={{ color: COLORS.black }}> الرسائل</Text>
                </Pressable>

                <Pressable
                    onPress={() => navigation.navigate('NewClassroom')}
                    style={styles.bottomTabButton}>
                    <Image
                        style={[
                            styles.bottomIcon,
                            {
                                width: Platform.OS === 'ios' ? wp(8) : wp(7),
                                height: Platform.OS === 'ios' ? hp(4.5) : hp(4),
                                marginTop: hp(1),
                            },
                        ]}
                        source={classFalseIcon}
                    />
                    <Text
                        style={{
                            color: COLORS.black,
                            marginTop: Platform.OS === 'ios' ? hp(-1) : 0,
                        }}>
                        {' '}
                        الدروس
                    </Text>
                </Pressable>

                <Pressable
                    onPress={() => navigation.navigate('HomeScreen')}
                    style={[styles.bottomTabButton, { borderTopRightRadius: hp(3) }]}>
                    <Image style={[styles.bottomIcon]} source={homeTrueIcon} />
                    <Text style={{ color: COLORS.purple }}>الرئیسیة </Text>
                </Pressable>
            </View>
        </SafeAreaView>
    );
};
const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        alignItems: 'flex-end',
        backgroundColor: COLORS.ashewhite,
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
        resizeMode: 'stretch',
    },
    landscapeHeaderView: {
        width: '100%',
        height: Platform.OS === 'ios' ? hp(10) : hp(7),
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        position: 'absolute',
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
        marginTop: Platform.OS === 'ios' ? hp(6) : hp(2),
    },
    backButton: {
        height: hp(6),
        width: Platform.OS === 'ios' ? wp(13.2) : wp(12.5),
    },

    landscapeLogo: {
        height: hp(5),
        width: wp(30.2),
        marginRight: wp(2),
    },
    portraitLogo: {
        height: hp(5),
        marginTop: Platform.OS === 'ios' ? hp(6) : hp(2),
        width: wp(30.2),
        marginRight: wp(2),
    },
    teacherInfoView: {
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        width: '95%',
        marginTop: hp(1),
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
    teacherInfoSubView: {
        height: hp(15),
        width: '95%',
        flexDirection: 'row',
    },
    courseRateView: {
        width: '30%',
        borderTopLeftRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    courseRateSubView: {
        height: hp(4),
        width: '85%',
        justifyContent: 'center',
        alignItems: 'center',
        //backgroundColor: '#eee',
        // borderRadius: 20
    },
    teacherBasicInfo: {
        width: '45%',
        justifyContent: 'center',
        alignItems: 'flex-end',
    },
    teacherNameText: {
        color: COLORS.white,
        textAlign: 'center',
        //marginRight: wp(4)
    },
    starsView: {
        height: hp(3),
        width: wp(6),
        marginRight: wp(-1),
    },
    teacherImageView: {
        width: '30%',
        borderTopRightRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
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
        color: COLORS.black,
    },
    bookButton: {
        backgroundColor: COLORS.yellow,
        width: '60%',
        height: hp(5),
        alignSelf: 'center',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: wp(18),
    },
    menuView: {
        flexDirection: 'row',
        backgroundColor: COLORS.ashewhite,
        width: '100%',
        height: hp(6),
        justifyContent: 'space-between',
        marginTop: hp(2),
    },
    menuElements: {
        width: '32%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: COLORS.white,
        elevation: 15,
        shadowColor: '#000',
        shadowOffset: {
            width: 2,
            height: 3,
        },
        shadowOpacity: 0.35,
        shadowRadius: 2.62,
        borderColor: COLORS.yellow,
    },

    contentTextView: {
        width: '100%',
        marginTop: hp(1),
        justifyContent: 'space-evenly',
        alignItems: 'center',
        flexDirection: 'row',
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
        width: '75%',
        color: COLORS.black,
        textAlign: 'right',
        fontSize: 15,
    },
    expertiseDetailsView: {
        width: '100%',
        backgroundColor: COLORS.ashewhite,
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: {
            width: 2,
            height: 3,
        },
        shadowOpacity: 0.35,
        shadowRadius: 1.62,
        marginTop: hp(0.1),
        justifyContent: 'center',
    },
    personalInfoView: {

        width: '100%',
        backgroundColor: COLORS.white,
        marginVertical: hp(1),
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: {
            width: 2,
            height: 3,
        },
        shadowOpacity: 0.35,
        shadowRadius: 1.62,

    },
    personalInfoText: {
        color: COLORS.black,
       // height:hp(10),
        fontSize: hp(2),
        width: '95%',
        alignSelf: 'center',
        textAlign: 'right'

    },

    bottomTabView: {
        backgroundColor: COLORS.white,
        height: hp(8),
        width: '100%',
        borderTopLeftRadius: hp(3),
        borderTopRightRadius: hp(3),
        elevation: 5,
        shadowOpacity: 0.1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly',
    },
    bottomTabButton: {
        backgroundColor: COLORS.white,
        width: wp(25),
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    bottomIcon: {
        height: hp(4),
        width: Platform.OS === 'ios' ? wp(9.5) : wp(8.5),
        marginTop: Platform.OS === 'ios' ? hp(0.5) : 0,
    },
});
export default index;
