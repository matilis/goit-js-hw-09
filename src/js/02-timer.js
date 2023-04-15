import Notiflix from 'notiflix';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

const myInput = document.querySelector('#datetime-picker');
const btnEl = document.querySelector('button');
const timeShowEl = document.querySelectorAll('.value');

let ms = 0;
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const dateNow = options.defaultDate.getTime();
    const dateSelected = selectedDates[0].getTime();
    if (dateNow > dateSelected) {
      btnEl.disabled = true;
    }
    if (dateNow > dateSelected) {
      Notiflix.Notify.failure('Please choose a date in the future');
    } else {
      btnEl.disabled = false;
      ms = dateSelected - dateNow;
    }
  },
};
const fp = flatpickr(myInput, options);

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}
const addLeadingZero = value => {
  setInterval(() => {
    let value = convertMs(ms);
    ms -= 1000;
    timeShowEl[0].innerHTML = `${value.days}`.padStart(2, '0');
    timeShowEl[1].innerHTML = `${value.hours}`.padStart(2, '0');
    timeShowEl[2].innerHTML = `${value.minutes}`.padStart(2, '0');
    timeShowEl[3].innerHTML = `${value.seconds}`.padStart(2, '0');
    if (ms < 0) {
      timeShowEl[0].innerHTML = '00';
      timeShowEl[1].innerHTML = '00';
      timeShowEl[2].innerHTML = '00';
      timeShowEl[3].innerHTML = '00';
    }
  }, 1000);
};
btnEl.addEventListener('click', addLeadingZero);

// OR

// btnEl.addEventListener('click', () => {
//   setInterval(() => {
//     ms -= 1000;
//     const value = convertMs(ms);
//     timeShowEl[0].innerHTML = `${value.days}`.padStart(2, '0');
//     timeShowEl[1].innerHTML = `${value.hours}`.padStart(2, '0');
//     timeShowEl[2].innerHTML = `${value.minutes}`.padStart(2, '0');
//     timeShowEl[3].innerHTML = `${value.seconds}`.padStart(2, '0');
//     if (ms < 0) {
//       timeShowEl[0].innerHTML = '00';
//       timeShowEl[1].innerHTML = '00';
//       timeShowEl[2].innerHTML = '00';
//       timeShowEl[3].innerHTML = '00';
//     }
//   }, 1000);
// });
