<?php
function wd_remove_accents($str, $charset='utf-8')
{
    $str = htmlentities($str, ENT_NOQUOTES, $charset);
    $str = preg_replace('#&([A-za-z])(?:acute|cedil|caron|circ|grave|orn|ring|slash|th|tilde|uml);#', '\1', $str);
    $str = preg_replace('#&([A-za-z]{2})(?:lig);#', '\1', $str); // pour les ligatures e.g. '&oelig;'
    $str = preg_replace('#&[^;]+;#', '', $str); // supprime les autres caractères
    
    return $str;
}

function dir2json($dir)
{   
    $a = [];
    if($handler = opendir($dir))
    {
        while (($content = readdir($handler)) !== FALSE)
        {
            if ($content != "." && $content != ".." && $content != "Thumb.db" && $content[0] != ".")
            {   
               // $content=wd_remove_accents($content);
                if(is_file($dir."/".$content)) $a[] = wd_remove_accents($content);
				else if(is_dir($dir."/".$content)) $a[wd_remove_accents($content)] = dir2json($dir."/".$content); 
            } 
        }    
        closedir($handler); 
    } 
    return $a;    
}

//--- saisie utilisateur
// NB : La saisie avec ou sans '/' final fonctionne
print "Chemin complet de la racine de l'arborescence sur votre disque :";
$reponse_chemin = trim(fgets(STDIN));
$reponse_chemin = trim($reponse_chemin, '"');
print "Chemin racine = " . $reponse_chemin;


if (stripos($reponse_chemin,"-h") !== false) 
{
echo <<<EOT
EOT;
    exit;
}

$argv1 = $argv[1];  // nom du fichier JSON en sortie de ce script
$argv2 = $argv[2];  // formatage du fichier JSON en sortie de ce script
if (empty($argv2)) $argv2 = 0;
else $argv2 = constant($argv2);

if (empty($argv1)) {
    echo "invalid arguments";
	exit;
}

$arr = dir2json($reponse_chemin);
$json = json_encode($arr, $argv2);
file_put_contents($argv1, "var arbo_dg=$json");
?>
