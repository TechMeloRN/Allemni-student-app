import React from 'react';
import { View, Text, StyleSheet, Pressable, Platform } from 'react-native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp
} from 'react-native-responsive-screen';

const PressableButton = ({ btnText, onPressProps }) => {
    return (
        <Pressable style={styles.menuBtn} onPress={onPressProps}>
            <Text style={styles.menuText}> {btnText} </Text>
        </Pressable>
    );
};

const styles = StyleSheet.create({
    menuBtn: {
        height: hp(6),
        width: wp('100%'),
        justifyContent: 'center'
    },
    menuText: {
        alignSelf: 'flex-end',
        marginRight: wp(10),
        fontSize: Platform.OS === 'ios' ? hp(2.4) : hp(2.3),
        color: '#0099CC',
    }
});
export default PressableButton;
