const signin = document.getElementById('signin');
const welcome = document.getElementById('welcome');
const userId = document.getElementById('user_id');
const signinForm = document.getElementById('signin__form');
const signoutBtn = document.getElementById('signout__btn');
let localId = localStorage.getItem('userId');

function sendForm(e) {
    e.preventDefault();
    let formData = new FormData(e.currentTarget);
    let xhr = new XMLHttpRequest();

    xhr.open("POST", "https://students.netoservices.ru/nestjs-backend/auth");
    xhr.send(formData);

    xhr.onload = (e) => {
        if (xhr.status == 201) {
            handlerEvent(xhr.response);
        } else {
            alert('Ошибка отправки данных');
            signinForm.reset();
        }
    }
}

function handlerEvent (response) {
    try {
        let res = JSON.parse(response);
        if (res["success"]) {
            localStorage.setItem('userId', res["user_id"])
            isSign(res["user_id"]);
        } else if (!res["success"]) {
            alert('Неверный логин/пароль');
            signinForm.reset();
        }
    } catch (e) {
        console.log('Ошибка десериализации')
        return null
    }
}

function isSign(id) {
    signin.classList.remove('signin_active');
    welcome.classList.add('welcome_active');
    signoutBtn.classList.add('btn__signout_active')
    userId.textContent = id;
}

function doSignout () {
    signinForm.reset();
    signin.classList.add('signin_active');
    welcome.classList.remove('welcome_active');
    signoutBtn.classList.remove('btn__signout_active')
    localStorage.removeItem('userId')
}

if (localId) {
    isSign(localId)
}

signinForm.addEventListener("submit", sendForm);
signoutBtn.addEventListener('click', doSignout);

