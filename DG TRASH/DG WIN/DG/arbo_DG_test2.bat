REM echo off
REM ----------- Configuration -----------
set chemin_exe_PHP_CLI="C:\php-5.6.30-CLI\php.exe"
set chemin_exe_firefox="C:\Program Files (x86)\Mozilla Firefox\firefox.exe"
REM --------- Fin Configuration ---------


REM --- Lecture de l'arborescence sur le disque ==> objet JSON  --- 
%chemin_exe_PHP_CLI% dir2json.php "json.json" "JSON_UNESCAPED_UNICODE"

REM --- Ouverture du formulaire HTML/JS (récupération et enrichissement du JSON) ---
%chemin_exe_firefox% index.html"

