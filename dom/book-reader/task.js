const bookControl = document.querySelectorAll('.book__control');
const bookContent = document.querySelector('.book__content');

function setNewParam (index, e) {
    e.preventDefault();
    let paramForSet;
    let currentBookControl = e.currentTarget.closest('.book__control');
    if (currentBookControl.classList.contains('book__control_font-size')) {
        paramForSet = switchActive(currentBookControl, index, '.font-size', 'font-size_active');
        bookContent.classList.remove('book_fs-small', 'book_fs-big')
        if (paramForSet.size === 'big') {
            bookContent.classList.add('book_fs-big');
        } else if (paramForSet.size === 'small') {
            bookContent.classList.add('book_fs-small');
        };        
    } else if (currentBookControl.classList.contains('book__control_color')) {
        paramForSet = switchActive(currentBookControl, index, '.color', 'color_active');
        bookContent.classList.remove('book_color-gray', 'book_color-whitesmoke', 'book_color-black')
        if (paramForSet.textColor === 'black') {
            bookContent.classList.add('book_color-black');
        } else if (paramForSet.textColor === 'gray') {
            bookContent.classList.add('book_color-gray');
        } else if (paramForSet.textColor === 'whitesmoke') {
            bookContent.classList.add('book_color-whitesmoke');
        }; 
    }  else if (currentBookControl.classList.contains('book__control_background')) {
        paramForSet = switchActive(currentBookControl, index, '.color', 'color_active');
        bookContent.classList.remove('book_bg-gray', 'book_bg-black', 'book_bg-white')
        if (paramForSet.bgColor === 'black') {
            bookContent.classList.add('book_bg-black');
        } else if (paramForSet.bgColor === 'gray') {
            bookContent.classList.add('book_bg-gray');
        } else if (paramForSet.bgColor === 'white') {
            bookContent.classList.add('book_bg-white');
        }; 
    };
};

function switchActive (bookControl, index, itemClass, classActive) {
    const currentListParam = bookControl.querySelectorAll(itemClass);
    currentListParam.forEach(param => {
        param.classList.remove(classActive);
    });
    currentListParam[index].classList.add(classActive);
    let dataSet = currentListParam[index].dataset;
    console.log(dataSet)
    return dataSet
};

bookControl.forEach(element => {
    let listParam = element.querySelectorAll('a');
    listParam.forEach((param, index) => {
        param.addEventListener('click', setNewParam.bind(null, index));
    });
});

