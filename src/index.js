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
            let choixConsultation;
            do{
                console.log("\n ========= SOUS-MENU  CONSULTATION  ==========")
                console.log("1.Consulter par identifier  ")
                console.log("2. Consulter par nom")
                console.log("0. Retour au menu principale")
                 choixConsultation=prompt("Votre choix : ")

                 switch(choixConsultation){
                  case "1":
             let e = prompt("Entrer ID : ");
           let resultatID = rechercherApprenant(a);
          console.log(resultatID);
          break;

          case "2":
          let z = prompt("Entrer le nom : ");
         let resultatNom = rechercherApprenant(z);
         console.log(resultatNom);
          break;

                 }
            }while(choixConsultation!=="0")
           break
        case "5":
            let choixResultat
            do{
                console.log("\n============ SOUS-MENU RESULTATS ===============")
                console.log("1. Ajouter/Modifier un resultat")
                console.log("0. Retour au menu principale")

            } while( choixResultat!=="0")


            }

} while (choix !== "0");

