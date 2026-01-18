let selectedCards = [];
let nextPosition = 0;
let spreadPositions = [];

/* --- CELTIC CROSS POZÍCIÓK --- */
const celticPositions = [
  { label: "Jelen helyzet", grid: "2 / 2" },
  { label: "Akadály", grid: "2 / 2" },
  { label: "Alap / múlt", grid: "3 / 2" },
  { label: "Közelmúlt", grid: "2 / 1" },
  { label: "Cél / tudatos", grid: "1 / 2" },
  { label: "Közeljövő", grid: "2 / 3" },
  { label: "Te magad", grid: "1 / 4" },
  { label: "Környezet", grid: "2 / 4" },
  { label: "Remények / félelmek", grid: "3 / 4" },
  { label: "Kimenetel", grid: "4 / 4" }
];

/* --- FULL PAKLI --- */
function displayFullDeck(deck) {
  const container = document.getElementById("cards");
  container.innerHTML = "";

  deck.forEach(card => {
    const div = document.createElement("div");
    div.className = "card";

    const img = document.createElement("img");
    img.src = "cards/CardBacks.png";

    img.addEventListener("click", () => {
      selectCard(card, div);
    });

    div.appendChild(img);
    container.appendChild(div);
  });
}

/* --- KIRAKÁS BEÁLLÍTÁSA --- */
function setupSpread(type) {
  const spread = document.getElementById("spread");
  spread.innerHTML = "";
  spread.className = "";
  selectedCards = [];
  nextPosition = 0;

  let count = 0;

  if (type === "oneCard") count = 1;
  if (type === "threeCard") count = 3;
  if (type === "celticCross") {
    count = 10;
    spread.classList.add("celtic");
  }

  spreadPositions = [];

  for (let i = 0; i < count; i++) {
    const pos = document.createElement("div");
    pos.className = "spread-position";

    if (type === "celticCross") {
      pos.style.gridArea = celticPositions[i].grid;

      const label = document.createElement("div");
      label.className = "position-label";
      label.textContent = celticPositions[i].label;
      pos.appendChild(label);
    }

    spread.appendChild(pos);
    spreadPositions.push(pos);
  }

  displayFullDeck(tarotDeck);
  updateFinalAnalysis();
}

/* --- KÁRTYA KIVÁLASZTÁS --- */
function selectCard(card, cardDiv) {
  if (nextPosition >= spreadPositions.length) return;

  const target = spreadPositions[nextPosition];

  const img = document.createElement("img");
  img.src = card.image;

  const text = document.createElement("p");
  text.textContent = card.meaning;

  target.appendChild(img);
  target.appendChild(text);

  cardDiv.classList.add("used");
  selectedCards.push(card);
  nextPosition++;

  updateFinalAnalysis();
}

/* --- ÖSSZEGZŐ ELEMZÉS --- */
function updateFinalAnalysis() {
  const box = document.getElementById("finalAnalysis");

  if (selectedCards.length === 0) {
    box.textContent = "Még nincs kiválasztott kártya.";
    return;
  }

  const themes = selectedCards.map(c => c.meaning).join(" ");
  box.textContent =
    "A kirakás összképe azt mutatja, hogy az események egymásra épülnek. " +
    "A kártyák együttese egy fejlődési folyamatot jelez, ahol a korábbi tapasztalatok " +
    "meghatározzák a jelen döntéseit, és ezek hatással lesznek a jövő kimenetelére.";
}

/* --- INIT --- */
document.addEventListener("DOMContentLoaded", () => {
  const select = document.getElementById("spreadType");
  setupSpread(select.value);

  select.addEventListener("change", () => {
    setupSpread(select.value);
  });
});
