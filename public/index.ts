export async function checkLoginStatus(): Promise<boolean> {
    try {
        const res = await fetch("/api/me", {
            credentials: "include",
        });

        const navButtons = document.getElementById("nav-buttons");

        if (res.ok) {
            if (navButtons) {
                navButtons.innerHTML = `
                    <button id="profileBtn">
                        <img src="/assets/profile-icon.png" alt="Profile" style="width: 30px; height: 30px; border-radius: 50%;" />
                    </button>
                `;

                document.getElementById("profileBtn")?.addEventListener("click", () => {
                    window.location.href = "./profile/index.html";
                });
            }
            return true;
        } else {
            if (navButtons) {
                navButtons.innerHTML = `
                    <a href="./login/index.html">
                        <button>Sign In</button>
                    </a>
                    <a href="./register/index.html">
                        <button>Sign Up</button>
                    </a>
                `;
            }
            return false;
        }
    } catch (err) {
        console.error("Error checking login status:", err);
        return false;
    }
}

export async function loadFeaturedQuizzes(): Promise<void> {
    try {
        const res = await fetch('/api/quizzes');
        if (!res.ok) throw new Error('Failed to fetch quizzes');

        const quizzes = await res.json();
        const quizList = document.getElementById('quiz-list');

        if (quizList) {
            quizList.innerHTML = quizzes.map((quiz) => `
                <article class="quiz-card">
                    <h3>${quiz.quizName}</h3>
                    <p>Category: ${quiz.category}</p>
                    <p>Rating: ${quiz.rating.toFixed(1)} ⭐</p>
                    <button onclick="window.location.href='/quizzes/${quiz._id}'">Play Quiz</button>
                </article>
            `).join('');
        }
    } catch (err) {
        console.error(err);
        const quizList = document.getElementById('quiz-list');
        if (quizList) {
            quizList.innerHTML = '<p class="error">Failed to load quizzes. Please try again later.</p>';
        }
    }
}
