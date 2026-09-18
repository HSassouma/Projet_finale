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
    console.log("5. Rechercher un apprenant par nom");
    console.log("6. Ajouter ou modifier un résultat");
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
            let nomRecherche = prompt("Entrer le nom : ");

            let resultatNom = rechercherApprenant(nomRecherche);

            if (resultatNom.length === 0) {
                console.log("Aucun apprenant trouvé avec ce nom.");
            } else {
                console.log(resultatNom);
            }

            break;
        
       case "6":

    let id;

    do {
        id = Number(prompt("Entrer l'identifiant : "));

        let apprenantExiste = apprenants.find(function(apprenant) {
            return apprenant.id === id;
        });

        if (apprenantExiste === undefined) {
            console.log("Erreur : apprenant introuvable.");
        }

    } while (
        apprenants.find(function(apprenant) {
            return apprenant.id === id;
        }) === undefined
    );


    let jour;

    do {
        jour = Number(prompt("Entrer le numéro de journée (1-7) : "));

        if (!Number.isInteger(jour) || jour < 1 || jour > 7) {
            console.log("Erreur : la journée doit être comprise entre 1 et 7.");
        }

    } while (!Number.isInteger(jour) || jour < 1 || jour > 7);


    let exercicesProposes;

    do {
        exercicesProposes = Number(
            prompt("Entrer le nombre d'exercices proposés : ")
        );

        if (!Number.isInteger(exercicesProposes) || exercicesProposes < 0) {
            console.log("Erreur : entrez un nombre entier positif ou égal à 0.");
        }

    } while (
        !Number.isInteger(exercicesProposes) ||
        exercicesProposes < 0
    );


    let exercicesTermines;

    do {
        exercicesTermines = Number(
            prompt("Entrer le nombre d'exercices terminés : ")
        );

        if (
            !Number.isInteger(exercicesTermines) ||
            exercicesTermines < 0 ||
            exercicesTermines > exercicesProposes
        ) {
            console.log(
                "Erreur : le nombre terminé doit être entre 0 et le nombre proposé."
            );
        }

    } while (
        !Number.isInteger(exercicesTermines) ||
        exercicesTermines < 0 ||
        exercicesTermines > exercicesProposes
    );


    let challenge;

    do {
        challenge = prompt(
            "Challenge terminé ? (oui/non) : "
        ).toLowerCase();

        if (challenge !== "oui" && challenge !== "non") {
            console.log("Erreur : répondez uniquement par oui ou non.");
        }

    } while (challenge !== "oui" && challenge !== "non");


    let challengeTermine = challenge === "oui";


    let resultat = enregistrerResultat(
        id,
        jour,
        exercicesProposes,
        exercicesTermines,
        challengeTermine
    );

    if (resultat) {
        console.log("Résultat enregistré avec succès !");
    } else {
        console.log("Erreur lors de l'enregistrement.");
    }

    break;

        default:
            console.log("Choix invalide !");
    }

} while (choix !== "0");