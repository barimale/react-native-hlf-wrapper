import { NativeModules } from 'react-native';
import * as RNFS from 'react-native-fs';
class SDK {
    constructor() {
        this.rnfsPath = RNFS.DocumentDirectoryPath;
        this.connectionProfilePath  = this.rnfsPath + "/connection_profile.json";
        this.HlfWrapper = NativeModules.HlfWrapper;
    }
    // Native call test Function
    async hello() {
        return await this.HlfWrapper.sampleMethod();
    }
    getRNFSPath() {
        return this.rnfsPath
    }

    async connectionProfileSetup(connectionProfile) {
        connectionProfile.client.credentialStore.path = this.rnfsPath + '/keystore'
        connectionProfile.client.credentialStore.cryptoStore.path = this.rnfsPath +  '/msp'
        RNFS.writeFile(this.connectionProfilePath, JSON.stringify(connectionProfile))
            .then((success) => {
                console.log('FILE WRITTEN!');
            })
            .catch((err) => {
                console.log(err.message);
            });
    }

    async enrollUser(user, secret) {
        return await this.HlfWrapper.enroll(user, secret, this.connectionProfilePath);
    }

    async lsRNFS() {
        // get a list of files and directories in the main bundle
        console.log("list the RNFS dir")
        await RNFS.readDir(this.rnfsPath)
            .then((result) => {
                console.log('GOT RESULT', result);
            })
            .catch((err) => {
                console.log(err.message, err.code);
            });
    }

    async loadPrivateKey(privateKeyName) {
        // get a list of files and directories in the main bundle
        console.log("reading private key from RNFS: " + this.rnfsPath + '/msp/keystore/' + privateKeyName)
        return await RNFS.readFile(this.rnfsPath + '/msp/keystore/' + privateKeyName);
    }
}
const HlfSdk = new SDK()
export default HlfSdk;
