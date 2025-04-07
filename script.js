
// Obtener usuarios desde localStorage o crear default
function getUsers() {
  return JSON.parse(localStorage.getItem("erp_users")) || {
    "admin": "admin123",
    "usuario1": "clave1"
  };
}

function saveUsers(users) {
  localStorage.setItem("erp_users", JSON.stringify(users));
}

document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("loginForm");
  const registerForm = document.getElementById("registerForm");

  // Login
  if (loginForm) {
    loginForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const username = document.getElementById("username").value;
      const password = document.getElementById("password").value;
      const users = getUsers();

      if (users[username] && users[username] === password) {
        localStorage.setItem("erp_user", username);
        window.location.href = "dashboard.html";
      } else {
        alert("Usuario o contraseña incorrectos.");
      }
    });
  }

  // Registro
  if (registerForm) {
    registerForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const username = document.getElementById("newUsername").value;
      const password = document.getElementById("newPassword").value;
      const users = getUsers();

      if (users[username]) {
        alert("El usuario ya existe. Elige otro.");
        return;
      }

      if (password.length < 6) {
        alert("La contraseña debe tener al menos 6 caracteres.");
        return;
      }

      users[username] = password;
      saveUsers(users);
      alert("Usuario registrado correctamente. Ya puedes iniciar sesión.");
      window.location.href = "index.html";
    });
  }

  // Protege el dashboard
  if (window.location.pathname.includes("dashboard.html")) {
    const user = localStorage.getItem("erp_user");
    if (!user) {
      window.location.href = "index.html";
    }
  }
});

function logout() {
  localStorage.removeItem("erp_user");
  window.location.href = "index.html";
}
