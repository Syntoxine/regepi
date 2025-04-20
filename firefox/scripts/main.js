// On utilise une police en ligne 'Inter'
const inter_preconnect = document.createElement('link');
inter_preconnect.rel = 'preconnect';
inter_preconnect.href = 'https://rsms.me/';
const inter_stylesheet = document.createElement('link');
inter_stylesheet.rel = 'stylesheet';
inter_stylesheet.href = 'https://rsms.me/inter/inter.css';

document.head.appendChild(inter_preconnect);
document.head.appendChild(inter_stylesheet);

// Ajout des documents de la librairie Bootstrap
const bootstrap_stylesheet = document.createElement('link');
bootstrap_stylesheet.rel = 'stylesheet';
bootstrap_stylesheet.href = browser.runtime.getURL('stylesheets/bootstrap.min.css');
const bootstrap_script = document.createElement('script');
bootstrap_script.src = browser.runtime.getURL('scripts/bootstrap.bundle.min.js');

document.head.appendChild(bootstrap_stylesheet);
document.head.appendChild(bootstrap_script);


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

// Remplacement de la page par la page HTML correspondante
// on vérifie si l'URL de la page est bien une page PHP
// et on extrait le nom de la page à partir de l'URL
let match = document.location.pathname.match(/\/([^\/]+)\.php$/);

// On obtient le nom de l'utilisateur
let nomUtilisateur = "Profil"; // Nom d'utilisateur par défaut si on échoue à obtenir le nom d'utilisateur
if (match[1] !== "login"){
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



const observer = new MutationObserver((mutations, observer) => {
    // Transformation de Profil dans la Navbar par Prénom et Nom de l'utilisateur
    let profil = document.querySelector("#profil");
    if (profil) {
        profil.innerText = nomUtilisateur;
        observer.disconnect();
    }



    // On ajoute la fonctionnalité au menu mobile
    let menuHamburger = document.querySelector(".menu-hamburger");
    let menuCross = document.querySelector(".menu-cross")
    let navLinks = document.querySelector(".nav-links");
    
    menuHamburger.addEventListener('click', () => {navLinks.classList.toggle('mobile-menu')});
    menuHamburger.addEventListener('click', () => {menuHamburger.classList.toggle('mobile-menu')});
    menuHamburger.addEventListener('click', () => {menuCross.classList.toggle('mobile-menu')});
    menuCross.addEventListener('click', () => {navLinks.classList.remove('mobile-menu')});
    menuCross.addEventListener('click', () => {menuHamburger.classList.toggle('mobile-menu')});
    menuCross.addEventListener('click', () => {menuCross.classList.toggle('mobile-menu')});

    // et la fonctionnalité au bouton qui permet de changer le thème
    // Récupere le thème actuel du stockage local, si le mode sombre est stocké, alors il sera appliqué
    let darkmode = localStorage.getItem('darkmode')
    const themeSwitch = document.getElementById('theme-switch')

    // Ajoute la classe 'darkmode' aux classes du 'body'
    // Enregistre le mode sombre comme actif dans le stockage local
    const enableDarkmode = () => {
        document.body.classList.add('darkmode')
        localStorage.setItem('darkmode', 'active')
    }

    // Retire la classe 'darkmode' aux classes du 'body'
    // Enregistre le mode sombre comme non-présent dans le stockage local
    const disableDarkmode = () => {
        document.body.classList.remove('darkmode')
        localStorage.setItem('darkmode', null)
    }

    // Si le mode sombre est actif dans le stockage local, alors il est activé dès l'ouverture de la page
    if(darkmode === "active") enableDarkmode()
    
    // Lorsque le bouton est clické :
    // - la valeur du mode sombre est changée dans le stockage local
    // - si le mode sombre était activé, alors il est désactivé, sinon, il est activé
    themeSwitch.addEventListener("click", () => {
        darkmode = localStorage.getItem('darkmode')
        darkmode !== "active" ? enableDarkmode() : disableDarkmode()
    })
});

observer.observe(document.body, { childList: true, subtree: true });