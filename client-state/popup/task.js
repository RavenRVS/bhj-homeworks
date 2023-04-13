const subscribeModal = document.getElementById('subscribe-modal');

function getCookie (name) {
    const pairs = document.cookie.split('; ');
    const cookie = pairs.find(p => p.startsWith(name + '='));
    if (cookie) {
        return cookie.substring(name.length + 1,);
    }
}

function setCookie (name, value) {
    document.cookie = encodeURIComponent(name) + '=' + encodeURIComponent(value);
}

if (!getCookie('modal')) {
    subscribeModal.classList.add('modal_active');
    setCookie('modal', 'viewed')
    subscribeModal.onclick = (e) => {
        if (e.target.classList.contains('modal__close_times')){
            e.currentTarget.classList.remove('modal_active')
        };
    }
}