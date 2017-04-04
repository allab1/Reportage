function test(){
  alert(er);
  console.log(newobj);

}
  var   MAX_NIV=3;
  var   identifiant=1;
  var   myarbo={};
  console.log(arbo_dg);
  construire_arbo(0,1,arbo_dg,myarbo);
  console.log(myarbo);
  var newobj=myarbo;


function construire_arbo(niveau,idparent,obj,newobj){

    for(key in obj){

        identifiant++;
              if($.isNumeric(key)){
                $("#anomalie").text("Certains fichiers sont mal placés dans l'arborescence <br>");
                item={};
                item.nom=obj[key];
                item.erreur=true;
                item.id_parent=idparent;
                newobj[identifiant]=item; 
                continue;
              }
             if ($.isArray(obj[key]))
               { 
                  item={};
                  item.nom=key;
                  item.communicable=null;
                  item.personnes="";
                  item.description_ter="";
                  item.remarquable=null;
                  item.niveau=niveau+1;
                  item.enroul=false;
                  item.id_parent=idparent;
                  item.estArticle=true;
                  item.fils=obj[key];
                  newobj[identifiant]=item;             
               }
             else
              { 
                item={};
                item.nom=key;
                item.description_rep="";
                item.date_rep="";
                item.niveau=niveau+1;
                item.enroul=false;
                item.id_parent=idparent;
                item.estArticle=false;
                item.fils={};
                newobj[identifiant]=item;
                construire_arbo(item.niveau,identifiant,obj[key],newobj[identifiant].fils);
                      
              }
          
              myarbo=newobj;

         
   }

}

generer_HTML_items_arbo(newobj);
function generer_HTML_items_arbo(obj=null) {
  if(obj==null) 
      obj=newobj;
  for(key in obj)
  {
    if(obj[key].erreur)
    {
      $("#child"+obj[key].id_parent).append("<li style='color:red;' id=" + key + ">" + obj[key].nom + "</li>");
      continue;
    }

    if(!obj[key].estArticle)
      {
        $("#child"+obj[key].id_parent).append("<li id=" + key + ">\
         <i  class='fa ' id='icon"+key+"'>&nbsp;</i>\
        <span class='fa fa-folder-o'></span><span ondblclick='editer_rep("+key+");'  class='select' id=gras"+key+" > " + obj[key].nom + "</span>\
        <ul  id='child" + key + "'></ul></li>");
    // onmouseover='showinfo("+ key +" ,event);' onmouseout='hidy()'
          style_arbo(obj[key],key);
          if(obj[key].niveau>MAX_NIV) 
            $("#gras"+key).css("color","blue");

          //traçage d'arbre récursive 

          generer_HTML_items_arbo(obj[key].fils);
      }

    else if(obj[key].estArticle)
      {
        $("#child" + obj[key].id_parent).append("<li id=" + key + ">\
        <i  class='fa ' id='icon"+key+"'>&nbsp;</i>\
        <span class='fa fa-folder'></span><span ondblclick='editer_article("+key+");' class='select' id=gras"+key+" > " + obj[key].nom + "</span>\
        <ul  id='child" + key + "'></ul></li>");
 
          style_arbo(obj[key],key);
          if(obj[key].niveau>MAX_NIV) 
            $("#gras"+key).css("color","blue");
          tracer_docs(obj[key].fils,key);
      }

  }
}

// $(".repertoire").on('click', function(e) 
// {
//         var cle=this.id.substring(4,this.id.lenght);
//         editer_rep(cle);
//   });

// $(".article").dblclick(function()
// {
//    var cle=this.id.substring(4,this.id.lenght);
//         editer_article(cle);
// });


function tracer_docs(contenu,idPere) { 
  for (key in contenu)
  $("#child" + idPere).append("<li class='select' id="+idPere+key+">&nbsp; &nbsp;"+contenu[key]+"</li> ");     
}




