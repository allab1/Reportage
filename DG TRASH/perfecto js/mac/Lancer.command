#!/bin/bash


CD="/Applications/CocoaDialog.app//Contents/MacOS/CocoaDialog"
path="${0%/*}"
tmpout="../js/json.json"
rv=`$CD fileselect \
--text "Choisir le repertoir de l'arborescence " \
--with-directory $HOME/ \
--select-directories `
if [ -n "$rv" ]; then  ### if $rv has a non-zero length
php "$path/dir2json.php" $rv "$path/$tmpout" "JSON_UNESCAPED_UNICODE"
open "$path/../index.html"
else
echo "No source file selected"
fi

