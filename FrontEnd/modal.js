//Ouverture et fermeture d'un modal
const button = document.querySelector('#modal-close');
const modal = document.querySelector('#modal');

const openModal = function (e) {
   e.preventDefault();
   modal.style.display = 'block';
};

const closeModal = function (e) {
   e.preventDefault();
   modal.style.display = 'none';
};


const stopPropagation = function (e) {
   e.stopPropagation()
}

document.querySelectorAll('.js-modal').forEach(a => {
   a.addEventListener('click', openModal);
});