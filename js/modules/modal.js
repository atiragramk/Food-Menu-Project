
function showModal (modalSelector, modalTimer) {
  const modal = document.querySelector(modalSelector);
  modal.classList.add('show');
  modal.classList.remove('hide');
  document.body.style.overflow = 'hidden';
  if (modalTimer) {
    clearInterval(modalTimer);
  }

}

function hideModal (modalSelector) {
  const modal = document.querySelector(modalSelector);
  modal.classList.add('hide');
  modal.classList.remove('show');
  document.body.style.overflow = '';   
}

const modal = function (btnSelector, modalSelector, modalTimer) {

    const btnModal = document.querySelectorAll(btnSelector),
          modal = document.querySelector(modalSelector);

         
          btnModal.forEach(item => {
            item.addEventListener('click', ()=>{
                showModal(modalSelector, modalTimer);
            });
          });
          

          modal.addEventListener('click', (event) => {
            if (event.target === modal || event.target.getAttribute('data-close') == '') {
                hideModal(modalSelector);
            }
          });
          document.addEventListener('keydown', (event) => {
              if (event.code === 'Escape' && modal.classList.contains('show')) {
                hideModal(modalSelector);
              }
          });

          function showModalByScroll () {
            if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
                showModal(modalSelector, modalTimer);
                window.removeEventListener('scroll', showModalByScroll);
            }
          }
          window.addEventListener('scroll', showModalByScroll);
};


export default modal;

export {showModal, hideModal};