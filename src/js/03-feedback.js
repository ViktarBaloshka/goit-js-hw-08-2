// В HTML есть разметка формы.Напиши скрипт который будет сохранять значения полей в локальное хранилище когда пользователь
// что - то печатает.
// Выполняй это задание в файлах 03-feedback.html и 03-feedback.js. Разбей его на несколько подзадач:

// Отслеживай на форме событие input, и каждый раз записывай в локальное хранилище объект с полями email и message,
// в которых сохраняй текущие значения полей формы. Пусть ключом для хранилища будет строка "feedback-form-state".
// При загрузке страницы проверяй состояние хранилища, и если там есть сохраненные данные, заполняй ими поля формы.
// В противном случае поля должны быть пустыми.
// При сабмите формы очищай хранилище и поля формы, а также выводи объект с полями email, message и текущими их значениями
// в консоль.
// Сделай так, чтобы хранилище обновлялось не чаще чем раз в 500 миллисекунд.Для этого добавь в проект и используй
// библиотеку lodash.throttle.
import throttle from 'lodash.throttle';

const LOCALSTORAGE_KEY = 'feedback-form-state';
const form = document.querySelector('.feedback-form');
const formData = {};

form.addEventListener('input', onInputForm);
form.addEventListener('submit', throttle(onSubmitForm, 500));

updateForm();

function onInputForm(event) {
  formData[event.target.name] = event.target.value;
  localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(formData));
}

function onSubmitForm(event) {
  event.preventDefault();
  event.currentTarget.reset();
  localStorage.removeItem(LOCALSTORAGE_KEY);
  console.log(formData);
}

function updateForm() {
  if (localStorage.getItem(LOCALSTORAGE_KEY)) {
    const { email, message } = JSON.parse(
      localStorage.getItem(LOCALSTORAGE_KEY)
    );
    form.email.value = email;
    form.message.value = message;
    formData.email = email;
    formData.message = message;
  }
}
