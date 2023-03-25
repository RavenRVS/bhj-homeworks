const timerSecs = document.getElementById('timer-secs');
const timerMins = document.getElementById('timer-mins');
const timerHours = document.getElementById('timer-hours');

const updateNumber = setInterval(() => {
    let secs = Number(timerSecs.textContent);
    let mins = Number(timerMins.textContent);
    let hours = Number(timerHours.textContent);
    if (secs > 0) {
        secs = secs - 1;
        timerSecs.textContent = ("0"+secs).slice(-2);
    } else if (secs === 0 && mins > 0) {
        mins  = mins - 1;
        timerMins.textContent = ("0"+mins).slice(-2);
        timerSecs.textContent = 59;
    } else if (secs === 0 && mins === 0 && hours > 0) {
        hours  = hours - 1;
        timerHours.textContent = ("0"+hours).slice(-2);
        timerMins.textContent = 59;
        timerSecs.textContent = 59;
    } else {
        clearInterval(updateNumber);
        document.getElementById('download-link').click()
    }
}, 1000);