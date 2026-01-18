/* ==============================
   ÁLLAPOT
================================ */

let selectedCards = [];
let currentSpread = [];
let currentIndex = 0;

/* ==============================
   KIRAKÁS DEFINÍCIÓK
================================ */

function getSpreadPositions(type) {
  if (type === "three") {
    return [
      { key: "past", label: "Múlt" },
      { key: "present", label: "Jelen" },
      { key: "future", label: "Jövő" }
    ];
  }

  if (type === "celtic") {
    return [
      { key: "present", label: "Jelen helyzet" },
      { key: "challenge", label: "Akadály" },
      { key: "past", label: "Múlt" },
      { key: "future", label: "Közeljövő" },
      { key: "conscious", label: "Tudatos cél" },
      { key: "unconscious", label: "Tudattalan" },
      { key: "self", label: "Te magad" },
      { key: "environment", label: "Környezet" },
      { key: "hopes", label: "Remények / félelmek" },
      { key: "outcome", label: "Kimenetel" }
    ];
  }

  return [{ key: "one", label: "Üzenet" }];
}

/* ==============================
   RESET KIRAKÁS
================================ */

function resetSpread(type) {
  selectedCards = [];
  currentIndex = 0;
  currentSpread = getSpreadPositions(type);

  const spreadDiv = document.getElementById("spread");
  spreadDiv.innerHTML = "";
  spreadDiv.className = "";

  if (type === "celtic") {
    spreadDiv.classList.add("celtic");
  }

  currentSpread.forEach(pos => {
    const slot = document.createElement("div");
    slot.className = "spread-position";
    slot.dataset.key = pos.key;
    slot.innerHTML = `<div class="position-label">${pos.label}</div>`;
    spreadDiv.appendChild(slot);
  });

  document.getElementById("analysis").innerHTML = "";
  document.getElementById("finalAnalysis").innerHTML =
    "<em>Válaszd ki a szükséges kártyákat.</em>";
}

/* ==============================
   FULL PAKLI MEGJELENÍTÉS
================================ */

function displayFullDeck() {
  const container = document.getElementById("cards");
  container.innerHTML = "";

  tarotDeck.forEach(card => {
    const div = document.createElement("div");
    div.className = "card";

    const img = document.createElement("img");
    img.src = "cards/CardBacks.png";

    img.addEventListener("click", () => selectCard(card, div));

    div.appendChild(img);
    container.appendChild(div);
  });
}

/* ==============================
   KÁRTYA KIVÁLASZTÁS
================================ */

function selectCard(card, cardDiv) {
  if (currentIndex >= currentSpread.length) {
    alert("Minden pozíció betelt.");
    return;
  }

  cardDiv.classList.add("used");

  const position = currentSpread[currentIndex];
  const slot = document.querySelector(
    `.spread-position[data-key="${position.key}"]`
  );

  const img = document.createElement("img");
  img.src = card.image;
  slot.appendChild(img);

  selectedCards.push({ ...card, position: position.label });
  currentIndex++;

  updateAnalysis();
}

/* ==============================
   ELEMZÉS
================================ */

function updateAnalysis() {
  const analysisDiv = document.getElementById("analysis");
  analysisDiv.innerHTML = "";

  selectedCards.forEach(card => {
    const p = document.createElement("p");
    p.innerHTML = `<strong>${card.position} – ${card.name}</strong><br>${card.meaning}`;
    analysisDiv.appendChild(p);
  });

  if (selectedCards.length === currentSpread.length) {
    generateFinalAnalysis();
  }
}

/* ==============================
   ÖSSZEGZŐ ÉRTELMEZÉS (OFFLINE)
================================ */

function generateFinalAnalysis() {
  const keywords = selectedCards.flatMap(card => card.keywords || []);
  const unique = [...new Set(keywords)];

  let text = "A kirakás összképe alapján ";

  if (unique.includes("változás")) {
    text += "jelentős átalakulás előtt állsz. ";
  }
  if (unique.includes("döntés")) {
    text += "fontos döntéshelyzet körvonalazódik. ";
  }
  if (unique.includes("egyensúly")) {
    text += "az egyensúly megtalálása kulcskérdés. ";
  }

  text +=
    "A lapok együtt arra utalnak, hogy a jelenlegi helyzeted fejlődési lehetőséget hordoz.";

  document.getElementById("finalAnalysis").textContent = text;
}

/* ==============================
   ESEMÉNYEK
================================ */

document.addEventListener("DOMContentLoaded", () => {
  displayFullDeck();
  resetSpread(document.getElementById("spreadType").value);

  document
    .getElementById("spreadType")
    .addEventListener("change", e => resetSpread(e.target.value));
});
