import React, { Component } from 'react';
import {
    SafeAreaView,
    StyleSheet,
    View,
    Text,
    Dimensions,
    Pressable,
    Platform,
    StatusBar,
    ImageBackground,
    Image
} from 'react-native';

import {
    OT,
    OTSession,
    OTPublisher,
    OTSubscriber,
    OTSubscriberView,
} from 'opentok-react-native';

//import Icon2 from 'react-native-vector-icons/Feather';

import * as credentials from '../../config'

const dimensions = {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
};
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp
} from 'react-native-responsive-screen';
const mainSubscribersResolution = { width: 1280, height: 720 };
const secondarySubscribersResolution = { width: 352, height: 288 };

import { COLORS } from '../../assets/Styles/color.js'
import headerBackground from '../../assets/Images/background/headerBackground.png'
import backBtnIcon from '../../assets/Images/icons/btnIcon.png'
import notificationIcon from '../../assets/Images/icons/notificationIcon.png'

import landscapeLogo from '../../assets/Images/logo/landscapeIcon.png'
import teacherIcon from '../../assets/Images/Image/teacherIcon.png'

//Tab Icons 
import moreFalseIcon from '../../assets/Images/icons/moreFalseIcon.png'
import moreTrueIcon from '../../assets/Images/icons/moreTrueIcon.png'

import homeFalseIcon from '../../assets/Images/icons/homeFalseIcon.png'
import homeTrueIcon from '../../assets/Images/icons/homeTrueIcon.png'


import messagesFalseIcon from '../../assets/Images/icons/messagesFalseIcon.png'
import messagesTrueIcon from '../../assets/Images/icons/messagesTrueIcon.png'

import classFalseIcon from '../../assets/Images/icons/classFalseIcon.png'
import classTrueIcon from '../../assets/Images/icons/classTrueIcon.png'

//Tab Icons 
import audioCallFalseIcon from '../../assets/Images/icons/audioCallFalseIcon.png'
import audioCallTrueIcon from '../../assets/Images/icons/audioCallTrueIcon.png'

import videoCallFalseIcon from '../../assets/Images/icons/videoCallFalseIcon.png'
import videoCallTrueIcon from '../../assets/Images/icons/videoCallTrueIcon.png'


import shareScreenFalseIcon from '../../assets/Images/icons/shareScreenFalseIcon.png'
import shareScreenTrueIcon from '../../assets/Images/icons/shareScreenTrueIcon.png'

import exitClassIcon from '../../assets/Images/icons/exitClassIcon.png'


