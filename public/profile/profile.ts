export async function getProfileData() {
    try {
        const res = await fetch('/api/me', {
            method: 'GET',
            credentials: 'include'
        });

        if (!res.ok) {
            throw new Error("Failed to fetch user data");
        }

        const user = await res.json();

        const profileDiv = document.getElementById('profile-info') as HTMLElement;
        profileDiv.innerHTML = `
            <h2>Welcome, ${user.username}!</h2>
            <p>Email: ${user.email}</p>
            <p>Joined: ${new Date(user.createdAt).toLocaleDateString()}</p>
        `;
    } catch (error) {
        console.error('Error fetching profile data:', error);
        const profileDiv = document.getElementById('profile-info') as HTMLElement;
        profileDiv.innerHTML = `<p>Error fetching profile data. Please log in again.</p>`;
    }
}
