const pollTitle = document.getElementById('poll__title');
const pollAnswers = document.getElementById('poll__answers');
let xhr = new XMLHttpRequest();

xhr.addEventListener('readystatechange', () => {
    if (xhr.readyState === xhr.DONE) {
        let response = JSON.parse(xhr.response);
        if (response.data != undefined) {
            showPoll(response, 'answers');
        } else if (response.stat != undefined) {
            showPoll(response, 'votes');
        }
    }
});

xhr.open('GET', 'https://students.netoservices.ru/nestjs-backend/poll');

xhr.send()

function showPoll (res, type) {
    if (type == 'answers') {
        pollTitle.textContent = res['data']['title'];
        pollAnswers.dataset.id = res['id'];
        let pollAnswerList = res['data']['answers'];
        pollAnswerList.forEach(textAnswer => {
            let answer = document.createElement('button');
            answer.classList.add('poll__answer');
            answer.textContent = textAnswer;
            pollAnswers.appendChild(answer);
            answer.addEventListener('click', sendAnswer);
        });
    } else if (type == 'votes') {
        let resultList = res['stat'];
        pollAnswers.innerHTML = '';
        let allVotes = resultList.reduce((sum, elem) => {
            return sum + elem['votes'];
        }, 0)
        resultList.forEach(el => {
            let result = document.createElement('div');
            pollAnswers.appendChild(result);
            let votesInProcent = el["votes"]/allVotes*100
            result.insertAdjacentHTML('afterbegin', `
                <span>${el["answer"]}: </span>
                <span style="font-weight:bold">${votesInProcent.toFixed(2)}%</span>
            `)
        })
    }
}

function sendAnswer(e) {
    alert('Спасибо, ваш голос засчитан!')
    let listTextAnswers = Array.from(e.target.closest('.poll__answers').querySelectorAll('.poll_answer'));
    let indexAnswer = listTextAnswers.indexOf(e.target.textContent);
    xhr.open( 'POST', 'https://students.netoservices.ru/nestjs-backend/poll' );
    xhr.setRequestHeader( 'Content-type', 'application/x-www-form-urlencoded' );
    xhr.send( `vote=${pollAnswers.dataset.id}&answer=${indexAnswer}` );
}