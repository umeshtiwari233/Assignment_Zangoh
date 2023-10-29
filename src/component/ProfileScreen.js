/* eslint-disable prettier/prettier */
import React, {Component} from 'react';
import {
  View,
  Image,
  Text,
  TouchableOpacity,
  Alert,
  ToastAndroid,
  Linking,
  Modal,
  StyleSheet,
  Animated,
  Button,
} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker'; // For image selection

const options = {
  title: 'Select Profile Picture',
  storageOptions: {
    skipBackup: true,
    path: 'images',
  },
};

class ProfileScreen extends Component {
  state = {
    color:"lightgreen",
    progressBarWidth: 0,
    isStoryVisible: false,
    isaddStoryVisible: false,
    name: 'John Doe',
    bio: 'A passionate mobile app developer',
    profileImage:
      'https://images.ctfassets.net/h6goo9gw1hh6/2sNZtFAWOdP1lmQ33VwRN3/24e953b920a9cd0ff2e1d587742a2472/1-intro-photo-final.jpg?w=1200&h=992&fl=progressive&q=70&fm=jpg',
  };

  viewStory = () => {
    this.setState({isStoryVisible: true});

    // Set a timer to hide the story after 5 seconds
    setTimeout(() => {

        clearInterval(this.storyTimer);
      this.setState({isStoryVisible: false});
      this.setState({progressBarWidth:0})
      this.setState({color:"grey"})
    }, 5000); // 5000 milliseconds (5 seconds)
  };
  addStory = () => {
    this.setState({isaddStoryVisible: true});
  };

  increaseProgressBar = () => {
    // Increase the progress bar width by a small increment
    const { progressBarWidth } = this.state;
    if (progressBarWidth >= 100) {
      clearInterval(this.storyTimer); // Stop the timer when progress is full
    } else {
      this.setState({ progressBarWidth: progressBarWidth + 1 });
    }
  };

  async onSelectImage(type) {
    Alert.alert(
      'Update profile picture',
      'Choose an option ',
      [
        {
          text: 'Open Camera',
          onPress: this.onCamera.bind(this, type),
        },
        {
          text: 'Browse Gallery',
          onPress: this.onGallery.bind(this, type),
        },
        // {
        //   text: 'Remove Profile Image',
        //   onPress: this.setState({profileImage:"https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"}),
        // },
        {
          text: 'Cancel',
          onPress: () => {
            console.warn('permission denied');
          },
        },
      ],
      {
        cancelable: true,
        onDismiss: () =>
          ToastAndroid.showWithGravity(
            'Photo upload cancelled',
            ToastAndroid.SHORT,
            ToastAndroid.BOTTOM,
          ),
      },
    );
    // }
  }

  onGallery(type) {
    console.log('inside gallery');
    ImagePicker.openPicker({
      compressImageMaxWidth: 300,
      compressImageMaxHeight: 300,
      cropping: true,
    }).then(image => {
      console.log(image);
      if (type === 'thumbnail') {
        this.setState({profileImage: image.path});
      } else {
        this.setState({profileImage: image.path});
        console.log(
          '==================================else runned+++++++++++++++++++++++',
        );
        console.log('comment media,', this.state.comment_id);
        this.setState({Image: ''});
        // this.props.navigation.navigate("CreatePostPhoto", {
        //   image: this.state.Image,
        //   imageBase64: image.data,
        // });
      }
    });
  }

  onCamera(type) {
    console.log('inside camera');
    ImagePicker.openCamera({
      compressImageMaxWidth: 300,
      compressImageMaxHeight: 300,
      cropping: true,
      compressImageQuality: 0.7,
      includeBase64: true,
    }).then(image => {
      // console.log('image ===>',image);
      if (type === 'thumbnail') {
        this.setState({profileImage: image.path});
      } else {
        this.setState({profileImage: image.path});
      }
      // console.log('th state', this.state.thumbnail);
    });
  }

  handleImagePicker = () => {
    ImagePicker.showImagePicker(options, response => {
      if (response.didCancel) {
        // User canceled the image picker
      } else if (response.error) {
        // Handle error
        Alert.alert('Error', 'Image selection failed. Please try again.');
      } else {
        // Selected image from gallery or camera
        this.setState({profileImage: response.uri});
      }
    });
  };