class App extends Component {
    constructor(props) {
        super(props);
        this.apiKey = credentials.API_KEY;
        this.sessionId = credentials.SESSION_ID;
        this.token = credentials.TOKEN;
        this.state = {
            subscriberIds: [], // Array for storing subscribers
            localPublishAudio: true, // Local Audio state
            localPublishVideo: true, // Local Video state
            localPublishScreen: false,
            joinCall: true, // State variable for storing success
            streamProperties: {}, // Handle individual stream properties,
            mainSubscriberStreamId: null,
            nameText: '',

            video: true,
            audio: true,
            shareScreen: false,
            publishScreen: false,
            nameFlag: false,

            orientation: '',
            multiController:false,
            count:0
        };

        this.sessionEventHandlers = {
            streamCreated: (event) => {
                const streamProperties = {
                    ...this.state.streamProperties,
                    [event.streamId]: {
                        subscribeToAudio: true,
                        subscribeToVideo: true,
                    },
                };
                this.setState({
                    streamProperties,
                    subscriberIds: [...this.state.subscriberIds, event.streamId],
                });
                this.state.subscriberIds.length > 0 ? this.setState({ nameFlag: true }) : this.setState({ nameFlag: false })
                console.log('streamCreated', this.state);
            },
            streamDestroyed: (event) => {
                const indexToRemove = this.state.subscriberIds.indexOf(event.streamId);
                const newSubscriberIds = this.state.subscriberIds;
                const streamProperties = { ...this.state.streamProperties };
                if (indexToRemove !== -1) {
                    delete streamProperties[event.streamId];
                    newSubscriberIds.splice(indexToRemove, 1);
                    this.setState({ subscriberIds: newSubscriberIds });
                }
                
                this.state.subscriberIds.length > 0 ? this.setState({ nameFlag: true }) : this.setState({ nameFlag: false })
                this.state.subscriberIds.length > 1 ? this.setState({ multiController:true }) : this.setState({ multiController:false })
            },
            error: (error) => {
                console.log('session error:', error);
            },
            otrnError: (error) => {
                console.log('Session otrnError error:', error);
            },
            sessionDisconnected: () => {
                this.setState({
                    streamProperties: {},
                    subscriberIds: [],
                });
            },
        };

        this.publisherEventHandlers = {
            streamCreated: (event) => {
                console.log('Publisher stream created!', event);
            },
            streamDestroyed: (event) => {
                console.log('Publisher stream destroyed!', event);
            },
            audioLevel: (event) => {
                /* console.log('AudioLevel', typeof event); */
            },
        };
        this.publisherScreenEventHandlers = {
            streamCreated: (event) => {
                console.log('Publisher screen stream created!', event);
            },
            streamDestroyed: (event) => {
                console.log('Publisher screen stream destroyed!', event);
            },
            audioLevel: (event) => {
                /* console.log('AudioLevel', typeof event); */
            },
        };
        this.subscriberEventHandlers = {
            connected: () => {
                console.log('[subscriberEventHandlers - connected]');
            },
            disconnected: () => {
                console.log('[subscriberEventHandlers - disconnected]');
            },
            error: (error) => {
                console.log('subscriberEventHandlers error:', error);
            },
        };

        this.publisherProperties = {
            cameraPosition: 'front',
            //videoSource: 'screen',

            name: 'Student_VideoCall'
        };
        this.publisherScreenProperties = {
            videoSource: 'screen',
            publishAudio: false,
            name: 'ScreenShare'
        },
            this.publisherScreenEventHandlers = {
                accessDenied: () => {
                    console.log("User denied access to media Screen source");
                },
                streamCreated: () => {
                    console.log("Publisher SCreen created");
                },
                mediaStopped: () => {
                    this.setState({ publishScreen: false });
                },
                streamDestroyed: ({ reason }) => {
                    console.log(`Publisher Screen destroyed because: ${reason}`);
                },

            };
    }

    //  Orientation code
    componentDidMount() {
        this.joinCall()
        this.getOrientation();
        Dimensions.addEventListener('change', this.getOrientation);
    }

    getOrientation = () => {
        if (Dimensions.get('window').width < Dimensions.get('window').height) {
            this.setState({ orientation: 'portrait' });
        } else {
            this.setState({ orientation: 'landscape' });
        }
    };
    onPublishScreen = () => {
        console.log("Publish Screen Success");
        this.setState({ error: null });
    };

    onPublishScreenError = (error) => {
        console.log("Publish Screen Error", error);
        this.setState({ error, publishScreen: false });
    };

    //ClassRooms Controllers 
    toggleAudio = () => {
        let publishAudio = this.state.localPublishAudio;
        this.publisherProperties = {
            ...this.publisherProperties,
            publishAudio: !publishAudio,
        };
        this.setState({
            localPublishAudio: !publishAudio,
        });
    };

    toggleVideo = () => {
        let publishVideo = this.state.localPublishVideo;
        this.publisherProperties = {
            ...this.publisherProperties,
            publishVideo: !publishVideo,
        };
        this.setState({
            localPublishVideo: this.state.screenShare ? false : !publishVideo,
            publishScreen: false
        });
        console.log('Video toggle', this.publisherProperties);
    };
    toggleScreenshare = () => {
        this.setState((state) => ({
            publishScreen: !state.publishScreen,
            localPublishVideo: false
        }));
    };

    joinCall = () => {
        const { joinCall } = this.state;
        if (!joinCall) {
            this.setState({ joinCall: true });
        }
    };

