// Mostrar / ocultar senha
const togglePassword = document.getElementById("togglePassword");
const passwordInput = document.getElementById("password");

togglePassword.addEventListener("click", () => {
    const type = passwordInput.getAttribute("type");
    passwordInput.setAttribute("type", type === "password" ? "text" : "password");

    togglePassword.classList.toggle("fa-eye");
    togglePassword.classList.toggle("fa-eye-slash");
});
