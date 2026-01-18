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