    endCall = () => {
        const { joinCall } = this.state;
        if (joinCall) {
            this.setState({ joinCall: !joinCall });
        }
        this.props.navigation.navigate('MenuScreen')
    };

    /**
     * // todo check if the selected is a publisher. if so, return
     * @param {*} subscribers
     */

    // Multiple Users 
     handleSubscriberSelection = (subscribers, streamId) => {
        console.log('handleSubscriberSelection', streamId);
        let subscriberToSwap = subscribers.indexOf(streamId);
        let currentSubscribers = subscribers;
        let temp = currentSubscribers[subscriberToSwap];
        currentSubscribers[subscriberToSwap] = currentSubscribers[0];
        currentSubscribers[0] = temp;
        this.setState((prevState) => {
          const newStreamProps = { ...prevState.streamProperties };
          for (let i = 0; i < currentSubscribers.length; i += 1) {
            if (i === 0) {
              newStreamProps[currentSubscribers[i]] = {
                ...prevState.streamProperties[currentSubscribers[i]],
              };
              newStreamProps[
                currentSubscribers[i]
              ].preferredResolution = mainSubscribersResolution;
            } else {
              newStreamProps[currentSubscribers[i]] = {
                ...prevState.streamProperties[currentSubscribers[i]],
              };
              newStreamProps[
                currentSubscribers[i]
              ].preferredResolution = secondarySubscribersResolution;
            }
          }
          console.log('mainSubscriberStreamId', streamId);
          console.log('streamProperties#2', newStreamProps);
          return {
            mainSubscriberStreamId: streamId,
            streamProperties: newStreamProps,
          };
        });
      };
    
      handleScrollEnd = (event, subscribers) => {
        console.log('handleScrollEnd', event.nativeEvent); // event.nativeEvent.contentOffset.x
        console.log('handleScrollEnd - events', event.target); // event.nativeEvent.contentOffset.x
        let firstVisibleIndex;
        if (
          event &&
          event.nativeEvent &&
          !isNaN(event.nativeEvent.contentOffset.x)
        ) {
          firstVisibleIndex = parseInt(
            event.nativeEvent.contentOffset.x / (dimensions.width / 2),
            10,
          );
          console.log('firstVisibleIndex', firstVisibleIndex);
        }
        this.setState((prevState) => {
          const newStreamProps = { ...prevState.streamProperties };
          if (firstVisibleIndex !== undefined && !isNaN(firstVisibleIndex)) {
            for (let i = 0; i < subscribers.length; i += 1) {
              if (i === firstVisibleIndex || i === firstVisibleIndex + 1) {
                newStreamProps[subscribers[i]] = {
                  ...prevState.streamProperties[subscribers[i]],
                };
                newStreamProps[subscribers[i]].subscribeToVideo = true;
              } else {
                newStreamProps[subscribers[i]] = {
                  ...prevState.streamProperties[subscribers[i]],
                };
                newStreamProps[subscribers[i]].subscribeToVideo = false;
              }
            }
          }
          return { streamProperties: newStreamProps };
        });
      };
    
