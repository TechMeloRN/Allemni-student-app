import React, { useEffect } from 'react'
import {
    StyleSheet,
    Text,
    View,
    ImageBackground,
    Image,
    StatusBar,
    Pressable,
    Platform,
    BackHandler,
    ScrollView,
} from 'react-native'

import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp
} from 'react-native-responsive-screen';
import { COLORS } from '../../assets/Styles/color.js'
import backgroundImage from '../../assets/Images/background/backgroundImage.png'
import logo from '../../assets/Images/logo/logo.png'
import engLanguage from '../../assets/Images/icons/engLanguage.png'

import CustomButton from '../../components/CustomButton.js';

const index = ({ navigation }) => {
    useEffect(() => {
        const backHandler = BackHandler.addEventListener('hardwareBackPress', () => true)
        return () => backHandler.remove()
    }, [])
    return (
        <ImageBackground style={styles.container} source={backgroundImage}>

            <StatusBar barStyle='light-content' backgroundColor={COLORS.purple} />
            <ScrollView style={{flex:1}}>
            <Pressable style={[styles.languageViewIcon, { marginTop: Platform.OS === 'ios' ? hp(5) : hp(2) }]}>
                <Image style={styles.languageIcon} source={engLanguage} />
            </Pressable>
            <View >
                <Image style={styles.logoImage} source={logo} />
            </View>

            <View style={styles.contentView}>
                <Text style={[styles.btnText,{fontSize:hp(2.5),fontFamily:'Cairo-SemiBold'}]}> مرحبا </Text>
                <Text style={[styles.btnText,{fontSize:hp(1.9)}]}> سجل معنا لحجز معلمک </Text>

                <CustomButton 
                    btnText='اُنشی حسابک' 
                    backgroundColor={COLORS.yellow} 
                    textColor={COLORS.white} 
                    onPress={() => navigation.navigate('SignUpScreen')} 
                />
                
                <CustomButton 
                    btnText='سجل دخولک' 
                    backgroundColor={COLORS.white} 
                    textColor={COLORS.purple} 
                    onPress={() => navigation.navigate('NewLoginScreen')} 
                />

                <Pressable onPress={() => alert('اکتشف علمنی دون الدخول')} style={{ marginTop: hp(3) }}>
                    <Text style={[styles.btnText, { textDecorationLine: 'underline', }]}> اکتشف علمنی دون الدخول </Text>
                </Pressable>
            </View>

            </ScrollView>
        </ImageBackground>
    )
}

export default index

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.white
    },
    languageViewIcon: {
        width: wp(20),
        height: hp(10),
        marginLeft: wp(4)
    },
    languageIcon: {
        height: '100%',
        width: '100%',
        alignSelf:'flex-start'
    },
    logoImage: {
        height: Platform.OS === 'ios' ? hp(22) : hp(22),
        width: wp(36),
        alignSelf:'center'
    },
    contentView: {
        width: '100%',
        alignItems: 'center',
        marginTop: hp(4),
        alignSelf:'center'
    },
   
    btnText: {
        color: COLORS.white,
        fontSize: hp(1.8),
        fontFamily:'Cairo-Medium'
    },


})
