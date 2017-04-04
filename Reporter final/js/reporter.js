
// Déclaration de l'objet Json dans lequel les informations de l'arborescence seront stockées 
var configuration = {isSelectable:true}
var jsonObj={
  nom_reporter: "",
  langue_reportage: "",
  commanditaire_report: "",
  periode_debut_report: "",
  txt_general_person:"",
  nom_projet: "",
  periode_fin_report: "",
  description_report: "",
  enroul    : true,
  niveau : 0,
  id_parent: 0,
  fils  : 
    { 1:{
      estArticle: false,
      niveau: 1 ,
      id_parent: 1,
      nom: "racine",
      enroul: false,
      child:0,
      fils: {}

        }
  }
}

// found = un object dans lequel on va stocker l'objet trouvé après une recherche approfondie dans l'objet jsonObj
var found={};
// NIV_MAX = Nombre maximum de niveaux de répertoire que l'arborescence pourra contenir, le 3eme niveau étant réservé pour les articles
var NIV_MAX=2;
// object_selected = (boolean) Défini s'il y a un element sélectionné ou pas
var object_selected=false;

// Initialise les informations concernant le reporter 
function reporter() {
  if(localStorage.reporter)
  {
    $("#reporteur").val(localStorage.reporter);
    //jsonObj.nom_reporter=localStorage.reporter;
  }
  if(localStorage.langue) 
  {
    $('#langue_reportage').val(localStorage.langue); 
    //jsonObj.langue_reportage=localStorage.langue;
  }
}
reporter();

// Listener sur le bouton "Valider" lors de la saisie => applique un click sur le button qui a comme id la valeur stockée dans modal_shown
modal_shown="valider";
$(".press").keyup(function(event){
    if(event.keyCode == 13){
         $("#"+modal_shown).click();    
    }
});

// Configuration d'outil (sélectionable / non sélectionnable )
$("#checkselected").on('change', function() {
  configuration.isSelectable=$("#checkselected").is(':checked');
  tracer_arbo();
});

// Change la position des informations selon la position du curseur
function moveDivs(event)
{
  x=event.screenX;
  y=event.screenY;
  document.getElementById("fond").style.left=x-330+"px";
  document.getElementById("fond").style.top=y-470+"px";
}

