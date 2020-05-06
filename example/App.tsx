/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React from 'react';
import {StyleSheet, View, Text, Button, Alert} from 'react-native';

// ############################# HLF Services #####################################
// @ts-ignore
import HlfSdk from 'react-native-hlf-wrapper';

let connection_profile = require('./connection_profile.json');

const test = async () => {
  let message = await HlfSdk.hello();
  Alert.alert('☆NATIVE PROMISE MESSAGE (test)☆', message);
};

const connectionProfileSetup = async () => {
  await HlfSdk.connectionProfileSetup(connection_profile);
  Alert.alert('☆NATIVE PROMISE MESSAGE (cpp setup)☆', '...see console');
};

const enrollUser = async (user: string, secret: string) => {
  let message = await HlfSdk.enrollUser(user, secret);
  Alert.alert('☆NATIVE PROMISE MESSAGE (enroll)☆', message);
};

const lsRNFS = async () => {
  await HlfSdk.lsRNFS();
  Alert.alert('☆NATIVE PROMISE MESSAGE (ls)☆', '...see console');
};

const showPrivateKey = async (user: string, secret: string) => {
  let message = await HlfSdk.enrollUser(user, secret);
  let userCrypto = JSON.parse(message);
  let privateKey = await HlfSdk.loadPrivateKey(userCrypto.privKeyName);
  Alert.alert(
    '☆NATIVE PROMISE MESSAGE (cat private key: ' +
      userCrypto.privKeyName +
      ')☆',
    privateKey,
  );
};

const invoke = async (user: string, channelName: string, chaincodeName: string, fnc: string, args: string) => {
  let message = await HlfSdk.invoke(user, channelName, chaincodeName, fnc, args);
  Alert.alert('☆NATIVE PROMISE MESSAGE (invoke)☆', message);
};

const query = async (user: string, channelName: string, chaincodeName: string, fnc: string, args: string) => {
  let message = await HlfSdk.query(user, channelName, chaincodeName, fnc, args);
  Alert.alert('☆NATIVE PROMISE MESSAGE (query)☆', message);
};

const username = 'user3';
const userpw = 'userpw';
// #############################################################################

const App = () => {
  return (
    <>
      <View style={styles.container}>
        <Text style={styles.welcome}>☆HlfWrapper example☆</Text>
        <Button title={'Native Test'} onPress={test} />
        <View style={{flex: 0.01}} />
        <Button
          title={'Setup: Connection Profile'}
          onPress={connectionProfileSetup}
        />
        <View style={{flex: 0.01}} />
        <Button
          title={'Enroll User'}
          onPress={() => enrollUser(username, userpw)}
        />
        <View style={{flex: 0.01}} />
        <Button title={'ls RNFS'} onPress={lsRNFS} />
        <View style={{flex: 0.01}} />
        <Button
          title={'Show private key'}
          onPress={() => showPrivateKey(username, userpw)}
        />
        <View style={{flex: 0.01}} />
        <Button
          title={'Create User (invoke)'}
          onPress={() => invoke(username, 'myc', 'mysome_cc', 'updateUser', '')}
        />
        <View style={{flex: 0.01}} />
        <Button
          title={'Get User (query)'}
          onPress={() =>
            query(username, 'myc', 'mysome_cc', 'getUserState', username)
          }
        />
        <View style={{flex: 0.01}} />
        <Button
          title={'Create Content (invoke)'}
          onPress={() =>
            invoke(username, 'myc', 'mysome_cc', 'updateContent', 'c1,1,10')
          }
        />
        <View style={{flex: 0.01}} />
        <Button
          title={'Get Content (query)'}
          onPress={() =>
            query(username, 'myc', 'mysome_cc', 'getContentState', 'c1')
          }
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

export default App;
