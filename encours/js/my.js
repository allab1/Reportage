  function validArticle(){


      if($("#trep1").val()=="")  { $("#errorter").text("Nom d'article obligatoire"); }
      else  { 

        $("#okmodal2").click();
        //recuperation data

        var diffusion=document.querySelector('input[name="diffusion"]:checked').value;
        var bx=$('#remarquable').is(":checked")
        var person=$("#person").val();
        var rep=$("#trep1").val();
        var fr=$("#descter").val();


      }
    

  }


  function descriptiongenerale(){
    if(!$("#commanditaire1").val() || !$("#start").val() || !$("#descgen").val() || !$("#end").val())
     $("#errordesc").text("Il vous manque un champ *");

  


  else  {
    $("#errordesc").text(""); 
    
    $("#clickdesc").click();
    $("#home").text($("#nomprojet").val());
    //implementation recuperation de donnée  

  }

}


  // $( "#fr" ).keyup(function() {  descriptiongenerale(); });

  // $( "#en" ).keyup(function() {  descriptiongenerale();  });

  // $( "#es" ).keyup(function() { descriptiongenerale();   });

  // $( "#tfr" ).keyup(function() {  validArticle(); });

  // $( "#ten" ).keyup(function() {  validArticle();  });

  // $( "#tes" ).keyup(function() { validArticle();   });







  function associer(n){

    $("#"+n).append($("#fichiers").html());
    $("#fichiers").empty();

  }


  function rmfolder(f){
    if (confirm('Attention ! cet élément peut contenit d\'autres éléments , êtes-vous sûr ?'))
      $("#"+f).remove();
  }


  function viderModal(){
   $("#rep1").val(""); $("#desc1").val(""); 
   $("#trep1").val(""); $("#tdesc1").val("");
   $("#person").val(""); $("#tes").val("");
   $("#ten").val(""); $("#tfr").val("");
   $("#errordesc").text("");
   $("#errorter").text("");
 }


 $("#okmodal1").click(function()
 {

            var   i= $("#v1").val();//document.getElementById("v1").value;
            var   f= $("#v2").val();//document.getElementById("v2").value;
            var fold = $("#rep1").val(); // var desc=$("#desc1").val();
            

            if (fold==null || fold=="") return;
            var un = parseInt(new Date().getTime());
            i++;
            var unn=un+1;

            $("#"+f).append("<ul align='left' id="+un+"> \
              <div class='dropdown'><a class='dropbtn'>&nbsp;&nbsp;&nbsp;<i class='fa fa-align-justify'></i>&nbsp;&nbsp;&nbsp;</a>\
              <div class='dropdown-content'> \
              <a  onclick=''><i class='fa fa-edit'>&nbsp; Éditer</i> </a> \
              <a id="+unn+" onclick=\"addfolder("+i+",'"+un+"')\"><i  class='fa fa-folder-o'> Nouveau répertoire</i></a>\
              <a  onclick=\"addfolder(3,'"+un+"')\"><i class='fa fa-folder'>&nbsp; Nouvel article</i></a>\
              <a onclick=\"rmfolder('"+un+"')\"><i class='fa fa-times'>&nbsp; Supprimer</i></a>\
              </div></div><i class='fa fa-folder-o'></i> "+fold+"</ul>"); 
            if(i==3) $("#"+unn).hide();



          });


  $("#okmodal2").click(function()
  {       

            var   i= $("#v1").val();//document.getElementById("v1").value;
            var   f= $("#v2").val();//document.getElementById("v2").value;
            var fold = $("#trep1").val(); //var desc=$("#tdesc1").val(); 

            //recuperation de data

            var un = parseInt(new Date().getTime());

            $("#"+f).append("<ul id="+un+">\
              <div class='dropdown'><a  class='dropbtn'>&nbsp;&nbsp;&nbsp;<i class='fa fa-align-justify'></i>&nbsp;&nbsp;&nbsp;</a><div class='dropdown-content'><a  onclick=''><i class='fa fa-edit'>&nbsp; Éditer</i> </a> \
              <a onclick='associer("+un+")' > <i class='fa fa-paperclip'>Attacher les fichiers</i></a><a onclick=\"rmfolder('"+un+"')\"><i class='fa fa-times'>Supprimer</i></a></div></div>\
              <i class='fa fa-folder'></i> "+fold+" &nbsp;\ </ul>"); 

          });




  function addfolder(i,f){
    viderModal();
          //alert(seconds);
          if(i==1|| i==2) $("#callmodal").click();  
          if (i==3)  { $("#callnvxter").click();

        }

        document.getElementById("v1").value=i;
        document.getElementById("v2").value=f;
      }


      $(document).ready(function () {
        $('.i-checks').iCheck({
          checkboxClass: 'icheckbox_square-green',
          radioClass: 'iradio_square-green',
        });


        $('#date1 .input-daterange').datepicker({
          keyboardNavigation: false,
          forceParse: false,
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

                    this.element.querySelector("button[type=submit]").addEventListener("click", function(e) {
                      e.preventDefault();
                      e.stopPropagation();
                      myDropzone.processQueue();
                    });
                    this.on("sendingmultiple", function() {
                    });
                    this.on("successmultiple", function(files, response) {
                    });
                    this.on("errormultiple", function(files, response) {
                    });
                  }

                }


              });


  //ordre de priorité des langues
  var lang_priorite = ["en", "es", "fr"];

  $(document).ready(  function()
  {
    //--- traduction initiale (langue par défaut)
    //translate();  //--- fonctionnement par défaut (mode ="non_rempl_abs")
    //translate("priorite", lang_priorite);  
    //
    translate("trad_in_progress");  
  });

  //--- changement de langue
  $("select#lang").on('change', function() {  
    //translate();  //--- fonctionnement par défaut (mode ="non_rempl_abs")
    //translate("priorite", lang_priorite);  
    //
    translate("trad_in_progress");  
  })
