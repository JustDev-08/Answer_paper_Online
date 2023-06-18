const answerForm = document.getElementById('answerForm');
const answerTable = document.getElementById('answerTable');
const maxRow = document.getElementById('maxRow')
answerForm.addEventListener('submit', function(event) {
    event.preventDefault();

    const numChoices = parseInt(document.getElementById('numChoices').value);
    const numQuestions = parseInt(document.getElementById('numQuestions').value);
    const NumberColumn = parseInt(document.getElementById('NumberColumn').value)
    const maxRow = Math.ceil(numQuestions / NumberColumn)
    generateAnswerTable(numChoices, numQuestions , maxRow);

    const formData = new FormData(answerForm);
    const answers = {};

    for (const [name, value] of formData.entries()) {
        answers[name] = value;
    }

    // Perform any necessary form validation or processing

    // Submit the form data to a server or perform any other actions

    // Clear form fields or display success message
});

function generateAnswerTable(numChoices, numQuestions, maxRow) {
    answerTable.innerHTML = '';
    const tbody = document.createElement('tbody');

    for (let i = 1; i <= maxRow ; i++) {
        let Column = Math.ceil(numQuestions / maxRow)
        const questionRow = document.createElement('tr');
        for (let j = 0 ; j < Column ; j++) {
            if (i + maxRow * j <= numQuestions) {
                const tdQuestionNumber = document.createElement('td');
            tdQuestionNumber.textContent = i + maxRow * j;
            questionRow.appendChild(tdQuestionNumber);
    
            const tdAnswer = document.createElement('td');
    
            const answerRow = document.createElement('div');
            answerRow.className = 'answer-row';
    
            for (let k = 1; k <= numChoices; k++) {
                const label = document.createElement('label');
                const choiceInput = document.createElement('input');
                choiceInput.type = 'radio';
                choiceInput.name = 'answer' +( i + maxRow*j);
                choiceInput.value = String.fromCharCode(64 + k); // Convert to corresponding alphabet (A, B, C, ...)
                choiceInput.addEventListener('change', handleChoiceSelection);
                label.appendChild(choiceInput);
                label.appendChild(document.createTextNode(String.fromCharCode(64 + k)));
    
                answerRow.appendChild(label);
            }
    
            tdAnswer.appendChild(answerRow);
            questionRow.appendChild(tdAnswer);
            tbody.appendChild(questionRow);
            }
        }
 
    }

    answerTable.appendChild(tbody);
}

function handleChoiceSelection(event) {
    const selectedChoice = event.target;
    const selectedLabel = selectedChoice.parentNode;

    const labels = selectedLabel.parentNode.querySelectorAll('label');
    labels.forEach(label => {
        label.classList.remove('selected');
    });

    if (selectedChoice.checked) {
        selectedLabel.classList.add('selected');
    }
}

// Get all the answer rows
const answerRows = document.querySelectorAll('.answer-row');

// Add click event listener to each answer row
answerRows.forEach((row) => {
    const radioInput = row.querySelector('input[type="radio"]');
    const circleLabel = row.querySelector('label');

    circleLabel.addEventListener('click', () => {
        radioInput.checked = true;

        // Remove "checked" class from all answer rows
        answerRows.forEach((row) => {
            row.classList.remove('checked');
        });

        // Add "checked" class to the selected answer row
        row.classList.add('checked');
    });
});
