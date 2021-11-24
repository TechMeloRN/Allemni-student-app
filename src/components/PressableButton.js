import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp
} from 'react-native-responsive-screen';

const PressableButton = ({ btnText, onPressProps }) => {
    return (
        <Pressable style={styles.btnView} onPress={onPressProps}>
            <Text style={styles.btnText}> {btnText} </Text>
        </Pressable>
    );
};

const styles = StyleSheet.create({
    btnView: {
        width: wp(60),
        alignSelf: 'center',
        height: hp(7),
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2,
        borderColor: '#0099CC',
        //marginTop: 20
    },
    btnText: {
        color: '#0099CC',
        fontSize: 18
    },
});
export default PressableButton;
