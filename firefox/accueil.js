// Remove undesirables
let alert_div = document.getElementById("temoin_messagerie_non_vide");
let button_divs = document.querySelector("#temoin_messagerie_non_vide + div");

[alert_div, button_divs].forEach(element => {
    element.style.display = "none";
});

console.log("accueil.js successfully loaded.");