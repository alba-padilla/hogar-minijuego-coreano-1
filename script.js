const formArea = document.getElementById("formArea");
const nameInput = document.getElementById("nameInput");
const emailInput = document.getElementById("emailInput");
const submitButton = document.getElementById("submitButton");

let finalScore = 0; // Se usará para guardar la puntuación final.

submitButton.addEventListener("click", () => {
  const nombre = nameInput.value.trim();
  const correo = emailInput.value.trim();

  if (!nombre || !correo) {
    alert("Por favor, completa todos los campos.");
    return;
  }

  // Aquí se envían los datos a Google Sheets.
  fetch("https://script.google.com/macros/s/AKfycbyFCbkLy-8ZpoxB3W2HlWmOiEABUyHybJLgJ4602ZhMpCtkNuJDunCIi3CJlzhkc_3uLQ/exec", {
    method: "POST",
    body: JSON.stringify({
      nombre,
      correo,
      puntuacion: finalScore, // La puntuación final del jugador.
      fecha: new Date().toISOString(),
    }),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then(response => {
      if (response.ok) {
        alert("¡Datos enviados correctamente!");
        formArea.style.display = "none";
        document.getElementById("gameArea").classList.add("active");
      } else {
        alert("Error al enviar los datos. Inténtalo nuevamente.");
      }
    })
    .catch(error => console.error("Error:", error));
});

// Actualiza finalScore al finalizar el juego:
function endGame() {
  finalScore = score; // Asigna la puntuación final.
  alert(`Tu puntuación final es ${finalScore}`);
  document.getElementById("gameArea").classList.remove("active");
  formArea.style.display = "flex";
}

