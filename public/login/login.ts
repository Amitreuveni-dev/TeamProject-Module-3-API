export const form = document.getElementById("login-form") as HTMLFormElement;

document.addEventListener("DOMContentLoaded", () => {
  if (form) {
    form.addEventListener("submit", async (e) => {
      e.preventDefault();

      const email = (document.getElementById("email") as HTMLInputElement).value;
      const password = (document.getElementById("password") as HTMLInputElement).value;

      const res = await fetch("/login", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      if (res.ok) {
        window.location.href = "/";
      } else {
        const data = await res.json();
        alert(data.message || "Login failed");
      }
    });
  } else {
    console.error("Form not found in login.ts");
  }
});
