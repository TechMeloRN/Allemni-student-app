import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp
} from 'react-native-responsive-screen';
import CheckBox from 'react-native-vector-icons/MaterialIcons';

const RadioButton = ({ mainText, firstRadioBtnName, secondRadioBtnName, onCheck }) => {
    return (
        <View style={{ width: wp(80), height: hp(12) }}>
            <Text style={styles.textInputText}> {mainText} </Text>
            <View style={{ flexDirection: 'row', marginTop: hp(1) }}>
                <View style={{ width: wp(40) }}></View>
                <View style={{ flexDirection: 'row', width: wp(15), justifyContent: 'space-between' }}>
                    <Text style={{ color: '#0099CC', fontSize: 15, }}> {firstRadioBtnName} </Text>
                    <CheckBox name={onCheck} size={30} color="#0099CC" />
                </View>

                <View style={{ flexDirection: 'row', width: wp(15), justifyContent: 'space-between', marginLeft: wp(10) }}>
                    <Text style={{ color: '#0099CC', fontSize: 15, }}> {secondRadioBtnName} </Text>
                    <CheckBox name={onCheck} size={30} color="#0099CC" />
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    textInputView: {
        width: '100%',
        height: hp(6),
        borderWidth: 2,
        borderColor: '#0099CC',
        marginTop: hp(1)
    },
    textInput: {
        width: '90%',
        height: hp(6),
        alignSelf: 'center',
        color: '#0099CC',
        fontSize: 18

    },
    textInputView: {
        height: hp(15),
        width: '80%',
        alignSelf: 'center',
        marginBottom: hp(-3)

    },
    textInputText: {
        color: '#0099CC',
        fontSize: 15,
        alignSelf: 'flex-end',

    },
});
export default RadioButton;
