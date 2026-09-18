const apprenants = require("./Data");

function normaliserNom(nom) {
  let a = nom.trim();
  return a;
}
//************************************* */
function validerResultat(realises, proposes) {
  if (realises < 0 || proposes < 0) {
    return false;
  } else if (realises > proposes) {
    return false;
  }
  return true;
}
// //************************************* */
function ajouterApprenant(nom, ville) {
  let apprenant = {
    id: apprenants.length + 1,
    nomComplet: normaliserNom(nom),
    ville: ville,
    resultats: [],
  };
  apprenants.push(apprenant);
  return apprenant;
}

// //************************************* */

function enregistrerResultat(
  id,
  jour,
  exercicesPropose,
  exerciceTermine,
  challengeTermine,
) {
  let apprenant = apprenants.find(function (apprenant) {
    return apprenant.id === id;
  });

  if (apprenant === undefined) {
    return false;
  }

  let resultat = apprenant.resultats.find(function (resultat) {
    return resultat.jour === jour;
  });

  if (resultat !== undefined) {
    resultat.exercicesTermines = exerciceTermine;
    resultat.totalExercices = exercicesPropose;
    resultat.challengeTermine = challengeTermine;

    return true;
  } else {
    apprenant.resultats.push({
      jour: jour,
      exercicesTermines: exerciceTermine,
      totalExercices: exercicesPropose,
      challengeTermine: challengeTermine,
    });

    return true;
  }
}

// //************************************* */

function rechercherApprenant(recherche) {
  if (!isNaN(recherche)) {
    let idNum = Number(recherche);
    return apprenants.filter(function (a) {
      return a.id === idNum;
    });
  }

  let recherchePropre = recherche.trim().toLowerCase();
  return apprenants.filter(function (a) {
    return a.nomComplet.toLowerCase().includes(recherchePropre);
  });
}

// //************************************* */

function calculerProgression(apprenant) {
  let totalTermines = 0;
  let totalProposes = 0;
  let challengesTermines = 0;

  apprenant.resultats.forEach(function (r) {
    totalTermines += r.exercicesTermines;
    totalProposes += r.totalExercices;
    if (r.challengeTermine) {
      challengesTermines++;
    }
  });
  let pourcentage = 0;
  if (totalProposes > 0) {
    pourcentage = Math.round((totalTermines / totalProposes) * 100);
  }
  let niveau = "À renforcer";
  if (pourcentage >= 80) {
    niveau = "Solide";
  } else if (pourcentage >= 50) {
    niveau = "En progression";
  }

  let joursManquants = [];
  let challengesManquants = [];

  for (let j = 1; j <= 7; j++) {
    let res = apprenant.resultats.find(function (r) {
      return r.jour === j;
    });

    if (!res) {
      joursManquants.push(j);
    } else if (!res.challengeTermine) {
      challengesManquants.push(j);
    }
  }
  return {
    totalTermines: totalTermines,
    totalProposes: totalProposes,
    pourcentage: pourcentage,
    niveau: niveau,
    challengesTermines: challengesTermines,
    journeesRenseignees: apprenant.resultats.length,
    joursManquants: joursManquants,
    challengesManquants: challengesManquants,
  };
}
// //************************************* */

function filtrerParNiveau(niveau) {
  return apprenants.filter(function (a) {
    let stats = calculerProgression(a);
    return stats.niveau.toLowerCase() === niveau.toLowerCase();
  });
}

// //************************************* */

function trierParProgression() {
  return apprenants.slice().sort(function (a, b) {
    let statsA = calculerProgression(a);
    let statsB = calculerProgression(b);
    return statsB.pourcentage - statsA.pourcentage;
  });
}

//************************************* */

function trierAlphabetique() {
  return apprenants.slice().sort(function (a, b) {
    return a.nomComplet.localeCompare(b.nomComplet);
  });
}

// **************************************

function afficherApprenants() {
  console.log("\n===== LIST DE APPRENANTS =====");
  for (let apprenant of apprenants) {
    console.log(`ID : ${apprenant.id}`);
    console.log(`Nom : ${apprenant.nomComplet}`);
    console.log(`Ville : ${apprenant.ville}`);
  }
}

// **************************************

function afficherTableauDeBord() {
  console.log("\n===== TABLEAU DE BORD =====");
  console.log("\n========== NOMBRE D'APPRENANTS ==========");
  console.log(`Nombre d'apprenants : ${apprenants.length}`);

  let moyenne = 0;
  let solide = 0;
  let enProgression = 0;
  let aRenforcer = 0;
  let progression;
  console.log("\n========== PROGRESSION DES APPRENANTS ==========");

  for (let apprenant of apprenants) {
    progression = calculerProgression(apprenant);

    moyenne += progression.pourcentage;
    if (progression.niveau === "Solide") {
      solide++;
    } else if (progression.niveau === "En progression") {
      enProgression++;
    } else {
      aRenforcer++;
    }
    console.log(
      `${apprenant.nomComplet} : ${progression.pourcentage}%  ---- Niveau : ${progression.niveau}`,
    );
    console.log(`Jours manquants : ${progression.joursManquants}`);
    console.log(`Challenges manquants : ${progression.challengesManquants}`);
    console.log(`Exercices terminés : ${progression.totalTermines}`);
    console.log(`Exercices proposés : ${progression.totalProposes}`);
    console.log("\n")
  }

  if (apprenants.length > 0) {
    moyenne = moyenne / apprenants.length;
  }
  console.log("\n========== PROGRESSION MOYENNE DU GROUPE ==========");
  console.log(`Progression moyenne du groupe : ${moyenne}%`);
  console.log("\n========== RÉPARTITION PAR NIVEAU ==========");
  console.log(`Solide : ${solide}`);
  console.log(`En progression : ${enProgression}`);
  console.log(`À renforcer : ${aRenforcer}`);
  let apprenantsTries = trierParProgression();
  console.log("\n =========== CLASSEMENT PAR PROGRESSION ===========");
  for (let apprenant of apprenantsTries) {
    let progression = calculerProgression(apprenant);
    console.log(`  ${apprenant.nomComplet} : ${progression.pourcentage}%`);
  }
}

module.exports = {
  normaliserNom,
  validerResultat,
  ajouterApprenant,
  enregistrerResultat,
  rechercherApprenant,
  calculerProgression,
  filtrerParNiveau,
  trierParProgression,
  trierAlphabetique,
  afficherApprenants,
  afficherTableauDeBord,
};
