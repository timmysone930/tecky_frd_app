from pydrive.auth import GoogleAuth
from pydrive.drive import GoogleDrive

apk_path = "D:/c19-frd-project-03-tw/MobileApp/android/app/build/outputs/apk/release/app-release.apk"
secret_path = "D:/c19-frd-project-03-tw/MobileApp/client_secrets.json"

gauth = GoogleAuth()
gauth.LocalWebserverAuth() # client_secrets.json need to be in the same directory as the script
drive = GoogleDrive(gauth)

def ListFolder(parent):
    filelist=[]
    file_list = drive.ListFile({'q': "'%s' in parents and trashed=false" % parent}).GetList()
    for f in file_list:
        if f['mimeType']=='application/vnd.google-apps.folder': # if folder
            filelist.append({"id":f['id'],"title":f['title'],"list":ListFolder(f['id'])})
        else:
            filelist.append({"title":f['title'],"title1":f['alternateLink']})
    return filelist

# result = ListFolder('root')
# for i in result:
#     print(i)

# '1eiiATZdXHVSMJ5TV-AJEc-t604VlKeCz'

file1 = drive.CreateFile({
    'title': 'telemedicine1.083.apk',
    'parents': [{'id': '1eiiATZdXHVSMJ5TV-AJEc-t604VlKeCz'}]
})

file1.SetContentFile(apk_path)
file1.Upload() # Upload the file.
print('title: %s, id: %s' % (file1['title'], file1['id']))