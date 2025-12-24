async function getFromOpentdb(max = 100) {
    try {
        const response = await fetch(
            `https://opentdb.com/api.php?amount=${max}`
        );
        // 'https://opentdb.com/api.php?amount=10&category=9&difficulty=easy&type=multiple');
        // 'https://opentdb.com/api.php?amount=10&type=multiple');
        const loadedQuestions = await response.json();
        playWith(loadedQuestions.results);
    } catch (error) {
        console.log(error);
    }
}

function decodeHTML(html) {
    const txt = document.createElement("textarea");
    txt.innerHTML = html;
    return txt.value;
}

function playWith(quizz) {
    console.table(quizz);
    const quizDiv = document.getElementById("quiz"); 
    for (let { question } of quizz) {
        quizDiv.insertAdjacentHTML("beforeend", `<p>${decodeHTML(question)}</p>`);
    }
    quizDiv.addEventListener("click", (e) => {
        if (e.target.tagName === "P") {
            e.target.classList.toggle("selected");
        }
    });
}

getFromOpentdb(10);
