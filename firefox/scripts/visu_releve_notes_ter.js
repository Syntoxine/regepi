function getGrades() {
  const subjects = {};
  const rows = document.querySelectorAll("tr.lig1, tr.lig-1");

  rows.forEach((row) => {
    const [tdSubject, tdGrades] = row.querySelectorAll("td");
    if (!tdSubject || !tdGrades) return;

    if (tdGrades.childElementCount === 0) return;

    const subject = tdSubject.querySelector("b")?.textContent.trim();
    if (!subject) return;

    const tests = [];

    const htmlChunks = tdGrades.innerHTML.split("<br>");
    htmlChunks.forEach((chunk) => {
      const container = document.createElement("div");
      container.innerHTML = chunk;

      const titleText = container.childNodes[0]?.textContent
        ?.trim()
        ?.slice(0, -1);
      const grade10 = container.querySelector("b")?.textContent?.trim() ?? null;
      const freeGrade =
      container.querySelector("small i")?.textContent?.slice(2, -2) ?? null;
      const date =
        container.querySelector("i small")?.textContent?.trim() ?? null;

      const min =
        container.querySelector(".cn_moymin")?.textContent?.trim() ?? null;
      const avg =
        container.querySelector(".cn_moyclasse")?.textContent?.trim() ?? null;
      const max =
        container.querySelector(".cn_moymax")?.textContent?.trim() ?? null;

      if (titleText && grade10) {
        tests.push({
          title: titleText,
          grade10,
          freeGrade,
          date,
          min,
          avg,
          max,
        });
      }
    });

    if (tests.length) {
      subjects[subject] = tests;
    }
  });

  return subjects;
}

function gradeToNumber(str) {
  if (!str) return null;
  let base = parseFloat(str);
  if (str.includes("+")) base += 0.3;
  if (str.includes("-")) base -= 0.3;
  return Math.round(base * 10) / 10;
}

function renderGrades(subjects) {
  const container = document.getElementById("gradesContainer");

  if (subjects.length === 0) {
    return;
  }

  const noGradesAlert = document.getElementById("noGrades");
  noGradesAlert.parentNode.removeChild(noGradesAlert);

  Object.entries(subjects).forEach(([subject, grades]) => {
    const card = document.createElement("div");
    card.className = "card mb-4 shadow-sm";

    const table = document.createElement("table");
    table.className = "table mb-0 table-bordered";

    table.innerHTML = `
        <thead class="table-primary">
          <tr><th colspan="7" class="fs-5">${subject}</th></tr>
          <tr>
            <th>Évaluation</th>
            <th>Note franco-allemande</th>
            <th>Note libre</th>
            <th>Date</th>
            <th>Min</th>
            <th>Moy</th>
            <th>Max</th>
          </tr>
        </thead>
        <tbody>
          ${grades
            .map((g) => {
              const my = gradeToNumber(g.grade10);
              const avg = gradeToNumber(g.avg);
              let color = "text-primary";
              if (my < avg) color = "text-danger";
              else if (my > avg) color = "text-success";

              return `
              <tr>
                <td>${g.title}</td>
                <td class="${color} fw-bold">${g.grade10}</td>
                <td>${g.freeGrade || ""}</td>
                <td>${g.date || ""}</td>
                <td>${g.min || ""}</td>
                <td>${g.avg || ""}</td>
                <td>${g.max || ""}</td>
              </tr>
            `;
            })
            .join("")}
        </tbody>
      `;

    card.appendChild(table);
    container.appendChild(card);
  });
}

let data = getGrades();

const observer = new MutationObserver(() => {
  const container = document.getElementById("gradesContainer");
  if (container) {
    renderGrades(data);
    observer.disconnect();
  }
});

observer.observe(document.body, { childList: true, subtree: true });
