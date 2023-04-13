import Notiflix from 'notiflix';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

const myInput = document.querySelector('#datetime-picker');
const btnEl = document.querySelector('button');

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);
    const dateNow = options.defaultDate.getTime();
    const dateSelected = selectedDates[0].getTime();
    if (dateNow > dateSelected) {
      btnEl.disabled = true;
    }
    if (dateNow > dateSelected) {
      Notiflix.Notify.failure('Please choose a date in the future');
    } else {
      btnEl.disabled = false;
    }
  },
};
const fp = flatpickr(myInput, options);

// const options = {
//   enableTime: true,
//   time_24hr: true,
//   defaultDate: new Date(),
//   minuteIncrement: 1,
//   onClose(selectedDates) {
//     console.log(selectedDates[0].getTime());
//     if (options.defaultDate.getTime() > selectedDates[0].getTime()) {
//       document.querySelector('button').disabled = true;
//     }
//     if (options.defaultDate.getTime() > selectedDates[0].getTime()) {
//       Notiflix.Notify.failure('Please choose a date in the future');
//     } else {
//       document.querySelector('button').disabled = false;
//     }
//   },
// };
