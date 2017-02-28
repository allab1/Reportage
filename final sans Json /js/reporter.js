$( window ).load(function() {
  fillhistorique();
    //do whatever you want to do with localstorage
});

function validArticle() {


  if ($("#trep1").val() == "") {
      $("#errorter").show();
  } else {

      $("#okmodal2").click();
      //recuperation data

      var diffusion = document.querySelector('input[name="diffusion"]:checked').value;
      var bx = $('#remarquable').is(":checked")
      var person = $("#person").val();
      var rep = $("#trep1").val();
      var fr = $("#descter").val();


  }
}

//restrict special chars
$('input').keyup(function () {
    if (!this.value.match(/^[a-zA-Z0-9-()]+$/)) {
        this.value = this.value.slice(0, -1)+"-";
    }
});



function descriptiongenerale() {
  if (!$("#commanditaire1").val() || !$("#start").val() || !$("#descgen").val() || !$("#end").val())
      {$("#errordesc").show();

 
   }

  else {
      $("#errordesc").hide();
      $("#clickdesc").click();
      $("#home").text($("#nomprojet").val());
      $("#1").show();
  }

}



function hideshow(n, th) {
      if($("#child"+n).is(':empty')) return;
  $("#child" + n).toggle();

  if ($("#child" + n).is(':visible')) {
      $(th).children("i").attr('class', 'fa fa-minus');
      $(th).attr('style', '');



  } else {
      $(th).children("i").attr('class', 'fa fa-plus');
      $(th).attr('style', 'font-Weight:bold');

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
  
  if(("#historique").val()!="")
  {
  var d=$("#historique").val();
  $("#d").text("");
  $("#d").append(localStorage.getItem(d));
  }
});

$("#sauvegarder").click(function() {
  // $("#historique").epmty();
  var date = new Date();

  localStorage.setItem($("#home").text()+ formatDate(date), $("#d").html()); 
  $('#historique').empty().append('');
  fillhistorique();
  //$("#historique").append("<option value="+$("#home").text()+" > "+$("#home").text()+"" );

});

function formatDate(value)
{
   return "-"+value.getDate() + "/" + value.getMonth()+1 + "/" + (value.getYear()+1900);
}

function fillhistorique()
{

// for ( var i = 0, len = localStorage.length; i < len; ++i ) {
//   var item= localStorage.key( i )  ;
//   $("#historique").append("<option value="+item+" > "+item+"</option" );
// }

for (var key in localStorage){
  if(['key', 'getItem', 'setItem', 'clear', 'removeItem', 'length', 'uuid'].indexOf(key)>-1) return;
   $("#historique").append("<option value="+key+" > "+key+"</option" );
  }

}

function rmhistorique()
{ 
  localStorage.removeItem($("#historique").val());
  $("#historique option:selected").remove();
}

function hideall() {
  $('.fa-minus').attr('class', 'fa fa-plus');
  $(".dev").hide();
  $(".gras").attr('style', 'font-Weight:bold')
}

function showall() {
  $('.fa-plus').attr('class', 'fa fa-minus');
  $(".dev").show();
  $(".gras").attr('style', 'font-Weight: ')
}


$("#okmodal1").click(function() {

  var i = $("#v1").val(); //document.getElementById("v1").value;
  var f = $("#v2").val(); //document.getElementById("v2").value;
  var fold = $("#rep1").val(); // var desc=$("#desc1").val();


  if (fold == null || fold == "") return;
  var un = parseInt(new Date().getTime());
  i++;
  var unn = un + 1;

  $("#child" + f).append("<ul  align='left' id=" + un + "><li> \
<span class='gras' onclick='hideshow(" + un + ",this)'><i id=ico"+un+">&nbsp;</i><span class='fa fa-folder-o'></span> " + fold + "</span> \
<div class='dropdown'><a class='dropbtn'>&nbsp;&nbsp;&nbsp;<i class='fa fa-align-justify'></i>&nbsp;&nbsp;&nbsp;</a>\
<div class='dropdown-content'> \
<a  onclick=''><i class='fa fa-edit'>&nbsp; Éditer</i> </a> \
<a id=" + unn + " onclick=\"addfolder(" + i + ",'" + un + "')\"><i  class='fa fa-folder-o'> Nouveau répertoire</i></a>\
<a  onclick=\"addfolder(3,'" + un + "')\"><i class='fa fa-folder'>&nbsp; Nouvel article</i></a>\
<a onclick=\"rmfolder('" + un + "')\"><i class='fa fa-times'>&nbsp; Supprimer</i></a>\
</div></div></li><div class='dev' id='child" + un + "'></div></ul>");
  if (i == 3) $("#" + unn).hide();
  plusmoins(f);



});


$("#okmodal2").click(function() {

  var i = $("#v1").val(); //document.getElementById("v1").value;
  var f = $("#v2").val(); //document.getElementById("v2").value;
  var fold = $("#trep1").val(); //var desc=$("#tdesc1").val(); 

  //recuperation de data

  var un = parseInt(new Date().getTime());

  $("#child" + f).append("<ul id=" + un + "><li>\
<span class='gras' onclick='hideshow(" + un + ",this)'><i id=ico"+un+" >&nbsp;</i><span class='fa fa-folder'></span> " + fold + "</span>\
<div class='dropdown'><a  class='dropbtn'>&nbsp;&nbsp;&nbsp;<i class='fa fa-align-justify'></i>&nbsp;&nbsp;&nbsp;</a><div class='dropdown-content'><a  onclick=''><i class='fa fa-edit'>&nbsp; Éditer</i> </a> \
<a onclick='associer(" + un + ")' > <i class='fa fa-paperclip'>Attacher les fichiers</i></a><a onclick=\"rmfolder('" + un + "')\"><i class='fa fa-times'>Supprimer</i></a></div></div>\
</li><div class='dev' id='child" + un + "'></ul>");
  plusmoins(f);

});



function addfolder(i, f) {
  viderModal();
  //alert(seconds);
  if (i == 1 || i == 2) $("#callmodal").click();
  if (i == 3) {
      $("#callnvxter").click();

  }

  document.getElementById("v1").value = i;
  document.getElementById("v2").value = f;
}

$(document).ready(function() {

 
  
  //         $(window).unload(sauvegarder);

  // document.documentElement.innerHTML=localStorage.page ;

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