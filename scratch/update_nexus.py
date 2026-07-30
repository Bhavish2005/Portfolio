import os

dir_path = r'f:\Projects\Portfolio\src\assets\Nexus Intelligence'
files = os.listdir(dir_path)
screenshots = [f for f in files if f.startswith('Screenshot From') and f.endswith('.png')]
screenshots.sort()

import_stmts = []
media_objs = []

for i, f in enumerate(screenshots):
    var_name = f'nexusAppScreen{i}'
    import_stmts.append(f"import {var_name} from '../assets/Nexus Intelligence/{f}';")
    media_objs.append(f"{{ type: 'image', src: {var_name}, title: 'App Screenshot {i+1}' }}")

js_path = r'f:\Projects\Portfolio\src\data\projects.js'
with open(js_path, 'r', encoding='utf-8') as file:
    content = file.read()

imports_str = '\n'.join(import_stmts)
content = content.replace('// Nexus Assets\n', f'// Nexus Assets\n{imports_str}\n')

old_media = """    media: [
      { type: 'image', src: nexusSecLayer, title: 'Security Layer Architecture' },
      { type: 'document', src: nexusZip, title: 'ScreenShot of App.zip', filename: 'Nexus_App_Screenshots.zip' }
    ]"""

new_media = "    media: [\n      { type: 'image', src: nexusSecLayer, title: 'Security Layer Architecture' },\n      " + ",\n      ".join(media_objs) + "\n    ]"

if old_media in content:
    content = content.replace(old_media, new_media)
else:
    print("WARNING: Old media block not found. Make sure the formatting exactly matches.")

with open(js_path, 'w', encoding='utf-8') as file:
    file.write(content)
