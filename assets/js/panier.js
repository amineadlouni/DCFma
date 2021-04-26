var tabPanier = new Array();

function chargerPanier() {
    // On récupère l'objet stocké en local
    panierLocal = JSON.parse(localStorage.getItem("panierLocalStorage"));
    // On récupère le panier stocké dans cet objet qu'on stocke ensuite dans tabPanier
    tabPanier = panierLocal.monpanier;
    totalHt = 0; // cette variable servira à stocker le montant HT de la commande
    var monTableau = document.getElementById("panier");
    // On parcoure le tableau tabPanier qui stocke les articles du panier
    for (var i = 0; i < tabPanier.length; i++) {
        //Créez un élément de type " tr" (ligne d'un tableau)
        var ligne = document.createElement("tr");
        // Associez à cet élément l'id ci-dessous
        ligne.id = i + "ligne";
        // Créez un élément de type " td" ( cellule d'une ligne)
        var cellule1 = document.createElement("td");
        // Créez un élément de type " img" ( image)
        var imgElem = document.createElement("img");
        // Associez à l'attribut "src" de cette image la valeur " ../images/poub.jpg";
        imgElem.setAttribute("src", "../images/poub.jpg");
        // Associez à l' image la classe de style "imgpoubelle"
        imgElem.className = "imgpoubelle";
        // Associez à l'image l'id ci-dessous
        imgElem.id = i + "supp";
        /* on associe à l'image le gestionnaire d'évènement onclick, ainsi le client aura la possibilité de
        supprimer du panier les articles qu'il ne désire plus acheter */
        imgElem.onclick = function() {
                // Demander la confirmation du client pour être sûr qu'il veut bien retirer l'article du panier
                var reponse = confirm("Voulez-vous retirer l'article du panier?");
                if (reponse == true) {
                    // Avec getAttribute, récupérer la valeur de l'attribut id
                    var item = this.getAttribute("id");
                    var pos = item.substring(0, 1, 1);
                    supprimerDuPanier(pos);
                }
                // Insérez imgElem comme enfant de l'élément cellule1
                cellule1.appendChild(imgElem);
                // Insérez cellule1 comme enfant de l'élément ligne
                ligne.appendChild(cellule1);
            }
            /* Nous allons maintenans créer les autres cellules nécessaires pour l'affichage des informations
            des articles du panier (nom,prix,quantité, prixHT) */
            // on parcoure le panier
        for (var prop1 in tabPanier[i]) {
            // Créez un élément de type " td"
            var cellule2 = document.createElement("td");
            // Précisez le texte de l'élément cellule2
            cellule2.innerText = tabPanier[i][prop1];
            // Insérez cellule2 comme enfant de l'élément ligne
            ligne.appendChild(cellule2);
        }
        /* On calcule maintenant le montant HT de la commande */
        totalHt = totalHt + tabPanier[i].prixHt;
        //Insérez ligne comme enfant de l'élément monTableau
        monTableau.appendChild(ligne);
    }
    /* On affiche maintenant le montant HT de la commande dans un paragraphe qu'on va insérer
    comme enfant de l'élément <div id="montant" >. Cet élément se trouve déja dans la page
    "panier.html" */
    //Créez un élément de type "p"
    total = document.createElement("p");
    //Associez à cet élément l'id "totalht"
    total.id = "totalht";
    //Associez à cet élément la classe de style "total"
    total.setAttribute("class", "total");
    //Précisez le contenu texte de l'élément total
    total.innerText = "Total :" + totalHt + "Dh";
    //Insérez total comme enfant de l'élément ayant id="montant"
    document.getElementById("montant").appendChild(total);
}

function supprimerDuPanier(pos) {
    // On recalcule la montant HT de la commande
    totalHt = totalHt - tabPanier[pos].prixHt;
    // Récupérer l'élément ayant id = " totalht "
    var total = document.getElementById("totalht");
    //En utilisant la méthode splice, supprimez du tableau "monPanier" l'élément de position pos
    monPanier.splice(pos, 1);
    // On récupère la ligne qu'on veut supprimer
    var maLigne = document.getElementById(pos + "ligne");
    // A l'aide de removeChild, supprimer l'élément "maLigne" de son parent "tableau"
    tabPanier.removeChild(maLigne);
    //Précisez le contenu texte de l'élément total
    total.innerText = "Total :" + totalHt + "Dh";
    // On réinitialise le panier
    panier.monPanier = tabPanier;
    // On écrase le panier stocké en local
    localStorage.setItem("panierLocalStorage", JSON.stringify(panier));
    // On recharge la page pour que les modifications soient prises en compte
    window.location.reload();
}