    // Teacher Screen cases
    renderSubscribers = (subscribers) => {
        console.log('renderSubscribers', subscribers);
        console.log('this.state.subscriberIds', this.state.subscriberIds);
        console.log(
            'this.state.mainSubscriberStreamId',
            this.state.mainSubscriberStreamId,
        );
       
        if (this.state.mainSubscriberStreamId) {
            subscribers = subscribers.filter(
                (sub) => sub !== this.state.mainSubscriberStreamId,
            );
            subscribers.unshift(this.state.mainSubscriberStreamId);
        }
        console.log('renderSubscribers - sorted', subscribers);
        //2 or more users
        return this.state.orientation == 'portrait' ? subscribers.length > 1 ? (
            
            <>
                <View
                    style={this.state.orientation == 'portrait' ? styles.singleSubscriberView : styles.landscapesingleSubscriberView}>
                    <View style={{ height: hp('30%'), width: '100%', }}>
                        <OTSubscriberView
                            streamId={subscribers[1]}
                            key={subscribers[1]}
                            style={styles.portraitSingleSubcriber}
                        />

                    </View>
                </View>
            </>
            //for 1 user
        ) : subscribers.length > 0 ? (
            <>

                <View
                    style={this.state.orientation == 'portrait' ? styles.singleSubscriberView : styles.landscapesingleSubscriberView}>
                    <View style={{ height: hp('30%'), width: '100%', }}>
                        <OTSubscriberView
                            streamId={subscribers[0]}
                            key={subscribers[0]}
                            style={styles.portraitSingleSubcriber}
                        />

                    </View>
                </View>

            </>
        ) : (
            //for zero user 
            <SafeAreaView style={{ flex: 1, alignItems: 'center' }}>

                <View style={this.state.orientation == 'portrait' ? styles.portraitNoSubscriberScreen : styles.landscapeNoSubscriberScreen}>
                    {/* <Text style={styles.teacherNameText}>  No User Connected Yet! </Text> */}
                    {/* <Icon2 name='user' size={200} color={COLORS.purple} /> */}
                </View>


            </SafeAreaView>

        )
            :
            // Landscape Screens
            //for 2 or more users
            subscribers.length > 1 ? (
            
                <>

                <View style={styles.landscapeMultipleSubscriberView}>
                    <View style={{ height: '100%', width: '100%' }}>
                        <OTSubscriberView
                            streamId={subscribers[1]}
                            key={subscribers[1]}
                            style={styles.landscapeMultipleSubscriber}
                        />

                    </View>
                </View>

            </>
            ):    
            //for one user
            subscribers.length > 0 ? (
                <>

                    <View style={styles.landscapeMultipleSubscriberView}>
                        <View style={{ height: '100%', width: '100%' }}>
                            <OTSubscriberView
                                streamId={subscribers[0]}
                                key={subscribers[0]}
                                style={styles.landscapeMultipleSubscriber}
                            />

                        </View>
                    </View>

                </>
            ) : (
                //for zero user
                <SafeAreaView style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>

                    <View style={styles.landscapeNoSubscriberView}>
                        {/* <Text style={styles.teacherNameText}>  No User Connected Yet! </Text> */}
                        {/* <Icon2 name='user' size={150} color={COLORS.purple} /> */}
                    </View>


                </SafeAreaView>

            )

    };

