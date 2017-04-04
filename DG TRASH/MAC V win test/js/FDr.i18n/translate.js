/**********************************************************************************************************************
internationalisation simple
@author : Fabrice DUVIVIER (DUF)
@version : 1.2 (20mar2017)

v. 1.0 (17fev2017) :  création
v. 1.1 (09mar2017) :  ajout traduction des textes dans le code JS
v. 1.2 (20mar2017) : ajout de la fonction t() = traduction d'une clé des dictionnaires

3 "modes" :
- "non_rempl_abs" : Les clés absences d'un dictionnaire ne sont pas remplacées (affichage comme s'il n'y avait pas de 
                    changement de langue pour cette clé).
- "trad_in_progress" : affiche [traduction {la clé} MANQUANTE] pour permettre de trouver les clés manquantes dans la 
                       langue sélectionnée.
- "priorite" : Un ordre de priorité entre les langues est défini (si la valeur dans la langue sélectionnée est absente,
               celle de plus haute priorité disponible sera prise)

Pour les messages du code JS : 
  - Soit
    - utilisation de la fonction t(cle) pour chaque libellé à traduire
  - Soit
    - dans l'HTML mettre un container vide et masqué d'id "msg_js"
    - dans le code JS : mettre $("#msg_js #msg_js_1").html() à la place du message souhaité ("msg_js_1" est la clé du message dans les dictionnaires)
    - NB : pour du code généré dynamiquement en JS, il peut être nécessaire d'utiliser la fonction t(cle) en plus de translate(), pour un premier affichage avant changement éventuel de langue d'interface.

Messages d'erreur :
 - gestion des codes langue non prévu (absence de dictionnaire "properties_LANGUE.js")
 - [RAF] gestion des traductions manquantes
 
RAF :
- [EN COURS] gérer cas traduction manquante :
  - priorité dans les langues
  OU (mode "aide_traduction" ?)
  - afficher [traduction {la clé} MANQUANTE]
  
- aide au débogage :
  - détection des clés en doublons dans un dictionnaire
  - comparaison des clés inter-dictionnaires (manquantes, pas sur le même numéro de ligne, etc.)
  - détection des clés orphelines (inutilisés dans le code). Possible ?

 - à traduire ? : trad_prioritaire = "[AUCUNE TRADUCTION DISPO]"
**********************************************************************************************************************/

/* tableau des traductions dans l'HTML */
var t_i18n = new Array();

/* tableau des clés des messages du code JS */
//--- Ce tableau DOIT EXISTER, déclaré dans un fichier de configuration <mon_script_js>.conf.js, inséré avant <mon_script_js>.js
  //var t_msg_js = new Array(); 

  //t_msg_js['msg_js_cet_elem_existe_deja_dans_rep'] = "Cet élément existe déjà dans le répertoire. TXT PROVISOIRE",
  //t_msg_js['msg_js_2'] = "Cet élément 2222222 existe déjà dans le répertoire. TXT PROVISOIRE",



/* container des messages du code JS */
var innerHtml_msg ='';
$.each(t_msg_js, function( index, value ) {
  innerHtml_msg += '<span class="i18n" id="'+index+'">'+value+'</span>';
});

/* container des messages du code JS */
$("#msg_js").append(innerHtml_msg);


/**
* traduit dans l'HTML tous les libellés étant dans des span de class "i18n"
*/
function translate(mode = "non_rempl_abs", lang_priorite = "") {
  var lang = $("select#lang").val();
  
  //-------------------------------------------------------------------- existance du dictionnaire de la langue choisie
  if(t_i18n[lang] === undefined) {
    $('span.i18n:first').text( '[DICTIONNAIRE ABSENT {' + lang + '} (properties_' + lang + '.js)]' )
               .css( {color:'red','font-weight':'bold'} );
    return;
  }
  
  $( "span.i18n" ).each(function( index ) {
    if(mode === "non_rempl_abs") {  //----------------------------------------------------- mode === "trad_in_progress" 
      $(this).text( t_i18n[lang][$(this).attr('id')] );
    } 
    else if(mode === "priorite" && lang_priorite !== "") {  //------------------------------------- mode === "priorite" 
      //RAF : A FINIR (NE FONCTIONNE PAS ENCORE)
      var trad_prioritaire;   // la traduction prioritaire (en l'absence de la traduction choisie)
      if (t_i18n[lang][$(this).attr('id')] === undefined) {   // si la clé dans la langue choisie n'existe pas
        for (i = 0; i < lang_priorite.length; i++) {
          if(t_i18n[lang_priorite[i]][$(this).attr('id')] !== undefined) {
            trad_prioritaire = t_i18n[lang_priorite[i]][$(this).attr('id')];
            break;
          }
          trad_prioritaire = "[AUCUNE TRADUCTION DISPO]"
        }
      }
    }
    else {  //----------------------------------------------------------------------------- mode === "trad_in_progress"
      if(t_i18n[lang][$(this).attr('id')] !== undefined) {    // si la traduction dans la langue sélectionnée existe...
        $(this).html( t_i18n[lang][$(this).attr('id')] );
      } 
      else {
        $(this).text( '[TRAD.MANQUE {' + lang + '} (clé :"' + $(this).attr('id') + '")]' )
               .css( {color:'red','font-weight':'bold'} );
      }
    }
  });
}

/**
* traduit dans tout le code la clé "cle"
*/
function t(cle) {
  var lang = $("select#lang").val();

  return t_i18n[lang][cle];
}