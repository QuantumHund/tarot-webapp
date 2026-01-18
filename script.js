// ------------------------
// Kártyák megjelenítése
// ------------------------
function displayCards(cards) {
  const container = document.getElementById("cards");
  container.innerHTML = ""; // előző kirakás törlése

  cards.forEach(card => {
    const div = document.createElement("div");
    div.className = "card";

    // Hátlap
    const img = document.createElement("img");
    img.src = "cards/CardBacks.png";
    img.style.cursor = "pointer";

    // Kártya neve és jelentése rejtve
    const name = document.createElement("h3");
    name.textContent = card.name;
    name.style.display = "none";

    const meaning = document.createElement("p");
    meaning.textContent = card.meaning;
    meaning.style.display = "none";

    // Kattintás: felfordítás
    img.addEventListener("click", () => {
      img.src = card.type === "Major"
        ? `cards/major/${card.image}`  // kisbetűs mappa
        : `cards/minor/${card.image}`; // kisbetűs mappa
      name.style.display = "block";
      meaning.style.display = "block";
    });

    div.appendChild(img);
    div.appendChild(name);
    div.appendChild(meaning);
    container.appendChild(div);
  });
}

// ------------------------
// Kirakás és elemzés
// ------------------------
document.addEventListener("DOMContentLoaded", () => {
  const drawBtn = document.getElementById("drawBtn");

  drawBtn.addEventListener("click", () => {
    const spread = document.getElementById("spreadType").value;
    const question = document.getElementById("question").value;

    let numCards;
    switch(spread) {
      case "oneCard": numCards = 1; break;
      case "threeCard": numCards = 3; break;
      case "celticCross": numCards = 10; break;
      default: numCards = 1;
    }

    // Véletlenszerű húzás
    const shuffled = [...tarotDeck].sort(() => 0.5 - Math.random());
    const drawn = shuffled.slice(0, numCards);

    // Megjelenítés
    displayCards(drawn);

    // Elemzés div-be írás
    const analysisDiv = document.getElementById("analysis");
    analysisDiv.innerHTML = ""; // előző elemzés törlése

    drawn.forEach((card, index) => {
      const line = document.createElement("p");
      line.textContent = `${index + 1}. ${card.name}: ${card.meaning} (kérdés: "${question}")`;
      analysisDiv.appendChild(line);
    });
  });
});
