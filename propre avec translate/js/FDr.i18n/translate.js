/**********************************************************************************************************************
internationalisation simple
@author : Fabrice DUVIVIER (DUF)
@version : 1.0 (17fev2017)

3 "modes" :
- "non_rempl_abs" : Les clés absences d'un dictionnaire ne sont pas remplacées (affichage comme s'il n'y avait pas de 
                    changement de langue pour cette clé).
- "trad_in_progress" : affiche [traduction {la clé} MANQUANTE] pour permettre de trouver les clés manquantes dans la 
                       langue sélectionnée.
- "priorite" : Un ordre de priorité entre les langues est défini (si la valeur dans la langue sélectionnée est absente,
               celle de plus haute priorité disponible sera prise)

RAF :
- gérer cas traduction manquante :
  - priorité dans les langues
  OU (mode "aide_tradcution" ?)
  - afficher [traduction {la clé} MANQUANTE]

 - gérer code langue non prévu (absence de dictionnaire "properties_LANGUE.js")
 
 - à traduire ? : trad_prioritaire = "[AUCUNE TRADUCTION DISPO]"
**********************************************************************************************************************/

/* tableau des traductions */
var t_i18n = new Array();


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
        $(this).text( t_i18n[lang][$(this).attr('id')] );
      } 
      else {
        $(this).text( '[TRAD.MANQUE {' + lang + '} (clé :"' + $(this).attr('id') + '")]' )
               .css( {color:'red','font-weight':'bold'} );
      }
    }
  });
}
