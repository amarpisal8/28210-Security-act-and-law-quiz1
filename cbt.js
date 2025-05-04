let currentQuestion = 0;
let userAnswers = new Array(mcqTest.length).fill(null);

function showQuestion() {
  const q = mcqTest[currentQuestion];
  let html = `<p class="question-number">Question ${currentQuestion + 1} of ${mcqTest.length}</p>
              <h5>${q.question}</h5>`;
  
  for (let key in q.options) {
    html += `
      <div class="form-check">
        <input class="form-check-input" type="radio" name="option" id="${key}" value="${key}" 
        ${userAnswers[currentQuestion] === key ? 'checked' : ''}>
        <label class="form-check-label" for="${key}">${key}. ${q.options[key]}</label>
      </div>`;
  }

  document.getElementById('questionContainer').innerHTML = html;
  updateButtons();
}

function nextQuestion() {
  saveAnswer();
  if (currentQuestion < mcqTest.length - 1) {
    currentQuestion++;
    showQuestion();
  }
}

function prevQuestion() {
  saveAnswer();
  if (currentQuestion > 0) {
    currentQuestion--;
    showQuestion();
  }
}

function saveAnswer() {
  const selectedOption = document.querySelector('input[name="option"]:checked');
  if (selectedOption) {
    userAnswers[currentQuestion] = selectedOption.value;
  }
}

function updateButtons() {
  document.getElementById('prevBtn').disabled = currentQuestion === 0;
  document.getElementById('nextBtn').classList.toggle('d-none', currentQuestion === mcqTest.length - 1);
  document.getElementById('submitBtn').classList.toggle('d-none', currentQuestion !== mcqTest.length - 1);
}

function submitExam() {
  saveAnswer();
  document.querySelector('.card').classList.add('d-none');
  document.getElementById('resultContainer').classList.remove('d-none');

  let resultHTML = '';
  mcqTest.forEach((q, index) => {
    const userAns = userAnswers[index] || 'Not Attempted';
    const result = userAns === q.answer ? '✔️' : '❌';
    resultHTML += `<tr>
      <td>${index + 1}</td>
      <td>${userAns}</td>
      <td>${q.answer}</td>
      <td>${result}</td>
    </tr>`;
  });

  document.getElementById('resultTable').innerHTML = resultHTML;
}

showQuestion();
