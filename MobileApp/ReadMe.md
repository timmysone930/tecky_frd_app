### ReadMe

#### Install package for mac OS

```bash
yarn install
cd ios
pod install
cd ..
```

#### Setup before start program

```bash
touch .env
```

#### Start program

```bash
npx react-native start
npx react-native run-ios
npx react-native run-android
```

#### Build android apps with Windows  

Follow https://reactnative.dev/docs/environment-setup and https://reactnative.dev/docs/signed-apk-android for generate the my-upload-key.keystore  
Warning: Before generate the key, Please see the ```android/gradle.properties``` for the password and make sure the key name is ```my-release-key.keystore```  NOT ```my-upload-key.keystore```

build APK  
```
cd android
./gradlew assembleRelease
```
Ref: https://www.react-native.cn/docs/signed-apk-android  

build AAB    
```
cd android
./gradlew bundleRelease
```
Ref: https://reactnative.dev/docs/signed-apk-android  



## Remark
version id in ```c19-frd-project-03-tw\MobileApp\android\app\build.gradle```   

0.4  
Added firebase core, performances and crashed report plugins

0.6
Fixed the apps will crashed after a re-login actions with try catch compoments
