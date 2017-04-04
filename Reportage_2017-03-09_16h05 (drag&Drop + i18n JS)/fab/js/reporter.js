
//Déclaration de l'objet Json dans lequel les informations seront stoquées 
var jsonObj={
  nom_reporter: "",         
  commanditaire_report: "",
  periode_debut_report: "",
  nom_projet: "",
  periode_fin_report: "",
  description_report: "",
  enroul    : true,
  niveau : 0,
  id_parent: 0,
  ter: {},
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
//found un object dans lequel on va stoquer l'objet trouver apres une recherche approfondie dans l'objet global
var found={};
//NIV_MAX c'est le nombre maximum de repertoire que l'arborescence pourra contenir, le 3eme niveau est reservé pour les articles
var NIV_MAX=2;

function test(){

  console.log(jsonObj.fils[1].fils)
}

$('.modal').on('shown.bs.modal', function() {
  $(this).find('[autofocus]').focus();
  //$("#rep1").focus();
});

function creer_reportage()
{
  jsonObj.nom_reporter = "reporter";
  jsonObj.nom_projet = $("#nomprojet").val();     
  jsonObj.commanditaire_report = $("#commanditaire1").val(); 
  jsonObj.periode_debut_report = $("#start").val(); 
  jsonObj.periode_fin_report = $("#end").val(); 
  jsonObj.description_report = $("#descgen").val(); 
  //console.log(jsonObj);
}

//recuperer une collection de documents qui existe dans la zone (dropzone) et construire un object qui sera inserer sous idPere
function ajout_docs(idPere)
{

  var spans = document.getElementById('fichiers').getElementsByTagName('span');
  ///  obj = {} ;
   //  obj.id_parent=idPere;
     docs={};
    // obj.nature="fichier";

  for (var i = 0, l = spans.length; i < l; i++) {
           docs[spans[i].id] = spans[i].textContent; //obj[spans[i].id] = spans[i].textContent; || spans[i].innerText;  

        }

     
        inserer_dans_arbo(docs,idPere,jsonObj.fils);
        
        $("#fichiers").html("");
       // alert("wsselt");
        tracer_arbo();
        //console.log(jsonObj);
}

function validArticle(choix) 
{

  if ($("#trep1").val() == "") 
    {
        $("#errorter").show();

    }

  else {    
           
      if(choix=="ajouter")  $("#oknvxter2").click();

      if(choix=="modifier")  $("#okupdateter2").click();

    }
}

//creer un objet qui represent un article et qui sera inseré dans l'arbo dans idPere sous un id=idfils
function ajout_art(idPere,nivPere)
  {
        show_button_modal("oknvxter");
        $("#callnvxter").click();
        $("#oknvxter2").unbind('click').bind( "click", function(ev) {

        item = {};
        // parseInt(new Date().getTime());
        item ["communicable"]= document.querySelector('input[name="diffusion"]:checked').value; 
        item ["personnes"]   = $("#person").val();
        item ["nom"]         = $("#trep1").val(); //$("#rep1").val();  
        item ["id"]          = parseInt(new Date().getTime());
        item ["description_ter"] = $("#descter").val();  //$("#desc1").val(); 
        item ["remarquable"] = $('#remarquable').is(":checked"); 
        item ["contenu"]     = { docs:{} };
        item ["fils"]        = {};
        item ["child"]        = 0;

        item ["estArticle"]  = true;
        item ["enroul"]      = false;
        item ["id_parent"]   = parseInt(idPere);
        item ["niveau"]      = nivPere+1;
        if (verifier_doublant(idPere,item ["nom"])) return;
        //viderModal();

        inserer_dans_arbo(item,idPere,jsonObj.fils);

        
         tracer_arbo();
       //  console.log(jsonObj);

          }); 
  }

//creer un objet qui represent un repertoire et qui sera inseré dans l'arbo dans idPere sous un id=idfils
function ajout_rep(idPere,nivPere) 
{
        show_button_modal("oknvxrep");
        $("#callnvxrep").click();
        $("#oknvxrep").unbind('click').bind( "click", function(ev) {
            //alert("une fois");        
            var fold = $("#rep1").val(); // 
            var description =$("#desc1").val();
            viderModal();

            if (fold == null || fold == "") 
              return;
            if (verifier_doublant(idPere,fold)) return;
            item = {};
            item ["id"]          = parseInt(new Date().getTime());// parseInt(new Date().getTime());     
            item ["nom"]         = fold; //$("#rep1").val();  
            item ["description_rep"] = description ; //$("#desc1").val(); 
            item ["fils"]        = {};
            item ["child"]       = 0;
            item ["contenu"]     = {};
            item ["position"]    = 0 ;
            item ["estArticle"]  = false;
            item ["enroul"]      = false;
            item ["id_parent"]   = parseInt(idPere); //alert(get_object_by_id(idPere).niveau,jsonObj.fils[1].fils);
            item ["niveau"]      = nivPere+1;
          //alert(nivPere);
           // alert(item ["niveau"]);     
            
            inserer_dans_arbo(item,idPere,jsonObj.fils);
            //console.log(jsonObj);
            
             tracer_arbo();

       }); 
}
//verifier si le nvx element exist deja 
function verifier_doublant(idPere,nom,id){
        get_object_by_id(idPere);
            for(var key in found.fils)
              if (found.fils[key].nom == nom && found.fils[key].id != id)
              {
                alert($("#msg_js #msg_js_cet_elem_existe_deja_dans_rep").html());
                found={};
                return true;
              }
        found={};
}
//alert(jsonObj.fils.hasOwnProperty(1));
function get_object_by_id(id,obj=null)
{
  if (obj==null) 
    obj=jsonObj.fils;
  for (indice in obj)
      {
        if(indice==id)
          { 
            found= obj[indice];           
          }
        else if (!obj[indice].estArticle )//&& obj[indice].fils.hasOwnProperty(indice))
             get_object_by_id(id, obj[indice].fils);           
    }
}

function modifier_art(id) 
{
    //etape 1 recuperer l'objet
      get_object_by_id(id);
      var tmp=found;
      found={};
    // console.log(tmp);

    // etape 2 remplir le modal avec les donee de l'objet

      remplir_modal("ter",tmp);

    // etape 3 apres validation modal recreer un nvx objet avec les nvl informations saisit
      $("#okupdateter2").unbind('click').bind( "click", function(ev) {
        
        if (verifier_doublant(tmp.id_parent,$("#trep1").val(),tmp.id)) return;

        tmp.description_ter =$("#descter").val();
        tmp.nom = $("#trep1").val();
        tmp.personnes =$("#person").val()
        tmp.communicable = document.querySelector('input[name="diffusion"]:checked').value; 
        tmp.remarquable = $('#remarquable').is(":checked");
        //document.getElementById("remarquable").checked = true;
        viderModal();
       //etape 4 modifier l'ancien objet et inserer le nvx
        modifier(id,tmp,jsonObj.fils);
        
        tracer_arbo();
        //console.log(jsonObj);

      });    
}

function modifier_rep(id) 
{
    //etape 1 recuperer l'objet
    get_object_by_id(id);
    var tmp=found;
    found={};
    // etape 2 remplir le modal avec les donee de l'objet
    remplir_modal("rep",tmp);
    // etape 3 apres validation modal recreer un nvx objet avec les nvl informations saisit
      $("#okupdaterep").unbind('click').bind( "click", function(ev){

        fold =$("#rep1").val();
        if (verifier_doublant(tmp.id_parent,fold,tmp.id)) return;
        tmp.description_rep =$("#desc1").val();
        tmp.nom =$("#rep1").val();
        viderModal();
     //etape 4 modifier l'ancien objet et inserer le nvx
      modifier(id,tmp,jsonObj.fils);
     //  console.log(jsonObj);
     $("#chila1").html("");
        tracer_arbo();

      });     
}

//inserer  l'element item dans l'arborescence sous l'element qui a id=idPere
function inserer_dans_arbo(item,idPere,obj=null)
{ 

  if(obj==null) obj=jsonObj.fils;
    for (key in obj)
      {

        if(key==idPere && !obj[key].estArticle)
          {
            obj[key].child++;
           // item.position=obj[key].child;
            //alert(item.position);
            obj[key].fils[item.id]=item;
            
      return;
          }

          else if(key==idPere && obj[key].estArticle) 
           { 
             for(el in item)
             { 
                obj[key].contenu.docs[el]=item[el];
                obj[key].child++;
              }
         
              return; 
            }   
      
        else 
           { 
            inserer_dans_arbo(item,idPere,obj[key].fils);  
            }
    
      }
}
//hideshow(false);
function tracer_arbo(){
  $("#child1").html("");
  molinette_tracage_arbo();
 // hideshow(false);


}
function enrouler(id,obj=null)
{
  if(obj==null) obj=jsonObj.fils;
    for (key in obj)
      if(key==id)
          {
            obj[key].enroul=true;
            tracer_arbo();
           // $("#child"+id).hide();
            return;
          }
      else enrouler(id,obj[key].fils);
}
function derouler(id,obj=null)
{
  if(obj==null) obj=jsonObj.fils;
    for (key in obj)
      if(key==id)
          {
            obj[key].enroul=false;
            tracer_arbo();
            //$("#child"+id).show();
            return;
          }
      else derouler(id,obj[key].fils);
}

function style_arbo(obj,key)
{

    if(obj.child>0)
      {
        if(obj.enroul) 
          {
            $("#gras"+key).css("font-weight","Bold");
            $("#icon"+key).attr('class', 'fa fa-plus');
            $("#icon"+key).attr('onclick', 'derouler('+key+')');
            $("#child"+key).hide();
          }
        if(!obj.enroul){
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

function enrouler_all(obj=null)
{
    if(obj==null) 
      obj=jsonObj.fils[1].fils;

  for(key in obj)
  {
    obj[key].enroul=true;
    enrouler_all(obj[key].fils);

  }
}
  function derouler_all(obj=null)
{
    if(obj==null) 
      obj=jsonObj.fils[1].fils;

  for(key in obj)
  {
    obj[key].enroul=false;
    derouler_all(obj[key].fils);

  }

}
function organisation_position(obj=null,pos=1){
  if(obj==null)
    obj=jsonObj.fils[1].fils;

  for(key in obj)
  {
    obj[key].position=pos;
    organisation_position(obj[key].fils);
    pos++;
  }  



}

function allowDrop(ev) {
    ev.preventDefault();
}

function drag(ev,source) {
   // ev.dataTransfer.setData("text", ev.target.textContent);
    ev.dataTransfer.setData("srcid", source);
}

function drop(ev,cible,niv) {
    ev.preventDefault();
    var source = ev.dataTransfer.getData("srcid");
    
    //recuperer lobjet source
    get_object_by_id(source);
    var tmp=found;

    //tester si doublon ou pas
   if(verifier_doublant(cible,found.nom,source)) { found={}; return; }
    
    if(tmp.estArticle) 
    {    
      supprimer_element(0,tmp.id);
     // tmp.id=parseInt(new Date().getTime());
      tmp.id_parent=cible; 
      inserer_dans_arbo(tmp,cible); 
      tracer_arbo(); return; 
    }

    //initialiser la valeur qui va contenir le niveau du dernier fils dans la source
    if (tmp.child==0 && niv<NIV_MAX) 
    {
      supprimer_element(0,tmp.id);
      //tmp.id=parseInt(new Date().getTime());
      tmp.id_parent=cible;
      tmp.niveau=(niv+1); 
      inserer_dans_arbo(tmp,cible); 
      tracer_arbo(); return;
    }


    
    nivsrc=tmp.niveau;
    trouver_niv_src(tmp.fils);
    nivsrc=nivsrc-tmp.niveau;
    
    if((nivsrc+niv)<NIV_MAX)
     {
      supprimer_element(0,tmp.id);
      //tmp.id=parseInt(new Date().getTime());
      tmp.id_parent=cible;
      tmp.niveau=(niv+1);
      incrementer_niveau_fils(tmp.fils,tmp.niveau);
      inserer_dans_arbo(tmp,cible); 
      tracer_arbo(); 
      return;
    }
    //alert("autoriser dossier avec fils: "+nivsrc+" niveau de la cible ="+niv);  
    else alert("niveau superieur");
    found={};
    
}



//prendre un objet et incrementer le niveau de ses fils
function incrementer_niveau_fils(obj,niv){

  for(key in obj){
    obj[key].niveau=(niv+1);
    incrementer_niveau_fils(obj[key].fils);
  }
    
}






function trouver_niv_src(obj)
{

  for(key in obj)
    {   
       
        if(obj[key].niveau>nivsrc && !obj[key].estArticle )
          { nivsrc=obj[key].niveau;}
        
        if(obj[key].child==0)  continue; 
        trouver_niv_src(obj[key].fils);
    }
    
}


function editer_reportage(){

$("#hidedesc").attr('class', 'fa fa-chevron-down');
$("#box_general").css("display","block");
$('#nomprojet').focus();

}
function molinette_tracage_arbo(obj=null)
{
  if(obj==null) 
      obj=jsonObj.fils[1].fils;

  for(key in obj)
  {
      if(!obj[key].estArticle)
      {//alert(obj[key].nom_rep);
        $("#child"+obj[key].id_parent).append("<li   id=" + key + "> \
    <span ondragend='organisation_position(); tracer_arbo();' draggable='true' \
    ondragstart='drag(event,"+key+")' ondrop='drop(event,"+key+","+obj[key].niveau+")' ondragover='allowDrop(event)' class='select'><i  id=icon"+key+">&nbsp;</i><span class='fa fa-folder-o'></span><span id=gras"+key+" > " + obj[key].nom + "</span> </span>\
    <div class='dropdown'><a class='dropbtn'>&nbsp;&nbsp;&nbsp;<i class='fa fa-align-justify'></i>&nbsp;&nbsp;&nbsp;</a>\
    <div class='dropdown-content'> \
    <a  onclick=\"modifier_rep('"+key+"')\"><i class='fa fa-edit'> Éditer</i> </a> \
    <a  id=niveau"+key+" onclick=\"ajout_rep('" + key + "',"+obj[key].niveau+")\"><i  class='fa fa-folder-o'> Nouveau répertoire</i></a>\
    <a  onclick=\"ajout_art('" + key + "',"+obj[key].niveau+")\"><i class='fa fa-folder'> Nouvel article</i></a>\
    <a onclick=\"supprimer_element(0,'" + key + "');\"><i class='fa fa-times'> Supprimer</i></a>\
    <a onclick=\"supprimer_contenu('" + key + "');\"><i class='fa fa-trash'> Vider contenu</i></a>\
    </div></div><i id=up"+key+" onclick=moveup("+key+","+obj[key].id_parent+") class='fa fa-level-up'></i><ul  id='child" + key + "'></ul></li>");
         //si le niveau depasse le niveau max on cache la possibilité de rajouter un sous niveau
         if(obj[key].niveau==NIV_MAX)  
          $("#niveau"+key).hide();

        if(obj[key].position==1)
          $("#up"+key).hide();
        
    
          //gestion d'affichage gras/normal plus/moin enrouler/derouler
          style_arbo(obj[key],key);
          //tracage d'arbre recurcive 
          molinette_tracage_arbo(obj[key].fils);

      }

      else if(obj[key].estArticle)
      {
        $("#child" + obj[key].id_parent).append("<li id=" + key + ">\
        <span ondragend='organisation_position(); tracer_arbo();' draggable='true' ondragstart='drag(event,"+key+")' ondrop='drop(event,"+key+","+obj[key].niveau+")' class='select'><i id=icon"+key+">&nbsp;</i><span class='fa fa-folder'></span><span  id=gras"+key+" > " + obj[key].nom + "</span></span>\
        <div class='dropdown'><a  class='dropbtn'>&nbsp;&nbsp;&nbsp;<i class='fa fa-align-justify'></i>&nbsp;&nbsp;&nbsp;</a><div class='dropdown-content'><a  onclick=\"modifier_art('"+key+"')\"><i class='fa fa-edit'> Éditer</i> </a> \
        <a onclick=\"ajout_docs('" + key + "');\" > <i class='fa fa-paperclip'> Attacher les fichiers</i></a><a onclick=\"supprimer_element(0,'" + key + "'); \"><i class='fa fa-times'> Supprimer</i></a>\
        <a onclick=\"supprimer_contenu('" + key + "');\"><i class='fa fa-trash'> Vider contenu</i></a></div></div>\
        <i id=up"+key+" onclick=moveup("+key+","+obj[key].id_parent+") class='fa fa-level-up'></i><ul  id='child" + key + "'></ul></li>");
          
          if(obj[key].position==1)
          $("#up"+key).hide();

          style_arbo(obj[key],key);
          tracer_docs(obj[key].contenu,key);

      }
      

  }
}

function tracer_docs(contenu,idPere)
{ 
  for (key in contenu.docs)
  $("#child" + idPere).append("<li class='select' id="+key+"><a onclick=\"supprimer_docs('"+key+"')\"><i class='fa fa-times'></i></a>&nbsp; &nbsp;"+contenu.docs[key]+"</li> ");
      
  }


 function moveup(idfils,idPere,obj=null)
{ 

  if(obj==null) obj=jsonObj.fils;
    for (key in obj)
      {

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
function changer_idparent(up,down)
{
  for(key in up.fils)
  {
    up.fils[key].id_parent=down.id;
  }
  for(key in down.fils)
  {
    down.fils[key].id_parent=up.id;
  }
}

function moveup1(idfils,obj,upkey)
{var upkey=0;
  for(key in obj)
  {
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


//supprimer tout le contenu d'un element selectionné dont le id est passé en argument [ tout en gardant l'element en question]
function   supprimer_contenu(id,obj=null)
  {
    if(obj==null) 
      obj=jsonObj.fils;

    for (indice in obj)
      { 
        if(indice==id && confirm($("#msg_js #msg_js_confirm_supprimer_contenu_de_cet_element").html()))
          { 
           obj[indice].fils={};
           obj[indice].contenu={};
           obj[indice].child=0;
           tracer_arbo();
           //console.log(jsonObj);
           return;
          }
          else if (!obj[indice].estArticle)
            supprimer_contenu(id, obj[indice].fils);          
      }
  }

//supprimer l'element dont le id est passé en argument, le contenu de cet element sera perdu ( un alert est affiché pour confirmer)
function   supprimer_element(child,id,obj=null)
  {
    if(obj==null) 
      obj=jsonObj.fils;
    for (indice in obj)
      {
        if(indice==id )//&& confirm('Attention ! cet élément peut contenir des données, êtes-vous sûr de vouloir supprimer  ?'))
          { 
            delete obj[indice];
            child.child--;
            tracer_arbo();
            return;
          }
        else if (!obj[indice].estArticle)
            supprimer_element(obj[indice],id, obj[indice].fils);           
    }


  }

//supprimer le docment dont l'id est en argument, quoi que ce soit son emplacement (apres confirmation par alert)
function   supprimer_docs(id,obj=null)
  {
    if(obj==null) 
      obj=jsonObj.fils;
    for (indice in obj)
      {
        if(obj[indice].estArticle)
          { 
            for(key in obj[indice].contenu.docs)
              {
                if(key==id && confirm('Attention ! cet élément ne sera plus récuperable, êtes-vous sûr de vouloir supprimer  ?'))
                  {
                    delete obj[indice].contenu.docs[key] ;
                    delete obj[indice].child--;
                    tracer_arbo(); 
                    return;
                  }
              }
          }
        else
          {
            supprimer_docs(id, obj[indice].fils);
          }          
    }
  }

//modifier l'objet (article) id par les informations de newobj sans toucher les fils et le contenu
function modifier(id,newobj,obj=null)
{
  if (obj==null) 
    obj=jsonObj.fils;
  for (indice in obj)
      {
        if(indice==id)
          { 
          // affectation des nvl info article

            obj[indice].nom_ter= newobj.nom_ter;
            obj[indice].communicable= newobj.communicable;
            obj[indice].remarquable= newobj.remarquable;
            obj[indice].personnes= newobj.personnes;
            obj[indice].description_ter= newobj.description_ter;
           // console.log(jsonObj);
           return; 
          }
        else if (!obj[indice].estArticle)
            modifier(id, newobj,obj[indice].fils);           
    }
}
function show_button_modal(name)
{
  $("#okupdaterep").hide();
  $("#oknvxrep").hide();
  $("#oknvxter").hide();
  $("#okupdateter").hide();
  $("#titre_nvx_rep").hide();
  $("#titre_update_rep").hide();
  $("#titre_nvx_ter").hide();
  $("#titre_update_ter").hide();
  //viderModal();

  if(name=="okupdaterep")
  {
    $("#okupdaterep").show();
    $("#titre_update_rep").show();
  }

  if(name=="oknvxrep")
  {
    $("#oknvxrep").show();
    $("#titre_nvx_rep").show();
    viderModal();
  }

  if(name=="oknvxter")
  {
   $("#oknvxter").show();
   $("#titre_nvx_ter").show();
   viderModal();
  }

  if(name=="okupdateter")
  {
   $("#okupdateter").show();
   $("#titre_update_ter").show();
  }
}
function remplir_modal(type,obj)
{
  if(type=="rep")
  { 

    $("#rep1").val(obj.nom);
    $("#desc1").val(obj.description_rep);
    show_button_modal("okupdaterep");
    $("#callnvxrep").click();
  }
  if(type=="ter") 
  {
            
            $("#person").val(obj.personnes);
            $("#trep1").val(obj.nom);
            $("#descter").val(obj.description_ter);
            //document.querySelector('input[name="diffusion"]:checked').value=obj.communicable; 
            $("#"+obj.communicable).click();
            document.getElementById("remarquable").checked = obj.remarquable; 


    show_button_modal("okupdateter");
    $("#callnvxter").click();
  }
}

function descriptiongenerale() 
{
  if (!$("#commanditaire1").val() || !$("#start").val() || !$("#descgen").val() || !$("#end").val())
      {$("#errordesc").show();
   }

  else {
      $("#errordesc").hide();
      $("#hidedesc").click();
      $("#home").text($("#nomprojet").val());
      $("#gras1").text($("#nomprojet").val());
      $("#sauvegarder").prop('disabled', false);
      //$("#1").show();
      creer_reportage()
  }

}


//restrict special chars
$('.restrict').keyup(function () {
   this.value = this.value.replace(/[&\/\\#,+()@^$~%. '":*?<>{}]/g,'_');
});







function hideshow(enrouler) 
{  tracer_arbo();
      if($("#child1").is(':empty')) 
        {
          $("#gras1").css("font-weight","normal");
          $("#icon1").attr('class', '');
          $("#icon1").attr('onclick','');
          $("#child1").show();
        }
        else 
        {
          if(enrouler)
          {
            $("#gras1").css("font-weight","bold");
            $("#icon1").attr('class', 'fa fa-plus');
            $("#icon1").attr('onclick',"hideshow(false)");
            $("#child1").hide();
          }
          if(!enrouler)
          {
            $("#gras1").css("font-weight","normal");
            $("#icon1").attr('class', 'fa fa-minus');
            $("#icon1").attr('onclick',"hideshow(true)");
            $("#child1").show();


          }
        }

}


 



function associer(n) {

  $("#child" + n).append($("#fichiers").html());
  plusmoins(n);
  $("#fichiers").empty();

}

function plusmoins(i)
{
  
  if(!$("#child"+i).is(':empty'))
  { 
    $("#ico"+i).attr('class', 'fa fa-minus');
    $("#child"+i).show();
  }
  else 
    $("#ico"+i).attr('class', 'h');

}

function rmfolder(f) {
  if (confirm('Attention ! êtes-vous sûr de vouloir supprimer cet élément ?'))
      {
       
        var n=$("#" + f).parent().parent().attr('id');
        $("#" + f).remove();
         plusmoins(n);
        
      }
}


function viderModal() {
  $("#rep1").val("");
  $("#desc1").val("");
  $("#trep1").val("");
  $("#tdesc1").val("");
  $("#person").val("");
  $("#descter").val("");
  $("#errorter").hide();;
}



$("#charger").click(function() {
  
  var version=$("#historique").val();
  jsonObj=JSON.parse(localStorage.getItem(version));
  $("#commanditaire1").val(jsonObj.commanditaire_report);
  $("#start").val(jsonObj.periode_debut_report);
  $("#end").val(jsonObj.periode_fin_report);
  $("#descgen").val(jsonObj.description_report);
  $("#nomprojet").val(jsonObj.nom_projet);
  $("#gras1").text(jsonObj.nom_projet);
  $("#sauvegarder").prop('disabled', false);

  tracer_arbo();
  hideshow(false);
  
});

$("#sauvegarder").click(function() {
  var date = new Date();
  localStorage.setItem($("#gras1").text()+ formatDate(date),JSON.stringify(jsonObj)); 
  $('#historique').empty().append('');
  fillhistorique();
});

function formatDate(value)
{
   return "-"+(value.getYear()+1900) + "/" +("0" + value.getDate()).slice(-2)  + "/" + ("0"+(value.getMonth()+1)).slice(-2) + "/" +("0" + value.getHours()).slice(-2);
}

function fillhistorique()
{


for ( var i = 0, len = localStorage.length; i < len; ++i ) 
   
    $("#historique").append("<option value="+localStorage.key( i )+" > "+localStorage.key( i )+"</option" );

}

function rmhistorique()
{ 
  localStorage.removeItem($("#historique").val());
  $("#historique option:selected").remove();
}

function hideall() {
  $('.fa-minus').attr('class', 'fa fa-plus');
  $(".dev").hide();
  $("#icon1").attr('onclick','hideshow(false)');
  $(".gras").attr('style', 'font-Weight:bold')
}

function showall() {
  $('.fa-plus').attr('class', 'fa fa-minus');
  $(".dev").show();
  $("#icon1").attr('onclick','hideshow(true)');
  $(".gras").attr('style', 'font-Weight:normal')
}


function toast(a="test",b="test"){

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
var blob = new Blob([json], {type: "application/json"});
var url  = URL.createObjectURL(blob);

var a = document.createElement('a');
a.download    = "backup.json";
a.href        = url;
a.textContent = "Download backup.json";


}





$(document).ready(function() {


        fillhistorique();


  $('.i-checks').iCheck({
      checkboxClass: 'icheckbox_square-green',
      radioClass: 'iradio_square-green',
  });


  $('#date1 .input-daterange').datepicker({
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


})
