const tarotDeck = [
  {
    name: "A Bolond",
    image: "cards/fool.jpg",
    meaning: "Új kezdetek, szabadság, kockázatvállalás."
  },
  {
    name: "A Mágus",
    image: "cards/magician.jpg",
    meaning: "Teremtő erő, tudatosság, lehetőségek kiaknázása."
  },
  {
    name: "A Főpapnő",
    image: "cards/high_priestess.jpg",
    meaning: "Intuíció, belső tudás, rejtett igazságok."
  }
  // ide jön a teljes pakli (78 lap)
];

function drawCards() {
  const spreadSize = parseInt(document.getElementById("spread").value);
  const shuffled = [...tarotDeck].sort(() => 0.5 - Math.random());
  const selected = shuffled.slice(0, spreadSize);

  displayCards(selected);
  analyzeSpread(selected);
}

function displayCards(cards) {
  const container = document.getElementById("cards");
  container.innerHTML = "";

  cards.forEach(card => {
    const div = document.createElement("div");
    div.className = "card";
    div.innerHTML = `
      <img src="${card.image}">
      <h3>${card.name}</h3>
    `;
    container.appendChild(div);
  });
}

function analyzeSpread(cards) {
  const analysis = document.getElementById("analysis");
  let text = "<h2>Értelmezés</h2>";

  cards.forEach((card, index) => {
    text += `<p><strong>${positionName(cards.length, index)}:</strong>
             ${card.name} – ${card.meaning}</p>`;
  });

  text += `<p><em>Összegzés:</em> ${summary(cards)}</p>`;
  analysis.innerHTML = text;
}

function positionName(total, index) {
  if (total === 3) return ["Múlt", "Jelen", "Jövő"][index];
  if (total === 5)
    return ["Helyzet", "Kihívás", "Tudatos hatás", "Tudattalan hatás", "Kimenetel"][index];
  return "Üzenet";
}

function summary(cards) {
  return "A kirakás azt mutatja, hogy az események egy tudatosabb irányba haladnak, "
       + "ahol a belső megérzések és a döntések kulcsszerepet játszanak.";
}
