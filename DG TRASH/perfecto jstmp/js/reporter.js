var jsonObj={
nom_projet:"",
personnes:"",
description_report:"",
commanditaire_report:"",
periode_debut_report:"",
periode_fin_report:"",
arborescence:{},
}
 // $("#1").hide();



ready=true;
var   MAX_NIV=3;
var   identifiant=100;
var   myarbo={};
construire_arbo(0,1,arbo_dg,myarbo);
var newobj=myarbo;


function construire_arbo(niveau,idparent,obj,newobj){

    for(key in obj){

        identifiant++;
              if($.isNumeric(key)){
                $("#anomalie").html("<b>Certains fichiers sont mal placés dans l'arborescence : </b> <br> &nbsp; - <i>un fichier doit obligatoirement être placé dans un article</i>");
                item={};
                item.nom=obj[key];
                item.erreur=true;
                ready=true;
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
                  item.enroul=true;
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
  

// generer_HTML_items_arbo(newobj);

function generer_HTML_items_arbo(obj=null) {
  if(obj==null) 
      obj=newobj;
  for(key in obj)
  {
    if(obj[key].erreur)
    {
      $("#child"+obj[key].id_parent).append("<li style='color:red;' class='select' id=" + key + ">" + obj[key].nom.substring(0,40) + "</li>");
      ready=false;
      continue;
    }

    if(!obj[key].estArticle)
      {
        $("#child"+obj[key].id_parent).append("<li id=" + key + ">\
         <i  class='fa ' id='icon"+key+"'>&nbsp;</i>\
        <span class='fa fa-folder-o'></span><span onmouseover='showinfo("+ key +" ,event);' onmouseout='hidy()' ondblclick='editer_rep("+key+");'  class='select' id=gras"+key+" > " + obj[key].nom + "</span>\
        <ul  id='child" + key + "'></ul></li>");
    // onmouseover='showinfo("+ key +" ,event);' onmouseout='hidy()'
          style_arbo(obj[key],key);
          if(obj[key].niveau>MAX_NIV) {
                $("#gras"+key).css("color","blue");  
                $("#anomalie1").html("<b>Les fichiers en bleu dépassent le niveau autorisé : </b><br> &nbsp; - <i>L'arborescence ne doit pas dépasser "+MAX_NIV+" Niveaux </i>");
                    ready=false;   
                      }
          // if(!obj[key].description_rep.trim())
          //   $("#gras"+key).append("<span class=badge>1</span>");


          //traçage d'arbre récursive 

          generer_HTML_items_arbo(obj[key].fils);
      }

    else if(obj[key].estArticle)
      {
        $("#child" + obj[key].id_parent).append("<li id=" + key + ">\
        <i  class='fa ' id='icon"+key+"'>&nbsp;</i>\
        <span class='fa fa-folder'></span><span onmouseover='showinfo("+ key +" ,event);' onmouseout='hidy()' ondblclick='editer_article("+key+");' class='select' id=gras"+key+" > " + obj[key].nom.substring(0,40) + "</span>\
        <ul  id='child" + key + "'></ul></li>");
 
          style_arbo(obj[key],key);
          if(obj[key].niveau>MAX_NIV) {
                $("#gras"+key).css("color","blue"); 
                 $("#anomalie1").html("<b>Les fichiers en bleu dépassent le niveau autorisé : </b><br> &nbsp; - <i>L'arborescence ne doit pas dépasser "+MAX_NIV+" Niveaux</i>");
                        ready=false;        
                      }
        if(!obj[key].description_ter.trim())
            $("#gras"+key).append(" <span class=badge>1</span>");

          tracer_docs(obj[key].fils,key);
      }

  }
}




function tracer_docs(contenu,idPere) { 
  for (key in contenu){
    var idd=idPere+"_"+key;
  $("#child" + idPere).append("<li class='select' id="+idd+"><i id=ico"+idd+"  class='fa '></i> &nbsp;"+contenu[key]+"</li> ");     
           var extension = contenu[key].substr( (contenu[key].lastIndexOf('.') +1) );
           var icon="fa fa-file-o";
           if($.inArray(extension, ['png','jpg','jpeg','gif','bmp']) > -1) icon="fa fa-file-image-o";
           if($.inArray(extension, ['doc','docx','rtf']) > -1) icon="fa fa-file-word-o";
           if($.inArray(extension, ['xls','xlsm','xlsb']) > -1) icon="fa fa-file-excel-o";
           if($.inArray(extension, ['mp4','avi','mov']) > -1) icon="fa fa-file-video-o";
           if($.inArray(extension, ['zip','rar']) > -1) icon="fa fa-file-archive-o";
           if($.inArray(extension, ['pdf']) > -1) icon="fa fa-file-pdf-o";
           if($.inArray(extension, ['mp3','occ','rm']) > -1) icon="fa fa-file-audio-o";
           $("#ico"+idd).attr('class',icon);
          
            }
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
  progress();
}




// Parcourt toute l'arborescence et enroule tous les éléments
function enrouler_all(obj=null) {
  if(obj==null) 
    obj=newobj;
  for(key in obj)
    { if(obj[key].erreur) continue;
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
    { if(obj[key].erreur) continue;
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
      $("#bref2").html("Description : <span class='bref'>"+(tmp.description_rep.substring(0,110)+"..." || vide)+"</span>");
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
    if(!ready) return;
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
        tracer_arbo();
      });    
}

//rechercher un element dans l'objet global en se basant sur id
function get_object_by_id(id,obj=null)
{
  if (obj==null) 
    obj=newobj;
  for (indice in obj) {
    if(obj[indice].erreur) continue;
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
        // var person = $("#personnes").val().split(',');
        // $.each(person, function(index, value) {
        //     $('#person').tagsinput('add', value);
        // });
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
      if(obj[indice].erreur) continue;
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
    progress();
    $("#rep1").val("");
    $("#desc1").val("");
    $("#trep1").val("");
    $("#tdesc1").val("");
    $('#person').tagsinput('removeAll');
    $("#descter").val("");
    $("#errorter").hide();;
    $("#modal_nom_ter").css("color","");
    $("#modal_description_art")
     var person = $("#personnes").val().split(',');
        $.each(person, function(index, value) {
            $('#person').tagsinput('add', value);
        });
}

// Modifie un répertoire
function editer_rep(id) {
  if(!ready) return ;
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
      if(obj[key].erreur) continue;
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
function restrict(str){
    return str.replace(/[&\/\\#,+()@^$~%. '":*?<>{}]/g, '_');
}


// Initialise l'objet JSON avec les informations générales
function creer_reportage() {
  jsonObj.nom_projet = $("#nomprojet").val();
  jsonObj.personnes = $("#personnes").val();     
  jsonObj.commanditaire_report = $("#commanditaire1").val(); 
  jsonObj.periode_debut_report = $("#start").val(); 
  jsonObj.periode_fin_report = $("#end").val(); 
  jsonObj.description_report = $("#descgen").val(); 
  jsonObj.nom_reporter=$("#reporteur").val();
  jsonObj.langue_reportage= $("#langue_reportage").val();
  localStorage.reporter=jsonObj.nom_reporter;
  localStorage.langue=jsonObj.langue_reportage;
  progress();
}

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


// Modifie le reportage
function editer_reportage() {
  $("#hidedesc").attr('class', 'fa fa-chevron-down');
  $("#box_general").css("display","block");
  $('#nomprojet').focus();
  modal_shown="valider";
}

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


// Focus sur le premier champ dans la modale dés qu'elle est ouverte
$('.modal').on('shown.bs.modal', function() {
  $(this).find('.focus').focus();
});

$("#sauvegarder").click(function() {
    jsonObj.arborescence=newobj;
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
    return  "DG_"+(value.getYear() + 1900) + "-"  + ("0" + (value.getMonth() + 1)).slice(-2)+ "-" + ("0" + value.getDate()).slice(-2) + "_" + ("0" + value.getHours()).slice(-2)+"h"+("0" + value.getMinutes()).slice(-2);;
}
fillhistorique();
function fillhistorique() {
    for (var i = localStorage.length-1; i >= 0; i--)
      if(localStorage.key(i).substring(0,3)=="DG_")
        $("#historique").append("<option value=" + localStorage.key(i) + " > " + localStorage.key(i) + "</option");

    // for (var i = 0, len = localStorage.length; i < len; ++i)
}

function rmhistorique() {
    localStorage.removeItem($("#historique").val());
    $("#historique option:selected").remove();
}

$("textarea, input").on('keyup', function() { 
  var max=$(this).attr("maxlength")||10;
  $(this).attr("original-title",this.value.length+"/"+max);
  $(this).mouseover();
  $('textarea, input').tipsy({gravity: 'e'});
  });
$("textarea, input").on('change', function() { 
 $(this).mouseout();
  });


$("#charger").click(function() {
  $("#validation").prop("disabled",false);
  ready=true;

   if(!$("#sauvegarder").is(":disabled") && confirm(t("voulez_vous_sauvegarder"))) $("#sauvegarder").click() ;
    var version = $("#historique").val();
    jsonObj = JSON.parse(localStorage.getItem(version));

     var person = jsonObj.personnes.split(',');
        $.each(person, function(index, value) {
            $('#personnes').tagsinput('add', value);
        });
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
    newobj=jsonObj.arborescence;
    tracer_arbo();
    description_generale();
    hideshow(false);
    $("#1").show();
    $("#sauvegarder").prop('disabled', true);
     progress();
    isready();
});


function isready()
{
  if(!ready)
  {
    alert("erreur_arbo_pas_de_modif");
    $("#validation").prop("disabled",true);

  }
}






 var nbarticle=0;
 var nbarticle_rempli=0;
function valider_projet(obj=null)
{

if (obj == null)
        obj = newobj;
    for (i in obj) 
    {
      if(obj[i].estArticle)
        {
          nbarticle++;
          if(obj[i].description_ter.trim())
            nbarticle_rempli++;
        }
      else if(obj[i].fils)
          valider_projet(obj[i].fils);

    }
}
function deleteclass()
{
  $("#successbar").removeClass("progress-bar-danger progress-bar-warning progress-bar-success");
}

function progress()
{
  nbarticle=3;
  nbarticle_rempli=0;
  valider_projet();
  if(jsonObj.nom_projet.trim()) { nbarticle_rempli+=3; }

  var percent=(nbarticle_rempli*100)/nbarticle;
   $("#notif").text((percent|0)+"%");
     if(percent<50) 
      { 
        $("#notif").css("background-color", "#fbb1b8"); 
        $("#successbar").removeClass("progress-bar-warning progress-bar-success").addClass("progress-bar-danger"); 
      }
   if(percent>=50 && percent<100) 
      { 
        $("#notif").css("background-color", "#f89406"); 
        $("#successbar").removeClass("progress-bar-danger progress-bar-success").addClass("progress-bar-warning"); 
      }
   if(percent>=100) 
      { 
        $("#notif").css("background-color", "green"); 
        $("#successbar").removeClass("progress-bar-warning progress-bar-danger").addClass("progress-bar-success");
      }   
  $("#successbar").width(percent*8);
 
  if(percent==100) $("#toasterbutton").prop('disabled', false);
  else $("#toasterbutton").prop('disabled', true);
}
  

function toast(a = "test", b = "test") {

  if(!jsonObj.nom_reporter) { alert(t("nom_reporter_pas_saisi")); return ; }
  if(!jsonObj.nom_projet) { alert(t("projet_non_complet")); return; }
  //if(!ready) {  alert(t("erreur_arbo"));   return; }
  jsonObj.arborescence=newobj;
    setTimeout(function() {
        toastr.options = {
            closeButton: true,
            progressBar: true,
            showMethod: 'slideDown',
            timeOut: null
        };
        toastr.success(b, a);
    }, 1300);

    var data = jsonObj;
    var json = JSON.stringify(data);
    var blob = new Blob([json], {
        type: "application/json"
    });
    var url = URL.createObjectURL(blob);
    var a = document.createElement('a');
    a.download = formatDate()+jsonObj.nom_projet+".json";
    a.href = url;
    a.textContent = formatDate()+jsonObj.nom_projet+".json";
}

$(document).ready(function() {
    //progress();
  
    isready();
      tracer_arbo();


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
