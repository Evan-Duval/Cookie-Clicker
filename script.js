function checkForm() {
    var errorBool = false;
    var afficherTexte;
    var nomFournit = document.getElementById("nom").value;
    var emailFournit = document.getElementById("email").value;
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    var passwordFournit = document.getElementById("motdepasse").value;
    var checkBoxCheck = document.getElementById("checkbox").checked;

    if (nomFournit === "") {
        errorBool = true;
        afficherTexte = "Le champ Nom est obligatoire";
        return;
    } else if (emailFournit === "" || !re.test(emailFournit)) {
        errorBool = true;
        afficherTexte = "Le champ Email est incorrect";
        return;
    } else if (passwordFournit === "" || passwordFournit.length < 8) {
        errorBool = true;
        if (passwordFournit === "") {
            afficherTexte = "Le champ Mot de passe est obligatoire";
        } else {
            afficherTexte = "Le mot de passe doit contenir au moins 8 caractères";
        }
        return;
    } else if (checkBoxCheck === false) {
        errorBool = true;
        afficherTexte = "Veuillez accepter les conditions d'utilisation pour continuer";
        return;
    }

    var paragraph = document.getElementById("messageRenvoyer")
    paragraph.innerHTML = afficherTexte;
    afficherTexte = "Le formulaire a bien été envoyé"

}