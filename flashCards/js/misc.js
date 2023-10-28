
async function showContent(tabContentId, contentId) {

    // Add Active to the new current tab
    const newTabElement = document.getElementById(tabContentId);
    const newTabButtonElement = newTabElement.firstElementChild;
    if (newTabButtonElement.classList.contains('disabled')) { return };

    newTabButtonElement.classList.add("active");

    const currentDisplayedContentTab = document.getElementById('content-tab');
    const currentDisplayedContent = document.getElementById('content');

    // Remove Active from current tab button
    const currentTabElement = document.getElementById(currentDisplayedContentTab.value);
    const currentTabButtonElement = currentTabElement.firstElementChild;
    currentTabButtonElement.classList.remove("active");


    // Remove d-none to display selected content
    // Update current displayed tab input
    const currentContent = document.getElementById(currentDisplayedContent.value);
    const newContent = document.getElementById(contentId);
    currentContent.classList.add("d-none");
    newContent.classList.remove("d-none");


    currentDisplayedContentTab.value = tabContentId;
    currentDisplayedContent.value = contentId;

};


async function selectLanguage(language) {
    document.getElementById("target-language").value = language;
    //TODO: UPDATE DATA and FLASHCARDS
    filterContent("all");
    addAvailableFilterContent();
    document.getElementById("word-counter").innerHTML = cards.length;
};

// SHOWING WORDS
function revealWords() {
    document.getElementById("source-word").classList.remove("d-none");
    document.getElementById("target-word").classList.remove("d-none");
};

function updateCardUI() {
    const cardLength = cards.length;

    targetInvisibleNumber = Math.floor(Math.random() * 10);
    wordPos = Math.floor(Math.random() * cardLength);
    word = cards[wordPos];
    const sourceElement = document.getElementById("source-word");
    const targetElement = document.getElementById("target-word");
    sourceElement.innerHTML = word[0];
    targetElement.innerHTML = word[1];

    if (targetInvisibleNumber < 5) {
        // Make target invisible
        sourceElement.classList.remove("d-none");
        targetElement.classList.add("d-none");
    } else {
        // Make source invisible
        sourceElement.classList.add("d-none");
        targetElement.classList.remove("d-none");
    }
}

async function nextCard() {
    // If cards not loaded, load them
    if (cards.length === 0) await cacheCards();

    // Make this number a feature to be dictated by input
    updateCardUI();
};

// FILTERING
function addAvailableFilterContent() {
    const selectElement = document.getElementById("filter-select");
    while (selectElement.lastChild) {
        selectElement.lastChild.remove();
    }
    var option = document.createElement('option');
    option.innerHTML = "all";
    selectElement.appendChild(option);
    const targetLanguage = document.getElementById("target-language").value;
    for (const optionTitle of Object.keys(data)) {
        const wordData = data[optionTitle];
        let addFilter = false;
        for (const [word, data] of Object.entries(wordData)) {
            if (targetLanguage in data) {
                addFilter = true;
                break;
            }
        }
        if (addFilter) {
            var option = document.createElement('option');
            option.innerHTML = optionTitle;
            selectElement.appendChild(option);
        }
    }
};

async function filterContent(optionTitle = undefined) {
    var selectElement = document.getElementById("filter-select");
    if (optionTitle != null) {
        selectElement.value = optionTitle
    }

    document.getElementById("content-language-data").value = selectElement.value;
    await cacheCards();
    document.getElementById("word-counter").innerHTML = cards.length;
};

// DATA SETTING AND CACHING
function cacheCards() {
    const contentLanguageData = document.getElementById("content-language-data").value;
    const targetLanguage = document.getElementById("target-language").value;
    cards.length = 0;
    if (contentLanguageData === "all") {
        for (const wordData of Object.values(data)) {
            for (const [word, data] of Object.entries(wordData)) {
                if (targetLanguage in data) {
                    cards.push([word, data[targetLanguage]]);
                }
            }
        }
    } else {
        for (const [word, wordData] of Object.entries(data[contentLanguageData])) {
            cards.push([word, wordData[targetLanguage]]);
        }
    }
};

async function setData() {
    await cacheCards();
    document.getElementById("word-counter").innerHTML = cards.length;
    addAvailableFilterContent();

};

// TODO ADD all contents to be reviewed

function debug() {
}

// EXAM FUNCTIONS

function updateScore() {
    const correctWords = document.getElementById("correctWords");
    const totalWords = document.getElementById("totalWords");
    const scoreNumber = document.getElementById("scoreNumber");
    correctWords.innerHTML = correct;
    totalWords.innerHTML = total;
    scoreNumber.innerHTML = score;
}

async function initializeExamData() {
    await nextCard()
    correct = total = score = 0;
    document.getElementById("word-counter").innerHTML = cards.length;
    updateScore()
}

function toggleExam() {
    exam = !exam;
    const button = document.getElementById("examToggleButton");
    const examContainer = document.getElementById("examContainer");
    if (exam) {
        button.classList.remove("btn-primary");
        button.classList.add("btn-danger");
        button.innerHTML = "Disable";
        examContainer.classList.remove("d-none");
        initializeExamData();
    } else {
        button.classList.add("btn-primary");
        button.classList.remove("btn-danger");
        button.innerHTML = "Enable";
        examContainer.classList.add("d-none");

    }
}

function logExamScore() {
    const examHistoryContainer = document.getElementById("examItems");
    const historyLength = examHistoryContainer.children.length + 1;
    const contentType = document.getElementById("content-language-data").value;
    const examScoreLog = document.createElement("p");
    examScoreLog.innerHTML = `${historyLength}. ${contentType} (${correct}/${total}) ${score}%`;
    examHistoryContainer.appendChild(examScoreLog);

}

async function nextExamCard() {
    cards.splice(wordPos, 1);

    if (cards.length == 0) {
        await logExamScore();
        await initializeExamData();
    } else {
        updateCardUI();
        document.getElementById("word-counter").innerHTML = cards.length;

    }
}

async function correctAnswer() {
    correct += 1;
    total += 1;
    score = Math.round(correct / total * 100);
    await updateScore();
    nextExamCard();
}

async function incorrectAnswer() {
    total += 1;
    score = Math.round(correct / total * 100);
    await updateScore();
    nextExamCard();
}
