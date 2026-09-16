 function normaliserNom(nom){
    return nom.trim()
 }
 //************************************* */
function validerResultat(realises, proposes) {
    if(realises<0 || proposes<0){ return false}
    else if(realises>proposes ){ return false}
    return true 
}

 //************************************* */
 function ajouterApprenant(apprenants,nom,ville){
      let apprenant = {
    id: apprenants.length + 1 ,
    nomComplet: normaliserNom(nom),
    ville: ville ,
    resultats: []
   };
   apprenants.push(apprenant);
   return apprenant;
 }

  //************************************* */

 function enregistrerResultat(apprenants, id,jour,exercicesPropose,exerciceTermine,challengeTermine) {
      let apprenant = apprenants.find(function(apprenant) {
        return apprenant.id === id;
    });
  if (apprenant === undefined) {
    return false;
}
if (!validerResultat(exerciceTermine, exercicesPropose)) {
        return false;
    }
    if (jour >7 || jour<1) {
    return false;
}
let resultat = apprenant.resultats.find(function(resultat) {
    return resultat.jour === jour;
});
if (resultat !== undefined) {
    resultat.exercicesTermines = exerciceTermine;
    resultat.totalExercices = exercicesPropose;
    resultat.challengeTermine = challengeTermine;
} else {
    apprenant.resultats.push({
        jour: jour,
        exercicesTermines: exerciceTermine,
        totalExercices: exercicesPropose,
        challengeTermine: challengeTermine
    });
}
return true; 
}

 //************************************* */

function rechercherApprenant(apprenants, recherche) {
    if (!isNaN(recherche)) {
        let idNum = Number(recherche);
        return apprenants.filter(function(a) {
            return a.id === idNum;
        });
    }

    let recherchePropre = recherche.trim().toLowerCase();
    return apprenants.filter(function(a) {
        return a.nomComplet.toLowerCase().includes(recherchePropre);
    });
}

 //************************************* */

function calculerProgression(apprenant) {
    let totalTermines = 0;
    let totalProposes = 0;
    let challengesTermines = 0;

    
    apprenant.resultats.forEach(function(r) {
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
        let res = apprenant.resultats.find(function(r) {
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
        challengesManquants: challengesManquants
    };
}
 //************************************* */



function filtrerParNiveau(apprenants, niveau) {
    return apprenants.filter(function(a) {
        let stats = calculerProgression(a);
        return stats.niveau.toLowerCase() === niveau.toLowerCase();
    })
}

 //************************************* */

function trierParProgression(apprenants) {
    return apprenants.slice().sort(function(a, b) {
        let statsA = calculerProgression(a);
        let statsB = calculerProgression(b);
        return statsB.pourcentage - statsA.pourcentage;
    });
}

 //************************************* */

function trierAlphabetique(apprenants) {
    return apprenants.slice().sort(function(a, b) {
        return a.nomComplet.localeCompare(b.nomComplet);
    });
}