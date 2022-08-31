# from asyncio.windows_events import NULL
import re
import os
import sys

def readVersion(input_version = None, gradle_path = "./android/app/build.gradle"):

    f = open(gradle_path, "r")
    strs = f.read().splitlines()
    f.close()

    new_version_ref = []

    for i, v in enumerate(strs):
        if "versionName" in v:
            version_num_str = re.sub("[^\d\.]", "", v)
            version_num = float(version_num_str) + float(0.01)

            new_version = str(round(version_num, 4))
            if input_version != None:
                new_version = input_version

            new_version_ref.append(new_version)

            print(f"Old version: {version_num_str}")
            print(f"New version: {new_version}")
            
            strs[i] = v.replace(version_num_str, new_version)
            break
    
    print(f"versionName increased in {os.path.join(os.getcwd(), 'android', 'app', 'build.gradle' )}")
        
    f = open(gradle_path, "w")
    f.write("\n".join(strs))
    f.close()

    incEnvCode(".env", new_version_ref[0])
    incEnvCode(".env.development", new_version_ref[0])
    incEnvCode(".env.production", new_version_ref[0])
    incEnvCode(".env.setting", new_version_ref[0])

def incEnvCode(env_path, code_version):

    if os.path.exists(os.path.join(os. getcwd(),env_path)):

        f = open(env_path, "r")
        strs = f.read().splitlines()
        f.close()

        # Flag for checking if the regarding env exist
        changed_version = False

        for i, v in enumerate(strs):
            if "VERSION_NUM=" in v:

                strs[i] = "VERSION_NUM=" + str(code_version)
                changed_version = True
                break
        
        if not changed_version:
            strs.append("VERSION_NUM=" + str(code_version))
        
        f = open(env_path, "w")
        f.write("\n".join(strs))
        f.close()
        print(f"VERSION_NUM increased in {os.path.join(os.getcwd(),env_path)}")
    
if __name__ == "__main__":
    input_version = str(sys.argv[1]) if len(sys.argv) >= 2 else None
    readVersion(input_version)
