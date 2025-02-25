// On utilise une police en ligne 'Inter'
const inter_preconnect = document.createElement('link');
inter_preconnect.rel = 'preconnect';
inter_preconnect.href = 'https://rsms.me/';
const inter_stylesheet = document.createElement('link');
inter_stylesheet.rel = 'stylesheet';
inter_stylesheet.href = 'https://rsms.me/inter/inter.css';

document.head.appendChild(inter_preconnect);
document.head.appendChild(inter_stylesheet);



// On ajoute la feuille de style principale
let stylesheet = document.createElement('link');
stylesheet.rel = 'stylesheet';
stylesheet.href = browser.runtime.getURL('stylesheets/main.css');

document.head.appendChild(stylesheet);

// On prépare les feuilles de styles et scripts spécifiques à chaque page
// Il seront ajoutés une fois qu'on a le nom du document
let page_script = document.createElement('script');
let page_stylesheet = document.createElement('link');
page_stylesheet.rel = 'stylesheet';
page_script.type = 'text/javascript';
page_script.defer = true;


// On récupère le nom du document
let match = document.location.pathname.match(/\/([^\/]+)\.php$/);

// On obtient le nom de l'utilisateur
let nomUtilisateur = "Profile"; // Nom d'utilisateur par défaut si on échoue à obtenir le nom d'utilisateur
if (match !== "login"){
    nomUtilisateur = document.querySelector("#bd_nom").innerText.split('(')[0].trim();
}

// Si on a trouvé le nom du document, alors on charge les resources spécifiques (HTML, JavaScript, CSS)
if (match) {
    const pageName = match[1];

    const htmlFilePath = browser.runtime.getURL(`pages/${pageName}.html`);
    fetch(htmlFilePath).then((response) => {
        if (response.ok) {
            return response.text();
        } else {
            throw new Error(`HTML file not found: ${response.status}`);
        }
    })
    .then((htmlContent) => {
        const parser = new DOMParser();
        const doc = parser.parseFromString(htmlContent, 'text/html');
        document.body.innerHTML = doc.body.innerHTML;
    })
    .catch((error) => {
        console.error(`Error fetching HTML file: ${error.message}`);
    });
    
    // On charge les feuilles de styles et les scripts après avoir remplacé le HTML, car ils en dépendent
    page_script.src = browser.runtime.getURL(`scripts/${pageName}.js`);
    page_stylesheet.href = browser.runtime.getURL(`stylesheets/${pageName}.css`);
    document.head.appendChild(page_stylesheet);
    document.head.appendChild(page_script);

    // On change le nom de la page
    let title = pageName.charAt(0).toUpperCase() + pageName.slice(1);
    document.title = "reGEPI • " + title;
} else {
    console.log("Unsupported page (Non-PHP).")
}



// Transformation de Profil dans la Navbar par Prénom et Nom de l'utilisateur
const observer = new MutationObserver((mutations, observer) => {
    let profil = document.querySelector("#profil");
    if (profil) {
        profil.innerText = nomUtilisateur;
        observer.disconnect();
    }
});

observer.observe(document.body, { childList: true, subtree: true });