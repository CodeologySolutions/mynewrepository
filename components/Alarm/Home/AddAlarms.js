import React, {Component} from 'react';
import {
  View,
  Text,
  TextInput,
  Platform,
  Dimensions,
  Button,
  TouchableHighlight,
  StyleSheet,
  Alert,
  TouchableOpacity,
} from 'react-native';

import {Actions} from 'react-native-router-flux';
//import DateTimePicker from 'react-native-modal-datetime-picker';
import DatePicker from 'react-native-date-picker';
import moment from 'moment';
import PushNotification, {Importance} from 'react-native-push-notification';
import PushNotificationIOS from '@react-native-community/push-notification-ios';
import notifee, {
  AuthorizationStatus,
  EventType,
  Notification,
  TimestampTrigger,
  TriggerType,
} from '@notifee/react-native';
import ModalSelector from 'react-native-modal-selector';
import {createAlarm, editAlarm} from 'react-native-simple-alarm';
import { RootNavigation , navigationRef, navigate} from '../../../rootNavigation';
import { Constants } from '../../../appUtils/constants';
import { getStotras } from "../../../webServices/apis";
// Global
import {Convert} from '../styles';
 
// Components
import NavBar from '../Common/NavBar';

const {height, width} = Dimensions.get('window');
const iphoneX = height > 800;

class AddAlarm extends Component {
  // constructor(props) {
  //   super(props);
  //   this.state = {};

  //   this.notif = new NotifService(
  //     this.onRegister.bind(this),
  //     this.onNotif.bind(this),
  //   );
  // }
//  var today= new Date();
  state = {
    isDateTimePickerVisible: false,
    time: this.props.edit
      ? moment(this.props.edit.date).startOf('minute').format('hh:mm A')
      : moment().startOf('minute').format('hh:mm A'),
    date: this.props.edit
      ? this.props.edit.date
      : moment().startOf('minute').format(),
    date: new Date(),
    message: this.props.edit ? this.props.edit.message : '',
    springSpeed: 500,
    snooze: this.props.edit ? Number(this.props.edit.snooze) : 1,
    snoozePicker: false,
    stotras:[],
    stotra:"",
    audioLink:"",
    id:0,
  };
  
  generateId = () => {
    const newId = this.state.id + 1;
    this.setState({
      id: newId,
    });
   // setId(newId);
    return newId;
  };
//  onDisplayNotification = async(data) => {
//     // Request permissions (required for iOS)

//     if (Platform.OS == 'ios') {
//         await notifee.requestPermission()
//     }

//     // Create a channel (required for Android)
//     const channelId = await notifee.createChannel({
//         id: data?.channel_id,
//         name: data?.channel_name,
//         sound: data?.sound_name,
//         importance: AndroidImportance.HIGH,
//     });

//     // Display a notification
//     await notifee.displayNotification({
//         title: data?.title,
//         body: data?.message,
//         android: {
//             channelId,

//         },
//     });
    
// }

  createChannels = (id) => {
    PushNotification.createChannel({
        channelId: "alarm-channel-"+id,
        channelName: "Alarm Channel",
        channelDescription: "Alarm Channel to categorise your notifications", // (optional) default: undefined.
        vibrate: true, // (optional) default: true. Creates the default vibration pattern if true.
        playSound: true,        
        soundName: "hanumanchalisa.mp3",
      },
    (created) => console.log(`createChannel returned '${created}'`) // (optional) callback returns whether the channel was created, false means it already existed.
  );
};
  fetchData = async () => {

    let payload={};
    let res = await getStotras(payload);
    if (res) {
         //console.log("getStotras==>",res);
         this.setState({
          stotras: res?.list,
        });

        
    }
  };
  componentDidMount() {
    var currentTime = Date.now();
    this.createChannels(currentTime);
    this.fetchData();
    PushNotification.checkPermissions((permissions) => {
      if (!permissions.alert) {
        Alert.alert('Please enable push notifications for the alarm to work');
      }
    });

  }

  _showDateTimePicker = () => this.setState({isDateTimePickerVisible: true});

  _hideDateTimePicker = () => this.setState({isDateTimePickerVisible: false});

  _hideSnoozePicker = () => this.setState({snoozePicker: false});

  _showSnoozePicker = () => this.setState({snoozePicker: true});

  _handleDatePicked = (date) => {
    this._hideDateTimePicker();
    const time = moment(date).startOf('minute').format('hh:mm A');
    const newDate = moment(date).startOf('minute').format();
    console.log("time==>",time);
    console.log("newDate==>",newDate);
    this.setState({
      time ,
      date:new Date(newDate) ,
    });
  };
    