    //Classroom Session 
    videoView = () => {
        return (

            <View style={{ flex: 1, flexDirection: this.state.orientation == 'portrait' ? 'column' : 'row' }}>

                <View style={this.state.orientation == 'portrait' ? styles.portraitContentView : styles.landscapeContentView}>

                    <OTSession
                        apiKey={this.apiKey}
                        sessionId={this.sessionId}
                        token={this.token}
                        eventHandlers={this.sessionEventHandlers}
                    >
                        
                        {!this.state.publishScreen && (
                            //Video call
                            <OTPublisher
                                properties={this.publisherProperties}
                                eventHandlers={this.publisherEventHandlers}
                                style={this.state.orientation == 'portrait' ? styles.publisherStyle : styles.landscapPublishVideo}
                            />)}


                        {this.state.publishScreen && (
                            //Screen Share
                            <OTPublisher
                                properties={{ videoSource: "screen", name: 'Student_ScreenShare' }}
                                onPublish={this.onPublishScreen}
                                onError={this.onPublishScreenError}
                                eventHandlers={this.publisherScreenEventHandlers}
                                style={this.state.orientation == 'portrait' ? styles.publisherStyle : styles.landscapPublishVideo}
                            />
                        )}
                        {!this.state.localPublishVideo && !this.state.publishScreen && (
                            //simple Box (only audio call)
                            <View style={[this.state.orientation == 'portrait' ? styles.publisherStyle : styles.landscapPublishVideo, { borderWidth: 1, justifyContent: 'center', alignItems: 'center', borderColor: COLORS.purple, marginTop: Platform.OS === 'android' ? hp(0) : hp(2) }]}>
                                {/* <Icon2 name='user' size={40} color={COLORS.purple} /> */}
                            </View>)}

                        <OTSubscriber
                            style={{ height: dimensions.height, width: dimensions.width }}
                            eventHandlers={this.subscriberEventHandlers}
                            streamProperties={this.state.streamProperties}>
                            {this.renderSubscribers}
                        </OTSubscriber>
                    </OTSession>

                </View>


                {/* Header code*/}
                <ImageBackground source={headerBackground} style={this.state.orientation == 'portrait' ? styles.portraitHeaderView : styles.landscapeHeaderView}>
                    {/* back Button */}
                    <Pressable onPress={() => this.props.navigation.goBack()} style={styles.backButtonView}>
                        <Image style={styles.backButton} source={backBtnIcon} />
                    </Pressable>

                    {/* Notification Button */}
                    <Pressable onPress={() => alert('Notification')} style={styles.backButtonView}>
                        <Image style={styles.backButton} source={notificationIcon} />
                    </Pressable>

                    <Text style={[styles.headerText,{width: this.state.orientation == 'portrait' ? wp(30) : '60%', }]}> غرفة الدرس </Text>

                    <Image style={styles.landscapeLogo} source={landscapeLogo} />

                </ImageBackground>

                {/* multiple users Condition */}
                {/* {marginTop:this.state.subscriberIds.length>1 ?Platform.OS === 'android' ? hp(65) : hp(60):Platform.OS === 'android' ? hp(80) : hp(75)} */}  
                <View style={this.state.orientation == 'portrait' ? [styles.portraitControllerButtonView] : styles.landscapControllerButtonView}>
                    <Pressable 
                        style={[styles.controllerButton,{
                            height: this.state.orientation == 'portrait' ? '100%' : '20%'}
                            ]} 
                        onPress={() => this.endCall()}
                        >
                        <Image style={styles.bottomIcon} source={exitClassIcon} />
                    </Pressable>

                    <Pressable
                        style={[styles.controllerButton,{
                            height: this.state.orientation == 'portrait' ? '100%' : '20%'}
                            ]} 
                        onPress={() => this.toggleVideo()}>
                        <Image style={this.state.localPublishVideo ? styles.trueBottomIcon : styles.bottomIcon} source={this.state.localPublishVideo ? videoCallTrueIcon : videoCallFalseIcon} />
                        
                    </Pressable>

                    <Pressable
                        style={[styles.controllerButton,{
                            height: this.state.orientation == 'portrait' ? '100%' : '20%'}
                            ]} 
                        onPress={() => this.toggleScreenshare()}>
                        <Image style={this.state.publishScreen ? styles.trueBottomIcon : styles.bottomIcon} source={this.state.publishScreen ? shareScreenTrueIcon : shareScreenFalseIcon} />
                        
                    </Pressable>

                    <Pressable
                        style={[styles.controllerButton,{
                            height: this.state.orientation == 'portrait' ? '100%' : '20%'}
                            ]} 
                        onPress={() => {
                            this.toggleAudio()
                        }}>
                        <Image style={this.state.publishAudio ? styles.trueBottomIcon : styles.bottomIcon} source={this.state.localPublishAudio ? audioCallTrueIcon : audioCallFalseIcon} />
                    </Pressable>
                </View>

                
                {/* Classroom BottomTab */}
                <View style={this.state.orientation == 'portrait' ? styles.portraitBottomTabView : styles.landscapeBottomTabView}>
                    <Pressable
                        onPress={() =>{
                            this.endCall()
                         this.props.navigation.navigate("MenuScreen")}}
                        style={[this.state.orientation == 'portrait' ? styles.bottomTabButton : styles.landscapeBottomTabButton, { borderTopLeftRadius: hp(3) }]
                        }>
                        <Image style={[styles.portraitBottomTabIcon, {
                            width: this.state.orientation == 'portrait' ? Platform.OS === 'ios' ? wp(8.5) : wp(8.5) : Platform.OS === 'ios' ? wp(9) : wp(8.3),
                            height: this.state.orientation == 'portrait' ? hp(1) : hp(1)
                        }]} source={moreFalseIcon} />
                        <Text style={{ color: COLORS.lightgrey, fontSize: this.state.orientation == 'portrait' ? 15 : 13, marginTop: Platform.OS === 'android' ? hp(-2) : hp(-2) }}> المزید</Text>
                    </Pressable>

                    <Pressable
                        onPress={() => {
                            this.endCall()
                            this.props.navigation.navigate('ChatTeacherList')}}
                        style={this.state.orientation == 'portrait' ? styles.bottomTabButton : styles.landscapeBottomTabButton}>
                        <Image style={[styles.portraitBottomTabIcon, {
                            width: this.state.orientation == 'portrait' ? Platform.OS === 'ios' ? wp(11) : wp(11) : Platform.OS === 'ios' ? wp(10) : wp(9.5),
                            height: this.state.orientation == 'portrait' ? hp(4) : hp(3.5)
                        }]} source={messagesFalseIcon} />
                        <Text style={{ color: COLORS.lightgrey, fontSize: this.state.orientation == 'portrait' ? 15 : 13, marginTop: Platform.OS === 'android' ? hp(-2) : hp(-2) }} > الرسائل</Text>
                    </Pressable>

                    <Pressable
                        onPress={() => this.props.navigation.navigate('NewClassroom')}
                        style={this.state.orientation == 'portrait' ? styles.bottomTabButton : styles.landscapeBottomTabButton}>
                        <Image style={[styles.portraitBottomTabIcon, {
                            width: this.state.orientation == 'portrait' ? Platform.OS === 'ios' ? wp(8) : wp(7) : Platform.OS === 'ios' ? wp(7) : wp(6.2),
                            height: this.state.orientation == 'portrait' ? hp(4) : hp(3.5)
                        }]} source={classTrueIcon} />
                        <Text style={{ color: COLORS.purple, fontSize: this.state.orientation == 'portrait' ? 15 : 13, marginTop: Platform.OS === 'android' ? hp(-2) : hp(-2) }}> الدروس</Text>
                    </Pressable>

                    <Pressable
                        onPress={() =>{
                            this.endCall()
                            this.props.navigation.navigate("HomeScreen")}}
                        style={[this.state.orientation == 'portrait' ? styles.bottomTabButton : styles.landscapeBottomTabButton, { borderTopRightRadius: hp(3) }]}>
                        <Image 
                            style={[styles.portraitBottomTabIcon, {
                            width: this.state.orientation == 'portrait' ? Platform.OS === 'ios' ? wp(9) : wp(9) : Platform.OS === 'ios' ? wp(9.5) : wp(8),
                            height: this.state.orientation == 'portrait' ? hp(4) : hp(3.5)
                                }]} 
                            source={homeFalseIcon} />
                        <Text 
                            style={{ 
                                color: COLORS.lightgrey, 
                                fontSize: this.state.orientation == 'portrait' ? 15 : 13, 
                                marginTop: Platform.OS === 'android' ? hp(-2) : hp(-2) 
                                }}>
                            الرئیسیة
                        </Text>
                    </Pressable>
                </View>

            </View>

        );
    };

