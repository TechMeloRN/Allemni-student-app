import React from 'react';
import {Text, StyleSheet, Pressable } from 'react-native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp
} from 'react-native-responsive-screen';



const RatingStar = (star) => {

    const [rating,setrating] =useState('0')

    const [star1,setstar1] = useState(0);
    const [star2,setstar2] = useState(0);
    const [star3,setstar3] = useState(0);
    const [star4,setstar4] = useState(0);
    const [star5,setstar5] = useState(0);

    const ratingStar=(star)=> {
        if(star===0){
            setstar1('star-outline')
            setstar2('star-outline')
            setstar3('star-outline')
            setstar4('star-outline')
            setstar5('star-outline')
        }
        else if(star ===1.5)
        {
            setstar1('star')
            setstar2('star-half-full')
            setstar3('star-outline')
            setstar4('star-outline')
            setstar5('star-outline')
        }
        else if(star ===2)
        {
            setstar1('star')
            setstar2('star')
            setstar3('star-outline')
            setstar4('star-outline')
            setstar5('star-outline')
        }
        else if(star ===2.5)
        {
            setstar1('star')
            setstar2('star')
            setstar3('star-half-full')
            setstar4('star-outline')
            setstar5('star-outline')
        }
        else if(star ===3)
        {
            setstar1('star')
            setstar2('star')
            setstar3('star')
            setstar4('star-outline')
            setstar5('star-outline')
        }
        else if(star ===3.5)
        {
            setstar1('star')
            setstar2('star')
            setstar3('star')
            setstar4('star-half-full')
            setstar5('star-outline')
        }
        else if(star ===4)
        {
            setstar1('star')
            setstar2('star')
            setstar3('star')
            setstar4('star')
            setstar5('star-outline')
        }
        else if(star ===4.5)
        {
            setstar1('star')
            setstar2('star')
            setstar3('star')
            setstar4('star')
            setstar5('star-half-full')
        }
        else 
        {
            setstar1('star')
            setstar2('star')
            setstar3('star')
            setstar4('star')
            setstar5('star')
        }
           
           
    }
    return (
        <View style={{ flexDirection: 'row' }}>
        <View style={{ height: hp(3), width: wp(6), marginRight: wp(-1) }}>
            <MaterialCommunity name={star1} size={hp(2.5)} color={COLORS.yellow} />
        </View>
        <View style={{ height: hp(3), width: wp(6), marginRight: wp(-1) }}>
            <MaterialCommunity name={star2} size={hp(2.5)} color={COLORS.yellow} />
        </View>
        <View style={{ height: hp(3), width: wp(6), marginRight: wp(-1) }}>
            <MaterialCommunity name={star3} size={hp(2.5)} color={COLORS.yellow} />
        </View>
        <View style={{ height: hp(3), width: wp(6), marginRight: wp(-1) }}>
            <MaterialCommunity name={star4} size={hp(2.5)} color={COLORS.yellow} />
        </View>
        <View style={{ height: hp(3), width: wp(6), marginRight: wp(-1) }}>
            <MaterialCommunity name={star5} size={hp(2.5)} color={COLORS.yellow} />
        </View>
    </View>
    );
};

const styles = StyleSheet.create({
    
});
export default CustomButton;
