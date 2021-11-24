import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    Platform,
    Pressable
} from 'react-native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp
} from 'react-native-responsive-screen';

// Import Icons
import Icon from 'react-native-vector-icons/MaterialIcons';
import Icon1 from 'react-native-vector-icons/FontAwesome';


const Header = ({ HeaderText, leftIconName, rightIconName, leftIconOnPress, rightIconOnPress }) => {
    return (
        <View style={styles.container}>
            {Platform.OS === 'ios' ?
                <Pressable
                    style={styles.leftIcon}
                    onPress={leftIconOnPress}>
                    <Icon name={leftIconName} size={30} color="#0099CC" />
                </Pressable>
                :
                <View></View>}
            <View>
                <Text style={styles.headertext}> {HeaderText} </Text>
            </View>

            <Pressable
                style={styles.rightIcon}
                onPress={rightIconOnPress}>
                <Icon name={rightIconName} size={30} color="#0099CC" />
            </Pressable>


        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        height: hp(10),
        width: '100%',
        backgroundColor: '#CCE5FF',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#0099CC',
        flexDirection: 'row'

    },
    headertext: {
        color: '#0099CC',
        marginTop: Platform.OS === 'android' ? hp(3) : hp(2),
        fontSize: Platform.OS === 'ios' ? hp(3.1) : hp(2.8),
    },
    leftIcon: {
        marginLeft: wp(5),
        marginTop: Platform.OS === 'android' ? hp(3) : hp(2)
    },
    rightIcon: {
        marginRight: wp(5),
        marginTop: Platform.OS === 'android' ? hp(3) : hp(2)
    },
});
export default Header;
