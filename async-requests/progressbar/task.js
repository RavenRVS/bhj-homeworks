const progressBar = document.getElementById('progress');
const form = document.getElementById('form');

form.addEventListener('submit', (e) => {
    e.preventDefault();
    runXHRFormData(form)
    
})

function runXHRFormData(form) {
    const xhr = new XMLHttpRequest();
    const formData = new FormData()
    addListeners(xhr)
    xhr.open("POST", 'https://students.netoservices.ru/nestjs-backend/upload');
    xhr.send(form);
    return xhr;
}

function addListeners(xhr) {
    // xhr.addEventListener('loadstart', handleEvent);
    // xhr.addEventListener('load', handleEvent);
    // xhr.addEventListener('loadend', handleEvent);
    xhr.addEventListener('progress', setValueProgressBar);
    // xhr.addEventListener('error', handleEvent);
    // xhr.addEventListener('abort', handleEvent);
}

function setValueProgressBar(e) {
    progressBar.value = e.loaded / e.total;
}

// function handleEvent(e) {
//     console.log(`${e.type}: ${e.loaded} bytes transferred from ${e.total}\n`);
// }
