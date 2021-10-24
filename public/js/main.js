// Personnage
class Personne {
    constructor(nom,lieu,argent){
        this.nom = nom;
        this.lieu = lieu;
        this.argent = argent;
        this.mainDroite = [];
        this.mainGauche = [];
    };
    // Method Déplacement
    seDeplacer(depart, arrivee) {
        arrivee.personnes.push(this.nom);
        depart.personnes.splice(depart.personnes.indexOf(this), 1);
    };
// ----------------------------------------------------------
    // PayeArticle
    payerArticle(ingredient){
        if (this.argent == 0) {
            console.log("tu n'as pas asser d'argent pour acheter ceux ci.");
        }else{
            this.argent = this.argent - ingredient.prix;
        }
    };
    // -------------
    // Couper
    couper(){
        epicerie.ingredient.etat = "coupé";
    };
// ----------------------------------------------------------
};
class Ingredients {
    constructor (nom, etat, prix) {
        this.nom = nom
        this.etat = etat
        this.prix = prix
    };
};

let oignon = new Ingredients ("Oignon", "coupé", 1);
let oeuf = new Ingredients ("Oeuf", "entier", 5);
let epice = new Ingredients ("Epice", "moulu", 10);
let fromage = new Ingredients ("Fromage", "entier", 5);
// ----------------------------------------------------------
let personnes = new Personne("Jonathan","maison",100);
// Lieu 
let maison = {
    nom : "maison",
    personnes : [],
};
let epicerie = {
    nom: "Epicerie",
    personnes: [],
    paniers: [{
        type: "panier",
        contenu: []
        }],
    ingredient : [oeuf, oignon, epice, fromage],
};
personnes.mainDroite.push(epicerie.paniers[0]);
// ----------------------------------------------------------
// Poêle / cuit
let poêle = {
    contenu :[],
    cuir(){
        setTimeout(()=> {
        this.contenu[0].etat = "cuit";
        alert("L'omelette est prête , bonne appétit !!!");
        }, 4000)
    },
};
// ----------------------------------------------------------
// Bol
let bol = {
    contenu : [],
    melanger(nomMelange) {
    let newMelange = {
        nom : nomMelange,
        etat : "pas cuit"
    }
    this.contenu.splice(0,4, newMelange);
},
};
// ----------------------------------------------------------
// Outils coupé
let outils = {
    nom: "couteau",
    action: personnes.couper(),
};
// ----------------------------------------------------------
//                                                          DÉBUT DE L'OMELETTE

//Maison
personnes.seDeplacer(epicerie,maison);
console.log(`${maison.personnes} est actuellement à la ${maison.nom}.`);
//bouge a l'epicerie
personnes.seDeplacer(maison,epicerie);
console.log(`${epicerie.personnes} a bouger a l'${epicerie.nom}.`);
//paniers main Droite
personnes.mainDroite.push(epicerie.paniers);
console.log(`${personnes.nom} a pris un ${epicerie.paniers[0].type}.`);                                                    
//Ingredients 1 par 1
epicerie.ingredient.forEach(el => {
    personnes.mainDroite[0].contenu.push(el);
    console.log(`${personnes.nom} a pris un : ${el.nom}`);
});
//Paye article
personnes.mainDroite[0].contenu.forEach(el => {
    personnes.payerArticle(el);
    console.log(`${personnes.nom} achete un ${el.nom} au prix de : ${el.prix}€`);
});
//Solde du Compte
console.log(`le solde de votre compte : ${personnes.argent}€.`);
//Deplacement maison
personnes.seDeplacer(epicerie,maison);
console.log(`${maison.personnes} rentre à la ${maison.nom} pour cuisiner.`);
//Ingrédient dans le bol
personnes.mainDroite[0].contenu.forEach(el => {
    bol.contenu.push(el)
    console.log(`${el.nom} a été ajouté dans le bol`);  
});
//Vérifier que les ingrédients ne trouvent plus dans le panie     
personnes.mainDroite[0].contenu = [];
console.log(personnes.mainDroite[0].contenu);
//Bouge a l'épicerie
personnes.seDeplacer(maison,epicerie);
console.log(`${epicerie.personnes} est partie à l'${epicerie.nom} déposer le pannier.`);
console.log(`${personnes.nom} depose le panier.`);
personnes.mainDroite.pop();
personnes.mainDroite.pop();
console.log(personnes.mainDroite);
//Bouge a la maison
personnes.seDeplacer(epicerie,maison);
console.log(`${maison.personnes} est actuellement à la ${maison.nom}.`);
//petit Message
console.log("Doucement sur le projet Ayhan.");
//verif le contenu
bol.contenu.forEach(el => {
    if (el.etat == "entier") {
        personnes.couper(el);
        console.log(`${el.nom} a été découper`);
    }
});
//Melanger
bol.melanger('omelette');
console.log(`on a fini de mélanger`);
//push dans la poele et supprimer dans le bol 
console.log("on verse le bol dans la poêle");
poêle.contenu.push(bol.contenu[0]);
bol.contenu.splice(0,1);
console.log(`le bol est vide`);
//cuir
poêle.cuir();
console.log("L'omellete est entrain de cuir");

