import React, { useState, useEffect,} from 'react';
import {
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
  Dimensions,
  Image,
  ImageBackground,
  StatusBar,
  Platform
} from 'react-native';
import { firebase } from '@react-native-firebase/database';

import firebaseConfig from '../../firebaseConfig'

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
//import notifee from '@notifee/react-native';
import { COLORS } from '../../assets/Styles/color.js'

//Icons Imports
import headerBackground from '../../assets/Images/background/headerBackground.png'
import backBtnIcon from '../../assets/Images/icons/btnIcon.png'
import notificationIcon from '../../assets/Images/icons/notificationIcon.png'
import attachIcon from '../../assets/Images/icons/attachIcon.png'
import sendMessageIcon from '../../assets/Images/icons/sendMessageIcon.png'

import landscapeLogo from '../../assets/Images/logo/landscapeIcon.png'
import teacherIcon from '../../assets/Images/Image/teacherIcon.png'

const ChatComponent = ({ navigation, route }) => {
  //Firebase Connection
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }



  let listViewRef;  // Auto Scrollend Ref
  const [messages, setMessages] = useState([]);
  const [newText, setnewText] = useState('');
  const [orientation, setorientation] = useState('');
  

  const [oldLength, setoldLength] = useState(0);
  const [newLength, setnewLength] = useState(0);
  const [count, setcount] = useState('');

  useEffect(() => {
    getOrientation()

  
    // newTextNotification()
    Dimensions.addEventListener('change', getOrientation);
    getAllMessages();
    setMessages([

      // {
      //   _id: 2,
      //   text: 'Hello',
      //   createdAt: new Date(),
      //   nickname: 'Student',
      // },
    ]);

  
  }, []);


  // Screen Orientation 
  const getOrientation = () => {
    if (Dimensions.get('window').width < Dimensions.get('window').height) {
      setorientation('portrait');
    } else {
      setorientation('Landscape');
    }
  };

  //Get Messages from fireBase
  const getAllMessages = async () => {
    
    await firebase
      .database()
      .ref('chats').orderByChild('roomname').equalTo('TeacherRoom')
      .on('value', snapshot => {
        var li = [];
        snapshot.forEach(child => {
          li.push({
            _id: child.val()._id,
            nickname: child.val().nickname,
            roomname: child.val().roomname,
            text: child.val().text,
            time: child.val().time,
            date: child.val().date,
          });

        });
        setMessages([]);
        setMessages(li);
        setcount(li[li.length - 1])
        setnewLength(li.length)
        return li;
      });
  };

  //Save Chat in FireBase

  const sendMessage = () => {
    //  console.log('onsend' + JSON.stringify(messages));
    var Record = firebase.database().ref('chats');
    let newData = {
      _id: Math.floor(Math.random() * 100000) + 1,
      text: newText,
      roomname: 'TeacherRoom',
      nickname: 'Student',
      time: time,
      date: date,
      platform:Platform.OS
    };
    Record.push(newData);
    getAllMessages();
    setnewText('');
  };

  //Current Time in Custom Format
  var d = new Date();
  var hr = d.getHours();
  var min = d.getMinutes();

  if (hr > 12) {
    hr = hr % 12
    if (hr < 10)
      hr = '0' + hr
    if (min < 10)
      min = '0' + min
    var time = hr + ':' + min + ' pm';
  }
  else
    var time = hr + ':' + min + ' am';

