import Notiflix from 'notiflix';
const formEl = document.querySelector('.form');
const firstDelayEl = document.querySelector('input[name="delay"]');
const delayStepEl = document.querySelector('input[name="step"]');
const amountEl = document.querySelector('input[name="amount"]');
const btnEl = document.querySelector('button[type="submit"]');

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const shouldResolve = Math.random() > 0.3;
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}

btnEl.addEventListener('click', event => {
  event.preventDefault();
  for (i = 0; i < +amountEl.value; i++) {
    createPromise(i + 1, +firstDelayEl.value + i * +delayStepEl.value)
      .then(({ position, delay }) => {
        Notiflix.Notify.success(
          `✅ Fulfilled promise ${position} in ${delay}ms`
        );
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(
          `❌ Rejected promise ${position} in ${delay}ms`
        );
      });
  }
});

//or

// const formEl = document.querySelector('.form');

// formEl.addEventListener('submit', event => {
//   event.preventDefault();

//   const formData = new FormData(event.target);
//   const firstDelay = parseInt(formData.get('delay'));
//   const step = parseInt(formData.get('step'));
//   const amount = parseInt(formData.get('amount'));

//   for (i = 0; i < amount; i++) {
//     createPromise(i + 1, firstDelay + i * step)
//       .then(({ position, delay }) => {
//         console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
//       })
//       .catch(({ position, delay }) => {
//         console.log(`❌ Rejected promise ${position} in ${delay}ms`);
//       });
//   }
// });

// function createPromise(position, delay) {
//   return new Promise((resolve, reject) => {
//     setTimeout(() => {
//       const shouldResolve = Math.random() > 0.3;
//       if (shouldResolve) {
//         resolve({ position, delay });
//       } else {
//         reject({ position, delay });
//       }
//     }, delay);
//   });
// }

//or

// const delayEl = document.querySelector('input[name=delay]');
// const stepEl = document.querySelector('input[name=step]');
// const amountEl = document.querySelector('input[name=amount]');
// const buttonEl = document.querySelector('button[type=submit]');

// const createPromise = (position, delay) => {
//   return new Promise((resolve, reject) => {
//     const shouldResolve = Math.random() > 0.3;
//     if (shouldResolve) {
//       resolve(`Fulfilled promise ${position} in ${delay}ms`);
//     } else {
//       reject(`Rejected promise ${position} in ${delay}ms`);
//     }
//   });
// };

// const showPromise = (amount, step, time, current = 1) => {
//   if (current > amount) return;
//   createPromise(current, time)
//     .then(success => Notiflix.Notify.success(success))
//     .catch(error => Notiflix.Notify.failure(error));
//   time += step;
//   setTimeout(() => showPromise(amount, step, time, current + 1), step);
// };

// buttonEl.addEventListener('click', event => {
//   event.preventDefault();
//   setTimeout(
//     () => showPromise(+amountEl.value, +stepEl.value, +delayEl.value),
//     +delayEl.value
//   );
// });
