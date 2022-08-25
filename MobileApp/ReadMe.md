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

Make sure you are inside of the root of "MobileApp" to run those script  
Need to Install (Optional if you not going to build and upload to google play / ios):  
1. Python ```pip install PyDrive``` ```pip install argparse```  
2. firebase cli with ``` npm install -g firebase-tools```  
Afetr you are installed, type ```firebase login``` to login first  

cicd.py: Auto upload apk to google drive    
incVersion.py: Auto increase the version code in the file ```./android/app/build.gradle```   

build APK    
```
yarn run buildAndroidAPK
yarn run buildAndroidAAB

auto increase the version and build a new apk / abb

yarn run buildAndroidAPKDeploy

1. auto increase the version (py)
2. build a new apk / abb (node)
3. Run firebase appdistribution:distribute to upload (CLI)

yarn run buildAndroidAPKFull

1. auto increase the version (py)
2. build a new apk / abb (node)
3. Run firebase appdistribution:distribute to upload (CLI)
4. Upload to google drive (py)
```

## Firebase cli upload
1. firebase login
   
2. Type ```firebase appdistribution:distribute ./android/app/build/outputs/apk/release/app-release.apk --app 1:367116338304:android:40aeb36aee3c01dff99265 --release-notes \"Bug fixes and improvements\" --groups \"internaltestgp\"``` in the terminal at the ./MobileApp root  

## Remark
version id in ```c19-frd-project-03-tw\MobileApp\android\app\build.gradle```   

yarn react-native generate-bootsplash images/telemedicineLogo.png --background-color=FFFFFF --logo-width=100 --assets-path=assets --flavor=main