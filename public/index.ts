export async function checkLoginStatus() {
    const res = await fetch('/api/auth/me', {
        credentials: 'include'
    });

    if (res.ok) {
        const user = await res.json();
        return user;
    } else {
        alert("Error, Must be register to create a quiz");
    }
};
