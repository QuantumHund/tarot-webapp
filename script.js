/*************************
 * ÁLLAPOT
 *************************/

let currentSpread = [];
let selectedCards = [];
let currentIndex = 0;

/*************************
 * KIRAKÁS DEFINÍCIÓK
 *************************/

function getSpread(type) {
  if (type === "three") {
    return [
      { label: "Múlt" },
      { label: "Jelen" },
      { label: "Jövő" }
    ];
  }

  if (type === "celtic") {
    return [
      { label: "Jelen helyzet" },
      { label: "Akadály" },
      { label: "Múlt" },
      { label: "Közeljövő" },
      { label: "Tudatos cél" },
      { label: "Tudattalan" },
      { label: "Te magad" },
      { label: "Környezet" },
      { label: "Remények / félelmek" },
      { label: "Kimenetel" }
    ];
  }

  return [{ label: "Üzenet" }];
}

/*************************
 * KIRAKÁS RESET
 *************************/

function resetSpread() {
  const type = document.getElementById("spreadType").value;

  currentSpread = getSpread(type);
  selectedCards = [];
  currentIndex = 0;

  const spreadDiv = document.getElementById("spread");
  spreadDiv.innerHTML = "";
  spreadDiv.className = "";

  currentSpread.forEach(pos => {
    const slot = document.createElement("div");
    slot.className = "spread-position";
    slot.innerHTML = `<div class="position-label">${pos.label}</div>`;
    spreadDiv.appendChild(slot);
  });

  document.getElementById("analysis").innerHTML = "";
  document.getElementById("finalAnalysis").innerHTML =
    "<em>Válassz kártyákat a pakliból.</em>";

  // pakli újra kattintható
  document.querySelectorAll(".card").forEach(c => c.classList.remove("used"));
}

/*************************
 * FULL PAKLI MEGJELENÍTÉS
 *************************/

function displayDeck() {
  const container = document.getElementById("cards");
  container.innerHTML = "";

  tarotDeck.forEach(card => {
    const div = document.createElement("div");
    div.className = "card";

    const img = document.createElement("img");
    img.src = "cards/CardBacks.png";
    img.alt = card.name;
    img.style.cursor = "pointer";

    img.addEventListener("click", () => {
      selectCard(card, div);
    });

    div.appendChild(img);
    container.appendChild(div);
  });
}

/*************************
 * KÁRTYA KIVÁLASZTÁS
 *************************/

function selectCard(card, cardDiv) {
  if (cardDiv.classList.contains("used")) return;

  if (currentIndex >= currentSpread.length) {
    alert("Minden pozíció betelt.");
    return;
  }

  cardDiv.classList.add("used");

  const spreadSlots = document.querySelectorAll(".spread-position");
  const slot = spreadSlots[currentIndex];

  const img = document.createElement("img");
  img.src = card.image;
  img.alt = card.name;

  slot.appendChild(img);

  selectedCards.push({
    name: card.name,
    meaning: card.meaning,
    position: currentSpread[currentIndex].label
  });

  currentIndex++;
  updateAnalysis();
}

/*************************
 * ELEMZÉS
 *************************/

function updateAnalysis() {
  const analysis = document.getElementById("analysis");
  analysis.innerHTML = "";

  selectedCards.forEach(card => {
    const p = document.createElement("p");
    p.innerHTML = `<strong>${card.position} – ${card.name}</strong><br>${card.meaning}`;
    analysis.appendChild(p);
  });

  if (selectedCards.length === currentSpread.length) {
    generateFinalAnalysis();
  }
}

/*************************
 * ÖSSZEGZŐ ÉRTELMEZÉS
 *************************/

function generateFinalAnalysis() {
  let text = "A kirakás összességében azt mutatja, hogy ";

  const meanings = selectedCards.map(c => c.meaning.toLowerCase()).join(" ");

  if (meanings.includes("változás")) {
    text += "jelentős változás van kibontakozóban. ";
  }
  if (meanings.includes("döntés")) {
    text += "fontos döntés előtt állsz. ";
  }
  if (meanings.includes("erő")) {
    text += "belső erődre támaszkodhatsz. ";
  }

  text += "A lapok együtt fejlődési irányt és tanulási lehetőséget jeleznek.";

  document.getElementById("finalAnalysis").textContent = text;
}

/*************************
 * INIT
 *************************/

document.addEventListener("DOMContentLoaded", () => {
  if (!window.tarotDeck) {
    alert("A tarotDeck nem töltődött be!");
    return;
  }

  displayDeck();
  resetSpread();

  document
    .getElementById("spreadType")
    .addEventListener("change", resetSpread);
});
