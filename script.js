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

// Actualiza finalScore al finalizar el juego.
function endGame() {
  finalScore = score; // Asigna la puntuación final.
  alert(`¡Felicidades! Has repasado todas las palabras.\nTu puntuación final es ${finalScore}.`);

  // Enviar los datos al Google Sheets al final del juego.
  enviarDatos(playerName, playerEmail, finalScore);
  
  document.getElementById("gameArea").style.display = "none"; // Oculta el área de juego
  formArea.style.display = "flex";  // Muestra nuevamente el formulario
}

// Función para enviar los datos al Web App de Google Apps Script
function enviarDatos(nombre, correo, puntuacion) {
  const url = "TU_URL_DEL_WEB_APP"; // Reemplaza con la URL de tu Web App de Google Apps Script

  const datos = {
    nombre: nombre,
    correo: correo,
    puntuacion: puntuacion
  };

  fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(datos)
  })
    .then(response => {
      if (!response.ok) {
        throw new Error(`Error en la solicitud: ${response.status}`);
      }
      return response.text();
    })
    .then(data => {
      console.log("Respuesta del servidor:", data);
      alert("¡Datos enviados correctamente!");
    })
    .catch(error => {
      console.error("Error al enviar los datos:", error);
      alert("Hubo un error al enviar los datos. Por favor, inténtalo de nuevo.");
    });
}

// Enviar puntaje en tiempo real cuando cambia.
function updateScore() {
  enviarDatos(playerName, playerEmail, score);
}

// Cuando el jugador abandona el juego o cierra la ventana, enviamos el puntaje.
window.addEventListener("beforeunload", () => {
  if (!gameAbandoned) {
    gameAbandoned = true;  // Indicamos que el jugador abandonó el juego
    enviarDatos(playerName, playerEmail, score);
  }
});

// Ejemplo de implementación: Llamar a enviarDatos() después de jugar
document.getElementById("guardar-puntuacion").addEventListener("click", function () {
  if (playerName && playerEmail && finalScore !== null) {
    enviarDatos(playerName, playerEmail, finalScore);
  } else {
    alert("Por favor, completa todos los campos antes de guardar.");
  }
});

// Función ficticia para calcular la puntuación (reemplázala con tu lógica real)
function calcularPuntuacion() {
  // Aquí implementas cómo se calcula la puntuación del juego
  return Math.floor(Math.random() * 100); // Ejemplo: puntuación aleatoria entre 0 y 100
}
