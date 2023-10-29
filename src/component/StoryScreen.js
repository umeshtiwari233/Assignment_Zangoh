/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {SafeAreaView, Text, View, Image} from 'react-native';

export default class StoryScreen extends Component {
  render() {
    return (
      <SafeAreaView>
        <View style={{alignItems: 'center'}}>
          <View />
          <View style={{alignItems: 'center'}}>
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
      </SafeAreaView>
    );
  }
}
