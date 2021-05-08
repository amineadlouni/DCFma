var monPanier= new Array();

function chargerArticles()
 {
	 //Récupérer l'élément <section> ayant id = "content";
	 var articles=document.getElementById("content");
	 // On parcoure le tableau catalogue qui stocke les articles;
	 for(var i = 0; i <catalogue.length;i++)
	 {
		 //Créez un élément de type div;
		 var article=document.createElement("div");
		 //Associez à l'élément "article" la classe de style "article";
		 article.setAttribute("class","article");
		 // Pour associer à chaque article un identifiant différent , nous allons construire cet identifiant en
		 //concaténant la position de l'article dans le tableau catalogue avec le mot "article".
		 article.id = i + "-article";
		 /**********Affichage du nom de l'article *****************/
		 //Créez un élément de type h2 ;
		 var articleNom =document.createElement("h2");
		 //Associez à l'élément articleNom la classe nom_art;
		 articleNom.setAttribute("class","nom_art");
		 //À l'aide de innerText précisez le contenu texte de l'élément articleNom ( Il doit afficher le
		 //nom de l'article);
		 articleNom.innerText=catalogue[i].nom;
		 //Insérez articleNom comme enfant de l'élément article;
		 article.appendChild(articleNom);
		 /**********Affichage de la photo de l'article *****************/
		 //Créez un élément de type img;
		 var articleImg=document.createElement("img");
		 //Associez à l' élément articleImg la classe img_art;
		 articleImg.setAttribute("class","img_art");
		 //À l'aide de setAttribute, on précise la source de l'image que doit afficher articleImg;
		 articleImg.setAttribute("src",catalogue[i].image);
		 //Insérez articleImg comme enfant de l'élément article;
		 article.appendChild(articleImg);
		 /********Affichage de la description de l'article **********/
		 //Créez un élément de type div;
		 var articleDesc =document.createElement("div");
		 //Associez à l' élément articleDesc la classe desc_art;
		 articleDesc.setAttribute("class","desc_art");
		 //Précisez à l'aide de innerText le contenu texte de l'élément articleDesc ( Il doit afficher la
		 //description de l'article);
		 articleDesc.innerText=catalogue[i].desc;
		 //Insérez articleDesc comme enfant de l'élément article;
		 article.appendChild(articleDesc);
		 /**********Affichage du prix de l'article *****************/
		 //Créez un élément de type div;
		 var articlePrix = document.createElement("div");
		 //Associez à l' élément articlePrix la classe prix_art;
		 articlePrix.setAttribute("class","prix_art");
		 //Précisez à l'aide de innerText le content texte de l'élément articlePrix ( Il doit afficher le prix de
		 //l'article) ;
		 articlePrix.innerText=catalogue[i].prix+"Dh";
		 //Insérez articlePrix comme enfant de l'élément article;
		 article.appendChild(articlePrix);
		 /**********Affichage de la zone de commande *****************/
		 //Créez un élément de type div et associez-lui la classe de style "cmd_art";
		var zoneCmd = document.createElement("div");
		//Créez un élément de type div et associez-lui la classe de style "cmd_art";
		zoneCmd.setAttribute("class","cmd_art");
		//Créez un élément <input> et associez-lui la classe de style input_art;
		var inputCmd = document.createElement("input");
		inputCmd.setAttribute("class","input_art");
		// On associe un id à chaque élément input
		inputCmd.id= i +"-qte";
		// l'élément inputCmd est de type number
		inputCmd.type ="number";
		 // Par défaut la quantité affichée est égale à 0
		inputCmd.value = 0;
		 // La quantité doit être comprise entre 0 et 5
		inputCmd.min = 0 ;
		inputCmd.max = 5 ;
		//Insérez inputCmd comme enfant de l'élément zoneCmd;
		zoneCmd.appendChild(inputCmd);
		//Créez un élément de type "button" et associez-lui la classe de style " btn_art " ;
		var bouton =document.createElement("button");
		bouton.setAttribute("class","btn_art");
		//On associe un id au bouton
		bouton.id = i+"-cmd";
		
		bouton.onclick = function() {
		 // On récupère la valeur de l'id du bouton de commande
		 var item = this.getAttribute("id");
		 // On récupère la position de l'article dans le catalogue
		 var pos = item.substring(0,1) ;
		 // On ajoute cet article au panier
		 ajouterAuPanier(pos); 
		 }
		 //Insérez l'élément bouton comme enfant de l'élément zone;
		zoneCmd.appendChild(bouton);
		//Insérez l'élément zoneCmd comme enfant de l'élément article;
		article.appendChild(zoneCmd);
		// Et enfin on insère "article" comme enfant de l'élément "articles";
		articles.appendChild(article);

     }

 }
 function searchDansPanier(nom)
{
		/* Etapes à suivre :
	 On parcoure le tableau monPanier
	 On compare le nom de chaque article stocké dans le
	tableau avec la variable nom
	 Si on le trouve on retourne true sinon false
	 */ 
  for(var i=0;i<monPanier.length;i++)
  {
	  if(monPanier[i].nom==nom)
		  return true;
	  return false;
	  
  }
}
function ajouterAuPanier(pos) 
{
	// A l'aide de searchDansPanier, on vérifie si l'article existe déjà dans le panier
	if (searchDansPanier(catalogue[pos].nom)) 
		alert("L'article se trouve déjà dans le panier");
	else
		{
			// On récupère l'id de la zone quantité associée à l'article qu'on veut commander
			var ident = pos +"-qte";
			var qte =document.getElementById(ident).value;
			if(qte<=0)
				alert("choisissez une quantité > 0");
			else if(qte>0) 
			{
				// On crée un objet pour y stocker le nom, le prix et la quantité de l'article commandé
				var articleCmd = {}; // creation d'un objet vide
				 // On stocke le nom de l'article qui se trouve à la position pos dans le tableau catalogue.
				articleCmd.nom = catalogue[pos].nom;
				// Stockez le prix de l'article qui se trouve à la position pos
				articleCmd.prix =catalogue[pos].prix;
				// Stockez la quantité saisie
				articleCmd.qte = qte;
				// On calcule et on stocke le prix Hors Taxe
				articleCmd.prixHt = articleCmd.prix * articleCmd.qte;
				monPanier.push(articleCmd);
				// à l'aide d'un alert affichez au client les informations de l'article commandé
				alert("Nom:"+articleCmd.nom+"PrixHT:"+articleCmd.prixHt+"Dh"+"Quantite:"+articleCmd.qte);
		    }
		}
}

function stockerPanier(data)
{
	var panierJSON = {}; // On crée un objet vide
	// On met dans cet objet le tableau qu'on veut stocker
	panierJSON.monpanier = data;
	// On stocke en local à l'aide de l'objet localStorage et la méthode
	//JSON.stringify
	localStorage.setItem("panierLocalStorage", JSON.stringify(panierJSON));
}
