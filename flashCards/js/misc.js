
function showContent(tabContentId, contentId) {
    const currentDisplayedContentTab = document.getElementById('content-tab');
    const currentDisplayedContent = document.getElementById('content');

    // Remove Active from current tab button
    const currentTabElement = document.getElementById(currentDisplayedContentTab.value);
    const currentTabButtonElement = currentTabElement.firstElementChild;
    if (currentTabButtonElement.classList.contains('disabled')) return;
    currentTabButtonElement.classList.remove("active");

    // Add Active to the new current tab
    const newTabElement = document.getElementById(tabContentId);
    const newTabButtonElement = newTabElement.firstElementChild;
    newTabButtonElement.classList.add("active");


    // Add d-none to current content
    const currentContent = document.getElementById(currentDisplayedContent.value);
    currentContent.classList.add("d-none");

    // Remove d-none to display selected content
    const newContent = document.getElementById(contentId);
    newContent.classList.remove("d-none");

    // Update current displayed tab input
    currentDisplayedContentTab.value = tabContentId;
    currentDisplayedContent.value = contentId;
}

function selectLanguage(language) {
    document.getElementById("target-language").value = language;
    //TODO: UPDATE DATA and FLASHCARDS
    // cacheCards()
}

function updateScore() {
    if (answered === 0) {
        document.getElementById("score").innerHTML = "N/A";
        return;
    }

    document.getElementById("score").innerHTML = `${correct}/${answered} - ${correct / answered}`;
}

function revealWords() {
    document.getElementById("source-word").classList.remove("d-none");
    document.getElementById("target-word").classList.remove("d-none");
}

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
    
    if (randomNum < 5) {
        // Make target invisible
        sourceElement.classList.remove("d-none");
        targetElement.classList.add("d-none");
    } else {
        // Make source invisible
        sourceElement.classList.add("d-none");
        targetElement.classList.remove("d-none");
    }

    cardLength
}

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
    }
}

// function debug() {
//     console.log(cards)
// }