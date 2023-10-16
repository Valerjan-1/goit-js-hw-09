// Описаний в документації
import flatpickr from 'flatpickr';
// Додатковий імпорт стилів
import 'flatpickr/dist/flatpickr.min.css';

const selector = {
  inputDateTime: document.querySelector(`#datetime-picker`),
  btnStart: document.querySelector(`[data-start]`),
  day: document.querySelector(`[data-days]`),
  hours: document.querySelector(`[data-hours]`),
  minutes: document.querySelector(`[data-minutes]`),
  seconds: document.querySelector(`[data-seconds]`),
};

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);
    checkDate(selectedDates[0]);
  },
};

let taimerId = null;
let dateChanges = null;
let timeInterval = 0;

selector.btnStart.setAttribute('disabled', true);

flatpickr(selector.inputDateTime, options);

selector.btnStart.addEventListener(`click`, onStart);

function onStart() {
  taimerId = setInterval(startTimer, 1000);
}

function checkDate(selectedDates) {
  let date = Date.now();

  if (selectedDates < date) {
    selector.btnStart.setAttribute(`disabled`, true);
    return window.alert(`Please choose a date in the future`);
  }
  timeInterval = selectedDates.getTime() - date;
  dateChanges = convertMs(timeInterval);

  renderDate(dateChanges);
  selector.btnStart.removeAttribute(`disabled`);
}

function startTimer() {
  selector.inputDateTime.setAttribute(`disabled`, true);
  selector.btnStart.setAttribute(`disabled`, true);

  timeInterval -= 1000;

  if (selector.seconds.textContent <= 0 && selector.minutes.textContent <= 0) {
    clearInterval(taimerId);

    return window.alert('Time end');
  } else {
    dateChanges = convertMs(timeInterval);
    renderDate(dateChanges);
  }
}

// Countdown
function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = addLeadingZero(Math.floor(ms / day));
  // Remaining hours
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = addLeadingZero(
    Math.floor((((ms % day) % hour) % minute) / second)
  );

  return { days, hours, minutes, seconds };
}
function addLeadingZero(value) {
  return String(value).padStart(2, `0`);
}
function renderDate(dateChanges) {
  selector.seconds.textContent = dateChanges.seconds;
  selector.minutes.textContent = dateChanges.minutes;
  selector.hours.textContent = dateChanges.hours;
  selector.day.textContent = dateChanges.days;
}

// function checkDate(selectedDates) {
//   let date = Date.now();

//   if (selectedDates < date) {
//     selector.btnStart.setAttribute(`disabled`, true);
//     return window.alert(`Please choose a date in the future`);
//   } else {
//     selector.btnStart.removeAttribute('disabled');
//   }

//   timeInterval = selectedDates.getTime() - date;
//   dateChanges = convertMs(timeInterval);

//   // renderDate(dateChanges);
//   renderDate(dateChanges);
//   selector.btnStart.removeAttribute(`disabled`);
// }
