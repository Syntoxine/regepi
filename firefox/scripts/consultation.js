function getPreviousSibling(node, selector) {
    let sibling = node.previousElementSibling;
    while (sibling) {
        if (sibling.matches(selector)) return sibling;
        sibling = sibling.previousElementSibling;
    }
    return null; // cas où il y a aucun élément frère correspondant
}

function convertDate(date) {
    const monthMap = {"Jan.": "01", "Fev.": "02", "Mar.": "03", "Avr.": "04", "Mai": "05", "Juin": "06", "Juil.": "07", "Aout": "08", "Sept.": "09", "Oct.": "10", "Nov.": "11", "Dec.": "12"};
    const [weekday, day, month, year] = date.split(" ");
    return [year, monthMap[month], day];
}

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
});

observer.observe(document.body, { childList: true, subtree: true });