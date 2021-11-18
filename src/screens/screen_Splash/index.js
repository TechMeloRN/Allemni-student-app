import React, { useEffect } from 'react'
import { StyleSheet, Text, View, ImageBackground, Image, StatusBar } from 'react-native'
import backgroundImage from '../../assets/Images/background/backgroundImage.png'
import logo from '../../assets/Images/logo/logo.png'
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp
} from 'react-native-responsive-screen';
import auth from '@react-native-firebase/auth';
const index = ({ navigation }) => {

    useEffect(() => {
//         auth()
//   .signInAnonymously()
//   .then(() => {
//     navigation.navigate('NewInitialScreen')
//   })
//   .catch(error => {
//     if (error.code === 'auth/operation-not-allowed') {
//       console.log('Enable anonymous in your firebase console.');
//     }

//     console.error(error);
//   });
        setTimeout(() => { navigation.navigate('NewInitialScreen') }, 3000)
    })
    return (
        <ImageBackground style={styles.container} source={backgroundImage}>
            <StatusBar barStyle='light-content' />
                <View style={styles.logoImage}> 
                    <Image style={{height:'100%',width:'100%'}} source={logo} />
                </View>
        </ImageBackground>
    )
}

export default index

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff'
    },
    logoImage:{
        height: Platform.OS === 'ios' ? hp(22) : hp(23), 
        width: wp(36) 
    },
    
})
