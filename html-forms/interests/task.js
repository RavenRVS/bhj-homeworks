const interestMain = document.querySelector('.interests_main');
const allCheckboxs = document.querySelectorAll('.interest__check');

allCheckboxs.forEach(el => {
    el.addEventListener('change', setCheck);
});

function setCheck (e) {
    if (e.currentTarget.checked) {
        setChildCheckbox(e.currentTarget, true);
        setParenCheckbox(e.currentTarget, true);
    } else if (!e.currentTarget.checked) {
        setChildCheckbox(e.currentTarget, false);
        setParenCheckbox(e.currentTarget, false);
    };
}

function setChildCheckbox (checkbox, status) {
    const currentLi = checkbox.closest('.interest');
    const childCheckboxsList = currentLi.querySelectorAll('.interest__check');
    childCheckboxsList.forEach(el => {
        el.checked = status;
    })
}

function setParenCheckbox (checkbox) {
    const parentLi = checkbox.closest('.interests').closest('.interest')
    if (parentLi !== null) {
        let listChildCheckStatus = [0, 0];
        let listChekbox = parentLi.querySelectorAll('.interest__check');
        let parentInput = parentLi.querySelector('.interest__check');
        listChekbox.forEach((el, index) => {
            if (index == 0) {
                return;
            };
            if (!el.checked) {
                ++listChildCheckStatus[1];
            } else if (el.checked) {
                ++listChildCheckStatus[0];
            };
        });
        if (listChildCheckStatus[0] > 0 && listChildCheckStatus[1] == 0) {
            parentInput.indeterminate = false;
            parentInput.checked = true;
        } else if (listChildCheckStatus[1] > 0 && listChildCheckStatus[0] == 0) {
            parentInput.indeterminate = false;
            parentInput.checked = false;
        } else {
            parentInput.checked = true;
            parentInput.indeterminate = true;
        };
        setParenCheckbox (parentLi);
    };
};