let selectedCards = [];
let nextPosition = 0;
let spreadPositions = [];

// ------------------------
// Full pakli megjelenítése
// ------------------------
function displayFullDeck(deck) {
  const container = document.getElementById("cards");
  container.innerHTML = "";

  deck.forEach(card => {
    const div = document.createElement("div");
    div.className = "card";

    const img = document.createElement("img");
    img.src = "cards/CardBacks.png";

    img.addEventListener("click", () => {
      selectCard(card);
    });

    div.appendChild(img);
    container.appendChild(div);
  });
}

// ------------------------
// Kártya kiválasztása és kirakás
// ------------------------
function selectCard(card) {
  if (nextPosition >= spreadPositions.length) {
    alert("Minden pozíció betelt a kirakásban.");
    return;
  }
  if (selectedCards.includes(card)) return; // ne válasszuk kétszer ugyanazt

  const targetDiv = spreadPositions[nextPosition];

  const img = document.createElement("img");
  img.src = card.image;
  img.className = "card";
  targetDiv.appendChild(img);

  const analysis = document.createElement("p");
  analysis.textContent = `${card.name}: ${card.meaning}`;
  targetDiv.appendChild(analysis);

  selectedCards.push(card);
  nextPosition++;

  updateFinalAnalysis();
}

// ------------------------
// Kirakás pozíciók létrehozása
// ------------------------
function setupSpread(spreadType) {
  const spreadDiv = document.getElementById("spread");
  spreadDiv.innerHTML = "";
  nextPosition = 0;
  selectedCards = [];

  let positions = 0;
  switch(spreadType) {
    case "oneCard": positions = 1; break;
    case "threeCard": positions = 3; break;
    case "celticCross": positions = 10; break;
  }

  spreadPositions = [];
  for (let i = 0; i < positions; i++) {
    const div = document.createElement("div");
    div.className = "spread-position";
    spreadDiv.appendChild(div);
    spreadPositions.push(div);
  }

  displayFullDeck(tarotDeck); // újra kattintható full pakli
  updateFinalAnalysis();
}

// ------------------------
// Offline "okos" összegzés
// ------------------------
function updateFinalAnalysis() {
  const analysisDiv = document.getElementById("finalAnalysis");
  if (selectedCards.length === 0) {
    analysisDiv.textContent = "Nincs kiválasztott kártya.";
    return;
  }

  // Kulcsszavak alapján egyszerű koherens összefoglaló
  const keywords = {};
  selectedCards.forEach(card => {
    if (card.keywords) {
      card.keywords.forEach(k => {
        keywords[k] = (keywords[k] || 0) + 1;
      });
    }
  });

  // Leggyakoribb kulcsszavak összefoglaló
  const sortedKeys = Object.keys(keywords).sort((a,b)=>keywords[b]-keywords[a]);
  const summary = sortedKeys.length > 0 
    ? `Ez a kirakás fő témái: ${sortedKeys.join(", ")}.`
    : "A kirakás minden kártyája egyedi jelentéssel bír.";

  analysisDiv.textContent = summary;
}

// ------------------------
// Init
// ------------------------
document.addEventListener("DOMContentLoaded", () => {
  const spreadSelect = document.getElementById("spreadType");

  setupSpread(spreadSelect.value);

  spreadSelect.addEventListener("change", () => {
    setupSpread(spreadSelect.value);
  });
});
