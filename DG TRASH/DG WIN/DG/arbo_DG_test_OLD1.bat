
cd C:\php-5.6.30-CLI\

rem 
set currentpath=%~dp0
rem @echo %currentpath%
echo %currentpath%

set PWD=%~dp0
echo %PWD%

rem set /p nom= Quel est votre nom ?

rem 
echo "***"%currentpath%"/dir2json.php"
rem 
echo "***"pwd"/dir2json.php"
echo off

REM php test_CLI_LECTURE_ARBO3.php 

REM lecture de l'arborescence sur le disque ==> objet JSON 
REM php $path"/dir2json.php" $path"/arbo" $path"/json.json" "JSON_UNESCAPED_UNICODE"

REM SINON :
REM 
"C:\php-5.6.30-CLI\php.exe" test_CLI_LECTURE_ARBO3.php

REM sans préciser le chemin : ajouter le chemin de l'executable dans la variable d'environnement Path de windows.
REM EXEMPLE "c:\Program Files\Mozilla Firefox\firefox.exe" www.google.fr

REM "C:\Program Files (x86)\Mozilla Firefox\firefox.exe" file:///"C:/php-5.6.30-CLI/test_Reportage_2017-03-16_09h54 (16-03)/encours inter/index.html"

//REM KO firefox.exe file:///"D:/ATOS/ATD Quart-monde/sources/dev_en_cours/Reportage_2017-03-15_13h30 (15-03)/encours inter/index.html"