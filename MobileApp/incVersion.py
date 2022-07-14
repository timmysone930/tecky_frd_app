from pydrive.auth import GoogleAuth
from pydrive.drive import GoogleDrive
import re

def readVersion(gradle_path = "./android/app/build.gradle"):

    f = open(gradle_path, "r")
    strs = f.read().splitlines()
    f.close()

    for i, v in enumerate(strs):
        if "versionName" in v:
            version_num_str = re.sub("[^\d\.]", "", v)
            version_num = float(version_num_str) + float(0.01)

            new_version = str(round(version_num, 4))

            print(f"Old version: {version_num_str}")
            print(f"New version: {new_version}")

            # final_str += v.replace(version_num_str, new_version)
            
            strs[i] = v.replace(version_num_str, new_version)
            break
        
    f = open(gradle_path, "w")
    f.write("\n".join(strs))
    f.close()
    
if __name__ == "__main__":
    readVersion()
