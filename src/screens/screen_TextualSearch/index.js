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
    TextInput
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
import landscapeLogo from '../../assets/Images/logo/landscapeIcon.png'
import backButton from '../../assets/Images/icons/btnIcon.png'
import teacherIcon from '../../assets/Images/Image/teacherIcon.png'

//Screens Icons
import onSite from '../../assets/Images/icons/onSiteTrue.png'
import bookPurpleIcon from '../../assets/Images/icons/bookPurpleIcon.png'
import bookWhiteIcon from "../../assets/Images/icons/bookWhiteIcon.png"
import subjectsAvatar from '../../assets/Images/Image/subjectsAvatar.png'

//BottomTab Icons 
import moreFalseIcon from '../../assets/Images/icons/moreFalseIcon.png'
import homeTrueIcon from '../../assets/Images/icons/homeTrueIcon.png'
import messagesFalseIcon from '../../assets/Images/icons/messagesFalseIcon.png'
import classFalseIcon from '../../assets/Images/icons/classFalseIcon.png'


const index = ({ navigation, route }) => {

    const [orientation, setorientation] = useState('');
    const [selectedId, setselectedId] = useState(null);
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
        // {
        //     id: 2,
        //     name: 'رشاد محمود الحلوانی',
        //     image: teacherIcon,
        //     status: 'مقتش عام',
        //     stars: 1.5,
        //     courseRate: 150,
        //     detail: 'الأستاذ رشاد مدرس تاريخ وجغرافيا دو خبرة تزيد على العشرين عامافي المرحلتين الابتدائية والإعدادية في أكثر من مدرسة على مستوى المملكة والبحرين والكويت'

        // },
        // {
        //     id: 3,
        //     name: 'عبید عبداللہ المدوانی',
        //     image: teacherIcon,
        //     status: 'مدرس ابتدائی',
        //     stars: 2.5,
        //     courseRate: 130,
        //     detail: 'الأستاذ رشاد مدرس تاريخ وجغرافيا دو خبرة تزيد على العشرين عامافي المرحلتين الابتدائية والإعدادية في أكثر من مدرسة على مستوى المملكة والبحرين والكويت'

        // },
        // {
        //     id: 4,
        //     name: 'رشاد محمود الحلوانی',
        //     image: teacherIcon,
        //     status: 'مقتش عام',
        //     stars: 1,
        //     courseRate: 160,
        //     detail: 'الأستاذ رشاد مدرس تاريخ وجغرافيا دو خبرة تزيد على العشرين عامافي المرحلتين الابتدائية والإعدادية في أكثر من مدرسة على مستوى المملكة والبحرين والكويت'

        // }
    ]);

    const [subjects, setsubjects] = useState([
        {
            id: 1,
            Title: 'ریاضیات',
            level:'اولی متوسط'
        },
        {
            id: 2,
            Title: 'ریاضیات متقدمۃ ۔ جبرواحصائ',
            level:'اولی ثانی'
        },
        {
            id: 3,
            Title: 'ریاضیات متقدمۃ',
            level:'ثانی متوسط'
        },
        {
            id: 4,
            Title: 'جبرواحصائ',
            level:'ثانی متوسط'
        }
       

    ])


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

                <Pressable onPress={() => navigation.goBack()} style={styles.backButtonView}>
                    <Image style={styles.backButton} source={backButton} />
                </Pressable>

                <Pressable onPress={() => alert('Notification')} style={styles.backButtonView}>
                    <Image style={styles.backButton} source={notificationIcon} />
                </Pressable>

                <Text style={[styles.headerText,{width:orientation=='portrait'? wp(30):'60%'}]}> البحث النصي </Text>

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
                        <Material name='search' size={hp(3)} color={COLORS.purple} />
                        <TextInput placeholder='ابحث ھنا' placeholderTextColor={COLORS.purple} style={{ color: COLORS.purple, textAlign: 'right', width: '85%' }} />
                        
                    </View>
                </View>

                {/* <ScrollView style={{marginTop:hp(2)}} > */}

                    
                    <View style={[styles.contentTextView,{marginTop:hp(1)}]}>
                        <Text style={styles.contentText}>  مدرسون </Text>
                        <Image style={{height:hp(3),width:wp(6),marginRight:wp(2)}} source={onSite} />
                    </View>

                    {/* Teacher detail */}
                <View style={{ height:hp(20),marginTop:hp(1) }}>
                    <FlatList
                        data={teacherData}
                        renderItem={({ item, index }) => (
                            <View style={[styles.teacherInfoView]}>
                                <View style={styles.teacherInfoSubView}>
                                    <View style={styles.courseRateView}>
                                        <View style={styles.courseRateSubView}>
                                            <Text style={{ color: COLORS.purple }}> {item.courseRate + " " + "ر۔س"}</Text>
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
                                        <Text style={[styles.teacherNameText,{ color: COLORS.purple}]}>{item.status}</Text>
                                    </View>
                                    <View style={styles.teacherImageView}>
                                        <View style={{ height: hp(12), width: wp(24) }}>
                                            <Image style={{ height: '100%', width: '100%' }} source={teacherIcon} />
                                        </View>
                                    </View>
                                </View>
                                {selectedId!== item.id ?
                                    <Pressable 
                                        onPress={() => {
                                            setselectedId(item.id)
                                            }}
                                        style={styles.moreDetailView}>
                                        <Material name='keyboard-arrow-down' size={hp(3)} color={COLORS.white} />
                                        <Text style={{ color: COLORS.white }}> تفاصیل </Text>
                                    </Pressable>
                                    :
                                    <View style={styles.teacherDetailView}>
                                        <Text style={styles.teacherDetailText}> {item.detail} </Text>
                                        <Material 
                                            name='keyboard-arrow-up'
                                            onPress={()=>setselectedId(null)} 
                                            size={hp(3)} 
                                            color={COLORS.purple} 
                                            style={{alignSelf:'center'}} />
                                    </View>}
                            </View>
                        )}
                        keyExtractor={(item) => item.id}
                        extraData={selectedId}
                    />
                   
                    </View>

                    <View style={[styles.contentTextView]}>
                        <Text style={styles.contentText}> مواد </Text>
                        <Image style={{height:hp(2.5),width:Platform.OS==='android'? wp(6.3):wp(6.5),marginRight:wp(2)}} source={bookPurpleIcon} />
                    </View>
                    
                    {/* <View style={{flex:1,marginBottom:hp(1)}}> */}

                    
                    <FlatList
                        data={subjects}
                        renderItem={({ item, index }) => (
                            <View style={styles.subjectInfoView}>
                                <View style={styles.subjectInfoSubView}>
                                    
                                    <View style={[styles.subjectBasicInfo]}>
                                        <Text style={styles.subjectTitleText}>{item.Title}</Text>

                                        <Text style={[styles.subjectTitleText,{ color: COLORS.purple}]}>{item.level}</Text>
                                    </View>
                                    <View style={styles.subjectImageView}>
                                        <View style={{ height: hp(10), width: wp(20) }}>
                                            <Image style={{ height: '100%', width: '100%' }} source={subjectsAvatar} />
                                        </View>
                                    </View>
                                </View>
                               
                            </View>
                        )}
                        keyExtractor={(item) => item.id}
                        extraData={selectedId}
                    />
                {/* </View> */}
                 
                    

                {/* </ScrollView> */}
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
        height:Platform.OS==='android'? hp(18):hp(22),
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
    contentTextView: {
        width: '100%',
        justifyContent: 'flex-end',
        alignItems:'center',
        flexDirection:'row',
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
        marginTop:hp(1),
    },
    contentText: {
        color: COLORS.purple,
        textAlign: 'right',
        fontSize: 15,
        marginRight: wp(0)
    },
    teacherInfoView: {
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        width: '95%',
        marginHorizontal:wp(1),
        marginTop:hp(1),
        borderRadius: 20,
        elevation: 20,
        shadowColor: '#000',
        shadowOffset: {
            width: 2,
            height: 3,
        },
        shadowOpacity: 0.35,
        shadowRadius: 9.62,
    },
    teacherInfoSubView:{ 
        height: hp(14), 
        width: '95%', 
        flexDirection: 'row', 
        borderBottomWidth: 1, 
        borderBottomColor: COLORS.ashewhite 
    },
    subjectInfoView:{ 
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        width: '95%',
        marginHorizontal:wp(1),
        marginTop:hp(1),
        borderRadius: 20,
        elevation: 20,
        shadowColor: '#000',
        shadowOffset: {
            width: 2,
            height: 3,
        },
        shadowOpacity: 0.35,
        shadowRadius: 9.62,
        borderWidth:1,
        borderColor:'#C0C0C0'
    },
    subjectInfoSubView:{ 
        height: hp(12), 
        width: '100%', 
        flexDirection: 'row',
        

    },
    subjectBasicInfo:{ 
        width: '70%', 
        justifyContent: 'center', 
        alignItems: 'flex-end' ,
        borderRadius:20
    },
    subjectImageView:{
        width: '30%', 
        justifyContent: 'center', 
        alignItems: 'center' ,
    },
    subjectTitleText:{ 
        color: COLORS.black, 
        textAlign: 'center', 
        fontSize:hp(2) ,
        marginTop:Platform.OS==='android'? hp(1):0
    },
    courseRateView:{ 
        width: '30%', 
        borderTopLeftRadius: 20, 
        justifyContent: 'center', 
        alignItems: 'center' 
    },
    courseRateSubView:{ 
        height: hp(4.8), 
        width: '80%', 
        justifyContent: 'center', 
        alignItems: 'center', 
        backgroundColor: COLORS.ashewhite, 
        borderRadius: 20 
    },
    teacherBasicInfo:{ 
        width: '40%', 
        justifyContent: 'center', 
        alignItems: 'flex-end' 
    },
    teacherNameText:{ 
        color: COLORS.black, 
        textAlign: 'center', 
        marginRight: wp(4),
        fontSize:hp(2) ,
        //marginTop:hp(0)
    },
    starsView:{ 
        height: hp(3), 
        width: wp(6), 
        marginRight: wp(-1) 
    },
    teacherImageView:{
        width: '30%', 
        borderTopRightRadius: 20, 
        justifyContent: 'center', 
        alignItems: 'center' 
    },
    teacherDetailView:{
        width: '90%',
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        justifyContent: 'center',
        alignItems:'flex-end',
    },
    teacherDetailText:{
        textAlign:'right',
        color:COLORS.black
    },
    moreDetailView: {
        height: hp(5.5),
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