// Add Inter font
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


// On obtient le nom de l'utilisateur
const nomUtilisateur = document.querySelector("#bd_nom").innerText.split('(')[0].trim();

// ajout de la feuille de style ReGEPI
const stylesheet = document.createElement('link');
stylesheet.rel = 'stylesheet';
stylesheet.href = browser.runtime.getURL('stylesheets/main.css');

document.head.appendChild(stylesheet);

// Ajout de la feuille de style et le script correspondant à la page
const page_script = document.createElement('script');
const page_stylesheet = document.createElement('link');
page_stylesheet.rel = 'stylesheet';
page_script.type = 'text/javascript';
page_script.defer = true;

// Remplacement de la page par la page HTML correspondante
// on vérifie si l'URL de la page est bien une page PHP
// et on extrait le nom de la page à partir de l'URL
let match = document.location.pathname.match(/\/([^\/]+)\.php$/);
if (match) {
    const pageName = match[1];
    page_script.src = browser.runtime.getURL(`scripts/${pageName}.js`);
    page_stylesheet.href = browser.runtime.getURL(`stylesheets/${pageName}.css`);
    document.head.appendChild(page_script);
    document.head.appendChild(page_stylesheet);

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