// Applique le style de l'arborescence (gras - icon - liens - affichage)
function style_arbo(obj,key) {

  if(Object.keys(obj.fils).length>0)
    { 
      if(obj.enroul) 
        {
          $("#gras"+key).css("font-weight","Bold");
          $("#icon"+key).attr('class', 'fa fa-plus');
          $("#icon"+key).attr('onclick', "derouler('"+key+"')");
          $("#child"+key).hide();
        }
      if(!obj.enroul)
        {
          $("#gras"+key).css("font-weight","normal");
          $("#icon"+key).attr('class', 'fa fa-minus');
          $("#icon"+key).attr('onclick', "enrouler('"+key+"')");
          $("#child"+key).show();
        }
    }
  else
    {
      $("#gras"+key).css("font-weight","normal");
      $("#icon"+key).attr('class', 'glyphicon glyphicon-none');
      $("#icon"+key).attr('onclick', '');
    }
}



// Enroule un objet en changant sa variable boolean (On retrace l'arborescence juste aprés la modification.) 
function enrouler(id,obj=null) {
  //alert("D");
  if(obj==null) obj=newobj;
    for (key in obj)
      {
        if(key==id)
          { //alert('d');
            obj[key].enroul=true;
            tracer_arbo();
            return;
          }
        if(!obj.estArticle && obj[key].fils)  
             enrouler(id,obj[key].fils);
    }
}

// Déroule un objet en changant sa variable boolean (On retrace l'arborescence juste aprés la modification.) 
function derouler(id,obj=null)
{
  if(obj==null) obj=newobj;
    for (key in obj)
      {
      if(key==id)
          {
            obj[key].enroul=false;
            tracer_arbo();
            return;
          }
      if(!obj.estArticle && obj[key].fils)  
        derouler(id,obj[key].fils);
    }
}




function tracer_arbo() {
  //organisation_position();
  $("#child1").html("");
  generer_HTML_items_arbo();
}




// Parcourt toute l'arborescence et enroule tous les éléments
function enrouler_all(obj=null) {
  if(obj==null) 
    obj=newobj;
  for(key in obj)
    { 
      obj[key].enroul=true;
      if(!obj[key].estArticle)
      enrouler_all(obj[key].fils);
    }
}

// Parcourt toute l'arborescence et  déroule tous les éléments
function derouler_all(obj=null) {
  if(obj==null) 
    obj=newobj;
  for(key in obj)
    {
      obj[key].enroul=false;
      if(!obj[key].estArticle)
      derouler_all(obj[key].fils);
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
var jsonObj={
nom_projet:"",
description_report:"",
commanditaire_report:"",
periode_debut_report:"",
periode_fin_report:"",
}

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

// // Change la position des informations selon la position du curseur
function moveDivs(event)
{
  x=event.screenX;
  y=event.screenY;
  document.getElementById("fond").style.left=x-330+"px";
  document.getElementById("fond").style.top=y-470+"px";
}


var found={};
// Modifie un terminal (= article) en passant par des étapes ( voir le contenu de la fonction)
function editer_article(id) {
    // étape 1 : récuperer l'objet
      get_object_by_id(id);
      var tmp=found;
      found={};
    //  console.log(tmp);
    
    // étape 2 : remplir la modale avec les données de l'objet
      remplir_modale("ter",tmp);
    
    // étape 3 : aprés la validation de la modale recréer un nouvel objet avec les nouvelles informations saisies
      $("#okupdateter2").unbind('click').bind( "click", function(ev) { 
        //if (verifier_doublon(tmp.id_parent,$("#trep1").val(),tmp.id)) return;
        tmp.description_ter =$("#descter").val();
        tmp.nom = $("#trep1").val();
        tmp.personnes =$("#person").val()
        tmp.communicable = document.querySelector('input[name="diffusion"]:checked').value; 
        tmp.remarquable = $('#remarquable').is(":checked");
        viderModale();
    
    // étape 4 : modifier l'ancien objet et insérer le nvx
        modifier_ter(id,tmp,newobj);
      //  tracer_arbo();
      });    
}

//rechercher un element dans l'objet global en se basant sur id
function get_object_by_id(id,obj=null)
{
  if (obj==null) 
    obj=newobj;
  for (indice in obj) {
    if(indice==id) { 
        found= obj[indice];           
    }
    else if (!obj[indice].estArticle )
         get_object_by_id(id, obj[indice].fils);           
  }
}

function remplir_modale(type, obj) {
  viderModale();
    if (type == "rep") {
        $("#rep1").val(obj.nom);
        $("#desc1").val(obj.description_rep);
        $("#date_rep").val(obj.date_rep);
        //show_button_modal("okupdaterep");
        modal_shown="okupdaterep";
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
        //show_button_modal("okupdateter");
        modal_shown="okupdateter";
        $("#callnvxter").click();
    }
}

// Teste les champs saisis dans la modale d'article: S'il s'agit d'une modification rediriger vers la fonction de modification
function validArticle() { 
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
      $("#okupdateter2").click();
    }
}

// Modifie l'objet (article) id par les informations de newobj sans toucher les fils et le contenu
function modifier_ter(id,updated_obj, obj = null) {
    if (obj == null)
        obj = newobj;
    for (indice in obj) {
        if (indice == id) {
            // affectation des nouvelles info article
            obj[indice].nom_ter =  updated_obj.nom_ter;
            obj[indice].communicable =  updated_obj.communicable;
            obj[indice].remarquable =  updated_obj.remarquable;
            obj[indice].personnes =  updated_obj.personnes;
            return;
        } else if (!obj[indice].estArticle)
            modifier_ter(id,  updated_obj, obj[indice].fils);
    }
}

function viderModale() {
    $("#rep1").val("");
    $("#desc1").val("");
    $("#trep1").val("");
    $("#tdesc1").val("");
    $('#person').tagsinput('removeAll');
    $("#descter").val("");
    $("#errorter").hide();;
    $("#modal_nom_ter").css("color","");
    $("#modal_description_art")
}

// Modifie un répertoire
function editer_rep(id) {
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
        //if (verifier_doublon(tmp.id_parent,fold,tmp.id)) return;
        tmp.description_rep= $("#desc1").val();
        tmp.nom =$("#rep1").val();
        tmp.date_rep=$("#date_rep").val();
        viderModale();
  //étape 4 : modifier l'ancien objet en insérant le nouveau
      modifier_rep(id,tmp,newobj);
      $("#chila1").html("");
      tracer_arbo();
    });     
}

