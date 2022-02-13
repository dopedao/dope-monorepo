import json
import os

data = {}

x = True
relative_path = './male'
base_path = './game/character/male/'
for i in os.walk(relative_path):
    if x:
        x = False
        continue

    path = i[0].replace('\\', '/')

    for y in i[2]:
        if not y.endswith('.png'):
            continue

        data[y.replace('.png', '')] = {
            'file': path + '/' + y,
            "frameConfig": { "frameWidth": 30, "frameHeight": 60 },
            'size': os.path.getsize(path + '/' + y)
        }

print(json.dumps(data))