  _addAlarm = async () => {
    let {time, date, message, snooze, stotra, audioLink} = this.state;

    if (!time) {
      Alert.alert('Please enter a time for the alarm');
    } else {
      let newDate = date;
      if (moment(date).isBefore(moment().startOf('minute'))) {
        date = moment(date).add(1, 'days').startOf('minute').format();
      }
      
      // var remoteMessage={
      //   channel_id: "alarm-channel"+moment().format('YYYYMMDDhmmss'),
      //   channel_name: "Alarm Channel",
      //   sound_name:"hanumanchalisa",
      //   title: "Alarm Ringing",
      //   message: message || "My Notification Message",

      // }
      // onDisplayNotification(remoteMessage)
      var currentTime = Date.now();
      this.createChannels(currentTime);
     
      if (newDate.getTime() < currentTime) {
          Alert.alert("Please choose future time");
           
          return;
      }
      const fireDate = newDate;


      const alarmNotifData = {

          channelId: "alarm-channel-"+currentTime,
          ticker: "My Notification Message",

          id: this.generateId(),
          title: "Alarm Ringing",
          message: message || "My Notification Message",
          autoCancel: true,
          vibrate: true,
          vibration: 10000,
          smallIcon: "ic_launcher_round",
          largeIcon: "ic_launcher_round",
          playSound: true,        
          soundName: "hanumanchalisa.mp3",
          color: '#570d13',
          //schedule_once: true, q
          tag: "some_tag",
          fire_date: fireDate,
          date: { value: newDate }
          //date: fireDate,
      }
     // this.props.add(alarmNotifData);
      console.log('ID: ' + alarmNotifData.id);
    //   this.notif.scheduleNotif({
    //     channelId: "alarm-channel",
    //     title: alarmNotifData.title,

    //     id: alarmNotifData.id,
    //     message: alarmNotifData.message,
    //     date: alarmNotifData.fire_date,
        
    //     actions: ["Snooze", "Stop Alarm"],
    //     importance: Importance.HIGH,
    //     playSound: true,
    //     soundName: alarmNotifData.soundName,
    //     allowWhileIdle: true,
    //     invokeApp: true,
    //     color: alarmNotifData.color,
    //     vibrate: alarmNotifData.vibrate,
    //     vibration: alarmNotifData.vibration,
    //     smallIcon:  alarmNotifData.smallIcon,
    //     largeIcon:  alarmNotifData.largeIcon,
    //     number: 10, 
    // });
    //   PushNotification.localNotificationSchedule({
    //     channelId: "alarm-channel",
    //     title: alarmNotifData.title,

    //     id: alarmNotifData.id,
    //     message: alarmNotifData.message,
    //     date: alarmNotifData.fire_date,
        
    //     actions: ["Snooze", "Stop Alarm"],
    //     importance: Importance.HIGH,
    //     playSound: true,
    //     soundName: alarmNotifData.soundName,
    //     allowWhileIdle: true,
    //     invokeApp: true,
    //     color: alarmNotifData.color,
    //     vibrate: alarmNotifData.vibrate,
    //     vibration: alarmNotifData.vibration,
    //     smallIcon:  alarmNotifData.smallIcon,
    //     largeIcon:  alarmNotifData.largeIcon,

    // });
 



//console.log(`Scheduled notification with id ${notificationId}`);

      PushNotification.localNotificationSchedule({
          channelId: "alarm-channel",
          title: alarmNotifData.title,

          id: alarmNotifData.id,
          message: alarmNotifData.message,
          date: alarmNotifData.fire_date,
          
          actions: ["Snooze", "Stop Alarm"],
          importance: Importance.HIGH,
          playSound: true,
          soundName: alarmNotifData.soundName,
          allowWhileIdle: true,
          invokeApp: true,
          color: alarmNotifData.color,
          vibrate: alarmNotifData.vibrate,
          vibration: alarmNotifData.vibration,
          smallIcon:  alarmNotifData.smallIcon,
          largeIcon:  alarmNotifData.largeIcon,

      });
      await createAlarm({
        active: true,
        date: newDate,
        soundName: alarmNotifData.soundName,
        title: alarmNotifData.title,
        message,
        snooze,
        stotra,
        audioLink,
      });
///


///

      navigate(Constants.nav_alarm, {  })
     // Actions.Home();
    }
  };

  _editAlarm = async () => {
    const {edit} = this.props;
    let {time, date, message, snooze, stotra, audioLink} = this.state;

    if (!time) {
      Alert.alert('Please enter a time for the alarm');
    } else {
      let id = edit.id;
      let newDate = date;

      // bug with react-native-push-notification where if the date is before the current time, it will get executed
      if (moment(date).isBefore(moment().startOf('minute'))) {
        newDate = moment(date).add(1, 'days').startOf('minute').format();
      }

      await editAlarm({
        id,
        date: newDate,
        snooze,
        message,
        active: true,
        stotra,
        audioLink,
      });
      navigate(Constants.nav_alarm, {  })
     // Actions.Home();
    }
  };

