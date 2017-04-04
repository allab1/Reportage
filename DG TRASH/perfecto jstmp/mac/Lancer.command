#!/bin/bash

#l'application cocoadialog doit etre placé dans le chemin indiqué 
CD="/Applications/CocoaDialog.app/Contents/MacOS/CocoaDialog"
#chemin actuel
path="${0%/*}"
#chemin du fichier sortie json
tmpout="../jstmp/json.json"



rv=`$CD fileselect \
--text "Choisir le repertoir de l'arborescence " \
--with-directory $HOME/ \
--select-directories `

if [ -n "$rv" ]; then  ### if $rv has a non-zero length
php "$path/dir2json.php" $rv "$path/$tmpout" "JSON_UNESCAPED_UNICODE"
open "$path/../index.html"
exit
else
osascript -e 'tell app "System Events" to display dialog "Aucune arborescence n est choisit "'
fi