// Interdire les caractères spéciaux
function restrict(str){
    return str.replace(/[&\/\\#,+()@^$~%. '":*?<>{}]/g, '_');
}

$(document).on('click','.select',function() {
if(configuration.isSelectable)
{ 
  select_one($(this).attr("cle")); 
  tracer_arbo();
}

});

$("#formulaire" ).click(function() {
  modal_shown="valider";
});



// Affiche les informations concernant chaque élément au survol de la souris après 1,5s. Immédiatement si un des boutons shif/ctrl/alt est enfoncé.
function showinfo(elem,ev) {   
  if(ev.shiftKey || ev.altKey || ev.ctrlKey) $("#fond").css("transition-delay","0s");
  else $("#fond").css("transition-delay","1.5s");
    moveDivs(ev);
    $("#bref1").html("");
    $("#bref2").html("");
    $("#bref3").html("");
    $("#bref4").html("");
    $("#bref5").html("");
    get_object_by_id(elem);
    var tmp=found;
    found={};
    document.getElementById("fond").style.visibility="visible";
    if(elem==1) 
      { var vide='<i class="fa fa-warning"></i>';
        $("#bref1").html("Nom : <span class='bref'>"+(jsonObj.nom_projet|| vide)+"</span>");
        $("#bref2").html("Commanditaire : <span class='bref'>"+(jsonObj.commanditaire_report|| vide)+"</span>");
        $("#bref3").html("Debut : <span class='bref'>"+(jsonObj.periode_debut_report|| vide)+"</span>");
        $("#bref4").html("Fin : <span class='bref'>"+(jsonObj.periode_fin_report|| vide)+"</span>");
        $("#bref5").html("Description : <span class='bref'>"+(jsonObj.description_report.substring(0,110)+"..."|| vide)+"</span>");
        return;
      }

    if(tmp.estArticle)
    {
      $("#bref1").html("Nom : <span class='bref'>"+tmp.nom+"</span>");
      $("#bref2").html("Communicable : <span class='bref'>"+tmp.communicable+"</span>");
      $("#bref3").html("Remarquable : <span class='bref'>"+tmp.remarquable+"</span>");
      $("#bref4").html("Personnes : <span class='bref'>"+(tmp.personnes.substring(0,80)+"..."|| vide)+"</span>");
      $("#bref5").html("Description : <span class='bref'>"+(tmp.description_ter.substring(0,80)+"..."|| vide)+"</span>");

    }
    if(!tmp.estArticle)
    {
      $("#bref1").html("Nom : <span <span class='bref'>"+tmp.nom+"</span>");
      $("#bref2").html("Description : <span class='bref'>"+(tmp.description_rep.substring(0,110)+"..."|| vide)+"</span>");
    }
}
// Vider et initialiser la div qui présente les informations
function hidy()
{
  $("#fond").css("transition-delay","0s");
  var e=document.getElementById("fond").style.visibility="hidden";
}

// Focus sur le premier champ dans la modale dés qu'elle est ouverte
$('.modal').on('shown.bs.modal', function() {
  $(this).find('.focus').focus();
});




function select_one(id,obj=null) {
  if (obj==null) 
    obj=jsonObj.fils;
  for (key in obj) {
     obj[key].isSelected=false;  
     if(key==id) obj[key].isSelected=true;
     select_one(id,obj[key].fils) ;
  }              
}




// Initialise l'objet JSON avec les informations générales
function creer_reportage() {
  //jsonObj.nom_reporter = "reporter";
  //jsonObj.id_projet= restrict($("#nomprojet").val());
  jsonObj.nom_projet = $("#nomprojet").val();     
  jsonObj.commanditaire_report = $("#commanditaire1").val(); 
  jsonObj.periode_debut_report = $("#start").val(); 
  jsonObj.periode_fin_report = $("#end").val(); 
  jsonObj.description_report = $("#descgen").val(); 
  jsonObj.nom_reporter=$("#reporteur").val();
  jsonObj.langue_reportage= $("#langue_reportage").val();
  jsonObj.txt_general_person= $("#txt_general_person").val();
  localStorage.reporter=jsonObj.nom_reporter;
  localStorage.langue=jsonObj.langue_reportage;
}
// var trouve=false;
// function dans_article(doc,obj){
  
//         //trouve=true;       

// }
var trouve=false;

 function double_doc(doc,obj=null){
  if (obj==null) 
    obj=jsonObj.fils;
  for (i in obj) { 
    if(trouve) return;
    if(obj[i].estArticle) //dans_article(doc,obj[i].contenu.docs);
     {
      for (k in obj[i].contenu.docs) 
        if(obj[i].contenu.docs[k]==doc)  {trouve=true; }
    }

    else  double_doc(doc,obj[i].fils); 

  
  }

}

// Récupère une collection de documents qui existe dans la zone (dropzone) et construit un object qui sera inséré sous idPere
function ajout_docs(idPere) {
  var spans = document.getElementById('fichiers').getElementsByTagName('span');
     docs={};
     var flag_trouve=false;
  for (var i = 0, l = spans.length; i < l; i++)  {
    docs[spans[i].id] = spans[i].textContent;
    spans[i].setAttribute("style","");
    double_doc(spans[i].textContent)
    if(trouve) { flag_trouve=true; spans[i].setAttribute("style","color:red;"); trouve=false; }
   }
     if(flag_trouve) {flag_trouve=false; alert(t("photo_deja_existante_dans_arbo")); return;}
    inserer_dans_arbo(docs,idPere,jsonObj.fils);
    
    $("#fichiers").html("");
    tracer_arbo();
}

// Teste les champs saisis dans la modale d'article: S'il s'agit d'une modification rediriger vers la fonction de modification
function validArticle(choix) { 
  var erreur=false;
  if(!$("#trep1").val())               
  {
    $("#modal_nom_ter").css("color","red"); erreur=true; 
  }
  else $("#modal_nom_ter").css("color","");

  if(!$("#descter").val())               
  {
    $("#modal_description_art").css("color","red"); erreur=true; 
  }
  else $("#modal_description_art").css("color","");
  $("#errorter").show();
  if(erreur) return;
  else 
    {    
      $("#errorter").hide();           
      if(choix=="ajouter")  $("#oknvxter2").click();
      if(choix=="modifier")  $("#okupdateter2").click();
    }
}
 
// Crée un objet qui représente un article et qui sera inséré dans l'arbo dans idPere sous un id=idfils
function ajout_art(idPere,nivPere) {
  show_button_modal("oknvxter");
  $("#callnvxter").click();
  $("#oknvxter2").unbind('click').bind( "click", function(ev) {
  item = {};
  item ["communicable"]= document.querySelector('input[name="diffusion"]:checked').value; 
  item ["personnes"]   = $("#person").val(); 
  item ["nom"]         = $("#trep1").val(); //$("#rep1").val();  
  item ["id"]          = parseInt(new Date().getTime());
  item ["description_ter"] = $("#descter").val();  //$("#desc1").val(); 
  item ["remarquable"] = $('#remarquable').is(":checked"); 
  item ["contenu"]     = { docs:{} };
  item ["fils"]        = {};
  item ["child"]       = 0;
  item ["isSelected"]  = true;
  item ["estArticle"]  = true;
  item ["enroul"]      = false;
  item ["id_parent"]   = parseInt(idPere);
  item ["niveau"]      = nivPere+1;
  if (verifier_doublon(idPere,item ["nom"])) 
    return;
  inserer_dans_arbo(item,idPere,jsonObj.fils);
   tracer_arbo();
    }); 
}

// Crée un objet qui représente un répertoire et qui sera inséré dans l'arbo dans idPere sous un id=idfils
function ajout_rep(idPere,nivPere) {
  show_button_modal("oknvxrep");
  $("#callnvxrep").click();
  $("#oknvxrep").unbind('click').bind( "click", function(ev) {        
      var fold = $("#rep1").val(); // 
      var description =$("#desc1").val();
      viderModale();
      if (fold == null || fold == "") 
        return;
      if (verifier_doublon(idPere,fold)) 
        return;
      item = {};
      item ["id"]          = parseInt(new Date().getTime());
      item ["nom"]         = fold;   
      item ["description_rep"] = description ; 
      item ["fils"]        = {};
      item ["child"]       = 0;
      item ["contenu"]     = {};
      item ["position"]    = 0 ;
      item ["isSelected"]  = true;
      item ["estArticle"]  = false;
      item ["enroul"]      = false;
      item ["id_parent"]   = parseInt(idPere); 
      item ["niveau"]      = nivPere+1;
      inserer_dans_arbo(item,idPere,jsonObj.fils);
       tracer_arbo();
  }); 
}
// Vérifie si le nouveau élément existe déjà dans ce pêre
function verifier_doublon(idPere,nom,id) {
  get_object_by_id(idPere);
  for(var key in found.fils)
    if (found.fils[key].nom == nom && found.fils[key].id != id)
      {
        alert(t("msg_js_cet_elem_existe_deja_dans_rep"));
        found={};
        return true;
      }
  found={};
}
//rechercher un element dans l'objet global en se basant sur id
function get_object_by_id(id,obj=null)
{
  if (obj==null) 
    obj=jsonObj.fils;
  for (indice in obj) {
    if(indice==id) { 
        found= obj[indice];           
    }
    else if (!obj[indice].estArticle )
         get_object_by_id(id, obj[indice].fils);           
  }
}
// Modifie un terminal (= article) en passant par des étapes ( voir le contenu de la fonction)
function modifier_art(id) {
    // étape 1 : récuperer l'objet
      get_object_by_id(id);
      var tmp=found;
      found={};
    
    // étape 2 : remplir la modale avec les données de l'objet
      remplir_modale("ter",tmp);
    
    // étape 3 : aprés la validation de la modale recréer un nouvel objet avec les nouvelles informations saisies
      $("#okupdateter2").unbind('click').bind( "click", function(ev) { 
        if (verifier_doublon(tmp.id_parent,$("#trep1").val(),tmp.id)) return;
        tmp.description_ter =$("#descter").val();
        tmp.nom = $("#trep1").val();
        tmp.personnes =$("#person").val()
        tmp.communicable = document.querySelector('input[name="diffusion"]:checked').value; 
        tmp.remarquable = $('#remarquable').is(":checked");
        viderModale();
    
    // étape 4 : modifier l'ancien objet et insérer le nvx
        modifier(id,tmp,jsonObj.fils);
        tracer_arbo();
      });    
}

// Modifie un répertoire
function modifier_rep(id) {
  // étape 1 : récupérer l'objet
    get_object_by_id(id);
    var tmp=found;
    found={};
  // étape 2 : remplir la modale avec les données de l'objet
    remplir_modale("rep",tmp);
  // étape 3 : aprés validation modale recréer un nouveau objet avec les nouvelles informations saisies
    $("#okupdaterep").unbind('click').bind( "click", function(ev)
    {
        fold =$("#rep1").val();
        if (verifier_doublon(tmp.id_parent,fold,tmp.id)) return;
        tmp.description_rep =$("#desc1").val();
        tmp.nom =$("#rep1").val();
        viderModale();
  //étape 4 : modifier l'ancien objet en insérant le nouveau
      modifier(id,tmp,jsonObj.fils);
      $("#chila1").html("");
      tracer_arbo();
    });     
}

// Insérer l'élément item dans l'arborescence sous l'élément qui a id=idPere
function inserer_dans_arbo(item,idPere,obj=null) { 
  if(obj==null)  { 
     
    obj=jsonObj.fils;  }
    for (key in obj) {
      if(key==idPere && !obj[key].estArticle)
        {
          obj[key].child++;
          obj[key].fils[item.id]=item; 
          obj[key].enroul=false;
          $("#sauvegarder").prop('disabled', false);
          return;
        }
      else if(key==idPere && obj[key].estArticle) 
        {    
          obj[key].enroul=false;
          for(el in item)
            { 
              obj[key].contenu.docs[el]=item[el];
              obj[key].child++;
            }
            $("#sauvegarder").prop('disabled', false);
          return; 
        }   
      else 
        { 
          inserer_dans_arbo(item,idPere,obj[key].fils);  
        }  
    }
}

function tracer_arbo() {
  organisation_position();
  $("#child1").html("");
  
  generer_HTML_items_arbo();
  //hideshow(false);
  if(object_selected && !configuration.isSelectable)
   {
    setTimeout(function(){ $("#child1").find("span").removeClass("selected");  object_selected=false; }, 2000);
    
  }
}

// Enroule un objet en changant sa variable boolean (On retrace l'arborescence juste après modification.) 
function enrouler(id,obj=null) {
  if(obj==null) obj=jsonObj.fils;
    for (key in obj)
      if(key==id)
          {
            obj[key].enroul=true;
            tracer_arbo();
            return;
          }
      else enrouler(id,obj[key].fils);
}

// Déroule un objet en changant sa variable boolean (On retrace l'arborescence juste aprés la modification.) 
function derouler(id,obj=null)
{
  if(obj==null) obj=jsonObj.fils;
    for (key in obj)
      if(key==id)
          {
            obj[key].enroul=false;
            tracer_arbo();
            return;
          }
      else derouler(id,obj[key].fils);
}

// Applique le style de l'arborescence (gras - icon - liens - affichage)
function style_arbo(obj,key) {
  if(obj.child>0)
    {
      if(obj.enroul) 
        {
          $("#gras"+key).css("font-weight","Bold");
          $("#icon"+key).attr('class', 'fa fa-plus');
          $("#icon"+key).attr('onclick', 'derouler('+key+')');
          $("#child"+key).hide();
        }
      if(!obj.enroul)
        {
          $("#gras"+key).css("font-weight","normal");
          $("#icon"+key).attr('class', 'fa fa-minus');
          $("#icon"+key).attr('onclick', 'enrouler('+key+')');
          $("#child"+key).show();
        }
    }
  if(obj.child==0)
    {
      $("#gras"+key).css("font-weight","normal");
      $("#icon"+key).attr('class', 'glyphicon glyphicon-none');
      $("#icon"+key).attr('onclick', '');
    }
}

// Parcourt toute l'arborescence et enroule tous les éléments
function enrouler_all(obj=null) {
  if(obj==null) 
    obj=jsonObj.fils[1].fils;
  for(key in obj)
    { 
      obj[key].enroul=true;
      enrouler_all(obj[key].fils);
    }
}

// Parcourt toute l'arborescence et  déroule tous les éléments
function derouler_all(obj=null) {
  if(obj==null) 
    obj=jsonObj.fils[1].fils;
  for(key in obj)
    {
      obj[key].enroul=false;
      derouler_all(obj[key].fils);
    }
}

// Parcourt tout les objets et organise leur ordre
function organisation_position(obj=null,pos=1) {
  if(obj==null)
    obj=jsonObj.fils[1].fils;
  for(key in obj)
  {
    obj[key].position=pos;
    organisation_position(obj[key].fils);
    pos++;
  }  
}

// Sera executé quand un drag survole un élément droppable
function allowDrop(ev) { 
  ev.preventDefault();
}

// ondrag je passe l'id de l'élément source
function drag(ev,source) {
  ev.dataTransfer.setData("srcid", source);
}
// ondrop un objet dans une zone, teste pour voir si on doit interdire le drop ou pas
function drop(ev,cible,niv) {
    ev.preventDefault();
    var source = ev.dataTransfer.getData("srcid");
    if(source==cible) return;
    // récupérer l'objet source
    get_object_by_id(source);
    var tmp=found;
    // tester si doublon ou pas
    if(verifier_doublon(cible,found.nom,source)) 
      { found={}; return; }   
    // si l'objet source est un article on a pas besoin d'un test il faut le déplacer 
    if(tmp.estArticle) 
      {    
        supprimer_element(0,tmp.id,false);
        tmp.id_parent=cible; 
        inserer_dans_arbo(tmp,cible);
        select_one(source); 
        tracer_arbo(); return; 
      }
    //si l'élément n'a pas de fils et respecte le niveau on peut le déplacer
    if (tmp.child==0 && niv<NIV_MAX) 
      {
        supprimer_element(0,tmp.id,false);
        tmp.id_parent=cible;
        tmp.niveau=(niv+1); 
        inserer_dans_arbo(tmp,cible); 
        select_one(source); 
        tracer_arbo(); return;
      }
    //si l'objet source est un répertoire et contient des fils 
    // initialiser la valeur qui va contenir le niveau du dernier fils dans la source 
    nivsrc=tmp.niveau;
    trouver_niv_src(tmp.fils);
    nivsrc=nivsrc-tmp.niveau;
    
    if((nivsrc+niv)<NIV_MAX)
      {
        supprimer_element(0,tmp.id);
        tmp.id_parent=cible;
        tmp.niveau=(niv+1);
        incrementer_niveau_fils(tmp.fils,tmp.niveau);
        inserer_dans_arbo(tmp,cible); 
        select_one(source); 
        tracer_arbo(); 
        return;
      }  
    //else alert("Niveau superieur");
    found={};  
}

// Prend un objet et incrémente le niveau de ses fils
function incrementer_niveau_fils(obj,niv) {
  for(key in obj)
  {
    obj[key].niveau=(niv+1);
    incrementer_niveau_fils(obj[key].fils);
  }   
}
// Trouve le niveau le plus bas dans un objet
function trouver_niv_src(obj) {
  for(key in obj)
  {     
    if(obj[key].niveau>nivsrc && !obj[key].estArticle )
      { nivsrc=obj[key].niveau;}
    if(obj[key].child==0)  continue; 
      trouver_niv_src(obj[key].fils);
  }   
}

// Modifie le reportage
function editer_reportage() {
  $("#hidedesc").attr('class', 'fa fa-chevron-down');
  $("#box_general").css("display","block");
  $('#nomprojet').focus();
  modal_shown="valider";
}

// Retrace l'arbo
function generer_HTML_items_arbo(obj=null) {
  if(obj==null) 
      obj=jsonObj.fils[1].fils;
  for(key in obj)
  {
    if(!obj[key].estArticle)
      {
        $("#child"+obj[key].id_parent).append("<li   id=" + key + "> \
       <i  id=icon"+key+">&nbsp;</i> <span cle="+key+" onmouseout='hidy()' onmouseover='showinfo("+key+",event);' ondragend='organisation_position(); tracer_arbo();' draggable='true' \
        ondragstart='drag(event,"+key+")' ondrop='drop(event,"+key+","+obj[key].niveau+")' ondragover='allowDrop(event)' class='select'><span class='fa fa-folder-o'></span><span id=gras"+key+" > " + obj[key].nom + "</span> </span>\
        <div class='dropdown'>&nbsp;&nbsp;&nbsp;<i class='fa fa-align-justify dropdown-toggle' data-toggle='dropdown'></i>&nbsp;&nbsp;&nbsp;\
        <ul class='dropdown-menu'> \
        <li><a  onclick=\"modifier_rep('"+key+"')\"><i class='fa fa-edit'>&nbsp;<span class='i18n' id='m_contxt_nvx_edit'>" +t('m_contxt_nvx_edit')+ "</span></i> </a></li> \
        <li><a  id=niveau"+key+" onclick=\"ajout_rep('" + key + "',"+obj[key].niveau+")\"><i  class='fa fa-folder-o'>&nbsp;<span class='i18n' id='m_contxt_nvx_rep'>" +t('m_contxt_nvx_rep')+ "</span></i></a></li>\
        <li><a  onclick=\"ajout_art('" + key + "',"+obj[key].niveau+")\"><i class='fa fa-folder'>&nbsp;<span class='i18n' id='m_contxt_nvx_art'>" +t('m_contxt_nvx_art')+ "</span></i></a></li>\
        <li><a onclick=\"supprimer_element(0,'" + key + "');\"><i class='fa fa-times'>&nbsp;<span class='i18n' id='m_contxt_supprimer'>" +t('m_contxt_supprimer')+ "</span></i></a></li>\
        <li><a onclick=\"supprimer_contenu('" + key + "');\"><i class='fa fa-trash'>&nbsp;<span class='i18n' id='m_contxt_vider_contenu'>" +t('m_contxt_vider_contenu')+ "</span></i></a></li>\
        </ul></div><i id=up"+key+" onclick=moveup("+key+","+obj[key].id_parent+") class='fa fa-level-up'></i><ul  id='child" + key + "'></ul></li>");
         //si le niveau dépasse le niveau max on cache la possibilité de rajouter un sous niveau
          if(obj[key].niveau==NIV_MAX)  
            $("#niveau"+key).hide();
          //s'il a la premiere position en cache la possibilité de manter, car il est déjà le 1er
          if(obj[key].position==1)
            $("#up"+key).hide();
          if(obj[key].isSelected)
              { 
                $('span:first', $("#"+key)).addClass("selected");
                object_selected=true;
                obj[key].isSelected=false;
              }
          //gestion d'affichage gras/normal plus/moin enrouler/derouler
          style_arbo(obj[key],key);
          //traçage d'arbre récursive 
          generer_HTML_items_arbo(obj[key].fils);
      }

    else if(obj[key].estArticle)
      {
        $("#child" + obj[key].id_parent).append("<li id=" + key + ">\
        <i id=icon"+key+">&nbsp;</i><span cle="+key+" onmouseout='hidy()' onmouseover='showinfo("+key+",event);' ondragend='organisation_position(); tracer_arbo();' draggable='true' ondragstart='drag(event,"+key+")' ondrop='drop(event,"+key+","+obj[key].niveau+")' class='select'>\
        <span class='fa fa-folder'></span><span  id=gras"+key+" > " + obj[key].nom + "</span></span>\
        <ul class='dropdown'><i class='fa fa-align-justify dropdown-toggle' data-toggle='dropdown'></i><div class='dropdown-menu'>\
        <li><a  onclick=\"modifier_art('"+key+"')\"><i class='fa fa-edit'>&nbsp;<span class='i18n' id='m_contxt_nvx_edit'>" +t('m_contxt_nvx_edit')+ "</span></i> </a></li> \
        <li><a onclick=\"ajout_docs('" + key + "');\" > <i class='fa fa-paperclip'>&nbsp;<span class='i18n' id='m_contxt_attacher_fichiers'>" +t('m_contxt_attacher_fichiers')+ "</span></i></a></li>\
        <li><a onclick=\"supprimer_element(0,'" + key + "'); \"><i class='fa fa-times'>&nbsp;<span class='i18n' id='m_contxt_supprimer'>" +t('m_contxt_supprimer')+ "</span></i></a></li>\
        <li><a onclick=\"supprimer_contenu('" + key + "');\"><i class='fa fa-trash'>&nbsp;<span class='i18n' id='m_contxt_vider_contenu'>" +t('m_contxt_vider_contenu')+ "</span></i></a></li></ul></div>\
        <i id=up"+key+" onclick=moveup("+key+","+obj[key].id_parent+") class='fa fa-level-up'></i><ul  id='child" + key + "'></ul></li>");
          
          if(obj[key].position==1)
          $("#up"+key).hide();
          if(obj[key].isSelected)
              {
                $('span:first', $("#"+key)).addClass("selected");
                object_selected=true;
                obj[key].isSelected=false;
              }
          style_arbo(obj[key],key);
          tracer_docs(obj[key].contenu,key);
      }

  }
}
//deselectionner
$("body").click(function() {
  object_selected=false;
$(".selected").removeClass("selected");
});

// Supprime un document de la zone drag_drop
function supprimer_doc_panier(f) {
       var n=$("#" + f).parent().parent().attr('id');
        $("#" + f).remove();
}

// Traçage des documents indépendament car il passe par d'autres critéres
function tracer_docs(contenu,idPere) { 
  for (key in contenu.docs)
  $("#child" + idPere).append("<li class='select' id="+key+"><a onclick=\"supprimer_docs('"+key+"')\"><i class='fa fa-times'></i></a>&nbsp; &nbsp;"+contenu.docs[key]+"</li> ");     
}

// Echange les positions entre deux fréres
function moveup(idfils,idPere,obj=null) { 
  if(obj==null) obj=jsonObj.fils;
  for (key in obj) {
    if(key==idPere)
      {
        moveup1(idfils,obj[key].fils,0);
      }
    else 
      { 
        moveup(idfils,idPere,obj[key].fils);  
      }
  }
} 
// Echange l'id du parent des deux objets
function changer_idparent(up,down) {
  for(key in up.fils)
  {
    up.fils[key].id_parent=down.id;
  }
  for(key in down.fils)
  {
    down.fils[key].id_parent=up.id;
  }
}

// Echange la position de deux objet
function moveup1(idfils,obj,upkey) {
  var upkey=0;
  for(key in obj) {
    if(key==idfils)
    {
      var tmp=obj[key];
      obj[key]= obj[upkey];
      obj[upkey]=tmp;
      var pos=obj[upkey].position;
      obj[upkey].position=obj[key].position;
      obj[key].position=pos;
      for(var cle in obj[key].fils)
        {
          obj[key].fils[cle].id_parent=obj[upkey].id;
        }
      for(var cle in obj[upkey].fils)
        {
          obj[upkey].fils[cle].id_parent=obj[key].id;
        }
      var idd=obj[upkey].id;
      obj[upkey].id=obj[key].id;
      obj[key].id=idd;
      tracer_arbo();
      return;
    }
    upkey=key;
  }
}

// Supprime tout le contenu d'un élément sélectionné dont l'id est passé en argument [tout en gardant l'élément en question]
function supprimer_contenu(id, obj = null) {
    if (obj == null)
        obj = jsonObj.fils;
    for (indice in obj) {
        //if (indice == id && confirm($("#msg_js #msg_js_confirm_supprimer_contenu_de_cet_element").html())) {
        if (indice == id && confirm(t("msg_js_confirm_supprimer_contenu_de_cet_element"))) {
            obj[indice].fils = {};
            obj[indice].contenu.docs = {};
            obj[indice].child = 0;
            tracer_arbo();
            //console.log(jsonObj);
            $("#sauvegarder").prop('disabled', false);
            return;
        } else if (!obj[indice].estArticle)
            supprimer_contenu(id, obj[indice].fils);
    }
}
// Supprime l'élément dont l'id est passé en argument, le contenu de cet élément sera perdu ( une alert est affichée pour confirmer)
function supprimer_element(child, id,confirmer=true, obj = null) {
    if (obj == null)
        obj = jsonObj.fils;
    for (indice in obj) {
        if (indice == id) //&& confirm('Attention ! cet élément peut contenir des données, êtes-vous sûr de vouloir supprimer  ?'))
        {   if(confirmer) if(!confirm(t("msg_js_confirm_supprimer_cet_element"))) return;
            delete obj[indice];
            child.child--;
            tracer_arbo();
            $("#sauvegarder").prop('disabled', false);
            return;
        } else if (!obj[indice].estArticle)
            supprimer_element(obj[indice], id,confirmer, obj[indice].fils);
    }
}
// Supprime le document dont l'id est en argument, quel que ce soit son emplacement (après confirmation par alert)
function supprimer_docs(id, obj = null) {
  if (obj == null)
      obj = jsonObj.fils;
  for (indice in obj) {
      if (obj[indice].estArticle) {
          for (key in obj[indice].contenu.docs) {
              if (key == id ) {
                  delete obj[indice].contenu.docs[key];
                  delete obj[indice].child--;
                  tracer_arbo();
                  $("#sauvegarder").prop('disabled', false);
                  return;
              }
          }
      } else {
          supprimer_docs(id, obj[indice].fils);
      }
  }
}

// Modifie l'objet (article) id par les informations de newobj sans toucher les fils et le contenu
function modifier(id, newobj, obj = null) {
    if (obj == null)
        obj = jsonObj.fils;
    for (indice in obj) {
        if (indice == id) {
            // affectation des nouvelles info article
            obj[indice].nom_ter = newobj.nom_ter;
            obj[indice].communicable = newobj.communicable;
            obj[indice].remarquable = newobj.remarquable;
            obj[indice].personnes = newobj.personnes;
            return;
        } else if (!obj[indice].estArticle)
            modifier(id, newobj, obj[indice].fils);
    }
}

// Fait le test sur les boutons qui seront affichés lors de l'affichage d'une modale ( ajouter/modifier article/répertoire)
function show_button_modal(name) {
    $("#okupdaterep").hide();
    $("#oknvxrep").hide();
    $("#oknvxter").hide();
    $("#okupdateter").hide();
    $("#titre_nvx_rep").hide();
    $("#titre_update_rep").hide();
    $("#titre_nvx_ter").hide();
    $("#titre_update_ter").hide();
    //viderModale();
    if (name == "okupdaterep") {
        $("#okupdaterep").show();
        $("#titre_update_rep").show();
        modal_shown = "okupdaterep";
    }
    if (name == "oknvxrep") {
        $("#oknvxrep").show();
        $("#titre_nvx_rep").show();
        viderModale();
        modal_shown = "oknvxrep";
    }
    if (name == "oknvxter") {
        $("#oknvxter").show();
        $("#titre_nvx_ter").show();
        viderModale();
        modal_shown = "oknvxter";
    }
    if (name == "okupdateter") {
        $("#okupdateter").show();
        $("#titre_update_ter").show();
        modal_shown = "okupdateter";
    }
}

function remplir_modale(type, obj) {
    if (type == "rep") {
        $("#rep1").val(obj.nom);
        $("#desc1").val(obj.description_rep);
        show_button_modal("okupdaterep");
        $("#callnvxrep").click();
    }
    if (type == "ter") {
        //$("#person").val(obj.personnes);
        var person = obj.personnes.split(',');
        $.each(person, function(index, value) {
            $('#person').tagsinput('add', value);
        });
        $("#trep1").val(obj.nom);
        $("#descter").val(obj.description_ter);
        //document.querySelector('input[name="diffusion"]:checked').value=obj.communicable; 
        $("#" + obj.communicable).click();
        document.getElementById("remarquable").checked = obj.remarquable;
        show_button_modal("okupdateter");
        $("#callnvxter").click();
    }
}

$("#1").hide();

function description_generale() {
    var erreur=false;
    if(!$("#commanditaire1").val())               
      {
        $("#commanditaire").css("color","red"); erreur=true; 
      }
      else $("#commanditaire").css("color","");

    if(!$("#start").val() || !$("#end").val())
      {
        $("#periode1").css("color","red"); erreur=true; 
      }
      else if($('#start').val() > $('#end').val()){
        alert(t("date_date")); 
        return;
      }
      else $("#periode1").css("color","");

    if(!$("#descgen").val())                      
      {
        $("#fr_general").css("color","red");  erreur=true; 
      }
        else $("#fr_general").css("color",""); 
    if(!$("#nomprojet").val())                    
      {
        $("#projet").css("color","red"); erreur=true; 
      }
        else $("#projet").css("color","");

    if(!$("#reporteur").val())                    
      {
        $("#nom_reporter").css("color","red"); erreur=true; 
      }
        else { $("#nom_reporter").css("color","");  //new_reporter();
      }
    $("#errordesc").show();

    if(erreur) return;
    else {
        $("#errordesc").hide();
        $("#hidedesc").click();
        $("#home").text($("#nomprojet").val());
        $("#gras1").text($("#nomprojet").val());
        $("#new_report").text($("#nomprojet").val());
        $("#sauvegarder").prop('disabled', false);
        $("#1").show();

        creer_reportage()
    }
}

function hideshow(enrouler) {
   // tracer_arbo();
    if ($("#child1").is(':empty')) {
        $("#gras1").css("font-weight", "normal");
        $("#icon1").attr('class', '');
        $("#icon1").attr('onclick', '');
        $("#child1").show();
    } 
    else {
        if (enrouler) {
            $("#gras1").css("font-weight", "bold");
            $("#icon1").attr('class', 'fa fa-plus');
            $("#icon1").attr('onclick', "hideshow(false)");
            $("#child1").hide();
        }
        if (!enrouler) {
            $("#gras1").css("font-weight", "normal");
            $("#icon1").attr('class', 'fa fa-minus');
            $("#icon1").attr('onclick', "hideshow(true)");
            $("#child1").show();
        }
    }
}

function associer(n) {
    $("#child" + n).append($("#fichiers").html());
    plusmoins(n);
    $("#fichiers").empty();
}

function plusmoins(i) {
    if (!$("#child" + i).is(':empty')) {
        $("#ico" + i).attr('class', 'fa fa-minus');
        $("#child" + i).show();
    } else
        $("#ico" + i).attr('class', 'h');
}

function viderModale() {
    $("#rep1").val("");
    $("#desc1").val("");
    $("#trep1").val("");
    $("#tdesc1").val("");
    $('#person').tagsinput('removeAll');
    $("#descter").val("");
    $("#errorter").hide();;
    $("#remarquable").attr("checked","false");;
}
$("#charger").click(function() {
   if(!$("#sauvegarder").is(":disabled") && confirm(t("voulez_vous_sauvegarder"))) $("#sauvegarder").click() ;
    var version = $("#historique").val();
    jsonObj = JSON.parse(localStorage.getItem(version));
    $("#commanditaire1").val(jsonObj.commanditaire_report);
    $("#start").val(jsonObj.periode_debut_report);
    $("#end").val(jsonObj.periode_fin_report);
    $("#descgen").val(jsonObj.description_report);
    $("#nomprojet").val(jsonObj.nom_projet);
    $("#gras1").text(jsonObj.nom_projet);
    $("#new_report").text(jsonObj.nom_projet);
    $("#sauvegarder").prop('disabled', false);
    $("#reporteur").val(jsonObj.nom_reporter);
    $("#langue_reportage").val(jsonObj.langue_reportage);
   // $("#txt_general_person").val(jsonObj.txt_general_person.split(','));
    var person = jsonObj.txt_general_person.split(',');
        $.each(person, function(index, value) {
            $('#txt_general_person').tagsinput('add', value);
        });
    
    tracer_arbo();
    hideshow(false);
    $("#1").show();
    $("#sauvegarder").prop('disabled', true);
});
$("#sauvegarder").click(function() {

    var date = new Date();
    var key=formatDate(date)+"_"+restrict($("#nomprojet").val());
    localStorage.setItem(key , JSON.stringify(jsonObj));
    $('#historique').empty().append('');
    fillhistorique();
    $('#historique').val(key);
    $(this).prop('disabled', true);


});

function formatDate(value=null) {
  if (value==null) value=new Date();
    return  (value.getYear() + 1900) + "-"  + ("0" + (value.getMonth() + 1)).slice(-2)+ "-" + ("0" + value.getDate()).slice(-2) + "_" + ("0" + value.getHours()).slice(-2)+"h"+("0" + value.getMinutes()).slice(-2);;
}

function fillhistorique() {
    for (var i = localStorage.length-1; i >= 0; i--)
      if(localStorage.key(i).substring(0,1)==2)
        $("#historique").append("<option value=" + localStorage.key(i) + " > " + localStorage.key(i) + "</option");

    // for (var i = 0, len = localStorage.length; i < len; ++i)
}

function rmhistorique() {
    localStorage.removeItem($("#historique").val());
    $("#historique option:selected").remove();
}

function toast(a = "test", b = "test") {

  if(!jsonObj.nom_reporter) { alert(t("nom_reporter_pas_saisi")); return ;}
  if(!jsonObj.periode_debut_report || !jsonObj.periode_fin_report) return;
    setTimeout(function() {
        toastr.options = {
            closeButton: true,
            progressBar: true,
            showMethod: 'slideDown',
            timeOut: null
        };
        toastr.success(b, a);
    }, 1300);

 
    if(!$("#sauvegarder").is(":disabled")) $("#sauvegarder").click(); 
    var data = jsonObj;
    var json = JSON.stringify(data);
    var blob = new Blob([json], {
        type: "application/json"
    });
    var url = URL.createObjectURL(blob);
    var a = document.createElement('a');
    a.download = formatDate()+restrict(jsonObj.nom_projet)+".json";
    a.href = url;
    a.textContent = formatDate()+jsonObj.nom_projet+".json";
}


$("textarea, input").on('keyup', function() { 
  var max=$(this).attr("maxlength")||10;
  $(this).attr("original-title",this.value.length+"/"+max);
  $(this).mouseover();
  $('textarea, input').tipsy({gravity: 'e'});
  });

$(document).ready(function() {
    fillhistorique();
    // $('.i-checks').iCheck({
    //     checkboxClass: 'icheckbox_square-green',
    //     radioClass: 'iradio_square-green',
    // });
//lancer la fonction qui verifier si la config permet le selection des objets
    // $("#checkselected").click();

    $('#formulaire .input-daterange').datepicker({
        keyboardNavigation: false,
        forceParse: true,
        autoclose: true,
        dateFormat: 'yy-mm-dd'
    });
    Dropzone.options.myAwesomeDropzone = {
        autoProcessQueue: false,
        uploadMultiple: true,
        parallelUploads: 100,
        maxFiles: 100,
        // Dropzone settings
        init: function() {
            var myDropzone = this;
            // this.element.querySelector("button[type=submit]").addEventListener("click", function(e) {
            //     e.preventDefault();
            //     e.stopPropagation();
            //     myDropzone.processQueue();
            // });
            this.on("sendingmultiple", function() {});
            this.on("successmultiple", function(files, response) {});
            this.on("errormultiple", function(files, response) {});
        }
    }
});

//ordre de priorité des langues
var lang_priorite = ["en", "es", "fr"];
//langue du navigateur
var lg = navigator.language || navigator.userLanguage;

$(document).ready(function() {
  //--- traduction initiale (langue par défaut)
  //translate();  //--- fonctionnement par défaut (mode ="non_rempl_abs")
  //translate("priorite", lang_priorite);  
  if(lang_priorite.indexOf(lg)>0)
  {
    $('#lang option[value="'+lg+'"]').prop('selected', true);
  }
  translate("trad_in_progress");

});


//--- changement de langue
$("select#lang").on('change', function() {
  //translate();  //--- fonctionnement par défaut (mode ="non_rempl_abs")
  //translate("priorite", lang_priorite);  
  //
  translate("trad_in_progress");


});
