const correctPassword = "dia1"; // Contraseña
const webhookURL = "https://script.google.com/macros/s/AKfycbz0ADGlU5oVJglt6EpcqGSUx1E2QFm7u5ta0jd_UMMm4nkiOoPhi5ouIJvkuj_UZxEz8Q/exec"; // Reemplaza con la URL de tu webhook
let score = 0;

function checkPassword() {
  const input = document.getElementById("passwordInput").value;
  if (input === correctPassword) {
    document.getElementById("loginArea").classList.remove("active");
    document.getElementById("formArea").style.display = "block";
  } else {
    alert("Contraseña incorrecta.");
  }
}

document.getElementById("submitButton").addEventListener("click", () => {
  const name = document.getElementById("nameInput").value;
  const email = document.getElementById("emailInput").value;

  if (name && email) {
    document.getElementById("formArea").style.display = "none";
    document.getElementById("gameArea").style.display = "block";

    // Enviar datos iniciales al webhook
    const data = {
      name: name,
      email: email,
      score: score,
    };

    fetch(webhookURL, {
      method: "POST",
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" },
    })
      .then(response => response.json())
      .then(data => console.log("Datos guardados:", data))
      .catch(error => console.error("Error al guardar los datos:", error));
  } else {
    alert("Por favor, completa todos los campos.");
  }
});

function checkWord(element, selectedWord) {
  if (selectedWord === currentWord.korean) {
    element.classList.add("correct");
    score++;
    document.getElementById("score").textContent = `Puntuación: ${score}`;

    // Actualizar puntuación en el webhook
    const updateData = {
      name: name,
      email: email,
      score: score,
    };

    fetch(webhookURL, {
      method: "POST",
      body: JSON.stringify(updateData),
      headers: { "Content-Type": "application/json" },
    });

    setTimeout(generateWords, 500);
  } else {
    element.classList.add("incorrect");
  }
}