    render() {
        // console.warn('Subscriber Size:===> '+this.state.subscriberIds.length)
        return (
            <SafeAreaView style={{ flex: 1 }}>
                <StatusBar 
                    barStyle={Platform.OS==='android'?'light-content':'dark-content'}  
                    backgroundColor={COLORS.purple} />
                {this.state.joinCall ? this.videoView() : this.joinVideoCall()}
            </SafeAreaView>
        );

    }
}


const styles = StyleSheet.create({
    portraitControllerButtonView: {
        height: hp('8%'),
        width: '100%',
        position: 'absolute',
        marginTop: Platform.OS === 'android' ? hp(80) : hp(75),
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',

    },
    portraitHeaderView: {
        width: '100%',
        height: Platform.OS === 'ios' ? hp(12) : hp(12),
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        position: 'absolute'
    },
    landscapeHeaderView: {
        width: '100%',
        height: Platform.OS === 'ios' ? hp(10) : hp(7),
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        position: 'absolute'
    },
    headerText:{ 
        color: '#fff', 
        fontSize: 18, 
        marginTop: hp(3), 
        textAlign: 'center',
        marginTop: Platform.OS === 'ios' ? hp(3) : hp(0), 
    },
    landscapControllerButtonView: {
        height: hp('8%'),
        display: 'flex',
        width: '100%',
        position: 'absolute',
        marginTop: Platform.OS === 'android' ? hp(33) : hp(32),
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',

    },
    landscapeNoSubscriberView:{
        height: Platform.OS === 'android' ? '98%' : '98%',
        width: wp('100%'),
        borderWidth: 1,
        borderColor: COLORS.purple,
        alignItems: 'center',
        justifyContent: 'center',
    },
    controllerButton:{
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: wp(2)
    },
    fullView: {
        flex: 1,
    },
    scrollView: {
    },

    publisherStyle: {
        width: wp(40),
        height: hp(15),
        position: 'absolute',
        alignSelf: 'flex-end',
        top: Platform.OS === 'ios' ? hp(1) : 0,
        
        
    },
    multipleSubscribersView: {
        height: Platform.OS === 'android' ? hp(65) : hp(59.5),
        width: wp(96),
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: Platform.OS === 'ios' ? hp(-3) : hp(-4),
        borderWidth: Platform.OS === 'ios' ? .5 : 1,
        borderColor: COLORS.purple,


    },
    landscapeMultipleSubscriberView:{
        height: Platform.OS === 'android' ? '100%' : '100%',
        width: Platform.OS === 'android' ? '83.5%' : '82.5%',
        justifyContent: 'center',
        borderColor: COLORS.purple,
        borderTopColor: COLORS.purple
    },
    singleSubscriberView: {
        height: Platform.OS === 'android' ? hp(75.5) : hp(70.5),
        width: Platform.OS === 'android' ? wp(96) : wp(96),
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: Platform.OS === 'ios' ? hp(-1) : hp(-2),
        borderWidth: Platform.OS === 'ios' ? .5 : 1,
        borderColor: COLORS.purple,
        borderTopColor: COLORS.purple


    },
    portraitSingleSubcriber:{ 
        width: '100%', 
        height: Platform.OS === 'android' ? hp(25) : hp(24), 
        marginTop: hp(2) 
    },
    landscapeMultipleSubscriber:{ 
        width: '100%', 
        height: Platform.OS === 'android' ? '95%' : '90%', 
        marginTop: Platform.OS == 'android' ? 5 : 20, 
        marginLeft: 5 
    },
    landscapesingleSubscriberView: {
        height: Platform.OS === 'android' ? hp(20.5) : hp(20.5),
        width: Platform.OS === 'android' ? '100%' : '100%',
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: Platform.OS === 'ios' ? hp(-2) : hp(0),
        // marginLeft: wp(-5),
        borderWidth: Platform.OS === 'ios' ? .5 : 1,
        borderColor: COLORS.purple,
        borderTopColor: COLORS.purple


    },
    portraitNoSubscriberScreen: {
        height: Platform.OS === 'android' ? hp(73.5) : hp(70.5),
        width: wp('95%'),
        borderWidth: 1,
        borderColor: COLORS.purple,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: Platform.OS === 'android' ? hp(-1) : hp(0),

    },
    landscapeNoSubscriberScreen: {
        height: Platform.OS === 'android' ? hp(20) : hp(17.5),
        width: wp('95%'),
        borderWidth: 1,
        borderColor: COLORS.purple,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: Platform.OS === 'android' ? hp(3) : hp(7),

    },
    portraitMainSubscriberStyle: {
        height: hp(46),
        width: wp(96),
        marginTop: hp(30),
        alignContent: 'stretch'

    },
    landscapeMainSubscriberStyle: {
        height: hp(46),
        width: wp(96),
        marginTop: hp(30),
        alignContent: 'stretch'

    },
    secondarySubscribers: {
        height: hp(20),
        position: 'absolute',
        marginTop: Platform.OS === 'ios' ? hp(57) : hp(61.5),
        marginLeft: wp(-4)

    },
    bottomControls: {
        flexDirection: 'row',
        height: '10%',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'space-evenly',

    },
    teacherNameView: {
        height: hp(10),
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        backgroundColor: '#CCE5FF',
        borderWidth: 1,
        borderColor: COLORS.purple
    },
    teacherNameText: {
        fontSize: Platform.OS === 'android' ? hp(1.8) : hp(2),
        color: COLORS.purple,
        marginTop: Platform.OS === 'ios' ? hp(2) : hp(3),
    },
    landscapPublishVideo: {
        width: wp(30),
        height: hp(10),
        position: 'absolute',
        alignSelf: 'flex-end',
        top: Platform.OS == 'android' ? 5 : 25,
        right: 5
    },
    portraitContentView: {
        height: '40%',
        width: '90%',
        marginTop: '30%',
        alignSelf: 'center'
    },
    landscapeContentView: {
        width: '100%',
        height: Platform.OS === 'android' ? '72%' : '71%',
        borderWidth: 1,
        borderColor: COLORS.purple,
        marginTop: Platform.OS === 'android' ? hp(7.5) : hp(7.6)
    },
    backButtonView: {
        marginTop: Platform.OS === 'ios' ? hp(8) : hp(5) ,
        height: hp(10),
        
    },
    backButton: {
        height: hp(6),
        width: Platform.OS === 'ios' ? wp(13.2) : wp(12.5),
    },
    landscapeLogo: {
        height: hp(5),
        marginTop: Platform.OS === 'ios' ? hp(3) : hp(0),
        width: Platform.OS === 'ios' ? wp(30.2) : wp(30.2),
    },
    portraitBottomTabView: {
        backgroundColor: COLORS.white,
        height: hp(10),
        borderTopLeftRadius: hp(3),
        borderTopRightRadius: hp(3),
        elevation: 5,
        shadowOpacity: .1,
        flexDirection: 'row',
        alignItems: 'center',
        top: Platform.OS === 'android' ? hp(88.5) : hp(85),
        justifyContent: 'space-evenly',
        position: 'absolute'
    },
    landscapeBottomTabView: {
        backgroundColor: COLORS.white,
        height: hp(7),
        width: '100%',
        borderTopLeftRadius: hp(3),
        borderTopRightRadius: hp(3),
        elevation: 5,
        shadowOpacity: .1,
        flexDirection: 'row',
        alignItems: 'center',
        top: Platform.OS === 'android' ? hp(40) : hp(38.5),
        justifyContent: 'space-evenly',
        position: 'absolute'
    },
    bottomTabButton: {
        backgroundColor: COLORS.white,
        width: wp(25),
        height: '100%',
        justifyContent: 'space-evenly',
        alignItems: 'center'
    },
    landscapeBottomTabButton: {
        backgroundColor: COLORS.white,
        width: wp(25),
        height: '100%',
        justifyContent: 'space-evenly',
        alignItems: 'center'
    },
    bottomIcon: {
        height: hp(6),
        width: Platform.OS === 'ios' ? wp(11.5) : wp(10.5),
    },

    trueBottomIcon: {
        height: hp(6),
        width: Platform.OS === 'ios' ? wp(13.5) : wp(12.5),
    },
    portraitBottomTabIcon: {
        height: hp(4),
        width: Platform.OS === 'ios' ? wp(9.5) : wp(8.5),
    },
    landscapeBottomTabIcon: {
        height: hp(3),
        width: Platform.OS === 'ios' ? wp(7.5) : wp(5.5),
    },
});

export default App;
