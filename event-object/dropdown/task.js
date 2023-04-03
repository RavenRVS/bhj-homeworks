const dropdownBtn = document.querySelector('.dropdown__value');

function getDropdown (evt) {
    let list1 = evt.target.closest('.dropdown')
    let list = list1.querySelector('.dropdown__list');
    if (list.classList.contains('dropdown__list_active')) {
        list.classList.remove('dropdown__list_active');
    } else {
        list.classList.add('dropdown__list_active');
    }
}

function getNewValue (evt) {
    evt.preventDefault();
    const btnWithValue = this.closest('.dropdown').querySelector('.dropdown__value');
    btnWithValue.textContent = this.querySelector('.dropdown__link').textContent;
    this.closest('.dropdown__list').classList.remove('dropdown__list_active')
   
}

dropdownBtn.addEventListener('click', getDropdown);

const allItemsOfList = dropdownBtn.closest('.dropdown').querySelectorAll('.dropdown__item');
allItemsOfList.forEach((item) => {
    item.addEventListener('click', getNewValue);
});
