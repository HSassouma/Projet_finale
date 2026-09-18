const prompt = require("prompt-sync")();
const apprenants = require("./Data");

const {
  ajouterApprenant,
  enregistrerResultat,
  rechercherApprenant,
  calculerProgression,
  afficherApprenants,
  afficherTableauDeBord,
  trierAlphabetique,
  filtrerParNiveau,
  trierParProgression,
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

  choix = prompt("Votre choix : ").trim();

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
      let nom;

      do {
        nom = prompt("Entrer le nom : ").trim();

        if (nom === "") {
          console.log("Erreur : le nom ne peut pas être vide.");
        }
      } while (nom === "");

      let ville;

      do {
        ville = prompt("Entrer la ville : ").trim();

        if (ville === "") {
          console.log("Erreur : la ville ne peut pas être vide.");
        }
      } while (ville === "");

      let nouvelApprenant = ajouterApprenant(nom, ville);
      console.log(`Identifiant : ${nouvelApprenant.id}`);

      console.log("Apprenant ajouté avec succès !");
      break;

    case "4":
      let idConsultation;

      do {
        idConsultation = Number(prompt("Entrer l'identifiant : "));

        if (!Number.isInteger(idConsultation) || idConsultation <= 0) {
          console.log("Erreur : veuillez entrer un identifiant valide.");
        }
      } while (!Number.isInteger(idConsultation) || idConsultation <= 0);

      let resultatID = rechercherApprenant(idConsultation);

      if (resultatID.length === 0) {
        console.log("Aucun apprenant trouvé avec cet identifiant.");
      } else {
        for (let apprenant of resultatID) {
          console.log("\n===== APPRENANT TROUVÉ =====");
          console.log(`ID : ${apprenant.id}`);
          console.log(`Nom : ${apprenant.nomComplet}`);
          console.log(`Ville : ${apprenant.ville}`);
        }
      }

      break;

    case "5":
      let nomRecherche;

      do {
        nomRecherche = prompt("Entrer le nom : ").trim();

        if (nomRecherche === "") {
          console.log("Erreur : le nom ne peut pas être vide.");
        }
      } while (nomRecherche === "");

      let resultatNom = rechercherApprenant(nomRecherche);

      if (resultatNom.length === 0) {
        console.log("Aucun apprenant trouvé avec ce nom.");
      } else {
        for (let apprenant of resultatNom) {
          console.log("\n===== APPRENANT TROUVÉ =====");
          console.log(`ID : ${apprenant.id}`);
          console.log(`Nom : ${apprenant.nomComplet}`);
          console.log(`Ville : ${apprenant.ville}`);
        }
      }

      break;

    case "6":
      let id;
      let apprenantExiste;

      do {
        id = Number(prompt("Entrer l'identifiant : "));

        apprenantExiste = apprenants.find(function (apprenant) {
          return apprenant.id === id;
        });

        if (!Number.isInteger(id) || id <= 0) {
          console.log("Erreur : veuillez entrer un identifiant valide.");
        } else if (apprenantExiste === undefined) {
          console.log("Erreur : apprenant introuvable.");
        }
      } while (
        !Number.isInteger(id) ||
        id <= 0 ||
        apprenantExiste === undefined
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
          prompt("Entrer le nombre d'exercices proposés : "),
        );

        if (!Number.isInteger(exercicesProposes) || exercicesProposes < 0) {
          console.log("Erreur : entrez un nombre entier positif ou égal à 0.");
        }
      } while (!Number.isInteger(exercicesProposes) || exercicesProposes < 0);

      let exercicesTermines;

      do {
        exercicesTermines = Number(
          prompt("Entrer le nombre d'exercices terminés : "),
        );

        if (
          !Number.isInteger(exercicesTermines) ||
          exercicesTermines < 0 ||
          exercicesTermines > exercicesProposes
        ) {
          console.log(
            "Erreur : le nombre terminé doit être entre 0 et le nombre proposé.",
          );
        }
      } while (
        !Number.isInteger(exercicesTermines) ||
        exercicesTermines < 0 ||
        exercicesTermines > exercicesProposes
      );

      let challenge;

      do {
        challenge = prompt("Challenge terminé ? (oui/non) : ")
          .trim()
          .toLowerCase();

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
        challengeTermine,
      );

      if (resultat) {
        console.log("Résultat enregistré avec succès !");
      } else {
        console.log("Erreur lors de l'enregistrement.");
      }

      break;

    case "7":
      let niveau;

      do {
        niveau = prompt("Entrer le niveau : ").trim();

        if (
          niveau.toLowerCase() !== "solide" &&
          niveau.toLowerCase() !== "en progression" &&
          niveau.toLowerCase() !== "à renforcer"
        ) {
          console.log(
            "Erreur : choisissez Solide, En progression ou À renforcer.",
          );
        }
      } while (
        niveau.toLowerCase() !== "solide" &&
        niveau.toLowerCase() !== "en progression" &&
        niveau.toLowerCase() !== "à renforcer"
      );

      let resultatNiveau = filtrerParNiveau(niveau);

      if (resultatNiveau.length === 0) {
        console.log("Aucun apprenant trouvé pour ce niveau.");
      } else {
        console.log(`\n===== APPRENANTS : ${niveau} =====`);

        for (let apprenant of resultatNiveau) {
          let progression = calculerProgression(apprenant);

          console.log(`\nID : ${apprenant.id}`);
          console.log(`Nom : ${apprenant.nomComplet}`);
          console.log(`Ville : ${apprenant.ville}`);
        }
      }
      break;
    case "8":
      let choixTrie;

      do {
        console.log("\n========== SOUS-MENU TRI ==========");
        console.log("1. Trier par progression décroissante");
        console.log("2. Trier par ordre alphabétique");
        console.log("0. Retour au menu principal");

        choixTrie = prompt("Votre choix : ").trim();

        switch (choixTrie) {
          case "1":
            let trieProg = trierParProgression();

            console.log("\n===== TRI PAR PROGRESSION =====");
            for (let apprenant of trieProg) {
              let progression = calculerProgression(apprenant);

              console.log(`\nID : ${apprenant.id}`);
              console.log(`Nom : ${apprenant.nomComplet}`);
              console.log(`Ville : ${apprenant.ville}`);
              console.log(`Progression : ${progression.pourcentage}%`);
              console.log(`Niveau : ${progression.niveau}`);
            }

            break;

          case "2":
            let trieAlpha = trierAlphabetique();

            console.log("\n===== TRI ALPHABÉTIQUE =====");
            for (let apprenant of trieAlpha) {
              let progression = calculerProgression(apprenant);

              console.log(`\nID : ${apprenant.id}`);
              console.log(`Nom : ${apprenant.nomComplet}`);
              console.log(`Ville : ${apprenant.ville}`);
              console.log(`Progression : ${progression.pourcentage}%`);
              console.log(`Niveau : ${progression.niveau}`);
            }

            break;

          case "0":
            break;

          default:
            console.log("Erreur : choisissez 1, 2 ou 0.");
        }
      } while (choixTrie !== "0");

      break;
    default:
      console.log("Choix invalide !");
  }
} while (choix !== "0");
