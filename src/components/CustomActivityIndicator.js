import React from 'react';
import {StyleSheet, Pressable,ActivityIndicator } from 'react-native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp
} from 'react-native-responsive-screen';

const CustomActivityIndicator = ({ backgroundColor,color }) => {
    return (
        <Pressable 
            style={[styles.btnView,{backgroundColor: backgroundColor}]} 
            >
               <ActivityIndicator size="small" color={color} />
        </Pressable>
    );
};

const styles = StyleSheet.create({
    btnView: {
        width: wp(80),
        height: hp(7),
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: hp(2)
    },
    btnText: {
        fontSize: Platform.OS === 'android' ? hp(1.6) : hp(1.7),
    },
});
export default CustomActivityIndicator;
