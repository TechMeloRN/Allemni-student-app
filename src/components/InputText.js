import React from 'react';
import { View, StyleSheet, TextInput } from 'react-native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp
} from 'react-native-responsive-screen';

const InputText = ({ placeHolder, onChangeText, value, keyboardType, maxLength }) => {
    return (
        <View style={styles.textInputView}>
            <TextInput
                style={styles.textInput}
                placeholder={placeHolder}
                placeholderTextColor={'#CCE5FF'}
                onChangeText={onChangeText}
                value={value}
                keyboardType={keyboardType}
                maxLength={maxLength}

            />
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

    }
});
export default InputText;
