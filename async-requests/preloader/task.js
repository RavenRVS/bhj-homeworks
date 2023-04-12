const loader = document.getElementById("loader");
const items = document.getElementById("items");
let localValuteList = JSON.parse(localStorage.getItem("localValueList"));
let xhr = new XMLHttpRequest();

xhr.addEventListener('readystatechange', () => {
    if (xhr.readyState === xhr.OPENED) {
        if (localValuteList != null) {
            loader.classList.remove('loader_active');
            addValuteInItems(localValuteList);
        }
    }
    if (xhr.readyState === xhr.DONE) {
        loader.classList.remove('loader_active');
        items.innerHTML = '';
        let res = JSON.parse(xhr.response);
        let valuteList = res.response.Valute;
        updateLocalValuteList(valuteList);
        addValuteInItems(valuteList);
    }
})

xhr.open('GET', 'https://students.netoservices.ru/nestjs-backend/slow-get-courses');

xhr.send();

function addValuteInItems (valuteList) {
    for (let key in valuteList) {
        let item = document.createElement('div');
        item.classList.add('item');
        items.appendChild(item);
        item.insertAdjacentHTML('afterBegin', `
            <div class="item__code">${valuteList[key]['CharCode']}</div>
            <div class="item__value">${valuteList[key]['Value']}</div>
            <div class="item__currency">руб.</div>
        `);
    }
}

function updateLocalValuteList (valuteList) {
    localStorage.setItem("localValueList", JSON.stringify(valuteList));
} 