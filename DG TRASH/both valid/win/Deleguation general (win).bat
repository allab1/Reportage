REM echo off
REM ----------- Configuration -----------
set php="C:\php\php.exe"
set chemin_exe_firefox="C:\Program Files (x86)\Mozilla Firefox\firefox.exe"
set tmpout="..\tmp\json.json"
REM --------- Fin Configuration ---------


@echo off
setlocal
set "psCommand="(new-object -COM 'Shell.Application')^
.BrowseForFolder(0,'Choisir le répertoire racine de l'arborescence.',0,0).self.path""

for /f "usebackq delims=" %%I in (`powershell %psCommand%`) do set "folder=%%I"

setlocal enabledelayedexpansion
echo You chose !folder!
IF [%1]==[] exit

%php% win_json.php %folder% %tmpout%  "JSON_UNESCAPED_UNICODE"

endlocal
start firefox.exe "../index.html"