//Current Date in Custom Format
  var day = d.getDay();
  var mon = d.getMonth();
  var yr = d.getFullYear();

  if (mon < 10)
    mon = '0' + mon
  if (day < 10)
    day = '0' + day

  var date = day + '/' + mon + '/' + yr;

  //Auto Scrollend Func  
  const EndListHandler=()=>{
    listViewRef.scrollToEnd({animated:false})
  }
  // console.log('newValue: ' + newLength);
  // console.log('oldValue: ' + oldLength);
  // console.log('Count: ' + JSON.stringify(count));
  
  return (
    <View behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.container}>
      <StatusBar barStyle='light-content' backgroundColor={COLORS.purple} />
      {/* Header code*/}
      <ImageBackground source={headerBackground} style={styles.headerBackgroundImage}>
        {/* back Button */}
        <Pressable onPress={() => navigation.goBack()} style={styles.backButtonView}>
          <Image style={styles.backButton} source={backBtnIcon} />
        </Pressable>

        {/* Notification Button */}
        <Pressable onPress={() => {EndListHandler()}} style={styles.backButtonView}>
          <Image style={styles.backButton} source={notificationIcon} />
        </Pressable>

        <Text style={[styles.headerText,{width:orientation=='portrait'? '30%':'60%'}]}> محادثة المعلم </Text>

        <Image style={styles.landscapeLogo} source={landscapeLogo} />

      </ImageBackground>
      
      <View style={styles.mainContent}>
        <FlatList
          data={messages}
          onContentSizeChange={()=>EndListHandler()}
          ref={(ref) => {listViewRef = ref}}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => {
            return (
              <Pressable
                onPress={() => console.warn(item.nickname)}
                style={[
                  styles.chatItem,
                  {
                    alignSelf:
                      item.nickname == 'Teacher' ? 'flex-start' : 'flex-end',
                    backgroundColor:
                      item.nickname == 'Teacher' ? '#E0E0E0' : '#e7f0ff',
                    marginLeft: item.nickname == 'Teacher' ? wp(5) : 0,
                    marginRight: item.nickname == 'Teacher' ? 0 : wp(5),
                   
                  },
                ]}>
                <Text
                  style={[
                    styles.itemText,
                    {
                      color:
                        item.nickname == 'Teacher' ? '#000' : '#000',
                      
                    },
                  ]}>
                  {' '}
                  {item.text}{' '}
                </Text>

                <Text
                  style={[
                    styles.itemTime,
                    {
                      alignSelf:
                        item.nickname === 'Teacher' ? 'flex-end' : 'flex-start',
                      color:
                        item.nickname === 'Teacher' ? COLORS.lightgrey : COLORS.lightgrey
                    },
                  ]}>
                  {' '}
                  {item.time}{' '}
                </Text>
              </Pressable>
            );
          }}
        />
      </View>
      <View style={styles.bottomView}>
        <Pressable onPress={() => sendMessage()} >
          <Image style={styles.bottomSendIcon} source={sendMessageIcon} />
        </Pressable>
        <TextInput
          placeholder="ادخل رسالة "
          placeholderTextColor="grey"
          onChangeText={val => setnewText(val)}
          style={[styles.bottomInputText, { width: orientation == 'Landscape' ? '70%' : '70%' }]}
          value={newText}
        />
        <Pressable onPress={() => alert("Attach Files!")} >
          <Image style={styles.bottomAttachIcon} source={attachIcon} />
        </Pressable>
      </View>
    </View>
  );
};

export default ChatComponent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  mainContent: {
    flex: 1,
    marginBottom: hp(0.2),
    elevation: 5,
  },
  headerBackgroundImage:{ 
    width: '100%', 
    height: Platform.OS === 'ios' ? hp(16) : hp(12), 
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'space-evenly'
   },
   headerText:{ 
     color: '#fff', 
     fontSize: 18, 
     marginTop: hp(3), 
     textAlign: 'center', 
     marginTop: Platform.OS === 'ios' ? hp(3) : hp(0), 
    },

  chatItem: {
    width: wp('60%'),
    padding: hp(1.5),
    backgroundColor: 'grey',
    marginTop: hp(1),
    borderRadius: hp(5),
    alignItems: 'center',
    justifyContent: 'center',
  },
  left_RightShape: {
    height: hp(2),
    width: wp(5),
    backgroundColor: 'skyblue',
    position: 'absolute',
  },
  bottomView: {
    height:Platform.OS==='ios'? hp(8.5):hp(7),
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F0F0F0',
    justifyContent: 'space-evenly'
  },
  bottomInputText: {
    width: '50%',
    borderRadius: hp(4),
    height: hp(5),
    color: '#000',
    fontSize: hp(1.7),
    backgroundColor: '#fff',
    textAlign:'right'
  },
  itemText: {
    fontSize: hp(1.8),
  },
  itemTime: {
    color: '#0099CC',
    fontWeight: 'bold',
    fontSize: hp(1.2),
    marginTop: hp(1),
  },
  backButtonView: {
    height: hp(10),
    marginTop: Platform.OS === 'ios' ? hp(8) : hp(2)
  },
  backButton: {
    height: hp(6),
    width: Platform.OS === 'ios' ? wp(13.2) : wp(12.5),
    marginTop: Platform.OS === 'ios' ? hp(0) : hp(1)
  },
  landscapeLogo: {
    height: hp(5),
    marginTop: Platform.OS === 'ios' ? hp(3) : hp(0),
    width: Platform.OS === 'ios' ? wp(30.2) : wp(30.2),
  },
  bottomSendIcon: {
    height: hp(4.1),
    width: Platform.OS === 'android' ? wp(8.5) : wp(8.6)
  },
  bottomAttachIcon: {
    height: hp(4),
    width: Platform.OS === 'android' ? wp(4.1) : wp(4.2)
  }
});
