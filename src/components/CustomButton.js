import React from 'react';
import {Text, StyleSheet, Pressable } from 'react-native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp
} from 'react-native-responsive-screen';

const CustomButton = ({ btnText, onPress,backgroundColor,textColor }) => {
    return (
        <Pressable 
            style={[styles.btnView,{backgroundColor: backgroundColor}]} 
            onPress={onPress}>
                <Text style={[styles.btnText,{color: textColor}]}> {btnText} </Text>
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
        fontSize: Platform.OS === 'android' ? hp(1.9) : hp(1.9),
        fontFamily:'Cairo-Medium'
    },
});
export default CustomButton;
