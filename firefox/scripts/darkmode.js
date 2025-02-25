// Récupere le thème actuel du stockage local, si le mode sombre est stocké, alors il sera appliqué
let darkmode = localStorage.getItem('darkmode')

const themeSwitch = document.getElementById('theme-switch')

// Ajoute la classe 'darkmode' aux classes du 'body'
// Enregistre le mode sombre comme actif dans le stockage local
const enableDarkmode = ()=>{
    document.body.classList.add('darkmode')
    localStorage.setItem('darkmode', 'active')
}

// Retire la classe 'darkmode' aux classes du 'body'
// Enregistre le mode sombre comme non-présent dans le stockage local
const disableDarkmode = ()=>{
    document.body.classList.remove('darkmode')
    localStorage.setItem('darkmode', null)
}

// Si le mode sombre est actif dans le stockage local, alors il est activé dès l'ouverture de la  page
if(darkmode === "active") enableDarkmode()

// Lorsque le bouton est clické :
// - la valeur du mode sombre est changée dans le stockage local
// - si le mode sombre était activé, alors il est désactivé, sinon, il est activé
themeSwitch.addEventListener("click", ()=>{
    darkmode = localStorage.getItem('darkmode')
    darkmode !== "active" ? enableDarkmode() : disableDarkmode()
})