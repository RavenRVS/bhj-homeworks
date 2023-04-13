const progressBar = document.getElementById('progress');
const form = document.getElementById('form');

form.addEventListener('submit', (e) => {
    e.preventDefault();
    upload(document.getElementById('file').files[0])
})

function upload(file) {
    let xhr = new XMLHttpRequest();

    xhr.upload.onprogress = function(event) {
        setValueProgressBar(event);
    };

    xhr.onloadend = function() {
      if (xhr.status == 201) {
        console.log("Успех");
      } else {
        console.log("Ошибка " + this.status);
      }
    };
  
    xhr.open("POST", "https://students.netoservices.ru/nestjs-backend/upload");
    xhr.send(file);
}

function setValueProgressBar(e) {
    progressBar.value = e.loaded / e.total;
}