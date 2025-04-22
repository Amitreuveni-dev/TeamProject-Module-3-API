export const form = document.getElementById("register-form");

window.onload = () => {
  if (form) {
    form.addEventListener("submit", async (e) => {
      e.preventDefault();

      const emailInput = document.getElementById("email") as HTMLInputElement;
      const usernameInput = document.getElementById("username") as HTMLInputElement;
      const passwordInput = document.getElementById("password") as HTMLInputElement;
      const confirmPasswordInput = document.getElementById("confirmedPassword") as HTMLInputElement;

      if (!emailInput || !usernameInput || !passwordInput || !confirmPasswordInput) {
        console.error("One or more form elements not found");
        return;
      }

      const email = emailInput.value;
      const username = usernameInput.value;
      const password = passwordInput.value;
      const confirmPassword = confirmPasswordInput.value;

      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          username,
          password,
          confirmPassword,
        }),
      });

      if (res.ok) {
        alert("Registration successful!");
        window.location.href = "/login";
      } else {
        const data = await res.json();
        alert(data.message || "Registration failed");
      }
    });
  } else {
    console.error("Register form not found");
  }
};
