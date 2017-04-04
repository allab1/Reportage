#!/bin/bash
#------------  config -----------

#l'appel au bibliotheque qui permet le dialogue du choix de l'arborescence 
CD="/Applications/CocoaDialog.app/Contents/MacOS/CocoaDialog"
#chemin absolu vers le répertoire courant
path="${0%/*}"
# chemin relatif du fichier json temporaire
tmpout="../tmp/json.json"

#------------ fin config -----------

rv=`$CD fileselect \
--text "Choisir le répertoire racine de l'arborescence " \
--with-directory $HOME/ \
--select-directories `
if [ -n "$rv" ]; then  ### if $rv has a non-zero length
php "$path/dir2json.php" $rv "$path/$tmpout" "JSON_UNESCAPED_UNICODE"
open "$path/../index.html"
else
echo "No source file selected"
fi