// Modifie l'objet (article) id par les informations de newobj sans toucher les fils et le contenu
function modifier_rep(id,updated_obj, obj = null) {
    if (obj == null)
        obj = newobj;
    for (indice in obj) {
        if (indice == id) {
            // affectation des nouvelles info article
            obj[indice].nom =  updated_obj.nom;
            obj[indice].description_rep =  updated_obj.description_rep;
            obj[indice].date_rep =  updated_obj.date_rep;
            return;
        } else if (!obj[indice].estArticle)
            modifier_rep(id,  updated_obj, obj[indice].fils);
    }
}

// Listener sur le button "Valider" lors de la saisie => applique un click sur le button qui a comme id la valeur stockée dans modal_shown
modal_shown="valider";
$(".press").keyup(function(event){
    if(event.keyCode == 13){
         $("#"+modal_shown).click();    
    }
});


// Interdire les charactères spéciaux
$('.restrict').keyup(function() {
    this.value = this.value.replace(/[&\/\\#,+()@^$~%. '":*?<>{}]/g, '_');
});


// // found = un object dans lequel on va stocker l'objet trouvé après une recherche approfondie dans l'objet jsonObj
// var found={};
// // NIV_MAX = Nombre maximum de niveaux de répertoire que l'arborescence pourra contenir, le 3eme niveau étant réservé pour les articles
// var NIV_MAX=2;
// // object_selected = (boolean) Défini s'il y a un element sélectionné ou pas
// var object_selected=false;

// // Initialise les informations concernant le reporter 
// function reporter() {
//   if(localStorage.reporter)
//   {
//     $("#reporteur").val(localStorage.reporter);
//     //jsonObj.nom_reporter=localStorage.reporter;
//   }
//   if(localStorage.langue) 
//   {
//     $('#langue_reportage').val(localStorage.langue); 
//     //jsonObj.langue_reportage=localStorage.langue;
//   }
// }
// reporter();



// // Configuration d'outil (sélectionable / non sélectionnable )
// $("#checkselected").on('change', function() {
//   jsonObj.configuration.isSelectable=$("#checkselected").is(':checked');
//   tracer_arbo();
// });




// $(document).on('click','.select',function() {
// if(jsonObj.configuration.isSelectable)
// { 
//   select_one($(this).attr("cle")); 
//   tracer_arbo();
// }

// });

// $("#formulaire" ).click(function() {
//   modal_shown="valider";
// });






// // Focus sur le premier champ dans la modale dés qu'elle est ouverte
// $('.modal').on('shown.bs.modal', function() {
//   $(this).find('.focus').focus();
// });




// function select_one(id,obj=null) {
//   if (obj==null) 
//     obj=jsonObj.fils;
//   for (key in obj) {
//      obj[key].isSelected=false;  
//      if(key==id) obj[key].isSelected=true;
//      select_one(id,obj[key].fils) ;
//   }              
// }




// // Initialise l'objet JSON avec les informations générales
// function creer_reportage() {
//   //jsonObj.nom_reporter = "reporter";
//   jsonObj.nom_projet = $("#nomprojet").val();     
//   jsonObj.commanditaire_report = $("#commanditaire1").val(); 
//   jsonObj.periode_debut_report = $("#start").val(); 
//   jsonObj.periode_fin_report = $("#end").val(); 
//   jsonObj.description_report = $("#descgen").val(); 
//   jsonObj.nom_reporter=$("#reporteur").val();
//   jsonObj.langue_reportage= $("#langue_reportage").val();
//   localStorage.reporter=jsonObj.nom_reporter;
//   localStorage.langue=jsonObj.langue_reportage;
// }

// // Récupère une collection de documents qui existe dans la zone (dropzone) et construit un object qui sera inséré sous idPere
// function ajout_docs(idPere) {
//   var spans = document.getElementById('fichiers').getElementsByTagName('span');
//      docs={};
//   for (var i = 0, l = spans.length; i < l; i++)  {
//     docs[spans[i].id] = spans[i].textContent;
//   }
     
//     inserer_dans_arbo(docs,idPere,jsonObj.fils);
    
//     $("#fichiers").html("");
//     tracer_arbo();
// }





// // Crée un objet qui représente un répertoire et qui sera inséré dans l'arbo dans idPere sous un id=idfils
// function ajout_rep(idPere,nivPere) {
//   show_button_modal("oknvxrep");
//   $("#callnvxrep").click();
//   $("#oknvxrep").unbind('click').bind( "click", function(ev) {        
//       var fold = $("#rep1").val(); // 
//       var description =$("#desc1").val();
//       viderModale();
//       if (fold == null || fold == "") 
//         return;
//       if (verifier_doublon(idPere,fold)) 
//         return;
//       item = {};
//       item ["id"]          = parseInt(new Date().getTime());
//       item ["nom"]         = fold;   
//       item ["description_rep"] = description ; 
//       item ["fils"]        = {};
//       item ["child"]       = 0;
//       item ["contenu"]     = {};
//       item ["position"]    = 0 ;
//       item ["isSelected"]  = true;
//       item ["estArticle"]  = false;
//       item ["enroul"]      = false;
//       item ["id_parent"]   = parseInt(idPere); 
//       item ["niveau"]      = nivPere+1;
//       inserer_dans_arbo(item,idPere,jsonObj.fils);
//        tracer_arbo();
//   }); 
// }
// // Vérifie si le nouveau élément existe déjà dans ce pêre
// function verifier_doublon(idPere,nom,id) {
//   get_object_by_id(idPere);
//   for(var key in found.fils)
//     if (found.fils[key].nom == nom && found.fils[key].id != id)
//       {
//         alert($("#msg_js #msg_js_cet_elem_existe_deja_dans_rep").html());
//         found={};
//         return true;
//       }
//   found={};
// }





// // Insérer l'élément item dans l'arborescence sous l'élément qui a id=idPere
// function inserer_dans_arbo(item,idPere,obj=null) { 
//   if(obj==null)  { 
     
//     obj=jsonObj.fils;  }
//     for (key in obj) {
//       if(key==idPere && !obj[key].estArticle)
//         {
//           obj[key].child++;
//           obj[key].fils[item.id]=item; 
//           obj[key].enroul=false;
//           $("#sauvegarder").prop('disabled', false);
//           return;
//         }
//       else if(key==idPere && obj[key].estArticle) 
//         {    
//           obj[key].enroul=false;
//           for(el in item)
//             { 
//               obj[key].contenu.docs[el]=item[el];
//               obj[key].child++;
//             }
//             $("#sauvegarder").prop('disabled', false);
//           return; 
//         }   
//       else 
//         { 
//           inserer_dans_arbo(item,idPere,obj[key].fils);  
//         }  
//     }
// }






// // Parcourt tout les objets et organise leur ordre
// function organisation_position(obj=null,pos=1) {
//   if(obj==null)
//     obj=jsonObj.fils[1].fils;
//   for(key in obj)
//   {
//     obj[key].position=pos;
//     organisation_position(obj[key].fils);
//     pos++;
//   }  
// }

// // Sera éxecuté quand un drag pass over un élément droppable
// function allowDrop(ev) { 
//   ev.preventDefault();
// }

// // ondrag je passe l'id de l'élément source
// function drag(ev,source) {
//   ev.dataTransfer.setData("srcid", source);
// }
// // ondrop un objet dans une zone, teste pour voir si on doit interdire le drop ou pas
// function drop(ev,cible,niv) {
//     ev.preventDefault();
//     var source = ev.dataTransfer.getData("srcid");
//     // récupérer l'objet source
//     get_object_by_id(source);
//     var tmp=found;
//     // tester si doublon ou pas
//     if(verifier_doublon(cible,found.nom,source)) 
//       { found={}; return; }   
//     // si l'objet source est un article on a pas besoin d'un test il faut le déplacer 
//     if(tmp.estArticle) 
//       {    
//         supprimer_element(0,tmp.id,false);
//         tmp.id_parent=cible; 
//         inserer_dans_arbo(tmp,cible);
//         select_one(source); 
//         tracer_arbo(); return; 
//       }
//     //si l'élément n'a pas de fils et respecte le niveau on peut le déplacer
//     if (tmp.child==0 && niv<NIV_MAX) 
//       {
//         supprimer_element(0,tmp.id,false);
//         tmp.id_parent=cible;
//         tmp.niveau=(niv+1); 
//         inserer_dans_arbo(tmp,cible); 
//         select_one(source); 
//         tracer_arbo(); return;
//       }
//     //si l'objet source est un répertoire et contient des fils 
//     // initialiser la valeur qui va contenir le niveau du dernier fils dans la source 
//     nivsrc=tmp.niveau;
//     trouver_niv_src(tmp.fils);
//     nivsrc=nivsrc-tmp.niveau;
    
//     if((nivsrc+niv)<NIV_MAX)
//       {
//         supprimer_element(0,tmp.id);
//         tmp.id_parent=cible;
//         tmp.niveau=(niv+1);
//         incrementer_niveau_fils(tmp.fils,tmp.niveau);
//         inserer_dans_arbo(tmp,cible); 
//         select_one(source); 
//         tracer_arbo(); 
//         return;
//       }  
//     //else alert("Niveau superieur");
//     found={};  
// }

// // Prend un objet et incrémente le niveau de ses fils
// function incrementer_niveau_fils(obj,niv) {
//   for(key in obj)
//   {
//     obj[key].niveau=(niv+1);
//     incrementer_niveau_fils(obj[key].fils);
//   }   
// }
// // Trouve le niveau le plus bas dans un objet
// function trouver_niv_src(obj) {
//   for(key in obj)
//   {     
//     if(obj[key].niveau>nivsrc && !obj[key].estArticle )
//       { nivsrc=obj[key].niveau;}
//     if(obj[key].child==0)  continue; 
//       trouver_niv_src(obj[key].fils);
//   }   
// }

// // Modifie le reportage
// function editer_reportage() {
//   $("#hidedesc").attr('class', 'fa fa-chevron-down');
//   $("#box_general").css("display","block");
//   $('#nomprojet').focus();
//   modal_shown="valider";
// }

// // Retrace l'arbo


// // Supprime un document de la zone drag_drop
// function supprimer_doc_panier(f) {
//        var n=$("#" + f).parent().parent().attr('id');
//         $("#" + f).remove();
// }

// // Traçage des documents indépendament car il passe par d'autres critéres


// // Echange les positions entre deux fréres
// function moveup(idfils,idPere,obj=null) { 
//   if(obj==null) obj=jsonObj.fils;
//   for (key in obj) {
//     if(key==idPere)
//       {
//         moveup1(idfils,obj[key].fils,0);
//       }
//     else 
//       { 
//         moveup(idfils,idPere,obj[key].fils);  
//       }
//   }
// } 
// // Echange l'id du parent des deux objets
// function changer_idparent(up,down) {
//   for(key in up.fils)
//   {
//     up.fils[key].id_parent=down.id;
//   }
//   for(key in down.fils)
//   {
//     down.fils[key].id_parent=up.id;
//   }
// }

// // Echange la position de deux objet
// function moveup1(idfils,obj,upkey) {
//   var upkey=0;
//   for(key in obj) {
//     if(key==idfils)
//     {
//       var tmp=obj[key];
//       obj[key]= obj[upkey];
//       obj[upkey]=tmp;
//       var pos=obj[upkey].position;
//       obj[upkey].position=obj[key].position;
//       obj[key].position=pos;
//       for(var cle in obj[key].fils)
//         {
//           obj[key].fils[cle].id_parent=obj[upkey].id;
//         }
//       for(var cle in obj[upkey].fils)
//         {
//           obj[upkey].fils[cle].id_parent=obj[key].id;
//         }
//       var idd=obj[upkey].id;
//       obj[upkey].id=obj[key].id;
//       obj[key].id=idd;
//       tracer_arbo();
//       return;
//     }
//     upkey=key;
//   }
// }

// // Supprime tout le contenu d'un élément sélectionné dont l'id est passé en argument [tout en gardant l'élément en question]
// function supprimer_contenu(id, obj = null) {
//     if (obj == null)
//         obj = jsonObj.fils;
//     for (indice in obj) {
//         if (indice == id && confirm($("#msg_js #msg_js_confirm_supprimer_contenu_de_cet_element").html())) {
//             obj[indice].fils = {};
//             obj[indice].contenu = {};
//             obj[indice].child = 0;
//             tracer_arbo();
//             //console.log(jsonObj);
//             $("#sauvegarder").prop('disabled', false);
//             return;
//         } else if (!obj[indice].estArticle)
//             supprimer_contenu(id, obj[indice].fils);
//     }
// }
// // Supprime l'élément dont l'id est passé en argument, le contenu de cet élément sera perdu ( une alert est affichée pour confirmer)
// function supprimer_element(child, id,confirmer=true, obj = null) {
//     if (obj == null)
//         obj = jsonObj.fils;
//     for (indice in obj) {
//         if (indice == id) //&& confirm('Attention ! cet élément peut contenir des données, êtes-vous sûr de vouloir supprimer  ?'))
//         {   if(confirmer) if(!confirm($("#msg_js #msg_js_confirm_supprimer_cet_element").html())) return;
//             delete obj[indice];
//             child.child--;
//             tracer_arbo();
//             $("#sauvegarder").prop('disabled', false);
//             return;
//         } else if (!obj[indice].estArticle)
//             supprimer_element(obj[indice], id,confirmer, obj[indice].fils);
//     }
// }
// // Supprime le document dont l'id est en argument, quel que ce soit son emplacement (après confirmation par alert)
// function supprimer_docs(id, obj = null) {
//   if (obj == null)
//       obj = jsonObj.fils;
//   for (indice in obj) {
//       if (obj[indice].estArticle) {
//           for (key in obj[indice].contenu.docs) {
//               if (key == id ) {
//                   delete obj[indice].contenu.docs[key];
//                   delete obj[indice].child--;
//                   tracer_arbo();
//                   $("#sauvegarder").prop('disabled', false);
//                   return;
//               }
//           }
//       } else {
//           supprimer_docs(id, obj[indice].fils);
//       }
//   }
// }



// // Fait le test sur les boutons qui seront affichés lors de l'affichage d'une modale ( ajouter/modifier article/répertoire)
// function show_button_modal(name) {
//     $("#okupdaterep").hide();
//     $("#oknvxrep").hide();
//     $("#oknvxter").hide();
//     $("#okupdateter").hide();
//     $("#titre_nvx_rep").hide();
//     $("#titre_update_rep").hide();
//     $("#titre_nvx_ter").hide();
//     $("#titre_update_ter").hide();
//     //viderModale();
//     if (name == "okupdaterep") {
//         $("#okupdaterep").show();
//         $("#titre_update_rep").show();
//         modal_shown = "okupdaterep";
//     }
//     if (name == "oknvxrep") {
//         $("#oknvxrep").show();
//         $("#titre_nvx_rep").show();
//         viderModale();
//         modal_shown = "oknvxrep";
//     }
//     if (name == "oknvxter") {
//         $("#oknvxter").show();
//         $("#titre_nvx_ter").show();
//         viderModale();
//         modal_shown = "oknvxter";
//     }
//     if (name == "okupdateter") {
//         $("#okupdateter").show();
//         $("#titre_update_ter").show();
//         modal_shown = "okupdateter";
//     }
// }



// // $("#1").hide();

// function description_generale() {
//     var erreur=false;
//     if(!$("#commanditaire1").val())               
//       {
//         $("#commanditaire").css("color","red"); erreur=true; 
//       }
//       else $("#commanditaire").css("color","");

//     if(!$("#start").val() || !$("#end").val())
//       {
//         $("#periode1").css("color","red"); erreur=true; 
//       }
//         else if($('#start').val() > $('#end').val()){
//           alert($("#msg_js #date_date ").html()); 
//           return;
//         }
//         else $("#periode1").css("color","");

//     if(!$("#descgen").val())                      
//       {
//         $("#fr_general").css("color","red");  erreur=true; 
//       }
//         else $("#fr_general").css("color",""); 
//     if(!$("#nomprojet").val())                    
//       {
//         $("#projet").css("color","red"); erreur=true; 
//       }
//         else $("#projet").css("color","");

//     if(!$("#reporteur").val())                    
//       {
//         $("#nom_reporter").css("color","red"); erreur=true; 
//       }
//         else { $("#nom_reporter").css("color","");  new_reporter();}
//     $("#errordesc").show();

//     if(erreur) return;
//     else {
//         $("#errordesc").hide();
//         $("#hidedesc").click();
//         $("#home").text($("#nomprojet").val());
//         $("#gras1").text($("#nomprojet").val());
//         $("#new_report").text($("#nomprojet").val());
//         $("#sauvegarder").prop('disabled', false);
//         $("#1").show();

//         creer_reportage()
//     }
// }



// function associer(n) {
//     $("#child" + n).append($("#fichiers").html());
//     plusmoins(n);
//     $("#fichiers").empty();
// }

// function plusmoins(i) {
//     if (!$("#child" + i).is(':empty')) {
//         $("#ico" + i).attr('class', 'fa fa-minus');
//         $("#child" + i).show();
//     } else
//         $("#ico" + i).attr('class', 'h');
// }


// $("#charger").click(function() {
//    if(!$("#sauvegarder").is(":disabled") && confirm($("#msg_js #voulez_vous_sauvegarder").html())) $("#sauvegarder").click() ;
//     var version = $("#historique").val();
//     jsonObj = JSON.parse(localStorage.getItem(version));
//     $("#commanditaire1").val(jsonObj.commanditaire_report);
//     $("#start").val(jsonObj.periode_debut_report);
//     $("#end").val(jsonObj.periode_fin_report);
//     $("#descgen").val(jsonObj.description_report);
//     $("#nomprojet").val(jsonObj.nom_projet);
//     $("#gras1").text(jsonObj.nom_projet);
//     $("#new_report").text(jsonObj.nom_projet);
//     $("#sauvegarder").prop('disabled', false);
//     $("#reporteur").val(jsonObj.nom_reporter);
//     $("#langue_reportage").val(jsonObj.langue_reportage);
//     tracer_arbo();
//     hideshow(false);
//     $("#1").show();
//     $("#sauvegarder").prop('disabled', true);
// });
// $("#sauvegarder").click(function() {

//     var date = new Date();
//     var key=formatDate(date)+"_"+$("#gras1").text();
//     localStorage.setItem(key , JSON.stringify(jsonObj));
//     $('#historique').empty().append('');
//     fillhistorique();
//     $('#historique').val(key);
//     $(this).prop('disabled', true);


// });

// function formatDate(value=null) {
//   if (value==null) value=new Date();
//     return  (value.getYear() + 1900) + "-"  + ("0" + (value.getMonth() + 1)).slice(-2)+ "-" + ("0" + value.getDate()).slice(-2) + "_" + ("0" + value.getHours()).slice(-2)+"h"+("0" + value.getMinutes()).slice(-2);;
// }

// function fillhistorique() {
//     for (var i = localStorage.length-1; i >= 0; i--)
//       if(localStorage.key(i).substring(0,1)==2)
//         $("#historique").append("<option value=" + localStorage.key(i) + " > " + localStorage.key(i) + "</option");

//     // for (var i = 0, len = localStorage.length; i < len; ++i)
// }

// function rmhistorique() {
//     localStorage.removeItem($("#historique").val());
//     $("#historique option:selected").remove();
// }

// function toast(a = "test", b = "test") {

//   if(!jsonObj.nom_reporter) { alert($("#msg_js #nom_reporter_pas_saisit").html()); return ;}
//   if(!jsonObj.periode_debut_report || !jsonObj.periode_fin_report) return;
//     setTimeout(function() {
//         toastr.options = {
//             closeButton: true,
//             progressBar: true,
//             showMethod: 'slideDown',
//             timeOut: null
//         };
//         toastr.success(b, a);
//     }, 1300);

//     var data = jsonObj;
//     var json = JSON.stringify(data);
//     var blob = new Blob([json], {
//         type: "application/json"
//     });
//     var url = URL.createObjectURL(blob);
//     var a = document.createElement('a');
//     a.download = formatDate()+jsonObj.nom_projet+".json";
//     a.href = url;
//     a.textContent = formatDate()+jsonObj.nom_projet+".json";
// }

// $(document).ready(function() {
//     fillhistorique();
//     // $('.i-checks').iCheck({
//     //     checkboxClass: 'icheckbox_square-green',
//     //     radioClass: 'iradio_square-green',
//     // });


//     $('#formulaire .input-daterange').datepicker({
//         keyboardNavigation: false,
//         forceParse: true,
//         autoclose: true,
//         dateFormat: 'yy-mm-dd'
//     });
//     Dropzone.options.myAwesomeDropzone = {
//         autoProcessQueue: false,
//         uploadMultiple: true,
//         parallelUploads: 100,
//         maxFiles: 100,
//         // Dropzone settings
//         init: function() {
//             var myDropzone = this;
//             // this.element.querySelector("button[type=submit]").addEventListener("click", function(e) {
//             //     e.preventDefault();
//             //     e.stopPropagation();
//             //     myDropzone.processQueue();
//             // });
//             this.on("sendingmultiple", function() {});
//             this.on("successmultiple", function(files, response) {});
//             this.on("errormultiple", function(files, response) {});
//         }
//     }
// });

//ordre de priorité des langues
// var lang_priorite = ["en", "es", "fr"];
// //langue du navigateur
// var lg = navigator.language || navigator.userLanguage;

// $(document).ready(function() {
//   //--- traduction initiale (langue par défaut)
//   //translate();  //--- fonctionnement par défaut (mode ="non_rempl_abs")
//   //translate("priorite", lang_priorite);  
//   if(lang_priorite.indexOf(lg)>0)
//   {
//     $('#lang option[value="'+lg+'"]').prop('selected', true);
//   }
//   translate("trad_in_progress");

// });


// //--- changement de langue
// $("select#lang").on('change', function() {
//   //translate();  //--- fonctionnement par défaut (mode ="non_rempl_abs")
//   //translate("priorite", lang_priorite);  
//   //
//   translate("trad_in_progress");


// });
