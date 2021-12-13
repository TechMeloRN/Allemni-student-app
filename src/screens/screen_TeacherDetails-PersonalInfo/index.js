import React, { useState, useEffect } from 'react';
import {
    StyleSheet,
    View,
    SafeAreaView,
    StatusBar,
    // ScrollView,
    ImageBackground,
    Image,
    Pressable,
    Text,
    Dimensions,
    Platform,
    LogBox,
    Modal,
} from 'react-native';

import { FlatList } from 'react-native-gesture-handler';
import { ScrollView } from 'react-native-gesture-handler';

import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Axios from 'react-native-axios'
import Url from '../../baseurl.json'

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

    //Design States
    const [qualification, setqualification] = useState(false);
    const [course, setcourse] = useState(false);
    const [yearOfExp, setyearOfExp] = useState(false);
    const [workHistory, setworkHistory] = useState(false);
    const [level, setlevel] = useState(false);

    const [expertiseDetail, setexpertiseDetail] = useState('');
    const [personalInfoDetail, setpersonalInfoDetail] = useState('');
    const [detail, setdetails] = useState('الأستاذ رشاد مدرس تاريخ وجغرافيا دو خبرة تزيد على العشرين عامافي المرحلتين الابتدائية والإعدادية في أكثر من مدرسة على مستوى المملكة والبحرين والكويت');

    const { data } = route.params;
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
        personalInfoData();
        TeacherExpertiseData();
        Dimensions.addEventListener('change', getOrientation);
        LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
    }, []);

    //Teacher PersonalInfoData
    const personalInfoData = () => {

        Axios.post(Url.baseUrl + "/get-step2-record", {
            teacherId: data.teacherId
        })
            .then(function (response) {
                console.log(JSON.stringify(response.data));
                if (response.data !== 'teacher not found') {
                    setpersonalInfoDetail(response.data)
                }
                else {
                    console.log("Teacher no found!")
                }
            })
            .catch(function (error) {
                alert(error);
            });
    }

    //Teacher ExpertiseData 
    const TeacherExpertiseData = () => {

        Axios.post(Url.baseUrl + "/get-register-step3-record", {
            teacherId: data.teacherId
        })
            .then(function (response) {
                console.log(JSON.stringify(response.data));

                if (response.data.degree !== []) {
                    setexpertiseDetail(response.data)
                }
                else {
                    console.log("Teacher no found!")
                }
            })
            .catch(function (error) {
                alert(error);
            });
    }

    //alert("Teacher Data: " + JSON.stringify(expertiseDetail.degree))
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
                            <Text style={{ color: COLORS.white, fontFamily: 'Cairo-Regular' }}> {'150' + ' ' + 'ر۔س'}</Text>
                        </ImageBackground>
                    </View>
                    <View style={styles.teacherBasicInfo}>
                        {/* <Text style={styles.teacherNameText}> سعود ابراھیم حمندی </Text> */}
                        <Text style={styles.teacherNameText}> {data.firstName} {data.lastName} </Text>

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
                    <Text style={{ color: COLORS.white, fontFamily: 'Cairo-SemiBold' }}> احجزالآن </Text>
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
                                fontFamily: 'Cairo-SemiBold'
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
                                color: selectedMenu == 'expertise' ? COLORS.white : COLORS.black,
                                fontFamily: 'Cairo-SemiBold'
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
                                color: selectedMenu == 'personalInfo' ? COLORS.white : COLORS.black,
                                fontFamily: 'Cairo-SemiBold'
                            }}>
                            {' '}
                            الملف الشخصي
                        </Text>
                    </Pressable>
                </View>

                {/* Content Detail */}
                <ScrollView style={{ flex: 1 }}>

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
                                        {/* <Text
                                            style={{
                                                height: hp(4),
                                                marginTop: hp(1),
                                                color: COLORS.black,
                                                fontFamily: 'Cairo-Regular',
                                                textAlign:'right',
                                                width:'95%'
                                            }}>
                                            {' '}
                                            • بكالريوس تربية من كلية التربية بجامعة جدة {' '}
                                        </Text> */}
                                        {expertiseDetail.degree.map((item, index) => (
                                            <View key={index}>
                                                <Text
                                            style={{
                                                height: hp(3),
                                                marginTop: hp(1),
                                                color: COLORS.black,
                                                fontFamily: 'Cairo-Regular',
                                                textAlign:'right',
                                                width:'95%'
                                            }}>
                                            {' '}
                                             {item.title} • {' '}
                                        </Text>
                                            </View>
                                        ))}
                                        
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
                                        {/* <Text
                                            style={{
                                                height: hp(4),
                                                marginTop: hp(1),
                                                color: COLORS.black,
                                                fontFamily: 'Cairo-Regular',
                                                textAlign: 'right',
                                                width: '95%'
                                            }}>
                                            {' '}
                                            • دورة في سبل تحسين طرق التواصل مع الطلاب بجامعة جدة {' '}
                                        </Text> */}
                                        {expertiseDetail.teacherCourse.map((item, index) => (
                                            <View key={index}>
                                                <Text
                                            style={{
                                                height: hp(3),
                                                marginTop: hp(1),
                                                color: COLORS.black,
                                                fontFamily: 'Cairo-Regular',
                                                textAlign:'right',
                                                width:'95%'
                                            }}>
                                            {' '}
                                             {item.title} • {' '}
                                        </Text>
                                            </View>
                                        ))}
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
                                                fontFamily: 'Cairo-Regular',
                                                textAlign: 'right',
                                                width: '95%',
                                                fontSize: Platform.OS === 'ios' ? hp(1.7) : hp(1.9)
                                            }}>
                                            {' '}
                                            {personalInfoDetail.yearOfExp}•{' '}
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
                                        {/* <Text
                                            style={{
                                                height: hp(4),
                                                marginTop: hp(1),
                                                color: COLORS.black,
                                                fontFamily: 'Cairo-Regular',
                                                textAlign: 'right',
                                                width: '95%',

                                            }}>
                                            {' '}
                                            • مدرس تاريخ وجغرافيا{' '}
                                        </Text> */}
                                        {expertiseDetail.history.map((item, index) => (
                                            <View key={index}>
                                                <Text
                                            style={{
                                                height: hp(3),
                                                marginTop: hp(1),
                                                color: COLORS.black,
                                                fontFamily: 'Cairo-Regular',
                                                textAlign:'right',
                                                width:'95%'
                                            }}>
                                            {' '}
                                             {item.history} • {' '}
                                        </Text>
                                            </View>
                                        ))}
                                        {/* <Text
                                            style={{
                                                height: hp(4),
                                                // marginTop: hp(1),
                                                color: COLORS.black,
                                                fontFamily: 'Cairo-Regular',
                                                textAlign: 'right',
                                                width: '95%'
                                            }}>
                                            {' '}
                                            مدرسة الملك عبد العزيز الابتدائية بجدة{' '}
                                        </Text>

                                        <Text
                                            style={{
                                                height: hp(4),
                                                // marginTop: hp(1),
                                                color: COLORS.black,
                                                fontFamily: 'Cairo-Regular',
                                                textAlign: 'right',
                                                width: '95%'
                                            }}>
                                            {' '}
                                            1425-1435{' '}
                                        </Text>

                                        <Text
                                            style={{
                                                height: hp(4),
                                                //  marginTop: hp(1),
                                                color: COLORS.black,
                                                fontFamily: 'Cairo-Regular',
                                                textAlign: 'right',
                                                width: '95%'
                                            }}>
                                            {' '}
                                            • مدرس تاريخ وجغرافيا{' '}
                                        </Text> */}

                                    </View>
                                )}
                            </>
                        )}

                        {/* personalInfo */}
                        {selectedMenu === 'personalInfo' && (
                            <>
                                <View style={styles.personalInfoView}>
                                    <Text style={[styles.personalInfoText, { marginVertical: hp(2) }]}>{personalInfoDetail.summery}</Text>
                                </View>
                                <Pressable
                                    onPress={() => setlevel(!level)}
                                    style={[styles.contentTextView]}>
                                    <Material
                                        name={level ? 'keyboard-arrow-up' : 'keyboard-arrow-down'}
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
                            {teacherData.map((item, index) => (
                                <View key={index} style={styles.teacherInfoView}>
                                            <View style={styles.teacherInfoSubView}>
                                                <View style={styles.courseRateView}>
                                                    <Text style={{ color: COLORS.black, fontFamily: 'Cairo-Regular' }}> {item.time} </Text>
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
                                        ))}
                              
                            </>
                        )}
                    </View>
                </ScrollView>
            </View>


            <View style={styles.bottomTabView}>
                <Pressable
                    onPress={() => navigation.navigate('MenuScreen')}
                    style={[styles.bottomTabButton, { borderTopLeftRadius: hp(3) }]}>
                    <Image
                        style={[styles.bottomIcon, { height: hp(1), marginTop: hp(2) }]}
                        source={moreFalseIcon}
                    />
                    <Text style={{ color: COLORS.black, fontFamily: 'Cairo-Regular' }}> المزید</Text>
                </Pressable>

                <Pressable
                    onPress={() => navigation.navigate('ChatTeacherList')}
                    style={styles.bottomTabButton}>
                    <Image
                        style={[styles.bottomIcon, { height: hp(3) }]}
                        source={messagesFalseIcon}
                    />
                    <Text style={{ color: COLORS.black, fontFamily: 'Cairo-Regular', }}> الرسائل</Text>
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
                            fontFamily: 'Cairo-Regular',
                        }}>
                        {' '}
                        الدروس
                    </Text>
                </Pressable>

                <Pressable
                    onPress={() => navigation.navigate('HomeScreen')}
                    style={[styles.bottomTabButton, { borderTopRightRadius: hp(3) }]}>
                    <Image style={[styles.bottomIcon]} source={homeTrueIcon} />
                    <Text style={{ color: COLORS.purple, fontFamily: 'Cairo-Regular', }}>الرئیسیة </Text>
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
        fontSize: Platform.OS === 'android' ? hp(1.9) : hp(1.7),
        textAlign: 'center',
        marginTop: Platform.OS === 'ios' ? hp(7) : hp(3),
        fontFamily: 'Cairo-SemiBold'
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
        fontFamily: 'Cairo-Regular',
        fontSize: Platform.OS === 'android' ? hp(1.9) : hp(1.7)
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
        fontSize: Platform.OS === 'android' ? hp(1.8) : hp(1.6),
        fontFamily: 'Cairo-Regular'
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
        borderBottomWidth: 1,
        borderBottomColor: '#eee'
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
        fontSize: Platform.OS === 'android' ? hp(1.8) : hp(1.6),
        width: '95%',
        alignSelf: 'center',
        textAlign: 'right',
        fontFamily: 'Cairo-Regular',

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
