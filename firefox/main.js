// Add Inter font
const inter_preconnect = document.createElement('link');
inter_preconnect.rel = 'preconnect';
inter_preconnect.href = 'https://rsms.me/';
const inter_stylesheet = document.createElement('link');
inter_stylesheet.rel = 'stylesheet';
inter_stylesheet.href = 'https://rsms.me/inter/inter.css';

document.head.appendChild(inter_preconnect);
document.head.appendChild(inter_stylesheet);

// Add main ReGEPI stylesheet
const stylesheet = document.createElement('link');
stylesheet.rel = 'stylesheet';
stylesheet.href = browser.runtime.getURL('main.css');

document.head.appendChild(stylesheet);

// Change GEPI FavIcon to ReGEPI Icon
const favicon = document.querySelector('link[rel="shortcut icon"]');
favicon.href = browser.runtime.getURL('favicon.ico');


// Add correspond page script and stylesheet
const page_script = document.createElement('script');
const page_stylesheet = document.createElement('link');
page_stylesheet.rel = 'stylesheet';
page_script.type = 'text/javascript';
page_script.defer = true;

let match = document.location.pathname.match(/\/([^\/]+)\.php$/);
if (match) {
    page_script.src = browser.runtime.getURL(`${match[1]}.js`);
    page_stylesheet.href = browser.runtime.getURL(`${match[1]}.css`);
    document.head.appendChild(page_script);
    document.head.appendChild(page_stylesheet);
} else {
    console.log("Unsupported page (Non-PHP).")
}

// Remove undesirables
let minimize_button = document.querySelector(".change_taille_gd");
minimize_button.style.display = "none";

let alert_heading = document.querySelector("h1 + h3");
alert_heading.classList.add("alert");
alert_heading.textContent = alert_heading.textContent.split(' ')[0];

// Make the student name and class more compact
let NomEleve = document.querySelector("p#bd_nom");
NomEleve.style.display = "inline-block";
let ClasseEleve = document.querySelector("p#bd_nom + p");
ClasseEleve.style.display = "inline-block";

const bandeau = document.querySelector("div#bandeau");
const colonneGauche = document.querySelector(".bandeau_colonne");

let h1 = document.querySelector("h1");
let alert = document.querySelector("h3.alert");

let div = document.createElement("div");
div.classList.add("Title_Alert");
div.appendChild(h1);
div.appendChild(alert);
colonneGauche.appendChild(div);
