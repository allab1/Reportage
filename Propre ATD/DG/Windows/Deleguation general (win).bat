REM ----------- Configuration -----------
set php="installation\php\php.exe"
set chemin_exe_firefox="C:\Program Files (x86)\Mozilla Firefox\firefox.exe"
REM --------- Fin Configuration ---------

echo off
setlocal

set "psCommand="(new-object -COM 'Shell.Application')^
.BrowseForFolder(0,'Votre racine.',0,0).self.path""

for /f "usebackq delims=" %%I in (`powershell %psCommand%`) do set "folder=%%I"

setlocal enabledelayedexpansion
echo You chose !folder!

%php% win_json.php %folder% "json"  "JSON_NUMERIC_CHECK"

endlocal
start firefox.exe "../index.html"

