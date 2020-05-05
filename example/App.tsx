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
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar, Button, Alert,
} from 'react-native';


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
  Alert.alert('☆NATIVE PROMISE MESSAGE (cat private key)☆', privateKey);
}

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
            onPress={() => enrollUser('user31', 'userpw')}
        />
        <View style={{flex: 0.01}} />
        <Button title={'ls RNFS'} onPress={lsRNFS} />
        <View style={{flex: 0.01}} />
        <Button title={'Show private key'} onPress={() => showPrivateKey('user31', 'userpw')} />
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
