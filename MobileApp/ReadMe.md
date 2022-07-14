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

OR

touch .env.development
touch .env.production
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

OR

yarn run buildAndroidAPK
```
Ref: https://www.react-native.cn/docs/signed-apk-android  

build AAB    
```
cd android
./gradlew bundleRelease

yarn run buildAndroidAAB
```
Ref: https://reactnative.dev/docs/signed-apk-android  

## Firebase cli upload
1. firebase login
   
2. firebase appdistribution:distribute ./android/app/build/outputs/apk/release/app-release.apk --app 1:33402240354:android:93f8e0f395a9ce01f9403b --release-notes "Bug fixes and improvements" --groups "internal-group"


## Remark
version id in ```c19-frd-project-03-tw\MobileApp\android\app\build.gradle```   

1.04    
Added firebase core, performances and crashed report plugins  

1.06  
Fixed the apps will crashed after a re-login actions with try catch compoments  

1.07  
Fixed camera not active in physical devices due to permission issues  
https://stackoverflow.com/questions/72248267/launchcamera-in-react-native-image-picker-doesnt-open-anything-when-installed  
  
1.08  
Fixed email display issues and notifications to phone