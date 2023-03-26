document.getElementById('modal_main').classList.add('modal_active');
Array.from(document.getElementsByClassName('modal__close')).forEach((modal) => modal.onclick = () => {
    modal.closest('.modal').classList.remove('modal_active');
});
const goodBtn = document.querySelector('.show-success');
goodBtn.onclick = () => {
    document.getElementById('modal_success').classList.add('modal_active');
    goodBtn.closest('.modal').classList.remove('modal_active');
};