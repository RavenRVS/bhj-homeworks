const revealBox = document.querySelector('.reveal');

function isVisible(el) {
    const { top, bottom } = el.getBoundingClientRect();
    if (bottom < 0 || top > window.innerHeight) {
        return false;
    } else {
        return true;
    };
};

function switchActive(el, status) {
    if (isVisible(el)) {
        el.classList.add(status);
    } else {
        el.classList.remove(status);
    };
};

window.addEventListener('scroll', () => switchActive (revealBox, 'reveal_active'));
