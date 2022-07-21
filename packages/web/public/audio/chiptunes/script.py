import json
import os

cwd = os.getcwd()

audioFiles = {

}

for file in os.listdir(cwd):
    if not os.path.isfile(file):
        continue

    if not file.endswith(".mp3"):
        continue

    audioFiles["chiptunes_" + file.replace(" ", "_").replace(".mp3", "")] = {
        "file": "./audio/chiptunes/" + file,
        "size": os.path.getsize(file),
        "stream": True
    }

print(json.dumps(audioFiles))
