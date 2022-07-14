from pydrive.auth import GoogleAuth
from pydrive.drive import GoogleDrive
import argparse
import re

def mainFunc(apps_name = "telemedicineApps.apk"):
    gauth = GoogleAuth()
    gauth.LocalWebserverAuth() # client_secrets.json need to be in the same directory as the script
    drive = GoogleDrive(gauth)

    file1 = drive.CreateFile({
        'title': apps_name,
        'parents': [{'id': '1eiiATZdXHVSMJ5TV-AJEc-t604VlKeCz'}]
    })

    file1.SetContentFile(apk_path)
    file1.Upload() # Upload the file.
    print('title: %s, id: %s' % (file1['title'], file1['id']))
    print("Upload done.")
    
secret_path = "./client_secrets.json"
apk_path = "./android/app/build/outputs/apk/release/app-release.apk"

def readVersion():
    gradle_path = "./android/app/build.gradle"
    f = open(gradle_path, "r")
    str = f.read().splitlines()
    for v in str:
        if "versionName" in v:
            return re.sub("[^\d\.]", "", v)

    return "999"

if __name__ == "__main__":
     # input args parser
    parser = argparse.ArgumentParser(description='Process input mode.')
    parser.add_argument('--name', default="telemedicineApps", help='apps name')
    args = parser.parse_args()

    app_name = args.name + readVersion()
    # print(args)

    if args.name[-4:] != ".apk":
        app_name += ".apk"

    readVersion()
    print(app_name)
    mainFunc(app_name)