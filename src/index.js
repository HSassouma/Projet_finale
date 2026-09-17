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
    console.log("4. Consulter un apprenant par identifiant");
    console.log("5. Ajouter ou modifier un résultat");
    console.log("6. Rechercher un apprenant par nom");
    console.log("7. Filtrer les apprenants par niveau");
    console.log("8. Trier les apprenants");
    console.log("0. Quitter");

    choix = prompt("Votre choix : ");

    switch (choix) {

        case "0":
            console.log("Au revoir !");
            break;

        case "1":
            afficherTableauDeBord(apprenants);
            break;

        case "2":
            afficherApprenants(apprenants);
            break;

        case "3":
            let a = prompt("Entrer le nom : ");
            let b = prompt("Entrer la ville : ");

            ajouterApprenant(a, b);

            console.log("Apprenant ajouté avec succès !");
            break;

        case "4":
            let idConsultation = prompt("Entrer l'identifiant : ");

            let resultatID = rechercherApprenant(idConsultation);

            if (resultatID.length === 0) {
                console.log("Aucun apprenant trouvé avec cet identifiant.");
            } else {
                console.log(resultatID);
            }

            break;

        case "5":
            let id = prompt("Entrer l'identifiant : ");
            let jour = prompt("Entrer le numéro de journée (1-7) : ");
            let exercicesProposes = prompt(
                "Entrer le nombre d'exercices proposés : "
            );
            let exercicesTermines = prompt(
                "Entrer le nombre d'exercices terminés : "
            );
            let challenge = prompt(
                "Challenge terminé ? (oui/non) : "
            );

            let resultat = enregistrerResultat(
                id,
                jour,
                exercicesProposes,
                exercicesTermines,
                challenge
            );

            if (resultat) {
                console.log("Résultat enregistré avec succès !");
            } else {
                console.log("Erreur lors de l'enregistrement.");
            }

            break;

        case "6":
            let nomRecherche = prompt("Entrer le nom : ");

            let resultatNom = rechercherApprenant(nomRecherche);

            if (resultatNom.length === 0) {
                console.log("Aucun apprenant trouvé avec ce nom.");
            } else {
                console.log(resultatNom);
            }

            break;

        default:
            console.log("Choix invalide !");
    }

} while (choix !== "0");