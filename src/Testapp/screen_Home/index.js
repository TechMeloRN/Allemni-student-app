import React,{useState} from 'react'
import { StyleSheet, Text, View,SafeAreaView, Pressable } from 'react-native'
import { TextInput } from 'react-native-gesture-handler'
import Axios from 'react-native-axios'
const index = ({navigation}) => {

    const [email,setEmail] =useState('student@Allemni.com');
    const [password,setPassword] =useState('123456');

    const login=()=>{
        Axios.post("https://test.nadvertex.com/allemni/api/student-login", {
      email: email,
      password: password,
    })
      .then(function (response) {
        console.warn(JSON.stringify(response));
        if (response.data !== "user not found") {
          navigation.navigate('MenuScreen')
        } else {
          alert("incoreect passord or user name");
        }
      })
      .catch(function (error) {
        console.log(error);
        alert("api fault");
      });
    }

    return (
        <SafeAreaView style={styles.container}>
            <Text style={{color:'#0099CC',fontWeight:'bold',fontSize:30,marginTop:'-80%'}}> Login </Text>

            <View 
                style={{
                    flexDirection:'row',
                    height:50,
                    width:'80%',
                    alignItems:'center',
                    justifyContent:'space-evenly',
                    borderWidth:1,
                    borderColor:'#0099CC',
                    marginTop:20
                    
                    }}>
                <Text style={{color:'#0099CC'}}> Email </Text>
                <TextInput 
                    placeholder='Enter Email' 
                    placeholderTextColor='#0099CC'
                    value={email} 
                    onChangeText={(val)=>setEmail(val)}
                    style={{width:'60%',color:'#0099CC'}}
                    />
            </View>

            <View 
                style={{
                    flexDirection:'row',
                    height:50,
                    width:'80%',
                    alignItems:'center',
                    justifyContent:'space-evenly',
                    borderWidth:1,
                    borderColor:'#0099CC',
                    marginTop:20
                    
                    }}>
                <Text style={{color:'#0099CC'}}> Password </Text>
                <TextInput 
                    placeholder='Enter Password' 
                    placeholderTextColor='#0099CC'
                    value={password} 
                    onChangeText={(val)=>setPassword(val)}
                    style={{width:'60%',color:'#0099CC'}}
                    />
            </View>

            <Pressable onPress={()=>login()} style={styles.button} >
                <Text style={{color:'#0099CC'}}> Login </Text>
            </Pressable>
        </SafeAreaView>
    )
}

export default index

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    },
    button:{
        height:50,
        width:'40%',
        borderWidth:1,
        borderColor:'#0099CC',
        alignItems:'center',
        justifyContent:'center',
        marginTop:30
    },
})