  render() {
   
    return (
      <View style={{alignItems: 'center', justifyContent: 'center'}}>
        <TouchableOpacity
          onPress={() => {
            // this.props.navigation.navigate('StoryScreen')
            this.viewStory();
            this.storyTimer = setInterval(this.increaseProgressBar, 50); // Increases every 50 milliseconds
            
        }}
          onLongPress={() => this.onSelectImage('photo')}>
          <View
            style={{
              marginTop: 60,
              width: 120,
              height: 120,
              borderRadius: 60,
              overflow: 'hidden',
              marginBottom: 20,
              borderWidth:5,
            //   padding:15,
             borderColor:this.state.color,
             alignItems:"center",
             justifyContent:"center"
            }}>
            <Image
              source={{uri: this.state.profileImage}}
              style={{borderRadius: 45,width: '90%', height: '90%'}}
            />
            <TouchableOpacity 
            onPress={()=>{
                this.addStory();
            }}
            style={{
                position: 'absolute',
                top: 75,
                left: 75,
                width: '22%',
                height: '22%',
              }}>
            <Image
              source={{
                uri: 'https://cdn-icons-png.flaticon.com/128/1828/1828817.png',
              }}
              style={{
                
                width: '100%',
                height: '100%',
              }}
            />
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
        <View style={{marginTop: 60, alignItems: 'center'}}>
          <Text style={{fontWeight: '600', fontSize: 25}}>Umesh Tiwari</Text>
          <Text style={{fontSize: 18}}>ReactNative Developer</Text>
          <Text
            onPress={() =>
              Linking.openURL('https://github.com/umeshtiwari233/')
            }
            style={{color: 'blue', fontSize: 18}}>
            https://github.com/umeshtiwari233/
          </Text>
        </View>
        <Modal animationType="slide" visible={this.state.isStoryVisible}>
          <View style={{alignItems: 'center'}}>
            <View style={styles.progressBarContainer}>
              <View
                style={[
                  styles.progressBar,
                  {width: `${this.state.progressBarWidth}%`},
                ]}
              />
            </View>
            <View />
            <View style={{alignItems: 'center', marginTop: 30}}>
              <Image
                source={{
                  uri: 'https://images.indianexpress.com/2023/07/chandrayaan-3-launch-20230628.jpg',
                }}
                style={{borderRadius: 15, width: 370, height: 240}}
              />
              <Text style={{fontWeight: '500', fontSize: 22, marginTop: 10}}>
                ISRO to launch Surveillance Satellite
              </Text>
            </View>
            <View
              style={{
                justifyContent: 'center',
                marginTop: 80,
                alignItems: 'center',
              }}>
              <Text
                style={{
                  fontWeight: '800',
                  fontSize: 34,
                  marginTop: 10,
                  width: 270,
                }}>
                Such an Amazing News !! You must
              </Text>
              <Text style={{fontWeight: '800', fontSize: 46, marginTop: 10}}>
                READ THIS!
              </Text>
            </View>
          </View>
        </Modal>
        <Modal animationType="slide" visible={this.state.isaddStoryVisible}>
          <View style={{alignItems: 'center'}}>
            <Text style={{fontSize:20}}>Add Story</Text>
            <Text>sorry sir,this functionality is taking time so havent implemented yet</Text>
            <Button title="close" onPress={()=>this.setState({isaddStoryVisible: false,})}></Button>
            </View>
            
        </Modal>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  closeButton: {
    position: 'absolute',
    top: 20,
    right: 20,
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 5,
  },
  closeButtonText: {
    color: 'black',
  },
  storyImage: {
    width: 300,
    height: 500,
  },
  progressBarContainer: {
    marginTop:20,
    height: 5,
    width: '90%',
    backgroundColor: 'lightgray',
    borderRadius: 5,
  },
  progressBar: {
    height: '100%',
    backgroundColor: 'blue',
    borderRadius: 5,
  },
});

export default ProfileScreen;
