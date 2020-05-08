# react-native-hlf-wrapper
A react-native wrapper for Hyperledger Fabric 1.4+.  Works only for **android** currently
The native modules wrappers are written in golang and converted to  relevant android and ios native modules using gomobile. 
Refer to project: https://github.com/bityoga/mysome_drivers/tree/indevs 

Provides client functionalities of 
+ enrolling a user
+ invoking a chaincode function
+ querying a chaincode function

Does not provide admin services, as admin services needs to be handled from a backend server rather than from a mobile client
+ register user
+ register [install/instantiate/update] chaincode
+ ledger queries
+ ...

# Dependencies 
The client react-native project needs to have the following packages installed:
```
"react": "^16.8.1",
"react-native": ">=0.60.0-rc.0 <1.0.x",
"react-native-fs": "^2.16.6"
``` 


## Installation

`$ npm install react-native-hlf-wrapper --save`
or
`$ yarn add react-native-hlf-wrapper`

### Mostly automatic installation
The linking is handled automatically. However, if the react native module is not linked, the following command can be executed
`$ react-native link react-native-hlf-wrapper`


## Usage Example
In your react native project you can interact with the Hyperledger Fabric network as follows:

### Setting up connection/configuration
In order to connect with the Hyperledger Fabric cluster, we need to set up a config/connection profile with which the client can communicate with the cluster. 
Currently, the connection_profile file is only tested in JSON format and **not** YAML format. Additionally, we also haven't yet tested TLS communication with either the CA, orderers or peers.
Please get the file ```connection_profile.template.json``` from this project's root directory into your react-native app's root directory. Rename it as:```connection_profile.json```
Inside the connection_profile.json file, change the required values as per your Hyperledger Fabric cluster configuration. 

### From react-native app
```javascript
import HlfSdk from 'react-native-hlf-wrapper'; // Load the module
//Imports the connection/configuration to connect with a Hyperledger fabric sdk. Has to be JSON for now and needs to be present at your project root directory
let connection_profile = require('./connection_profile.json');  
... 
let response = await HlfSdk.hello(); //Returns a "hello world" message to show interaction with the native module
await HlfSdk.connectionProfileSetup(connection_profile); // Sets up the connection profile. This process needs to be performed
// Enrolls a user. Provide the username and password for an already registered user. It will be enrolled and its crypto material will be stored under: RNFS.DocumentDirectoryPath/msp
let response = await HlfSdk.enrollUser(username, secret); //Returns the publickey/cert, certName and private key as stringified JSON
// Invoke a chaincode function
let response = await HlfSdk.invoke(user, channelName, chaincodeName, fnc, args); //Gets the response as stringified JSON
// Query a chaincode function
let response = await HlfSdk.query(user, channelName, chaincodeName, fnc, args); //Gets the response as stringified JSON
```

### Testing up the example app associated with this project [Optional]
+ navigate to the example folder under project: https://github.com/achak1987/react-native-hlf-wrapper
+ connection_profile.template.json file is already copied here as connection_profile.json
+ change the connection_profile.json as per your hyperledger fabric configuration
+ Install dependencies
using YARN
```
yarn add react-native-fs@2.16.6
yarn add react-native-hlf-wrapper
```
or using NPM
```
npm install react-native-fs@2.16.6 --save
yarn install react-native-hlf-wrapper --save
```
+ Auto linking should be done. So we dont  need to manually link them
+ Run the metro server by navigating to this project/example in your terminal and run: ```react-native start```
+ Start the app by running  ```yarn android``` in your terminal
