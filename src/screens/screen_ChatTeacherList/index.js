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
//import Icon from 'react-native-vector-icons/Feather';
import { firebase } from '@react-native-firebase/database';

//import firebaseConfig from '../../firebaseConfig'
// Custom Components imports 

import { COLORS } from '../../assets/Styles/color.js'
import headerBackground from '../../assets/Images/background/headerBackground.png'
import backBtnIcon from '../../assets/Images/icons/btnIcon.png'
import notificationIcon from '../../assets/Images/icons/notificationIcon.png'

import landscapeLogo from '../../assets/Images/logo/landscapeIcon.png'
import teacherIcon from '../../assets/Images/Image/teacherIcon.png'

//Tab Icons 
import moreFalseIcon from '../../assets/Images/icons/moreFalseIcon.png'
import moreTrueIcon from '../../assets/Images/icons/moreTrueIcon.png'

import homeFalseIcon from '../../assets/Images/icons/homeFalseIcon.png'
import homeTrueIcon from '../../assets/Images/icons/homeTrueIcon.png'


import messagesFalseIcon from '../../assets/Images/icons/messagesFalseIcon.png'
import messagesTrueIcon from '../../assets/Images/icons/messagesTrueIcon.png'

import classFalseIcon from '../../assets/Images/icons/classFalseIcon.png'
import classTrueIcon from '../../assets/Images/icons/classTrueIcon.png'

const index = ({ navigation }) => {
    //Firebase Connection
    var firebaseConfig = {
        apiKey: 'AIzaSyDyFLk0rxcwxARKiW5DGGV6h-2oKdWoF5Q',
        authDomain: 'test-4d242.firebaseapp.com',
        databaseURL: 'https://test-4d242-default-rtdb.firebaseio.com',
        projectId: 'test-4d242',
        storageBucket: 'test-4d242.appspot.com',
        messagingSenderId: '528051497651',
        appId: '1:528051497651:web:e00c4704142e1d44435ec6',

        measurementId: 'G-FM8JWDX8ZB',
    };
    if (!firebase.apps.length) {
        firebase.initializeApp(firebaseConfig);
    }

    const [TeachersName, setTeachersName] = useState([
        // {
        //     id: 1,
        //     name: 'سعود ابراہیم حمندی',
        //     text: 'السلام علیکم، ابی ااجل الخصة القارمة عشان '
        // },
    ]);

    const [orientation, setorientation] = useState('');

    useEffect(() => {
        ShowTeachers();
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
    //Get Teacher list from Database
    const ShowTeachers = () => {
        firebase
            .database()
            .ref('Teachers')
            .on('value', snapshot => {
                var li = [];
                snapshot.forEach(child => {
                    li.push({
                        _id: child.val()._id,
                        name: child.val().name,
                    });
                });

                setTeachersName([]);
                setTeachersName(li);
                return li;
            });
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

                <Text style={[styles.headerText,{width:orientation=='portrait'? wp(30):'60%'}]}> البحث النصي </Text>

                <Image style={orientation == 'portrait' ? styles.portraitLogo : styles.landscapeLogo} source={landscapeLogo} />

            </ImageBackground>





            <View style={styles.mainContent}>
                <FlatList
                    data={TeachersName}
                    keyExtractor={item => item._id}
                    renderItem={({ item }) => {
                        return (
                            <Pressable
                                style={styles.mainItemBtn}
                                onPress={() => navigation.navigate('ChatMessage', { name: item.name })}>

                                <View
                                    style={styles.massageTextView}>
                                    <Text style={styles.massageText}>
                                        {item.name}
                                    </Text>
                                    <Text
                                        style={[
                                            styles.massageText,
                                            {
                                                fontSize: 14,
                                                marginTop: hp(.5),
                                                fontWeight: 'normal'
                                            }]
                                        }>{item.text}</Text>
                                </View>
                                <View
                                    style={styles.iconView}>
                                    <View
                                        style={styles.iconSubView}>
                                        <Image style={styles.teacherImage} source={teacherIcon} />
                                    </View>
                                </View>

                            </Pressable>


                        )
                    }}

                />

            </View>

            <View style={styles.bottomTabView}>
                <Pressable
                    onPress={() => navigation.navigate("MenuScreen")}
                    style={[styles.bottomTabButton, { borderTopLeftRadius: hp(3) }]
                    }>
                    <Image style={[styles.bottomIcon, { height: hp(1),marginTop:hp(2) }]} source={moreFalseIcon} />
                    <Text  style={[styles.menuButtonText]}> المزید</Text>
                </Pressable>

                <Pressable
                    onPress={() => navigation.navigate('ChatTeacherList')}
                    style={styles.bottomTabButton}>
                    <Image style={[styles.bottomIcon, { height: hp(3) }]} source={messagesTrueIcon} />
                    <Text style={[styles.menuButtonText,{color:COLORS.purple}]}> الرسائل</Text>
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
        alignItems: 'center'

    },
    portraitHeaderView: {
        width: wp(100),
        height:Platform.OS==='android'? hp(10):hp(13),
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
    contactHeadingView: {
        height: hp(5),
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center'
    },
    contactHeadingText: {
        color: '#0099CC',
        fontSize: 18
    },
    mainItemBtn: {
        height: hp(10),
        width: '95%',
        flexDirection: 'row',
        marginTop: hp(2),
        borderBottomWidth: 1,
        borderBottomColor: '#d0d0d0',
    },
    massageTextView: {
        width: '75%',
        height: hp(10),

    },
    massageText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#000',
        alignSelf: 'flex-end'
    },
    iconView: {
        width: wp(25),
        height: hp(9),
        justifyContent: 'center',
        alignItems: 'center'
    },
    iconSubView: {
        height: hp(9),
        width: wp(19),
        borderRadius: 180,
        justifyContent: 'center',
        alignItems: 'center', marginRight: wp(2)
    },
    
    bottomTabView: {
        backgroundColor: COLORS.white,
        height: hp(8),
        width:'100%',
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
        marginTop:Platform.OS==='ios'?hp(.5):0
    },
    menuButtonText:{
        color:COLORS.black ,
        fontFamily: 'Cairo-Regular'
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