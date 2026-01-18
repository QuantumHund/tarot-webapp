// ------------------------
// Kártyák megjelenítése
// ------------------------
function displayCards(cards) {
  const container = document.getElementById("cards");
  container.innerHTML = ""; // előző kirakás törlése

  cards.forEach(card => {
    const div = document.createElement("div");
    div.className = "card";

    // Hátlap kezdetben
    const img = document.createElement("img");
    img.src = "cards/CardBacks.png"; // hátlap
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
// Kirakás és kérdés kezelése
// ------------------------
document.getElementById("drawBtn").addEventListener("click", () => {
  const spread = document.getElementById("spreadType").value;
  const question = document.getElementById("question").value;

  let numCards;
  switch(spread) {
    case "oneCard": numCards = 1; break;
    case "threeCard": numCards = 3; break;
    case "celticCross": numCards = 10; break;
    default: numCards = 1;
  }

  // Véletlenszerű húzás a tarotDeck-ből
  const shuffled = [...tarotDeck].sort(() => 0.5 - Math.random());
  const drawn = shuffled.slice(0, numCards);

  // Megjelenítés
  displayCards(drawn);

  // Rövid elemzés (alert-ben)
  const analysis = drawn.map((card, index) => {
    return `${index + 1}. ${card.name}: ${card.meaning} (kérdés: "${question}")`;
  }).join("\n");

  alert(analysis); // ide lehet később div-et csinálni szebben
});
