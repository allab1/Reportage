#!/usr/bin/env bash

# ----------- Configuration -----------
chemin_exe_PHP_CLI="C:\php-5.6.30-CLI\php.exe"
chemin_exe_firefox="C:\Program Files (x86)\Mozilla Firefox\firefox.exe"
# --------- Fin Configuration ---------



path="${0%/*}"


echo $path

php $path"/dir2json.php" $path"/arbo" $path"/json.json" "JSON_UNESCAPED_UNICODE"


