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

function getHomework(doc) {
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

let incomingHomework = getHomework(document);
let furthestDate = convertDate(incomingHomework[-1].date);
fetch('URL_OF_THE_OTHER_PAGE')
    .then(response => response.text())
    .then(html => {
        let parser = new DOMParser();
        let doc = parser.parseFromString(html, 'text/html');
        let otherPageHomework = getHomework(doc);
        console.log(otherPageHomework);
    })
    .catch(error => console.error('Error fetching the page:', error));
let homework = getHomework

console.log(getHomework(document));
 