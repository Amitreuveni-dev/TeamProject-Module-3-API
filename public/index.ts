export async function checkLoginStatus() {
    const res = await fetch("/api/me", {
        credentials: 'include'
    });

    if (res.ok) {
        return true;
    } else {
        alert("Error, Must be register to create a quiz");
        return false;
    }
};
