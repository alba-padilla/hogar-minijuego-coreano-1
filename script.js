const formArea = document.getElementById("formArea");
const nameInput = document.getElementById("nameInput");
const emailInput = document.getElementById("emailInput");
const submitButton = document.getElementById("submitButton");

let finalScore = 0; // Se usará para guardar la puntuación final.
let playerName = ""; // Nombre del jugador.
let playerEmail = ""; // Email del jugador.

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
  formArea.style.display = "none";  // Ahora oculta el formulario
  document.getElementById("gameArea").style.display = "block";  // Muestra el área del juego

  startGame();
});

// Permitir que el botón "Jugar" también funcione con la tecla Enter
nameInput.addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    submitButton.click();  // Simula un clic en el botón "Jugar"
  }
});

emailInput.addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    submitButton.click();  // Simula un clic en el botón "Jugar"
  }
});

// Aquí se envían los datos a Google Sheets.
fetch("https://script.google.com/macros/s/AKfycbyFCbkLy-8ZpoxB3W2HlWmOiEABUyHybJLgJ4602ZhMpCtkNuJDunCIi3CJlzhkc_3uLQ/exec", {
  method: "POST",
  body: JSON.stringify({
    nombre: playerName,
    correo: playerEmail,
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
      document.getElementById("gameArea").style.display = "block";  // Asegura que se muestre el área del juego
      startGame(); // Inicia el juego después de enviar los datos correctamente.
    } else {
      alert("Error al enviar los datos. Inténtalo nuevamente.");
    }
  })
  .catch(error => console.error("Error:", error));

// Actualiza finalScore al finalizar el juego.
function endGame() {
  finalScore = score; // Asigna la puntuación final.
  alert(`¡Felicidades! Has repasado todas las palabras.\nTu puntuación final es ${finalScore}.`);
  document.getElementById("gameArea").style.display = "none"; // Oculta el área de juego
  formArea.style.display = "flex";  // Muestra nuevamente el formulario
}


