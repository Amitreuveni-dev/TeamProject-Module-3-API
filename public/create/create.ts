export type Question = {
    text: string;
    options: string[];
    correctAnswer: number;
  };
  
  export type Quiz = {
    title: string;
    category: string;
    questions: Question[];
  };
  
  const form = document.forms.namedItem("createQuiz-form") as HTMLFormElement;
  const addQuestionBtn = document.getElementById("add-question") as HTMLButtonElement;
  
  let questions: Question[] = [];
  
  form?.addEventListener("submit", async (e) => {
    e.preventDefault();
    const formData = new FormData(form);
  
    const title = formData.get("title")?.toString() || "";
    const category = formData.get("category")?.toString() || "";
  
    const quiz: Quiz = {
      title,
      category,
      questions,
    };
  
    const res = await fetch("/api/quizzes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(quiz),
    });
  
    if (res.ok) {
      alert("Quiz created successfully");
      window.location.href = "/profile.html";
    } else {
      alert("Failed to create quiz");
    }
  });
  
  addQuestionBtn?.addEventListener("click", (e) => {
    e.preventDefault();
    const questionTextInput = document.querySelector<HTMLInputElement>('input[name="question"]');
    const optionInputs = [
      document.querySelector<HTMLInputElement>('input[name="option1"]'),
      document.querySelector<HTMLInputElement>('input[name="option2"]'),
      document.querySelector<HTMLInputElement>('input[name="option3"]'),
      document.querySelector<HTMLInputElement>('input[name="option4"]'),
    ];
    const correctAnswerInput = document.querySelector<HTMLInputElement>('input[name="correctAnswer"]:checked');
  
    if (!questionTextInput || !correctAnswerInput || optionInputs.some((input) => !input)) {
      alert("Please fill out the entire question");
      return;
    }
  
    const question: Question = {
      text: questionTextInput.value,
      options: optionInputs.map((input) => input!.value),
      correctAnswer: Number(correctAnswerInput.value),
    };
  
    questions.push(question);
  
    questionTextInput.value = "";
    optionInputs.forEach((input) => input!.value = "");
    (correctAnswerInput as HTMLInputElement).checked = false;
  
    alert("Question added");
  });
  