let editor = document.getElementById('editor');
let textInlocalStorage = localStorage.getItem("textFromEditor");
let clearBtn = document.getElementById('clear');

editor.textContent = textInlocalStorage;


clearBtn.addEventListener('click', clearArea)
editor.addEventListener('input', saveText);

function saveText (e) {
    localStorage.setItem("textFromEditor", e.currentTarget.value)
}

function clearArea () {
    editor.value = ''
    localStorage.removeItem("textFromEditor")
}