  snoozeModal() {
    let {snooze} = this.state;
    let data = [{key: 0, section: true, label: 'Snooze Time'}];
    for (let i = 1; i < 60; i++) {
      data.push({
        key: i + '',
        label: i + '',
        accessibilityLabel: i + '',
      });
    }
    return (
      <View style={styles.setting}>
        <ModalSelector
          data={data}
          initValue="Select an Instrument"
          supportedOrientations={['portrait']}
          accessible={true}
          scrollViewAccessibilityLabel={'Scrollable options'}
          cancelButtonAccessibilityLabel={'Cancel Button'}
          style={styles.snoozeModal}
          optionTextStyle={{color:"#000"}}
          onChange={({label}) => {
            this.setState({snooze: label});
          }}>
          <View style={styles.snoozeView}>
            <Text style={styles.snoozeFont}>Snooze</Text>

            <Text style={styles.snoozeFont}>
              {snooze} minute{snooze > 1 ? 's' : null}
            </Text>
          </View>
        </ModalSelector>
      </View>
    );
  }
  stotraModal() {
   // console.log("this.props==>",this.props);
    let {stotra,stotras} = this.state;
    let data = [{key: 0, section: true, accessibilityLabel: 'Stotras',label: 'stotras'}];
    stotras.forEach(async (stotraItem, index) => {
     // console.log(stotraItem.audioLink);
      data.push({
        key: (index+1) + '',
        label: stotraItem.audioLink + '',
        accessibilityLabel: stotraItem.name + '',
      });
    });
    // for (let i = 1; i < 60; i++) {
    //   data.push({
    //     key: i + '',
    //     label: i + '',
    //     accessibilityLabel: i + '',
    //   });
    // }
    return (
      <View style={styles.setting}>
        
        <ModalSelector
          data={data}
          initValue="Select an Stotra"
          supportedOrientations={['portrait']}
          accessible={true}
          scrollViewAccessibilityLabel={'Scrollable options'}
          cancelButtonAccessibilityLabel={'Cancel Button'}
          style={styles.snoozeModal}
          optionTextStyle={{color:"#000"}}
          keyExtractor= {item => item.label}
          labelExtractor= {item => item.accessibilityLabel}
          onChange={({label, accessibilityLabel}) => {
            this.setState({stotra: accessibilityLabel});
            this.setState({audioLink: label});
          }}>
          <View style={styles.snoozeView}>
            <Text style={styles.snoozeFont}>Stotra</Text>

            <Text style={styles.snoozeFont}>
              {stotra} 
            </Text>
          </View>
        </ModalSelector>
      </View>
    );
  }
  onDisplayNotification = async () => {
    // Create a channel (required for Android)
    const channelId = await notifee.createChannel({
      id: 'custom-sound',
      name: 'Channel with custom sound',
      sound: 'hanumanchalisa',
      actions: ["Snooze", "Stop Alarm"],
      importance: Importance.HIGH,
    });

    // Display a notification
    await notifee.displayNotification({
      title: 'Notification Title',
      body: 'Main body content of the notification',
      android: {
        channelId,
        sound: 'hanumanchalisa',
        smallIcon: 'ic_launcher_round', // optional, defaults to 'ic_launcher'.
        // pressAction is needed if you want the notification to open the app when pressed
        pressAction: {
          id: 'default',
        },
      },
    });
  }
  onCreateTriggerNotification = async () => {
    const date = new Date(Date.now());
    date.setHours(0);
    date.setMinutes(24);

    // Create a time-based trigge
    const trigger: TimestampTrigger = {
      type: TriggerType.TIMESTAMP,
      timestamp: Date.now(), // fire in 3 hours
      alarmManager: true,
      
    };
    console.log("trigger==>",trigger);
    // Create a trigger notification
    await notifee.createTriggerNotification(
      {
        title: 'Meeting with Jane',
        body: 'Today at 11:20am',
        android: {
          channelId: 'test',
        },
      },
      trigger,
    );
  }
  render() {
    let {time, isDateTimePickerVisible,date} = this.state;
    let {edit} = this.props;
    console.log("time==>",time)
    console.log("date==>",date)

    return (
      <View style={styles.screen}>
        {/* <Button title="Display Notification" onPress={() => this.onDisplayNotification()} /> */}
        {/* <Button title="Create Trigger Notification" onPress={() => this.onCreateTriggerNotification()} /> */}
        <NavBar
          title={edit ? 'Edit Alarm' : 'Add Alarm'}
          leftButtonIcon="left"
          onLeftButtonPress={() =>  navigate(Constants.nav_alarm, {  })}
        />
        <View style={styles.container}>
          <View style={styles.editView}>
            <View>
              <Text style={{fontSize: Convert(80)}}>{time}</Text>
            </View>

            <View>

            {/*  <TouchableHighlight style={styles.editButton}>
                <Button
                  onPress={this._showDateTimePicker}
                  title="Edit"
                  accessibilityLabel="Edit Alarm"
                  color={Platform.OS === 'ios' ? 'white' : null}
                  style={{backgroundColor:"#7e1615"}}
                />
    </TouchableHighlight>*/}
 <TouchableOpacity  style={{  height: 40,
    width: Convert(160),
    borderRadius: Convert(10),
    marginLeft: Convert(50),
    marginRight: Convert(50),
    marginTop: Convert(20),
    marginBottom: Convert(30), backgroundColor: '#570d13', justifyContent: "center", }} onPress={this._showDateTimePicker} activeOpacity={0.9}  >
        <Text
            style={{
              fontSize: 14,
              textAlign: 'center',
              pending:10,
              marginBottom: 10,
              marginTop: 10,
              color:"#fff"
            }}>
            Edit
          </Text>
          </TouchableOpacity>
          <DatePicker
        modal
        open={isDateTimePickerVisible}
        date={date}
        mode="datetime"
        onConfirm={this._handleDatePicked}
        onCancel={this._hideDateTimePicker}
      />
             { /*<DateTimePicker
                isVisible={isDateTimePickerVisible}
                onConfirm={this._handleDatePicked}
                onCancel={this._hideDateTimePicker}
                mode="time"
    />*/}
            </View>
          </View>

          <View style={styles.descriptionView}>
            <TextInput
              style={styles.descriptionText}
              onChangeText={(message) => this.setState({message})}
              value={this.state.message}
              placeholder="Description"
              maxLength={30}
            />

            <View style={styles.snoozeModalContainer}>
              {this.snoozeModal()}
            </View>
            <View style={styles.snoozeModalContainer}>
              {this.stotraModal()}
            </View>
          </View>

          <View style={styles.buttonContainer}>
            {/*<TouchableHighlight style={styles.highlight}>
              <Button
                onPress={edit ? this._editAlarm : this._addAlarm}
                title="SAVE"
                accessibilityLabel="Save Alarm"
                style={{backgroundColor:"#7e1615"}}
                color={Platform.OS === 'ios' ? 'white' : null}
              />
  </TouchableHighlight>*/}
            <TouchableOpacity  style={{  height: iphoneX ? Convert(80) : Convert(50),
    width: width-40,
    borderRadius: Convert(10),
    marginLeft: Convert(50),
    marginRight: Convert(50),
    marginTop: Convert(20),
    marginBottom: Convert(30),
     backgroundColor: '#570d13', justifyContent: "center", }}  onPress={edit ? this._editAlarm : this._addAlarm} activeOpacity={0.9}  >
        <Text
            style={{
              fontSize: 14,
              textAlign: 'center',
              pending:10,
              marginBottom: 10,
              marginTop: 10,
              color:"#fff"
            }}>
            SAVE
          </Text>
          </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  setting: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomColor: 'lightgray',
    borderBottomWidth: 1,
    marginTop: Convert(10),
  },
  editButton: {
    height: 40,
    width: Convert(160),
    borderRadius: Convert(10),
    marginLeft: Convert(50),
    marginRight: Convert(50),
    marginTop: Convert(20),
    marginBottom: Convert(30),
    backgroundColor: Platform.OS === 'ios' ? '#6b141a' : "#6b141a",
  },
  snoozeModal: {
    flex: 1,
  },
  snoozeModalContainer: {
    display: 'flex',
    flex: 0.2,
    flexDirection: 'column',
    width: Convert(300),
     
  },
  snoozeView: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  snoozeFont: {
    fontSize: Convert(20),
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-around',
    flexGrow: 1,
    backgroundColor: '#E58200',
  },
  editView: {
    flexGrow: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  descriptionView: {
    flexGrow: 1.5,
    flexDirection: 'column',
    alignSelf: 'center',
  },
  descriptionText: {
    height: Convert(40),
    width: Convert(300),
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: Convert(10),
    backgroundColor: '#fff',
    textAlign: 'center',
    alignSelf: 'center',
  },
  screen: {
    display: 'flex',
    flex: 1,
    backgroundColor:"#E58200"
  },
  buttonContainer: {
    flexGrow: 1,
    justifyContent: 'flex-end',
  },
  highlight: {
    height: iphoneX ? Convert(80) : Convert(50),
    width: width,
    backgroundColor: Platform.OS === 'ios' ? '#7e1615' : "#7e1615",
    margin: 0,
  },
});

export default AddAlarm;
