	creer_nouveau_reportage(nom_reporter, nom_report, commanditaire_report, periode_debut_report, periode_fin_report, description_report);
	ajout_rep(id_parent, nom_rep, description_rep);                             //return id_rep créé
	ajout_art(id_parent, nom_rep, description_rep, communicabilite, personnes); //return id_rep créé
	ajout_docs(id_parent, liste_docs);                                          // tester si le parent est bien un article ; return liste id_docs créé
	supprimer_docs(id_parent, liste_id_docs);        
	edit_rep(id_rep, description_rep);                             //pas de retour
	edit_art(id_rep, description_rep, communicabilite, personnes); //pas de retour
	suppr_rep(id_rep);                                             //pas de retour
	suppr_art(id_rep);                                             //pas de retour
	edit_reportage(nom_reporter, nom_report, commanditaire_report, periode_debut_report, periode_fin_report, description_report);
	effacer_contenu()

jQuery.grep(TestObj, function(obj) {
    return obj.id === "A";
});


	-DETECTteur de modification pour la sauvegarde
	-implementation selected pour selectionner lelement qui viens detre rajouté 
	-liste de personnes dans le bref
-internationalisation

	-shifkey + mouseover = affichage dune bref modal
	-list des person desig tag
	-button autofocus on press enter
	-manque celle de la desc generale
	-changer le menu hover (onclick + effect qui garde le button allumé )

	- hover wait befor show            
	- avec un seul button enrouler toute larborescence / derouler toute larborescence 
	-la gestion dordre de chaque group delement, changer lordre de chaque element.. le metre en premier
	-nom de fichier avec espace pose un problem (peut etre l ID)
-sous mac os marche avec ( chrom - safari) 
-sous windows os marche avec ( chrome )
-internationalisaiton
	-avant de sauvegarder faut il exiger la creation dun projet en validant la description generale ? car a la recuperation on aura besoin de remplir ceci
	- à la sauvegarde du reportage : 
	- mise de l'objet JSON dans un élément de la page (DIV non affichée ou INPUT type="hidden") (avec sérialisation si nécessaire)

	- au rechargement du reportage :
	- si l'élément HTML dédié (DIV non affichée ou INPUT type="hidden") n'est pas vide, prendre son innerHTML pour reconstituer l'objet JSON
		 (avec désérialisation si nécessaire)
	- libellé "Nouveau Reportage" à changer par le nom du reportage quand on charge un autre reportage sauvegardé
	
	incrementer decrementer les nombres de fils dans chaque element json
	Datepicker marche sans problem

test champs ( .... espace vide ne doit pas rajouter un element)
	supprimer contenu de la racine
	rajout de doc ne doit pas ecraser les anciens
	gestion plus moin gras par le json
	srestrict doit modifier tout a zero
	appels aux modification
	modification du champ remarquable et le champ communicabilite lors de la edit
	editer un element en donnant le meme nom considere quil existe deja un element qui porte le meme nom
	arbo jusqua 3 niveau
	button effacer contenu 
	auto tracage arbre
	interdir doublon
	organisation des balises de larbo ul li
	- [BUG 1]la détection/remplacement des caractères interdits ne fonctionne pas pour un copier/coller. 
---------------------------------------
	- libellé "Nouveau Reportage" à changer par le nom du reportage 
	- quand il est saisi dans sa description + [Valider]
	- quand on charge un autre reportage sauvegardé
	parLacement du message (sans l'astérique, ou l'astérisque avant celui-ci) OK,
 	- boutons [Sauvegarder], [Recharger] et [Supprimer] inopérant


