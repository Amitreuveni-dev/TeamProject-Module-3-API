export async function checkLoginStatus() {
    const res = await fetch('/api/auth/me', {
        credentials: 'include'
    });

    if (res.ok) {
        const user = await res.json();
        return true;
    } else {
        alert("Error, Must be register to create a quiz");
        return false;
    }
};

export async function loadFeaturedQuizzes(): Promise<void> {
    try {
        const res = await fetch('/api/quizzes');
        if (!res.ok) throw new Error('Failed to fetch quizzes');

        const quizzes = await res.json();
        const quizList = document.getElementById('quiz-list');

        if (quizList) {
            quizList.innerHTML = quizzes.map((quiz: { _id: string; quizName: string; category: string; rating: number }) => `
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