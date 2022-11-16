const main = document.querySelector('main');
const root = document.querySelector(':root');
const inputEl = document.getElementById('input');
const resultInput = document.getElementById('result');

const allowedKeys = ["(", ")", "/", "*", "-", "+", "9", "8", "7", "6", "5", "4", "3", "2", "1", "0", ".", "%", " "];

const btn = document.querySelectorAll('.charKey');
btn.forEach((charKeyBtn) => {
    charKeyBtn.addEventListener('click', () => {
        const value = charKeyBtn.dataset.value;
        inputEl.value += value;
    });
});

const btnClear = document.getElementById('clear');
btnClear.addEventListener('click', () => {
    inputEl.value = '';
    inputEl.focus();
    resultInput.classList.remove('error');
    resultInput.value = '';
});

inputEl.addEventListener('keydown', (e) => {
    e.preventDefault();

    if(allowedKeys.includes(e.key)) {
        inputEl.value += e.key;
        return;
    }

    if(e.key === 'Backspace') {
        inputEl.value = inputEl.value.slice(0, -1);
    }

    if(e.key === 'Enter') {
        calculate();
    }
});

const equal = document.getElementById('equal');
equal.addEventListener('click', calculate);

function calculate() {
    resultInput.value = 'ERROR';
    resultInput.classList.add('error');
    const result = eval(inputEl.value);
    resultInput.value = result;
    resultInput.classList.remove('error');
}

const copyBtn = document.getElementById('copyToClipboard');
copyBtn.addEventListener('click', (e) => {
    const button = e.currentTarget

    if(button.innerText === "Copiar") {
        button.innerText = "Copiado!";
        button.classList.add('success');
        navigator.clipboard.writeText(resultInput.value);
    } else {
        button.innerText = "Copiar";
        button.classList.remove('success');
    }
});

const themeBtn = document.getElementById('themeSwitcher');
themeBtn.addEventListener('click', () => {
   if(main.dataset.theme === 'dark') {
        root.style.setProperty('--bg-color', '#f1f5f9');
        root.style.setProperty('--border-color', '#aaa');
        root.style.setProperty('--font-color', '#212529');
        root.style.setProperty('primary-color', '#26834a');
        main.dataset.theme = 'light';
   } else {
        root.style.setProperty('--bg-color', '#212529');
        root.style.setProperty('--border-color', '#666');
        root.style.setProperty('--font-color', '#f1f5f9');
        root.style.setProperty('primary-color', '#4dff91');
        main.dataset.theme = 'dark';
   }
});