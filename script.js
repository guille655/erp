
const users = {
  "admin": "admin123",
  "usuario1": "clave1",
  "usuario2": "clave2"
};

document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("loginForm");
  if (loginForm) {
    loginForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const username = document.getElementById("username").value;
      const password = document.getElementById("password").value;

      if (users[username] && users[username] === password) {
        localStorage.setItem("erp_user", username);
        window.location.href = "dashboard.html";
      } else {
        alert("Usuario o contraseña incorrectos.");
      }
    });
  } else {
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
