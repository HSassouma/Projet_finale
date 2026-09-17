const prompt = require("prompt-sync")();
const apprenants = require("./Data");
const {
    ajouterApprenant,
    enregistrerResultat,
    rechercherApprenant,
    calculerProgression,
    afficherApprenants,
    afficherTableauDeBord
} = require("./fonctions");

let choix;

do {
console.log("\n====== MENU PRINCIPAL ======");

    console.log("1. Afficher le tableau de bord");
    console.log("2. Afficher la liste des apprenants");
    console.log("3. Ajouter un apprenant");
    console.log("4. Consulter un apprenant");
    console.log("5. Gérer les résultats");
    console.log("6. Rechercher un apprenant");
    console.log("7. Filtrer les apprenants par niveau");
    console.log("8. Trier les apprenants");
    console.log("0. Quitter");

    choix = prompt("Votre choix : ");
    switch(choix){
        case "0":
            break
        case "1":
            afficherTableauDeBord(apprenants)
           break 

       case "2":
           afficherApprenants(apprenants)
           break 
       case "3":
           let a = prompt("Entrer le nom : ");
           let b = prompt("Entrer la ville : ");
           ajouterApprenant(a,b);
           console.log("Apprenant ajouté avec succès !");
            break;
        case "4":
            

}

} while (choix !== "0");

