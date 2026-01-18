function displayCards(cards) {
  const container = document.getElementById("cards");
  container.innerHTML = "";

  cards.forEach(card => {
    const cardDiv = document.createElement("div");
    cardDiv.className = "card";

    const innerDiv = document.createElement("div");
    innerDiv.className = "card-inner";

    // Hátlap
    const backDiv = document.createElement("div");
    backDiv.className = "card-back";
    const backImg = document.createElement("img");
    backImg.src = "cards/CardBacks.png";
    backDiv.appendChild(backImg);

    // Előlap
    const frontDiv = document.createElement("div");
    frontDiv.className = "card-front";
    const frontImg = document.createElement("img");
    // Ellenőrizni, Major vagy Minor mappa
    frontImg.src = card.type === "Major" 
      ? `cards/Major/${card.image}`
      : `cards/Minor/${card.image}`;

    const name = document.createElement("h3");
    name.textContent = card.name;

    const meaning = document.createElement("p");
    meaning.textContent = card.meaning;

    frontDiv.appendChild(frontImg);
    frontDiv.appendChild(name);
    frontDiv.appendChild(meaning);

    innerDiv.appendChild(backDiv);
    innerDiv.appendChild(frontDiv);
    cardDiv.appendChild(innerDiv);
    container.appendChild(cardDiv);

    // Flip esemény
    cardDiv.addEventListener("click", () => {
      cardDiv.classList.toggle("flipped");
    });
  });
}

// Meghívás
displayCards(tarotDeck);
