
import { showModal, hideModal } from "./modal";

const form = function (modalTimer) {
       // form 
       const forms = document.querySelectorAll('form');

       const message = {
           loading: 'img/form/spinner.svg',
           success: 'Спасибо, мы скоро свяжемся с Вами',
           failure: 'Что-то пошло по пизде'
       };
       forms.forEach(item => {
           bindPostData(item);
       });
   
       function bindPostData(form) {
           form.addEventListener('submit', (e) =>{
               e.preventDefault();
               const statusMessage = document.createElement('img');
               statusMessage.src = message.loading;
               statusMessage.style.cssText = `
                   display: block;
                   margin: 0 auto;
               `;
               form.insertAdjacentElement('afterend', statusMessage);
   
               const formData = new FormData(form);
   
               const json = JSON.stringify(Object.fromEntries(formData.entries()));
   
               axios({
                   method: 'post',
                   url: 'http://localhost:3000/requests',
                   data: json
               }).then(data => {
                       console.log(data);
                       showThanksMessage(message.success);
                       statusMessage.remove();
                   }).catch(() => {
                       showThanksMessage(message.failure);
                   }).finally(() => {
                       form.reset();
                   });
           });
       }
   
       function showThanksMessage (message) {
           const prevModal = document.querySelector('.modal__dialog');
           prevModal.classList.add('hide');
           showModal('.modal', modalTimer);
   
           const thankModal = document.createElement('div');
           thankModal.classList.add('modal__dialog');
           thankModal.innerHTML = `
               <div class="modal__content">
                   <div class="modal__close" data-close>×</div>
                   <div class="modal__title">${message}</div>
               </div>
           `;
           document.querySelector('.modal').append(thankModal);
           setTimeout(()=> {
               thankModal.remove();
               prevModal.classList.add('show');
               prevModal.classList.remove('hide');
               hideModal('.modal');
           }, 4000);
       } 
};

export default form;