from pydrive.auth import GoogleAuth
from pydrive.drive import GoogleDrive
import argparse



def mainFunc(apps_name = "telemedicineApps.apk"):
    gauth = GoogleAuth()
    gauth.LocalWebserverAuth() # client_secrets.json need to be in the same directory as the script
    drive = GoogleDrive(gauth)

    

    # result = ListFolder('root')
    # for i in result:
    #     print(i)

    # '1eiiATZdXHVSMJ5TV-AJEc-t604VlKeCz'

    file1 = drive.CreateFile({
        'title': apps_name,
        'parents': [{'id': '1eiiATZdXHVSMJ5TV-AJEc-t604VlKeCz'}]
    })

    file1.SetContentFile(apk_path)
    file1.Upload() # Upload the file.
    print('title: %s, id: %s' % (file1['title'], file1['id']))
    
apk_path = "./android/app/build/outputs/apk/release/app-release.apk"
secret_path = "./client_secrets.json"

if __name__ == "__main__":
     # input args parser
    parser = argparse.ArgumentParser(description='Process input mode.')
    parser.add_argument('--name', default="telemedicineApps.apk", help='apps name')
    args = parser.parse_args()

    app_name = args.name
    # print(args)

    if args.name[-4:] != ".apk":
        app_name += ".apk"

    print(app_name)
    mainFunc(app_name)