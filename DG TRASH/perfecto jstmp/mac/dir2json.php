<?php
// function wd_remove_accents($str, $charset='utf-8')
// {
//     $str = htmlentities($str, ENT_NOQUOTES, $charset);
//     $str = preg_replace('#&([A-za-z])(?:acute|cedil|caron|circ|grave|orn|ring|slash|th|tilde|uml);#', '\1', $str);
//     $str = preg_replace('#&([A-za-z]{2})(?:lig);#', '\1', $str); // pour les ligatures e.g. '&oelig;'
//     $str = preg_replace('#&[^;]+;#', '', $str); // supprime les autres caractères
    
//     return $str;
// }
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
                if(is_file($dir."/".$content)) $a[] =$content;
				else if(is_dir($dir."/".$content)) $a[$content] = dir2json($dir."/".$content); 
            } 
        }    
        closedir($handler); 
    } 
    return $a;    
}
$argv1 = $argv[1];
if (stripos($argv1,"-h") !== false) 
{
echo <<<EOT
EOT;
    exit;
}

$argv2 = $argv[2];
$argv3 = $argv[3];
if (empty($argv3)) $argv3 = 0;
else $argv3 = constant($argv3);

if (empty($argv2)) {
    echo "invalid arguments";
	exit;
}

$arr = dir2json($argv1);
$json = json_encode($arr, $argv3);
file_put_contents($argv2, "var arbo_dg=$json");
?>
