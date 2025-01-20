const homeworks = document.querySelectorAll('.matiere_a_faire');
const homeworkData = [];

homeworks.forEach(homework => {
    const subject = homework.querySelector('h4').innerText;
    const content = homework.querySelector('p').innerText;
    const isExam = homework.querySelector('img[alt="contrôle"]') !== null;
    const mediaLinks = Array.from(homework.querySelectorAll('ul li a')).map(link => link.href);

    homeworkData.push({
        subject,
        content,
        isExam,
        mediaLinks
    });
});

console.log(homeworkData);