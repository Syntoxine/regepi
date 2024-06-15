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
stylesheet.type = 'text/css';
stylesheet.href = browser.runtime.getURL('main.css');

document.head.appendChild(stylesheet);

// Add correspond page stylesheet
const page_script = document.createElement('script');
page_script.type = 'text/javascript';

let match = document.location.pathname.match(/\/([^\/]+)\.php$/);
if (match) {
    page_script.src = browser.runtime.getURL(`${match[1]}.js`);
    document.head.appendChild(page_script);
} else {
    console.log("Unsupported page (Non-PHP).")
}