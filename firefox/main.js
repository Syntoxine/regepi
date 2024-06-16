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

// Add correspond page script and stylesheet
const page_script = document.createElement('script');
const page_stylesheet = document.createElement('link');
page_stylesheet.rel = 'stylesheet';
page_script.type = 'text/javascript';

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