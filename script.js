const formArea = document.getElementById("formArea");
const nameInput = document.getElementById("nameInput");
const emailInput = document.getElementById("emailInput");
const submitButton = document.getElementById("submitButton");

let finalScore = 0; // Se usará para guardar la puntuación final.
let playerName = ""; // Nombre del jugador.
let playerEmail = ""; // Email del jugador.

let gameAbandoned = false; // Para saber si el jugador abandonó el juego.

// Verifica la contraseña al ingresar.
document.getElementById("enterButton").addEventListener("click", checkPassword);
document.getElementById("passwordInput").addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    checkPassword();
  }
});

function checkPassword() {
  const input = document.getElementById("passwordInput").value;
  const correctPassword = "dia1";

  if (input === correctPassword) {
    document.getElementById("loginArea").classList.remove("active");
    formArea.style.display = "flex"; // Muestra el formulario después de ingresar la contraseña correctamente.
  } else {
    alert("Contraseña incorrecta.");
  }
}

submitButton.addEventListener("click", () => {
  const nombre = nameInput.value.trim();
  const correo = emailInput.value.trim();

  if (!nombre || !correo) {
    alert("Por favor, completa todos los campos.");
    return;
  }

  // Guarda los datos del jugador.
  playerName = nombre;
  playerEmail = correo;

  // Ocultar el formulario y mostrar el área del juego
  formArea.style.display = "none"; // Oculta el formulario
  document.getElementById("gameArea").style.display = "block"; // Muestra el área del juego

  startGame();
});

// Permitir que el botón "Jugar" también funcione con la tecla Enter
nameInput.addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    submitButton.click(); // Simula un clic en el botón "Jugar"
  }
});

emailInput.addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    submitButton.click(); // Simula un clic en el botón "Jugar"
  }
});

// Actualiza finalScore al finalizar el juego.
function endGame() {
  finalScore = score; // Asigna la puntuación final.
  alert(`¡Felicidades! Has repasado todas las palabras.\nTu puntuación final es ${finalScore}.`);

  // Enviar los datos al Google Sheets al final del juego.
  sendDataToGoogleSheets(finalScore);

  document.getElementById("gameArea").style.display = "none"; // Oculta el área de juego
  formArea.style.display = "flex"; // Muestra nuevamente el formulario
}

// Función que envía los datos a Google Sheets (se ejecuta en tiempo real y al final del juego).
function sendDataToGoogleSheets(score) {
  fetch("https://script.google.com/macros/s/AKfycbz0ADGlU5oVJglt6EpcqGSUx1E2QFm7u5ta0jd_UMMm4nkiOoPhi5ouIJvkuj_UZxEz8Q/exec", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: playerName, // Envía el nombre
      email: playerEmail, // Envía el correo
      score: score, // Envía la puntuación
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("Datos guardados con éxito:", data);
      if (data.success) {
        alert("¡Datos enviados correctamente!");
      }
    })
    .catch((error) => console.error("Error al guardar los datos:", error));
}

// Enviar puntaje en tiempo real cuando cambia.
function updateScore() {
  sendDataToGoogleSheets(score);
}

// Cuando el jugador abandona el juego o cierra la ventana, enviamos el puntaje.
window.addEventListener("beforeunload", () => {
  if (!gameAbandoned) {
    gameAbandoned = true; // Indicamos que el jugador abandonó el juego
    sendDataToGoogleSheets(score);
  }
});

