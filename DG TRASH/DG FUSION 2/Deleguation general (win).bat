REM echo off
REM ----------- Configuration -----------
set php="C:\php\php.exe"
set chemin_exe_firefox="C:\Program Files (x86)\Mozilla Firefox\firefox.exe"
REM --------- Fin Configuration ---------


@echo off
setlocal
cd /d %~dp0
Set StartInDirectory=%CD%

set "psCommand="(new-object -COM 'Shell.Application')^
.BrowseForFolder(0,'Please choose a folder.',0,0).self.path""

for /f "usebackq delims=" %%I in (`powershell %psCommand%`) do set "folder=%%I"

setlocal enabledelayedexpansion
echo You chose !folder!


%php% win_json.php %folder% "json\json.json"  "JSON_UNESCAPED_UNICODE"

endlocal
start firefox.exe "index.html"

