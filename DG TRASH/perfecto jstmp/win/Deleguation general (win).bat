REM echo off
REM ----------- Configuration -----------
REM le chemin du php cli 
set php="C:\php\php.exe"
REM le chemin vers le navigateur qui sera utilisé 
set chemin_exe_firefox="C:\Program Files (x86)\Mozilla Firefox\firefox.exe"
REM --------- Fin Configuration ---------


@echo off
setlocal
set "psCommand="(new-object -COM 'Shell.Application')^
.BrowseForFolder(0,'Choisisez la racine de votre répertoire de projet.',0,0).self.path""

for /f "usebackq delims=" %%I in (`powershell %psCommand%`) do set "folder=%%I"

setlocal enabledelayedexpansion
echo You chose !folder!

REM execution de la commande batch qui lance le script php en passant 3 argument
REM win_json : le script php
REM folder : la racine du projet (selectionné via une interface graphique)
REM json : un chemin doit être saisit pour définir l'emplacement de sortie json. le chemin est defini en dure dans le script php
%php% win_json.php %folder% "json"  "JSON_UNESCAPED_UNICODE"

endlocal
start firefox.exe "../index.html"

