var totalCookiesOwned = 0;
var cookiesOwned = 0;
var cookiesOwnedPerClick = 1;
var cookiesOwnedPerSec = 0;
var usineUpgradePrice = 20;
var granolaPacketUpgradePrice = 100;
var doubleClickUpdradePrice = 5000;
var elapsedSeconds = 0;

// localStorage.removeItem('granolaCookieGameState'); // Réinitialise le jeu en cas de besoin (retirer commentaire)

function saveGame() {
    const gameState = {
        totalCookiesOwned: totalCookiesOwned,
        cookiesOwned: cookiesOwned,
        cookiesOwnedPerClick: cookiesOwnedPerClick,
        cookiesOwnedPerSec: cookiesOwnedPerSec,
        usineUpgradePrice: usineUpgradePrice,
        granolaPacketUpgradePrice: granolaPacketUpgradePrice,
        doubleClickUpdradePrice: doubleClickUpdradePrice,
        elapsedSeconds: elapsedSeconds
    };

    localStorage.setItem('granolaCookieGameState', JSON.stringify(gameState));
}

function loadGame() {
    const savedGameState = localStorage.getItem('granolaCookieGameState');
    
    if (savedGameState) {
        const gameState = JSON.parse(savedGameState);
        
        totalCookiesOwned = gameState.totalCookiesOwned;
        cookiesOwned = gameState.cookiesOwned;
        cookiesOwnedPerClick = gameState.cookiesOwnedPerClick;
        cookiesOwnedPerSec = gameState.cookiesOwnedPerSec;
        usineUpgradePrice = gameState.usineUpgradePrice;
        granolaPacketUpgradePrice = gameState.granolaPacketUpgradePrice;
        doubleClickUpdradePrice = gameState.doubleClickUpdradePrice;
        elapsedSeconds = gameState.elapsedSeconds;

        updateInterfaceElements();
    }
}

function updateInterfaceElements() {
    getCookieOwned();
    getCookieOwnedPerSec();
    getCookieOwnedPerClick();
    updateUsineButtonPrice();
    updatePacketButtonPrice();
    updateDoubleClickButtonPrice();
    updateElapsedTime();
}

function updateUsineButtonPrice() {
    document.getElementById("usineButtonText").innerHTML = usineUpgradePrice;
}

function updatePacketButtonPrice() {
    document.getElementById("packetdegranolaButtonText").innerHTML = granolaPacketUpgradePrice;
}

function updateDoubleClickButtonPrice() {
    document.getElementById("doubleClickButtonText").innerHTML = doubleClickUpdradePrice;
}

function getCookieOwned() {
    var actualCookiesOwnedText = document.getElementById("getCookieNumber");
    actualCookiesOwnedText.innerText = cookiesOwned;

    var totalCoookiesOwned = document.getElementById("score");
    totalCoookiesOwned.innerText = totalCookiesOwned;
}

function getCookieOwnedPerSec() {
    var cookieOwnedPerSecText = document.getElementById("GranolaNumberPerSecond");
    cookieOwnedPerSecText.innerText = cookiesOwnedPerSec;
}

function getCookieOwnedPerClick() {
    var cookieOwnedPerClickText = document.getElementById("GranolaNumberPerClick");
    cookieOwnedPerClickText.innerText = cookiesOwnedPerClick;
}

function onCookieClicked() {        
    cookiesOwned += cookiesOwnedPerClick;
    totalCookiesOwned += cookiesOwnedPerClick;

    saveGame();
    getCookieOwned();
    getCookieOwnedPerSec();
    getCookieOwnedPerClick();
}

function upgradeUsine() {
    if (cookiesOwned < usineUpgradePrice) {
        alert("Vous n'avez pas assez de Granola pour acheter l'amélioration 'Usine'");
        return;
    }

    cookiesOwned -= usineUpgradePrice;
    usineUpgradePrice *= 2;
    cookiesOwnedPerClick += 1;
    
    saveGame();
    updateUsineButtonPrice();
    getCookieOwned();
    getCookieOwnedPerClick();
}

function upgradeGranolaPacket() {
    if (cookiesOwned < granolaPacketUpgradePrice) {
        alert("Vous n'avez pas assez de Granola pour acheter l'amélioration 'Packet de Granolas'");
        return;
    }

    cookiesOwned -= granolaPacketUpgradePrice;
    granolaPacketUpgradePrice *= 2;
    cookiesOwnedPerSec += 5;
    
    saveGame();
    updatePacketButtonPrice();
    getCookieOwned();
    getCookieOwnedPerSec();
}

function updgradeDoubleClick() {
    if (cookiesOwned < doubleClickUpdradePrice) {
        alert("Vous n'avez pas assez de Granola pour acheter l'amélioration 'Double Clic'");
        return;
    }
    
    cookiesOwned -= doubleClickUpdradePrice;
    doubleClickUpdradePrice *= 2;
    cookiesOwnedPerClick *= 2;
    
    saveGame();
    updateDoubleClickButtonPrice();
    getCookieOwned();
    getCookieOwnedPerClick();
}

function generateCookiesPerSecond() {
    cookiesOwned += cookiesOwnedPerSec;
    totalCookiesOwned += cookiesOwnedPerSec;

    saveGame();
    getCookieOwned();
}

function updateElapsedTime() {
    elapsedSeconds++;

    const hours = Math.floor(elapsedSeconds / 3600);
    const minutes = Math.floor((elapsedSeconds % 3600) / 60);
    const seconds = elapsedSeconds % 60;

    const timeText = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    const elapsedTimeText = document.getElementById("elapsedTime");
    elapsedTimeText.innerText = timeText;
}

document.addEventListener("DOMContentLoaded", function () {
    loadGame();

    const cookieImage = document.getElementById("imageCookie");
    cookieImage.addEventListener("click", onCookieClicked);

    const usineButton = document.getElementById("usineButton");
    usineButton.addEventListener("click", upgradeUsine);

    const packetdegranolaButton = document.getElementById("packetdegranolaButton");
    packetdegranolaButton.addEventListener("click", upgradeGranolaPacket);

    const doubleclickButton = document.getElementById("doubleclickButton");
    doubleclickButton.addEventListener("click", updgradeDoubleClick);
});

setInterval(generateCookiesPerSecond, 1000);
setInterval(updateElapsedTime, 1000);