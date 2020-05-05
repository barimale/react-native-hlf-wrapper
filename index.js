import { NativeModules } from 'react-native';
const { HlfWrapper } = NativeModules

import * as RNFS from 'react-native-fs';

class HlfSdk {
    constructor() {
        this.rnfsPath = RNFS.DocumentDirectoryPath;
        this.connectionProfilePath  = this.rnfsPath + "/connection_profile.json";
    }
    // Native call test Function
    async hello() {
        return await HlfWrapper.sampleMethod();
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
        return await HlfWrapper.enroll(user, secret, this.connectionProfilePath);
    }

    async lsRNFS() {
        // get a list of files and directories in the main bundle
        RNFS.readDir(this.rnfsPath)
            .then((result) => {
                console.log('GOT RESULT', result);

                // stat the first file
                return Promise.all([RNFS.stat(result[0].path), result[0].path]);
            })
            .then((statResult) => {
                if (statResult[0].isFile()) {
                    // if we have a file, read it
                    return RNFS.readFile(statResult[1], 'utf8');
                }

                return 'no file';
            })
            .then((contents) => {
                // log the file contents
                console.log(contents);
            })
            .catch((err) => {
                console.log(err.message, err.code);
            });
    }
}
export default new HlfSdk();
