const rotator = document.querySelector('.rotator');

function runRotator (rotator) {
    let index = 0;
    const casesList = rotator.querySelectorAll('.rotator__case');
    (function setParam () {
        casesList.forEach(element => {
            element.classList.remove('rotator__case_active')
        });
        casesList[index].style.color = casesList[index].dataset.color;
        casesList[index].classList.add('rotator__case_active');
        ++index;
        if (index >= casesList.length) {
            index = 0;
        };
        speed = casesList[index].dataset.speed;
        setTimeout(setParam, speed);
    })();
};

runRotator(rotator);