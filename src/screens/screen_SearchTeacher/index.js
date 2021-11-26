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
                    <View style={styles.orderByView}>
                        <Material name='keyboard-arrow-down' size={hp(3)} color={COLORS.purple} />
                        <Text style={{ color: COLORS.purple }}> ترتیب حسب </Text>
                    </View>
                    <Text style={{ color: COLORS.purple }}> جامعي ۔ جامعة الملک سعود ۔ اقتصاد </Text>
                </View>

                <View style={{ flex: 1 }}>


                    <FlatList
                        data={teacherData}
                        //  horizontal={true}
                        renderItem={({ item, index }) => (
                            <View style={styles.teacherInfoSubView}>
                                <View style={{ height: hp(15), width: '95%', flexDirection: 'row', borderBottomWidth: 1, borderBottomColor: COLORS.ashewhite }}>
                                    <View style={{ width: '30%', borderTopLeftRadius: 20, justifyContent: 'center', alignItems: 'center' }}>
                                        <View style={{ height: hp(4.8), width: '80%', justifyContent: 'center', alignItems: 'center', backgroundColor: COLORS.ashewhite, borderRadius: 20 }}>
                                            <Text style={{ color: COLORS.purple }}> {item.courseRate + " " + "ر۔س"}</Text>
                                        </View>
                                    </View>
                                    <View style={{ width: '40%', justifyContent: 'center', alignItems: 'flex-end' }}>
                                        <Text style={{ color: COLORS.black, textAlign: 'center', marginRight: wp(4) }}>{item.name}</Text>

                                        <Pressable onPress={() => ratingStar(item.stars)} style={{ flexDirection: 'row', marginRight: wp(4) }}>
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
                                        <Text style={{ color: COLORS.purple, textAlign: 'center', marginRight: wp(4) }}>{item.status}</Text>
                                    </View>
                                    <View style={{ width: '30%', borderTopRightRadius: 20, justifyContent: 'center', alignItems: 'center' }}>
                                        <View style={{ height: hp(12), width: wp(24) }}>
                                            <Image style={{ height: '100%', width: '100%' }} source={teacherIcon} />
                                        </View>
                                    </View>
                                </View>
                                {!chkDetail ?
                                    <Pressable onPress={() => setchkDetail(true)} style={styles.moreDetailView}>
                                        <Material name='keyboard-arrow-down' size={hp(3)} color={COLORS.white} />
                                        <Text style={{ color: COLORS.white }}> تفاصیل </Text>
                                    </Pressable>
                                    :
                                    <View style={{
                                        height: hp(10),
                                        width: '90%',
                                       // backgroundColor: COLORS.purple,
                                        borderBottomLeftRadius: 20,
                                        borderBottomRightRadius: 20,
                                        justifyContent: 'center',
                                        alignItems:'flex-end',
                                        //flexDirection: 'row'
                                    }}>
                                        <Text style={{textAlign:'right'}}> {item.detail} </Text>
                                    </View>}
                            </View>

                        )}
                        keyExtractor={(item) => item.id}
                    />


                </View>


            </View>

            <View style={styles.bottomTabView}>
                <Pressable
                    onPress={() => navigation.navigate('MenuScreen')}
                    style={[styles.bottomTabButton, { borderTopLeftRadius: hp(3) }]
                    }>
                    <Image style={[styles.bottomIcon, { height: hp(1) }]} source={moreFalseIcon} />
                    <Text style={{ color: COLORS.black }}> المزید</Text>
                </Pressable>

                <Pressable
                    onPress={() => navigation.navigate('ChatTeacherList')}
                    style={styles.bottomTabButton}>
                    <Image style={[styles.bottomIcon, { height: hp(3) }]} source={messagesFalseIcon} />
                    <Text style={{ color: COLORS.black }} > الرسائل</Text>
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
                    <Image style={styles.bottomIcon} source={homeFalseIcon} />
                    <Text style={{ color: COLORS.black }}>الرئیسیة </Text>
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

    },
    mainContent: {
        flex: 1,
        // alignItems: 'center'

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


    teacherInfoSubView: {
        backgroundColor: 'white',
        // flexDirection:'row',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        // height: hp(18),
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