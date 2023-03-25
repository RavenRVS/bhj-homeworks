const img = document.getElementById('cookie');
const clicker = document.getElementById('clicker__counter');
const speedClick = document.getElementById('clicker__speed');
let countClick = Number(clicker.textContent);
let lastClickTime = 0;
let speedClickResult = 0

img.onclick = () => {
    let currentClickTime = new Date();
    if (lastClickTime !== 0) {
        speedClickResult = 1000/(currentClickTime - lastClickTime);
    }
        countClick++;
    if (countClick%2 == 0) {
        img.width /= 1.2;
    } else {
        img.width *= 1.2;
    }
    lastClickTime = currentClickTime;
    clicker.textContent = countClick;
    speedClick.textContent = speedClickResult.toFixed(2);
}
