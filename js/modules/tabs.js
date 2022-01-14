
const tabs = function (tabSelector, tabContentSelector, tabParentSelector) {
     // tabs 

     const tabs = document.querySelectorAll(tabSelector),
     tabContent = document.querySelectorAll (tabContentSelector),
     tabParent = document.querySelector(tabParentSelector);
 
     function hideTabsContent() {
         tabContent.forEach(item => {
             item.classList.add('hide');
             item.classList.remove('show', 'fade');
         });
 
         tabs.forEach (item => {
             item.classList.remove('tabheader__item_active');
         });
     }
 
     function showTabContent (i = 0) {
         tabContent[i].classList.add('show', 'fade');
         tabContent[i].classList.remove('hide');
         tabs[i].classList.add('tabheader__item_active');
     }
 
     hideTabsContent();
     showTabContent();
 
     tabParent.addEventListener('click', (event) => {
         const target = event.target;
         if (target && target.classList.contains(tabSelector.slice(1))) {
             tabs.forEach ((item, i) => {
                 if (target == item) {
                     hideTabsContent();
                     showTabContent(i);
                 }
             });
         }
     });
};

export default tabs;