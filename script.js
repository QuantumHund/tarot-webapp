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
    img.src = "cards/CardBacks.png"; // kezdetben hátlap

    const name = document.createElement("h3");
    name.textContent = card.name;
    name.style.display = "none";

    const meaning = document.createElement("p");
    meaning.textContent = getTopicAnalysis(card, document.getElementById("question").value || "");
    meaning.style.display = "none";

    // Kattintás: felfordul és “lehúzódik”
    img.addEventListener("click", () => {
      img.src = card.image;          // előlap
      name.style.display = "block";
      meaning.style.display = "block";
      div.classList.add("selected"); // kicsit lejjebb tolás
    });

    div.appendChild(img);
    div.appendChild(name);
    div.appendChild(meaning);
    container.appendChild(div);
  });
}

// ------------------------
// Témakör alapú elemzés
// ------------------------
function getTopicAnalysis(card, topic) {
  topic = topic.toLowerCase();

  if(topic.includes("szerelem")) {
    return `${card.name}: érzelmi fejlődés, kapcsolatban való helyzet.`;
  } else if(topic.includes("munka") || topic.includes("karrier")) {
    return `${card.name}: munka, karrier, lehetőségek és akadályok.`;
  } else if(topic.includes("pénz")) {
    return `${card.name}: pénzügyek, anyagi helyzet, döntések.`;
  } else {
    return `${card.name}: ${card.meaning || "Általános jelentés."}`;
  }
}

// ------------------------
// Init
// ------------------------
document.addEventListener("DOMContentLoaded", () => {
  displayFullDeck(tarotDeck); // teljes pakli megjelenítése
});
