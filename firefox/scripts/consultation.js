// Fonction utilitaire pour obtenir un élément frère précédent
function getPreviousSibling(node, selector) {
    let sibling = node.previousElementSibling;
    while (sibling) {
        if (sibling.matches(selector)) return sibling;
        sibling = sibling.previousElementSibling;
    }
    return null; // cas où il y a aucun élément frère correspondant
}

// Fonction pour convertir la date telle qu'est elle affichée dans le site
function convertDate(date) {
    const monthMap = {"Jan.": "01", "Fev.": "02", "Mar.": "03", "Avr.": "04", "Mai": "05", "Juin": "06", "Juil.": "07", "Aout": "08", "Sept.": "09", "Oct.": "10", "Nov.": "11", "Dec.": "12"};
    const [weekday, day, month, year] = date.split(" ");
    return [year, monthMap[month], day];
}

// Cette fonction obtient le texte qui est sur la page et extrait les informations utiles
// et sort une liste d'objets contenant ces informations
function getHomework() {
    let homeworks = document.querySelectorAll('.matiere_a_faire');
    let homeworkData = [];

    homeworks.forEach(homework => {
        let date = getPreviousSibling(homework, 'h3.titre_a_faire').innerText;
        date = date.substring(27);
        let subjectTitle = homework.querySelector('h4').innerText;
        const content = homework.querySelector('p').innerText;
        const isExam = homework.querySelector('img[alt="contrôle"]') !== null;
        const mediaLinks = Array.from(homework.querySelectorAll('ul li a')).map(link => link.href);
    
        let separator = isExam ? "durée d'effort estimée (en min)" : "durée estimée pour ce travail (en min)"
        let [subject, duration] = subjectTitle.split(separator);
        subject = subject.trim();
        duration = duration.split(":")[0].trim();
        
        
        homeworkData.push({
            date,
            subject,
            duration,
            content,
            isExam,
            mediaLinks
        });

    });
    return homeworkData;
}

// Cette fonction prend en entrée la liste d'objets des devoirs
// et construit des élements HTML qu'on injecte dans la page
// pour les afficher
function renderHomework(homeworkItems) {
    const container = document.getElementById("homeworkContainer");
    
    const grouped = {};
    if (homeworkItems.length !== 0) {
        const noHomeworkAlert = document.getElementById("noHomework");
        noHomeworkAlert.parentNode.removeChild(noHomeworkAlert);

        homeworkItems.forEach(item => {
            homeworkItems.forEach(item => {
                if (!grouped[item.date]) grouped[item.date] = [];
                if (!grouped[item.date].includes(item)) grouped[item.date].push(item);
            });
        });
        
        Object.keys(grouped).sort().forEach(date => {
            const card = document.createElement("div");
            card.className = "card shadow-sm";
    
            card.innerHTML = `
                <div class="card-header bg-primary text-white fw-semibold fs-5">
                    ${date}
                </div>
                <div class="list-group list-group-flush"></div>
            `;
    
            const listGroup = card.querySelector(".list-group");
    
            grouped[date].forEach(item => {
                const entry = document.createElement("div");
                entry.className = "list-group-item";
    
                entry.innerHTML = `
                    <div class="d-flex justify-content-between">
                        <h5 class="mb-1">${item.subject}</h5>
                        ${item.duration ? `<small class="text-muted">${item.duration} min</small>` : ""}
                    </div>
                    <p class="mb-1">${item.content}</p>
                    ${item.isExam ? `<span class="badge bg-danger">Contrôle</span>` : ""}
                    ${item.mediaLinks.length > 0 ? `
                        <div class="mt-2">
                            ${item.mediaLinks.map(link => `<a href="${link}" target="_blank" class="btn btn-sm btn-outline-primary me-2">📎 Pièce jointe</a>`).join('')}
                        </div>
                    ` : ""}
                `;
    
                listGroup.appendChild(entry);
            });
    
            container.appendChild(card);
        });
    }
};


let homeworkItems = getHomework();

const observer = new MutationObserver((mutationsList, observer) => {
    const container = document.getElementById("homeworkContainer");
    if (container) {
        renderHomework(homeworkItems);
        observer.disconnect();
    }
    
    const datePicker = document.getElementById("datePicker");
    const goButton = document.getElementById("goToDate");
    
    // Lorsque le bouton "Aller" est cliqué
    goButton.addEventListener('click', () => {
        // On vérifie qu'une date valide est saisie
        const selectedDate = new Date(datePicker.value);
        if (isNaN(selectedDate)) return;
    
        const year = selectedDate.getFullYear();
        const month = String(selectedDate.getMonth() + 1).padStart(2, "0"); // On rajoute des 0 devant
        const day = String(selectedDate.getDate()).padStart(2, "0");
    
        console.log(`Selected date: ${year}-${month}-${day}`);
    
        // On redirige vers l'URL de la date sélectionnée
        const url = `https://lfabuc.fr/ac/cahier_texte/consultation.php?year=${year}&month=${month}&day=${day}`;
        window.location.href = url;
    });
});

observer.observe(document.body, { childList: true, subtree: true });