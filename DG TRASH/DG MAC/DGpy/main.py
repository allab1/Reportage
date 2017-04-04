#!/usr/bin/env

try:
    from Tkinter import Tk
except ImportError:
    import pip
    pip.main(['install', '--user', 'Tkinter'])
    from Tkinter import Tk
try:
    import tkFileDialog
except ImportError:
    import pip
    pip.main(['install', '--user', 'tkFileDialog'])
    import tkFileDialog
try:
    import os
except ImportError:
    import pip
    pip.main(['install', '--user', 'os'])
    import os 
try:
    import subprocess
except ImportError:
    import pip
    pip.main(['install', '--user', 'subprocess'])
    import subprocess   
try:
    import time
except ImportError:
    import pip
    pip.main(['install', '--user', 'time'])
    import time


# import Tkinter 
# import tkFileDialog
# import os
# import subprocess 
# import time
        

 
current = os.path.dirname(os.path.realpath(__file__))
# current=current.replace(" ","\ ")
out=current+'/../js/json.json'
script=current+'/dir2json.php'
if os.path.exists(out):
    os.remove(out)
root = Tk()
root.withdraw()
root.lift()
arbo = tkFileDialog.askdirectory(parent=root)    


print subprocess.Popen("php '"+script+"' '"+arbo+"' '"+out+"' 'JSON_UNESCAPED_UNICODE' ", shell=True, stdout=subprocess.PIPE).stdout.read() 

while not os.path.exists(out):
    time.sleep(1)

if os.path.isfile(out):
	subprocess.Popen("open "+current+"/../index.html", shell=True, stdout=subprocess.PIPE).stdout.read() 


    
    
    
    
    
    
    
    
    

