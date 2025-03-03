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
        let subjectTitle = homework.querySelector('h4').innerText;
        const content = homework.querySelector('p').innerText;
        const isExam = homework.querySelector('img[alt="contrôle"]') !== null;
        const mediaLinks = Array.from(homework.querySelectorAll('ul li a')).map(link => link.href);
    
        separator = isExam ? "durée d'effort estimée (en min)" : "durée estimée pour ce travail (en min)"
        date = date.substring(27);
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

// async function getAllHomework() {
//     let allHomework = getHomework(document);
//     let furthestDate = convertDate(allHomework.at(-1).date);

//     while (true) {
//         let response = await fetch(`https://lfabuc.fr/ac/cahier_texte/consultation.php?year=${furthestDate[0]}&month=${furthestDate[1]}&day=${furthestDate[2]}`);
//         let html = response.text();
//         let parser = new DOMParser();
//         let doc = parser.parseFromString(html, 'text/html');
//         let otherHomework = getHomework(doc);

//         if (otherHomework.length === 0) break;

//         allHomework = allHomework.concat(otherHomework);
//         furthestDate = convertDate(otherHomework.at(-1).date);
//     }
//     return allHomework;
    
// }

function renderHomework() {
    const container = document.getElementById("homeworkContainer");
    homeworkItems.forEach(item => {
        const homeworkDiv = document.createElement("div");
        homeworkDiv.classList.add("homework-item");
        
        homeworkDiv.innerHTML = `
            <div class="subject">${item.subject}</div>
            <div class="date">Due: ${item.date}</div>
            <p>${item.content}</p>
        `;
        
        container.appendChild(homeworkDiv);
    });
}


document.addEventListener('DOMContentLoaded', renderHomework);
