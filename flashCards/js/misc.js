
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


function selectLanguage(language) {
    document.getElementById("target-language").value = language;
    //TODO: UPDATE DATA and FLASHCARDS
    // cacheCards()
};

function updateScore() {
    if (answered === 0) {
        document.getElementById("score").innerHTML = "N/A";
        return;
    }

    document.getElementById("score").innerHTML = `${correct}/${answered} - ${correct / answered}`;
};

// SHOWING WORDS
function revealWords() {
    document.getElementById("source-word").classList.remove("d-none");
    document.getElementById("target-word").classList.remove("d-none");
};

function nextCard() {
    // If cards not loaded, load them
    const cardLength = cards.length;
    if (cards.length === 0) cacheCards();

    // Make this number a feature to be dictated by input
    targetInvisibleNumber = Math.floor(Math.random() * 10);
    randomWordNumber = Math.floor(Math.random() * cardLength);
    word = cards[randomWordNumber];
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
};

// FILTERING
function addAvailableFilterContent() {
    const selectElement = document.getElementById("filter-select");
    for (const optionTitle of Object.keys(data)) {
        var option = document.createElement('option');
        option.innerHTML = optionTitle;
        selectElement.appendChild(option);
    }
};

function filterContent(optionTitle) {
    var selectElement = document.getElementById("filter-select");
    document.getElementById("content-language-data").value = selectElement.value;
    cacheCards();
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
                cards.push([word, data[targetLanguage]]);
            }
        }
    } else {
        for (const [word, wordData] of Object.entries(data[contentLanguageData])) {
            cards.push([word, wordData[targetLanguage]]);
        }
    }
};

async function setData() {
    addAvailableFilterContent();
    await cacheCards();
    document.getElementById("word-counter").innerHTML = cards.length;
};

// TODO ADD all contents to be reviewed

function debug() {
}
