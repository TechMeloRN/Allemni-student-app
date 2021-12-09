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

//Icons
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
    const [selectedDate, setselectedDate] = useState('');
    const [selectedTime, setselectedTime] = useState('');
    const [index , setindex] = useState(0);
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

    const [bookTime, setbookTime] = useState([
        {
            id: 1,
            time: '02:00 م',
            status: 'available',
        },
        {
            id: 2,
            time: '01:00 م',
            status: 'booked',
        },
        {
            id: 3,
            time: '12:00 م',
            status: 'available',
        },
        {
            id: 4,
            time: '11:00 ص',
            status: 'available',
        },
        {
            id: 5,
            time: '06:00 م',
            status: 'booked',
        },
        {
            id: 6,
            time: '05:00 م',
            status: 'available',
        },
        {
            id: 7,
            time: '04:00 م',
            status: 'available',
        },
        {
            id: 8,
            time: '03:00 م',
            status: 'booked',
        },
        {
            id: 9,
            time: '10:00 م',
            status: 'available',
        },
        {
            id: 10,
            time: '07:00 م',
            status: 'available',
        }
        , {
            id: 11,
            time: '09:00 م',
            status: 'available',
        }
        , {
            id: 12,
            time: '08:00 م',
            status: 'booked',
        },
        
        
    ])

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

    const bookAppointment=()=>{
        bookTime[index].status='booked'
        setbookTime(bookTime)
        console.log(bookTime[index].status)
        setselectedTime('')
        setselectedDate('')
    }

    const selectTime =(time,index)=>{
        setselectedTime(time)
        setindex(index)
    }

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

                <Text style={[styles.headerText, { width: orientation == 'portrait' ? wp(30) : '60%' }]}> اختیارالمواعید </Text>

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



                {/* Days */}

                <View
                    style={styles.daysMainView}>
                    <Pressable
                        style={selectedDate === 'btn1' ? styles.datePressedBtn : styles.dateBtn}
                        onPress={() => setselectedDate('btn1')}>
                        <Text style={selectedDate === 'btn1' ? styles.datePressedBtnText : styles.dateBtnText}>
                            ٱحد
                        </Text>
                        <Text style={selectedDate === 'btn1' ? styles.datePressedBtnText : styles.dateBtnText}>
                            13
                        </Text>
                    </Pressable>
                    <Pressable
                        style={selectedDate === 'btn2' ? styles.datePressedBtn : styles.dateBtn}
                        onPress={() => setselectedDate('btn2')}>
                        <Text style={selectedDate === 'btn2' ? styles.datePressedBtnText : styles.dateBtnText}>
                            سبت
                        </Text>
                        <Text style={selectedDate === 'btn2' ? styles.datePressedBtnText : styles.dateBtnText}>
                            12
                        </Text>
                    </Pressable>
                    <Pressable
                        style={selectedDate === 'btn3' ? styles.datePressedBtn : styles.dateBtn}
                        onPress={() => setselectedDate('btn3')}>
                        <Text style={selectedDate === 'btn3' ? styles.datePressedBtnText : styles.dateBtnText}>
                            جمعة
                        </Text>
                        <Text style={selectedDate === 'btn3' ? styles.datePressedBtnText : styles.dateBtnText}>
                            11
                        </Text>
                    </Pressable>
                    <Pressable
                        style={selectedDate === 'btn4' ? styles.datePressedBtn : styles.dateBtn}
                        onPress={() => setselectedDate('btn4')}>
                        <Text style={selectedDate === 'btn4' ? styles.datePressedBtnText : styles.dateBtnText}>
                            خميس
                        </Text>
                        <Text style={selectedDate === 'btn4' ? styles.datePressedBtnText : styles.dateBtnText}>
                            10
                        </Text>
                    </Pressable>
                    <Pressable
                        style={[selectedDate === 'btn5' ? styles.datePressedBtn : styles.dateBtn]}
                        onPress={() => setselectedDate('btn5')}>
                        <Text style={selectedDate === 'btn5' ? styles.datePressedBtnText : styles.dateBtnText}>
                            ٱربعاء
                        </Text>
                        <Text style={selectedDate === 'btn5' ? styles.datePressedBtnText : styles.dateBtnText}>
                            9
                        </Text>
                    </Pressable>
                    <Pressable
                        style={[selectedDate === 'btn6' ? styles.datePressedBtn : styles.dateBtn]}
                        onPress={() => setselectedDate('btn6')}>
                        <Text style={selectedDate === 'btn6' ? styles.datePressedBtnText : styles.dateBtnText}>
                            ثلاثاء
                        </Text>
                        <Text style={selectedDate === 'btn6' ? styles.datePressedBtnText : styles.dateBtnText}>
                            8
                        </Text>
                    </Pressable>
                    <Pressable
                        style={[selectedDate === 'btn7' ? styles.datePressedBtn : styles.dateBtn]}
                        onPress={() => setselectedDate('btn7')}>
                        <Text style={selectedDate === 'btn7' ? styles.datePressedBtnText : styles.dateBtnText}>
                            اثنين
                        </Text>
                        <Text style={[selectedDate === 'btn7' ? styles.datePressedBtnText : styles.dateBtnText]}>
                            7
                        </Text>
                    </Pressable>
                </View>

                <View style={[styles.contentTextView]}>
                    <Text style={styles.contentText}> احجزموعدالجلسة</Text>
                </View>

                {/* Time */}

                <View style={styles.timeMainView}>
                    <FlatList
                        data={bookTime}
                        numColumns={4}
                        renderItem={({ item, index }) => (
                            
                            <Pressable 
                                onPress={() => selectTime(item.time,index)} 
                                style={item.status==='booked'?styles.timeBookedBtnView:item.status==='available' && selectedTime===item.time?styles.timePressedBtnView:styles.timeBtnView }>
                                <Text style={item.status==='available' && selectedTime===item.time?styles.timePressedBtnText: styles.timeBtnText}> {item.status==='available'?item.time:'محجوز'} </Text>
                                {selectedTime === item.time && item.status=='available' &&
                                <View style={styles.SelectedTimeCheck}>
                                    <Material name='check-circle' size={hp(2.5)} color={COLORS.purple} />
                                </View>
                            }
                            </Pressable>

                            
                            
                        )}
                        keyExtractor={(item) => item.id}
                    />


                </View>

                <Pressable onPress={()=>bookAppointment()} style={{height:hp(6),width:'70%',backgroundColor:COLORS.purple,justifyContent:'center',alignItems:'center',alignSelf:'center',marginBottum:hp(2)}}>
                    <Text style={{color:COLORS.white,fontFamily: 'Cairo-Regular',fontSize:Platform.OS==='android'?hp(1.9):hp(1.7)}}> التالي</Text>
                </Pressable>

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

    daysMainView: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        marginTop: hp(.5),
        height: hp(12),
        backgroundColor: COLORS.white
    },
    dateBtn: {
        borderRadius: 10,
        width: '13%',
        height: hp(9),
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: COLORS.white,
    },
    datePressedBtn: {
        borderRadius: 10,
        width: '13%',
        height: hp(9),
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: COLORS.purple,
        elevation: 15,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.35,
        shadowRadius: 6.62,
    },
    dateBtnText: {
        color: COLORS.purple,
        fontSize: hp(1.6),
        fontFamily: 'Cairo-medium',
    },
    datePressedBtnText: {
        color: COLORS.white,
        fontSize: Platform.OS === 'ios' ? hp(1.7) : hp(1.9),
        fontFamily: 'Cairo-Medium',
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
        marginRight: wp(3),
        fontFamily: 'Cairo-Regular'
    },
    timeMainView: {
        flex: .9,
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        flexWrap: 'wrap',
        width:'100%',
        marginVertical:hp(.5)
        
    },
    timeBtnView: {
        backgroundColor:COLORS.white,
        width: '22.5%',
        height: hp(7),
        borderRadius: 15,
        //marginTop: hp(1),
        marginVertical:hp(1),
        marginLeft:wp(2),
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.35,
        shadowRadius: 2.62,
    },
    timePressedBtnView: {
        backgroundColor:COLORS.purple,
        width: '22.5%',
        height: hp(7),
        borderRadius: 15,
        marginVertical:hp(1),
        marginLeft:wp(2),
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.35,
        shadowRadius: 2.62,
    },
    timeBookedBtnView: {
        backgroundColor:'#D0D0D0',
        width: '22.5%',
        height: hp(7),
        borderRadius: 15,
        marginVertical:hp(1),
        marginLeft:wp(2),
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.35,
        shadowRadius: 2.62,
    },
    SelectedTimeCheck: {
        borderWidth: .1,
        borderBottomColor: COLORS.white,
        backgroundColor: COLORS.white,
        borderRadius: 20,
        position: 'absolute',
        top: hp(5.5),
        left:wp(9)
    },
    timeBtnText: {
        color: COLORS.black,
        fontFamily: 'Cairo-Regular'
    },
    timePressedBtnText: {
        color: COLORS.white,
        fontFamily: 'Cairo-Regular'
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