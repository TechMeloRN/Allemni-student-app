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
    Dimensions,
    Modal
} from 'react-native';
import Axios from 'react-native-axios'
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp
} from 'react-native-responsive-screen';
import AsyncStorage from '@react-native-community/async-storage';
import Material from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunity from 'react-native-vector-icons/MaterialCommunityIcons';
// Custom Components imports 

import { COLORS } from '../../assets/Styles/color.js'
import headerBackground from '../../assets/Images/background/headerBackground.png'
import backBtnIcon from '../../assets/Images/icons/btnIcon.png'
import notificationIcon from '../../assets/Images/icons/notificationIcon.png'

import landscapeLogo from '../../assets/Images/logo/landscapeIcon.png'
import teacherIcon from '../../assets/Images/Image/teacherIcon.png'

//Tab Icons 
import moreFalseIcon from '../../assets/Images/icons/moreFalseIcon.png'
import homeFalseIcon from '../../assets/Images/icons/homeFalseIcon.png'
import messagesFalseIcon from '../../assets/Images/icons/messagesFalseIcon.png'
import classFalseIcon from '../../assets/Images/icons/classFalseIcon.png'


const index = ({ navigation, route }) => {

    const [orientation, setorientation] = useState('');
    const [chkDetail, setchkDetail] = useState(false);
    const [orderByModal, setorderByModal] = useState(false)
    const [selectedId, setselectedId] = useState(null);
    const [selectedOrder, setselectedOrder] = useState('ترتیب حسب')
    const [rating, setrating] = useState('0')

    const [orderBy, setorderBy] = useState([
        {
            id: 1,
            Title: 'Name'
        },
        {
            id: 2,
            Title: 'Course Rate'
        },
        {
            id: 3,
            Title: 'Rating'
        },
        {
            id: 4,
            Title: 'Status'
        },

    ])

    const [teacherData, setteacherData] = useState([
        {
            id: 1,
            name: 'عبید عبداللہ المدوانی',
            image: teacherIcon,
            status: 'مدرس ابتدائی',
            stars: 0,
            courseRate: 140,
            detail: 'الأستاذ رشاد مدرس تاريخ وجغرافيا دو خبرة تزيد على العشرين عامافي المرحلتين الابتدائية والإعدادية في أكثر من مدرسة على مستوى المملكة والبحرين والكويت'
        },
        {
            id: 2,
            name: 'رشاد محمود الحلوانی',
            image: teacherIcon,
            status: 'مقتش عام',
            stars: 1.5,
            courseRate: 150,
            detail: 'الأستاذ رشاد مدرس تاريخ وجغرافيا دو خبرة تزيد على العشرين عامافي المرحلتين الابتدائية والإعدادية في أكثر من مدرسة على مستوى المملكة والبحرين والكويت'

        },
        {
            id: 3,
            name: 'عبید عبداللہ المدوانی',
            image: teacherIcon,
            status: 'مدرس ابتدائی',
            stars: 2.5,
            courseRate: 130,
            detail: 'الأستاذ رشاد مدرس تاريخ وجغرافيا دو خبرة تزيد على العشرين عامافي المرحلتين الابتدائية والإعدادية في أكثر من مدرسة على مستوى المملكة والبحرين والكويت'

        },
        {
            id: 4,
            name: 'رشاد محمود الحلوانی',
            image: teacherIcon,
            status: 'مقتش عام',
            stars: 1,
            courseRate: 160,
            detail: 'الأستاذ رشاد مدرس تاريخ وجغرافيا دو خبرة تزيد على العشرين عامافي المرحلتين الابتدائية والإعدادية في أكثر من مدرسة على مستوى المملكة والبحرين والكويت'

        }
    ]);

    useEffect(() => {
        //     (async () => {

        // })()
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

    {/* //////////////////////////////////////////
       ////// OrderBy Model /////////////////////
      ////////////////////////////////////////// */}

            <Modal
                transparent={true}
                visible={orderByModal}>
                <View style={styles.mainModelView}>
                    <View style={styles.modalItemContainer}>
                        <Pressable
                            onPress={() => setorderByModal(false)}
                            style={styles.modalCancelBtn}>
                            <Text style={{ color: COLORS.purple, fontFamily: 'Cairo-Regular' }}> إلغاء </Text>
                        </Pressable>
                        <View style={{ height: Platform.OS === 'android' ? '75%' : '75%', width: '100%' }}>
                            <FlatList
                                data={orderBy}
                                renderItem={({ item, index }) => (
                                    <Pressable
                                        onPress={() => {
                                            setselectedOrder(item.Title)
                                            setorderByModal(false)
                                        }}
                                        style={styles.orderByListBtn}>
                                        <Text style={styles.orderByListText}>{item.Title}</Text>
                                    </Pressable>
                                )}
                                keyExtractor={(item) => item.id}
                            />
                        </View>
                    </View>
                </View>
            </Modal>

            <StatusBar barStyle={Platform.OS === 'ios' ? 'dark-content' : 'light-content'} backgroundColor={COLORS.purple} />

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

                <Text style={[styles.headerText, { width: orientation == 'portrait' ? wp(30) : '60%' }]}> نتائج البحث </Text>

                <Image style={styles.landscapeLogo} source={landscapeLogo} />

            </ImageBackground>


            <View style={styles.mainContent}>

                <View style={styles.headingView}>
                    <Pressable onPress={() => setorderByModal(true)} style={styles.orderByView}>
                        <Material name='keyboard-arrow-down' size={hp(3)} color={COLORS.purple} />
                        <Text style={{ color: COLORS.purple, fontFamily: 'Cairo-Regular' }}> {selectedOrder} </Text>
                    </Pressable>
                    <Text style={{ color: COLORS.purple, fontFamily: 'Cairo-Regular' }}> جامعي ۔ جامعة الملک سعود ۔ اقتصاد </Text>
                </View>

                {/* Teacher detail */}
                <View style={{ flex: 1 }}>
                    <FlatList
                        data={teacherData}
                        renderItem={({ item, index }) => (
                            <View style={styles.teacherInfoView}>
                                <View style={styles.teacherInfoSubView}>
                                    <View style={styles.courseRateView}>
                                        <View style={styles.courseRateSubView}>
                                            <Text style={{ color: COLORS.purple, fontFamily: 'Cairo-Regular' }}> {item.courseRate + " " + "ر۔س"}</Text>
                                        </View>
                                    </View>
                                    <View style={styles.teacherBasicInfo}>
                                        <Text style={styles.teacherNameText}>{item.name}</Text>

                                        <Pressable onPress={() => ratingStar(item.stars)} style={{ flexDirection: 'row', marginRight: wp(4) }}>
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
                                        <Text style={[styles.teacherNameText, { color: COLORS.purple }]}>{item.status}</Text>
                                    </View>
                                    <View style={styles.teacherImageView}>
                                        <View style={{ height: hp(12), width: wp(24) }}>
                                            <Image style={{ height: '100%', width: '100%' }} source={teacherIcon} />
                                        </View>
                                    </View>
                                </View>
                                {selectedId !== item.id ?
                                    <Pressable
                                        onPress={() => {
                                            setchkDetail(true)
                                            setselectedId(item.id)
                                        }}
                                        style={styles.moreDetailView}>
                                        <Material name='keyboard-arrow-down' size={hp(3)} color={COLORS.white} />
                                        <Text style={{ color: COLORS.white, fontFamily: 'Cairo-Regular' }}> تفاصیل </Text>
                                    </Pressable>
                                    :
                                    <View style={styles.teacherDetailView}>
                                        <Text style={styles.teacherDetailText}> {item.detail} </Text>
                                        <Material
                                            name='keyboard-arrow-up'
                                            onPress={() => setselectedId(null)}
                                            size={hp(3)}
                                            color={COLORS.purple}
                                            style={{ alignSelf: 'center', marginTop: hp(-1) }} />
                                    </View>}
                            </View>
                        )}
                        keyExtractor={(item) => item.id}
                        extraData={selectedId}
                    />
                </View>
            </View>

            <View style={styles.bottomTabView}>
                <Pressable
                    onPress={() => navigation.navigate('MenuScreen')}
                    style={[styles.bottomTabButton, { borderTopLeftRadius: hp(3) }]
                    }>
                    <Image style={[styles.bottomIcon, { height: hp(1), marginTop: hp(2) }]} source={moreFalseIcon} />
                    <Text style={{ color: COLORS.black, fontFamily: 'Cairo-Regular' }}> المزید</Text>
                </Pressable>

                <Pressable
                    onPress={() => navigation.navigate('ChatTeacherList')}
                    style={styles.bottomTabButton}>
                    <Image style={[styles.bottomIcon, { height: hp(3) }]} source={messagesFalseIcon} />
                    <Text style={{ color: COLORS.black, fontFamily: 'Cairo-Regular' }} > الرسائل</Text>
                </Pressable>

                <Pressable
                    onPress={() => navigation.navigate('NewClassroom')}
                    style={styles.bottomTabButton}>
                    <Image style={[styles.bottomIcon, { width: Platform.OS === 'ios' ? wp(8) : wp(7) }]} source={classFalseIcon} />
                    <Text style={{ color: COLORS.black, fontFamily: 'Cairo-Regular' }}> الدروس</Text>
                </Pressable>

                <Pressable
                    onPress={() => navigation.navigate('HomeScreen')}
                    style={[styles.bottomTabButton, { borderTopRightRadius: hp(3) }]}>
                    <Image style={styles.bottomIcon} source={homeFalseIcon} />
                    <Text style={{ color: COLORS.black, fontFamily: 'Cairo-Regular' }}>الرئیسیة </Text>
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
    headerView: {
        width: '100%',
        height: Platform.OS === 'ios' ? hp(12) : hp(12),
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly'
    },
    headerText: {
        color: '#fff',
        fontSize: 18,
        textAlign: 'center',
        fontFamily: 'Cairo-SemiBold'

    },
    mainContent: {
        flex: 1,

    },
    headingView: {
        flexDirection: 'row',
        width: '100%',
        height: hp(6),
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: COLORS.white

    },
    orderByView: {
        width: '30%',
        height: '70%',
        justifyContent: 'space-around',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: COLORS.purple,
        flexDirection: 'row'
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
        borderBottomWidth: 1,
        borderBottomColor: COLORS.ashewhite
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
        backgroundColor: COLORS.ashewhite,
        borderRadius: 20
    },
    teacherBasicInfo: {
        width: '40%',
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
        fontFamily: 'Cairo-Regular'
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
    moreDetailView: {
        height: hp(6),
        width: '100%',
        backgroundColor: COLORS.purple,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row'
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
        height: hp(31),
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
        backgroundColor: COLORS.white,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 20,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: {
            width: 1,
            height: 1,
        },
        shadowOpacity: 0.35,
        shadowRadius: 2.62,
    },

    orderByListBtn: {
        width: '70%',
        height: hp(5),
        borderBottomWidth: 1,
        borderColor: COLORS.lightgrey,
        justifyContent: 'center',
        alignSelf: 'center'
    },

    orderByListText: {
        color: COLORS.black,
        textAlign: 'center',
        fontFamily: 'Cairo-Regular'
    },

    bottomTabView: {
        backgroundColor: COLORS.white,
        height: Platform.OS === 'ios' ? hp(9) : hp(8),
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